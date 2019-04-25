from flask import Flask, request, make_response, Response
import os
import json
from slackclient import SlackClient

# Your app's Slack bot user token
SLACK_BOT_TOKEN = 'xoxb-575060474148-600534221555-p4pSLvMQO4ZdbognZ9Z9PiFu'
SLACK_VERIFICATION_TOKEN = 'QKeDPPoqJ4PfNm99ch0v1SUc'

# Slack client for Web API requests
slack_client = SlackClient(SLACK_BOT_TOKEN)

# Flask webserver for incoming traffic from Slack
app = Flask(__name__)

# Helper for verifying that requests came from Slack
def verify_slack_token(request_token):
    if SLACK_VERIFICATION_TOKEN != request_token:
        print("Error: invalid verification token!")
        print("Received {} but was expecting {}".format(request_token, SLACK_VERIFICATION_TOKEN))
        return make_response("Request contains invalid Slack verification token", 403)


# Send a Slack message on load. This needs to be _before_ the Flask server is started

# A Dictionary of message attachment options
# attachments_json = [
# 	{
# 		"type": "section",
# 		"text": {
# 			"type": "plain_text",
# 			"text": "Rate this people!!",
# 			"emoji": True
# 		}
# 	},
# 	{
# 		"type": "actions",
# 		"elements": [
# 			{
# 				"type": "button",
# 				"text": {
# 					"type": "plain_text",
# 					"text": "low",
# 					"emoji": True
# 				},
# 				"value": "Go to Hell man!!!!"
# 			},
# 			{
# 				"type": "button",
# 				"text": {
# 					"type": "plain_text",
# 					"text": "medium",
# 					"emoji": True
# 				},
# 				"value": "Okay"
# 			},
# 			{
# 				"type": "button",
# 				"text": {
# 					"type": "plain_text",
# 					"text": "high",
# 					"emoji": True
# 				},
# 				"value": "AWSM"
# 			}
# 		]
# 	},
# 	{
# 		"type": "divider"
# 	}
# ]


@app.route("/slack/message_actions", methods=["POST"])
def message_actions():

    # Parse the request payload
    form_json = json.loads(request.form["payload"])
    print(form_json)

    # Verify that the request came from Slack
    verify_slack_token(form_json["token"])

    # Check to see what the user's selection was and update the message accordingly
    selection = form_json["actions"][0]["value"]
    print("The action man:     ")
    print(selection)

    response = slack_client.api_call(
      "chat.update",
      channel=form_json["channel"]["id"],
      ts=form_json["message_ts"],
      text="This is what you deserve: {} ".format(selection),
      attachments=[] # empty `attachments` to clear the existing massage attachments
    )

    # Send an HTTP 200 response with empty body so Slack knows we're done here
    return make_response("", 200)

attachments_json = [
    {
        "fallback": "Upgrade your Slack client to use messages like these.",
        "color": "#3AA3E3",
        "attachment_type": "default",
        "callback_id": "menu_options_2319",
        "actions": [
            {
                "name": "low",
                "text": "LOW",
                "type": "button",
                "value": "Go to Hell man!!!!"
            },
            {
                "name": "high",
                "text": "HIGH",
                "type": "button",
                "value": "Good Boy!!"
            }
        ]
    }
]

# Send a message with the above attachment, asking the user if they want coffee
slack_client.api_call(
  "chat.postMessage",
  channel="#random",
  attachments=attachments_json
)

    # Start the Flask server
if __name__ == "__main__":
    app.run()