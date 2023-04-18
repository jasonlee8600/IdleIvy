from flask import Flask, request
import mysql.connector
import keys
import json
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

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
    if request.method == 'POST':

        print(request.get_json())

        db, cursor = dbconnect()

        adr = request.get_json()['address']

        cursor.execute('SELECT * FROM players WHERE address = %s;', [adr])
        results = cursor.fetchall()

        db.commit()
        dbclose(db, cursor)


        print(results)

        return json.dumps(results)

    else:
        return 'ERROR(TODO)'
    

@app.route('/newUser', methods=['POST'])
def newUser():
    if request.method == 'POST':

        adr = request.get_json()['address']
        nick = request.get_json()['nickname']

        db, cursor = dbconnect()


        cursor.execute('INSERT INTO players (nickname, address, rate) VALUES (%s, %s, 1)', (nick, adr))

        db.commit()
        dbconnect(db, cursor)

        print('new user added')

    return {};


@app.route('/updateUser', methods=['POST'])
def updateUser():
    if request.method == 'POST':

        adr = request.get_json()['address']
        rate = request.get_json()['rate']

        db, cursor = dbconnect()

        cursor.execute('UPDATE players SET rate = %s WHERE address = %s', ((rate), adr))

        db.commit()
        dbclose(db, cursor)

        print('updated user')

    #TODO: add possible error info here
    return {};


@app.route("/getLB", methods=['GET'])
def leaderboard():

    if request.method == 'GET':

        db, cursor = dbconnect()

        cursor.execute('SELECT rate,nickname FROM players ORDER BY rate DESC LIMIT 10')

        results = cursor.fetchall()

        db.commit()
        dbclose(db, cursor)
        
        return json.dumps(results)
    
    return "INVALID(TODO)"


@app.route("/")
def index():
    return "Our flask api server. We will use this in conjuction with a mySQL database to display a leaderboard, as well as potentially develop a notification/email system"

if __name__ == "__main__":
    app.run(port=3001, debug=True)
