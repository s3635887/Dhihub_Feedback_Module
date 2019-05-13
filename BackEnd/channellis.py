from slackclient import SlackClient

slack_token = 'xoxb-575060474148-585358061488-uSAy4gzktu8jztx3154DzKdr'
sc = SlackClient(slack_token)

sc.api_call(
    "reactions.add",
    channel="UGX2QHYP4",
    name="thumbsup",
    timestamp="1234567890.123456",
    as_user = True

)