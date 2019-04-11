# Copyright 2016 Google Inc. All rights reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

"""This is a sample Hello World API implemented using Google Cloud
Endpoints."""

# [START imports]
import endpoints
from endpoints import message_types
from endpoints import messages
from endpoints import remote
# [END imports]


# [START messages]
class EchoRequest(messages.Message):
    message = messages.StringField(1)


class EchoResponse(messages.Message):
    """A proto Message that contains a simple string field."""
    message = messages.StringField(1)
	

ECHO_RESOURCE = endpoints.ResourceContainer(
    EchoRequest,
    n=messages.IntegerField(2, default=1))
	
# [END messages]


# [START echo_api_class]
@endpoints.api(name='echo', version='v1')
class EchoApi(remote.Service):

    # [START echo_api_method]
	@endpoints.method(
        # This method takes an empty request body.
        message_types.VoidMessage,
        # This method returns an Echo message.
        EchoResponse,
        path='echo/name',
        http_method='GET',
        name='getUserName')
	def getUserName(self, request):
		return EchoResponse(message='I am test user .... thanks')

	@endpoints.method(
        # This method takes a ResourceContainer defined above.
        ECHO_RESOURCE,
        # This method returns an Echo message.
        EchoResponse,
        path='echo',
        http_method='POST',
        name='echo')
	def echo(self, request):
		output_message = ' '.join([request.message] * request.n)
		return EchoResponse(message=output_message)
    # [END echo_api_method]

	@endpoints.method(
        # This method takes a ResourceContainer defined above.
        ECHO_RESOURCE,
        # This method returns an Echo message.
        EchoResponse,
        path='echo/{n}',
        http_method='POST',
        name='echo_path_parameter')
	def echo_path_parameter(self, request):
		output_message = ' '.join([request.message] * request.n)
		return EchoResponse(message=output_message)

	@endpoints.method(
        # This method takes a ResourceContainer defined above.
        message_types.VoidMessage,
        # This method returns an Echo message.
        EchoResponse,
        path='echo/getApiKey',
        http_method='GET',
        name='echo_api_key',
        api_key_required=True)
	def echo_api_key(self, request):
		key, key_type = request.get_unrecognized_field_info('key')
		return EchoResponse(message=key)

	@endpoints.method(
        # This method takes an empty request body.
        message_types.VoidMessage,
        # This method returns an Echo message.
        EchoResponse,
        path='echo/email',
        http_method='GET',
        name='getUserEmail')
	def getUserEmail(self, request):
		return EchoResponse(message='test_email_address@test.com')
# [END echo_api_class]


# [START api_server]
api = endpoints.api_server([EchoApi])
# [END api_server]
