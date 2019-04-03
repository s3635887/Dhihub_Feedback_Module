from flask import Flask, request, jsonify, render_template 
from slackclient import SlackClient
import os

app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))
slack_token = 'xoxb-575060474148-585358061488-uSAy4gzktu8jztx3154DzKdr'
sc = SlackClient(slack_token)



@app.route("/")
def index():
    return render_template("trail2.html")

@app.route("/send", methods=["POST"])
def send_message():
    message  = request.form['Message']
    sc = SlackClient(slack_token)
    print(sc.api_call
    (
        "chat.postMessage",
        channel = "DHAQX462K",
        text = message,
        attachments = [{"pretext": "Would you like to play a game?"}],
        as_user = True	
    )
    )

    return render_template("trail2.html")

if __name__ == '__main__':
    app.debug = True
    app.run()

# {
#     "text": "",
#     "attachments": [
#         {
#             "text": "Choose a game to play",
#             "fallback": "You are unable to choose a game",
#             "callback_id": "wopr_game",
#             "color": "#3AA3E3",
#             "attachment_type": "default",
#             "actions": [
#                 {
#                     "name": "game",
#                     "text": "Chess",
#                     "type": "button",
#                     "value": "chess"
#                 },
#                 {
#                     "name": "game",
#                     "text": "Falken's Maze",
#                     "type": "button",
#                     "value": "maze"
#                 },
#                 {
#                     "name": "game",
#                     "text": "Thermonuclear War",
#                     "style": "danger",
#                     "type": "button",
#                     "value": "war",
#                     "confirm": {
#                         "title": "Are you sure?",
#                         "text": "Wouldn't you prefer a good game of chess?",
#                         "ok_text": "Yes",
#                         "dismiss_text": "No"
#                     }
#                 }
#             ]
#         }
#     ]
# }