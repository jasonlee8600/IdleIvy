from flask import Flask, request

app = Flask(__name__)

@app.route("/")
def index():
    return "Our flask api server. We will use this in conjuction with a mySQL database to display a leaderboard, as well as potentially develop a notification/email system"

if __name__ == "__main__":
    app.run(port=3001, debug=True)
