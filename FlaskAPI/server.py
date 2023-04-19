from flask import Flask, request, jsonify
import mysql.connector
import keys
import json
from flask_cors import CORS


app = Flask(__name__)
CORS(app)


#Helper functions for opening/closing connection to database
def dbconnect():
    db = mysql.connector.connect(
        host=keys.adr,
        user='root',
        password=keys.pw,
        database='users'
    )

    cursor = db.cursor(dictionary=True)

    return (db, cursor)

def dbclose(db, cursor):
    cursor.close()
    db.close()





#returns user info if the user exists
@app.route("/checkUser", methods=['POST'])
def checkUser():


    results = []

    try:
        #query db for specific user
        db, cursor = dbconnect()

        adr = request.get_json()['address']

        cursor.execute('SELECT * FROM players WHERE address = %s;', [adr])
        results = cursor.fetchall()

        db.commit()
        dbclose(db, cursor)
    except:
        return jsonify(error=404, msg = "Unable to query database"), 404

    return json.dumps(results), 200
    

#creates a new rom in the users table if a new user joins the game
@app.route('/newUser', methods=['POST'])
def newUser():
    try:
        adr = request.get_json()['address']
        nick = request.get_json()['nickname']

        db, cursor = dbconnect()
        #base rate 1, will have custom usernames in future
        cursor.execute('INSERT INTO players (nickname, address, rate) VALUES (%s, %s, 1)', (nick, adr))

        db.commit()
        dbclose(db, cursor)
        print('new user added')

    except:
        return jsonify(error=404, msg = "Unable to update database"), 404

    return {},200


#updates user's rate in database
@app.route('/updateUser', methods=['POST'])
def updateUser():

    try:
        adr = request.get_json()['address']
        rate = request.get_json()['rate']

        db, cursor = dbconnect()
        #find user and set new rate
        cursor.execute('UPDATE players SET rate = %s WHERE address = %s', ((rate), adr))

        db.commit()
        dbclose(db, cursor)
        print('updated user')

    except:
        return jsonify(error=404, msg = "Unable to update database"), 404

    return {},200


#fetch top 10 users by rate, return JSON data
@app.route("/getLB", methods=['GET'])
def leaderboard():

    results = None

    try:
        db, cursor = dbconnect()

        cursor.execute('SELECT rate,nickname FROM players ORDER BY rate DESC LIMIT 10')

        results = cursor.fetchall()

        db.commit()
        dbclose(db, cursor)
        print('leaderboard fetched')

    except:
        return jsonify(error=404, msg = "Unable to query database"), 404

    
    return json.dumps(results), 200



@app.route("/")
def index():
    return "Our flask api server. We will use this in conjuction with a mySQL database to update and display a leaderboard"

if __name__ == "__main__":
    app.run(port=3001, debug=True)
