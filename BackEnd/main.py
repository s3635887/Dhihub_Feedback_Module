from flask import Flask, request, jsonify, render_template, make_response, Response 
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from slackclient import SlackClient
import json
import os

app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:Pavan123@localhost:5432/Sample'

#connection to google cloud sql
USER   = 'root'
PASS   = 'dhihub123'
HOST   = '35.244.127.254'
DBNAME = 'sample'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://{}:{}@{}/{}'.format(USER,PASS,HOST,DBNAME)

#slack bot token
slack_token = 'xoxb-575060474148-600534221555-n4yYl8oo4ATGmTURPXvj9y7L'

#Slack app verification code
SLACK_VERIFICATION_TOKEN = 'QKeDPPoqJ4PfNm99ch0v1SUc'
sc = SlackClient(slack_token)
db = SQLAlchemy(app)
ma = Marshmallow(app)


#Helper for verifying that requests came from Slack
def verify_slack_token(request_token):
    if SLACK_VERIFICATION_TOKEN != request_token:
        print("Error: invalid verification token!")
        print("Received {} but was expecting {}".format(request_token, SLACK_VERIFICATION_TOKEN))
        return make_response("Request contains invalid Slack verification token", 403)

# database models
# model for table survey
class Survey(db.Model):
    SurveyID = db.Column(db.Integer, primary_key=True)
    Survey_Title = db.Column(db.String(200), unique=False, nullable =False )
    
    # initialisation
    def __init__(self,SurveyID,Survey_Title):
        self.SurveyID = SurveyID
        self.Survey_Title = Survey_Title

class UserSchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ('SurveyID','Survey_Title')
user_schema = UserSchema()
users_schema = UserSchema(many=True)

# model for table Question
class Question(db.Model):
    que_id = db.Column(db.Integer, primary_key=True, autoincrement = True)
    SurveyID = db.Column(db.Integer, db.ForeignKey('survey.SurveyID'),primary_key=True,autoincrement = False)
    question_type = db.Column(db.String(100),nullable=False)
    question = db.Column(db.String(300),nullable=False)
    optionA = db.Column(db.String(100))
    optionB = db.Column(db.String(100))
    optionC = db.Column(db.String(100))
    optionD = db.Column(db.String(100))
    
    # initialisation
    def __init__(self,SurveyID,question_type,question,optionA,optionB,optionC,optionD):
        self.question_type = question_type
        self.SurveyID = SurveyID
        self.question = question
        self.optionA = optionA
        self.optionB = optionB
        self.optionC = optionC
        self.optionD = optionD

class UserSchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ('que_id','SurveyID','question_type','question','optionA','optionB','optionC','optionD')

user_schema1 = UserSchema()
users_schema1 = UserSchema(many=True)

# model for table user info
class User_info(db.Model):
    UID = db.Column(db.String(50), primary_key=True)
    Name = db.Column(db.String(300))

    # initialisation
    def __init__(self, UID,Name):
        self.UID = UID
        self.Name = Name
class UserSchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ('UID','Name')
user_schema2 = UserSchema()
users_schema2 = UserSchema(many=True)

# model for table answers
class Answer(db.Model):
    UID = db.Column(db.String(50), db.ForeignKey('user_info.UID'),primary_key=True)
    que_id = db.Column(db.Integer, db.ForeignKey('question.que_id'),primary_key=True)
    SurveyID = db.Column(db.Integer, db.ForeignKey('survey.SurveyID'),primary_key=True)
    answer = db.Column(db.String(50), nullable=False)

    # initialisation
    def __init__(self, UID,que_id,SurveyID,answer):
        self.UID = UID
        self.que_id = que_id
        self.SurveyID = SurveyID
        self.answer = answer

class UserSchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ('UID','que_id','SurveyID','answer')

user_schema3 = UserSchema()
users_schema3 = UserSchema(many=True)


# endpoint to get the question details from the react frontend form and save it to the database.
@app.route("/user", methods=["POST"])
def add_question():
    question1 = request.json['question']
    op_a = request.json['optionA']
    op_b = request.json['optionB']
    op_c = request.json['optionC']
    op_d = request.json['optionD']
    questType = request.json['questionType']
    sur_id = request.json['surveyID']
    print(question1,op_a,op_b,op_c,op_d)
    
    new_question = Question(sur_id,questType,question1,op_a,op_b,op_c,op_d)
    db.session.add(new_question)
    db.session.commit()
    
    return make_response("", 200)
# endpoint to get list of questions/survey and list of users to whom the survey will be sent and send the survey in slack
@app.route("/user/submit", methods=["POST"])
def submit_question():
    # getting users and questions
    users = request.json['subUsers']
    ques = request.json['questions']
    for que in ques:
        
        question1 = que['question']
        op_a = que['optionA']
        op_b = que['optionB']
        op_c = que['optionC']
        op_d = que['optionD']
        question_id = que['que_id']
        survey_id = que['SurveyID']
        questType = que['question_type']
        print("Question type is: ",questType)
        
        # adding quetionId and surveyID to the value of button so that when we get the answer from the user,
        # we will know for which quetion and which suvery that anser belongs to
        if questType == "4":
            op_a_value = json.dumps({
                "value" : op_a,
                "qid" : question_id,
                "surveyid" : survey_id
            })
            op_b_value = json.dumps({
                "value" : op_b,
                "qid" : question_id,
                "surveyid" : survey_id
            })
            op_c_value = json.dumps({
                "value" : op_c,
                "qid" : question_id,
                "surveyid" : survey_id
            })
            op_d_value = json.dumps({
                "value" : op_d,
                "qid" : question_id,
                "surveyid" : survey_id
            })

            print(op_a_value)
        
            attachments_json = [
            {
                "fallback": "Upgrade your Slack client to use messages like these.",
                "color": "#3AA3E3",
                "attachment_type": "default",
                "callback_id": "menu_options_2319",
                "actions": [
                    {
                        "name": "low",
                        "text": op_a,
                        "type": "button",
                        "value": op_a_value
                    },
                    {
                        "name": "high",
                        "text": op_b,
                        "type": "button",
                        "value": op_b_value
                    },
                    {
                        "name": "high",
                        "text": op_c,
                        "type": "button",
                        "value": op_c_value
                    },
                    {
                        "name": "high",
                        "text": op_d,
                        "type": "button",
                        "value": op_d_value
                    }
                ]
            }
            ]

        elif questType == "3":
            op_a_value = json.dumps({
                "value" : op_a,
                "qid" : question_id,
                "surveyid" : survey_id
            })
            op_b_value = json.dumps({
                "value" : op_b,
                "qid" : question_id,
                "surveyid" : survey_id
            })
            op_c_value = json.dumps({
                "value" : op_c,
                "qid" : question_id,
                "surveyid" : survey_id
            })

            print(op_a_value)
        
            attachments_json = [
            {
                "fallback": "Upgrade your Slack client to use messages like these.",
                "color": "#3AA3E3",
                "attachment_type": "default",
                "callback_id": "menu_options_2319",
                "actions": [
                    {
                        "name": "low",
                        "text": op_a,
                        "type": "button",
                        "value": op_a_value
                    },
                    {
                        "name": "high",
                        "text": op_b,
                        "type": "button",
                        "value": op_b_value
                    },
                    {
                        "name": "high",
                        "text": op_c,
                        "type": "button",
                        "value": op_c_value
                    }
                ]
            }
            ]

        elif questType == "2":
            print("In que type 2.")
            op_a_value = json.dumps({
                "value" : op_a,
                "qid" : question_id,
                "surveyid" : survey_id
            })
            op_b_value = json.dumps({
                "value" : op_b,
                "qid" : question_id,
                "surveyid" : survey_id
            })

            print(op_a_value)
        
            attachments_json = [
            {
                "fallback": "Upgrade your Slack client to use messages like these.",
                "color": "#3AA3E3",
                "attachment_type": "default",
                "callback_id": "menu_options_2319",
                "actions": [
                    {
                        "name": "low",
                        "text": op_a,
                        "type": "button",
                        "value": op_a_value
                    },
                    {
                        "name": "high",
                        "text": op_b,
                        "type": "button",
                        "value": op_b_value
                    }
                ]
            }
            ]

        # send quet to multiple slack users
        for user in users:
            sc.api_call(
            "chat.postMessage",
            channel=user,
            text = question1,
            as_user = True,
            attachments=attachments_json
            )

    return make_response("", 200)
    
# endpoint to get the JSON payload i.e. when a user replies on slack, slack sends a JSON reply to the URL we have mentions in 
# Interactive messeges or our slack app. That JSON file is called payload. That payload contains the value of the button 
# pressed by the user. When the user clicks, that question is replaced with a thank you message.
@app.route("/slack/message_actions", methods=["POST"])
def message_actions():

    # Parse the request payload
    form_json = json.loads(request.form["payload"])
    print(form_json)

    # Verify that the request came from Slack
    verify_slack_token(form_json["token"])

    # Check to see what the user's selection was and update the message accordingly
    selection = form_json["actions"][0]["value"]
    abc = json.loads(selection)
    answer_value = abc["value"]
    answer_que = abc["qid"]
    answer_survey = abc["surveyid"]
    u_id = form_json['user']['id']
    name = form_json['user']['name']
    
    print("Value is: ",answer_value)
    print("QID is:", answer_que)
    print("surveyid is : ", answer_survey)
    print("This is the ID:   ",id)
    print("Name:  ",name)
    
    new_answer = Answer(u_id,answer_que,answer_survey,answer_value)
    db.session.add(new_answer)
    db.session.commit()

    # replacing the question with thank you message
    response = sc.api_call(
      "chat.update",
      channel=form_json["channel"]["id"],
      ts=form_json["message_ts"],
      text="Thank you! :smile:",
      attachments=[] # empty `attachments` to clear the existing massage attachments
    )

    # Send an HTTP 200 response with empty body so Slack knows we're done here
    return make_response("", 200)

# endpoint to get all questions from database and sending the data to frontend in a JSON fromat 
@app.route("/user/data", methods=["GET"])
def get_user():
    all_questions = Question.query.all()
    result = users_schema1.dump(all_questions)
    return jsonify(result.data)
# endpoint to get all the answers from the Answers table and sending it to the frontend in JSON format
@app.route("/user/answer/data", methods=["GET"])
def get_answer():
    all_answer = Answer.query.all()
    ans=users_schema3.dump(all_answer)
    return jsonify(ans.data)

# Getting the user data from user_info table and sending it to frontend in JSON fromat 
@app.route("/user/info", methods=["GET"])
def get_user_details():
    all_user_data = User_info.query.all()
    all_user = users_schema2.dump(all_user_data)
    return jsonify(all_user.data)

# For a post request, a new suvery is created by getting the id and tilte from front end and saving it in Survey Table
# For the get request, it gets all the data from the Survey table and sent it to front end in JSON format
@app.route("/user/survey", methods=["POST","GET"])
def get_survey_details():
    if request.method == "POST":
        sur_id = request.json['id']
        sur_name = request.json['title']
        sur = Survey(sur_id,sur_name)
        db.session.add(sur)
        db.session.commit()
    else:
        all_survey_details = Survey.query.all()
        all_survey_details = users_schema.dump(all_survey_details)
        return jsonify(all_survey_details.data)

# endpoint to delete a quetion
@app.route("/user/que/delete/<sid>/<qid>", methods=["DELETE"])
def que_delete(sid,qid):
    que = Question.query.get((qid,sid))
    # a = users_schema1.dump(que)
    db.session.delete(que)
    db.session.commit()
    return make_response("", 200)

# endpoint to delete a quetion
@app.route("/user/que/update/<sid>/<qid>", methods=["PUT"])
def que_update(sid,qid):
    print(sid,qid)
    que = Question.query.get((qid,sid))
    questType = request.json['questionType']
    if questType == "4":
        question_new = request.json['question']
        op_a = request.json['optionA']
        op_b = request.json['optionB']
        op_c = request.json['optionC']
        op_d = request.json['optionD']

        que.question = question_new
        que.optionA = op_a
        que.optionB = op_b
        que.optionC = op_c
        que.optionD = op_d
        db.session.commit()
        return make_response("", 200)

    elif questType == "3":
        question_new = request.json['question']
        op_a = request.json['optionA']
        op_b = request.json['optionB']
        op_c = request.json['optionC']

        que.question = question_new
        que.optionA = op_a
        que.optionB = op_b
        que.optionC = op_c
        db.session.commit()
        return make_response("", 200)

    elif questType == "2":
        question_new = request.json['question']
        op_a = request.json['optionA']
        op_b = request.json['optionB']

        que.question = question_new
        que.optionA = op_a
        que.optionB = op_b
        db.session.commit()
        return make_response("", 200)

    else:
        return make_response("No Update", 400)


if __name__ == '__main__':
    app.debug = True
    app.run()





