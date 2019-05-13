import requests
import json
web_hook_url = 'https://hooks.slack.com/services/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'
msg = {'text':'from python and slack'}

requests.post(web_hook_url,data=json.dumps(msg))