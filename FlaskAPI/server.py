from flask import Flask, request
import mysql.connector
import keys


app = Flask(__name__)

db = mysql.connector.connect(
        host=keys.adr,
        user='root',
        password=keys.pw,
        database='Users'
    )

cursor = db.cursor()

cursor.execute('SELECT * FROM users')
results = cursor.fetchall()

print((results))


@app.route("/")
def index():
    return "Our flask api server. We will use this in conjuction with a mySQL database to display a leaderboard, as well as potentially develop a notification/email system"

if __name__ == "__main__":
    app.run(port=3001, debug=True)
