from slackclient import SlackClient
import time

slack_token = 'xoxb-575060474148-600534221555-p4pSLvMQO4ZdbognZ9Z9PiFu'
sc = SlackClient(slack_token)

if sc.rtm_connect():
    while sc.server.connected is True:
        message = sc.rtm_read()
        time.sleep(1)
        print(message)
        if message: 
            for m in message:
                text = m.get('text')
                if text is not None:
                    print(text)           
else:
    print("Connection Failed")