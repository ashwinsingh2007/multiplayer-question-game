# Mulitplayer Challenge
Vue, Express, PostgreSql with Docker-compose setup for local development.

### Steps to Run

1. Clone this repository

> git clone https://github.com/ashwinsingh2007/multiplayer-question-game.git

2. Navigate into the directory multiplayer-question-game

> cd your-path-to/multiplayer-question-game

3. Build Docker Images

> docker-compose build

4. Run the stack :)

> docker-compose up

Your app should be running on : 

http://localhost:8080

Be patient and wait for all for all installing and initialization is finished . This will only happen once.


# The 20 Question Challenge
The workflow is explained below: 

1. The first page will show the list of on going challenges. 

2. For Creators: 
    a. If you want to new game , you can create new game from top right `create game challenge`  button. You can only create if you have registered or logged in.
    b. Register yourslef on the application.
    c. Create new challenge by providing the title and word which you want to be guessed by other participant. The word provided will be guessed.
    d. To receive question from participants , Join the channel which is created.
    e. You can handle multiple question from different participants for same game challenge.
    f. You can also handle multiple game challenge with different participants.
    g. Answer can be Yes or No from your side.

3. For Participants:
    a. Join any challange
    b. You will get 20 chances, Asking questions or answer will be effecting your 20 count.
    c. Guess correct, You win. In case you have used all 20 chances and the answer wasn't correct then you loose.

# Tech Architecture:
1. Vue.Js - For front end
2. VueX - For state management
3. Socket.io - For real time messaging
4. Express (NodeJs Framework) - For backend
5. PostgreSql - For database
6. Docker

# Live here
http://20question.s3-website.us-east-2.amazonaws.com/

# Key Features
1. Real time messaging
2. Multiple sessions
3. A game creator in single game can handle and response to multiple participants at once (handled with secuirity)
4. A game creator in multiple games can handle and response to multiple participants (handled with security) 
5. The messages are not deleted , hence can pause and resume asking questions
6. Hosted on AWS for testing.
