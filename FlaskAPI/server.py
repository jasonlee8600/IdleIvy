from flask import Flask, request
import mysql.connector
import keys
import json
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

db = mysql.connector.connect(
        host=keys.adr,
        user='root',
        password=keys.pw,
        database='Users'
    )

cursor = db.cursor(dictionary=True)

cursor.execute('SELECT * FROM users')
results = cursor.fetchall()

print((results))


#returns user info if the user exists
@app.route("/checkUser", methods=['POST'])
def checkUser():
    if request.method == 'POST':

        adr = request.form['address']

        cursor.execute('SELECT * FROM users WHERE address = ?', (adr))
        results = cursor.fetchall()

        return json.dumps(results)

    else:
        return 'ERROR(TODO)'
    

@app.route('/newUser', methods=['POST'])
def newUser():
    if request.method == 'POST':

        adr = request.form['address']
        nick = request.form['nickname']

        cursor.execute('INSERT INTO users (nickname, address, rate) VALUES (?, ?, 1)', (nick, adr))

    return 0;


@app.route("/getLB", methods=['GET'])
def leaderboard():

    if request.method == 'GET':
        cursor.execute('SELECT rate,nickname FROM users ORDER BY rate DESC LIMIT 10')

        results = cursor.fetchall()
        
    
        return json.dumps(results)
    
    return "INVALID(TODO)"


@app.route("/")
def index():
    return "Our flask api server. We will use this in conjuction with a mySQL database to display a leaderboard, as well as potentially develop a notification/email system"

if __name__ == "__main__":
    app.run(port=3001, debug=True)
