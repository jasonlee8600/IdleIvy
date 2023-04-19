# IdleIvy

# About
IdleIvy is an Ivy League themed idle game for users who are interested in crypto and fans of this style of gameplay. The in-game currency is in the form of cryptocurrency tokens that are provided via a Blockchain smart contract that is hosted on the Ethereum network or a testnet. Players can then use these tokens in the game to upgrade their items to increase their tokens earned per minute rate.

## Tech Stack

We will be developing a Next.js application using React for our frontend and Python with Flask as our backend. The game will be based on a Blockchain smart contract hosted on either the Ethereum network or a testnet. User data will be stored partially on the Blockchain and partially in a mySQL database.

# How to Deploy
WHAT TO INSTALL HERE (requirements.txt) AND HOW TO DEPLOY
MAYBE INCLUDE METAMASK SETUP HERE TOO
## Run Frontend
## Run Backend
To set up the Flask server locally, follow these steps:
1. Install homebrew if you do not have it already - https://docs.brew.sh/Installation
2. Open a new terminal window and cd to /idleivy/flaskAPI
3. Create a virtual environment - you can do this by running the following commands:
```shell
brew install virtualenv
virtualenv testenv
source testenv/bin/activate
```  
This will create a virtual environment called virtualenv where you can run the Flask server.
4. Run "pip3 install -r requirements.txt" to install all required modules.
5. To run the server locally, run "python server.py".


# Testing
## Backend Testing
We use pytest to conduct elementary unit tests on our Flask API endpoints. The tests check that each API function is able to run and exit with the correct exit status given the correct form and request type. To run the backend testing, simply use the command
```shell
pytest -rm
```
From within the FlaskAPI directory.


## Frontend Testing

We have been using the Jest testing framework for unit testing on the frontend. Here, we included screenshot testing to ensure the page is rendered correctly as well as testing all buttons of interest and their respective onClick functions (e.g. navigating to a different page, interacting with smart contract for tokens, etc.).

To run the frontend tests, navigate to the root directory (s23-idleivy), then run these commands:

```shell
cd idlyivy/__tests__/frontend_tests
npm test
```
## Adding Tests
To add a backend test, edit the "test_db.py" file in the FlaskAPI directory. 

# Metrics Milestone
On the home page (index.js) of our idle game, we have buttons associated with some Ivy League schools (Yale, Harvard, Princeton) that navigate the user to the version of our game that is themed after the selected school. At the time of this milestone, the Yale themed version of the game is the one we have fully implemented, so we tested the Yale button of interest for better conversion performance by changing it to three different colors (blue, white, black).