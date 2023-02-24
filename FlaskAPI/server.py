from flask import Flask, request
import mysql.connector
import keys
import json


app = Flask(__name__)

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

@app.route("/getLB")
def leaderboard():
    cursor.execute('SELECT rate,nickname FROM users ORDER BY rate DESC LIMIT 10')
    row_headers=[x[0] for x in cursor.description]
    
    results = cursor.fetchall()
    json_data=[]
    for result in results:
        json_data.append(dict(zip(row_headers,result)))
   
    return json.dumps(json_data)


@app.route("/")
def index():
    return "Our flask api server. We will use this in conjuction with a mySQL database to display a leaderboard, as well as potentially develop a notification/email system"

if __name__ == "__main__":
    app.run(port=3001, debug=True)
