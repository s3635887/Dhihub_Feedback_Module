import sys
from slacker import Slacker
slack = Slacker('xoxb-575060474148-585358061488-uSAy4gzktu8jztx3154DzKdr')
message = "Hello Everyone"
slack.chat.post_message('rmit-only',message)