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
