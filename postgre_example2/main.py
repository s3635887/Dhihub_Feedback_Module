from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import os

#35.189.40.101 
app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))
''' This is the old connection string'''
#app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:admin123@127.0.0.1:5433/testdb'

# ok working from local machine - but before running this code run cloud sql proxy
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://postgres:admin123@localhost:5433/'


#this is when app is hosted on gcp
#app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://postgres:admin123@testdb?unix_socket=/cloudsql//s3582671-api-test1:australia-southeast1:testdb/.s.PGSQL.5432'
#mysql+pymysql://<db_user>:<db_pass>@/<db_name>?unix_socket=/cloudsql/s3582671-api-test1:australia-southeast1:testdb/.s.PGSQL.5432'
 #drivername='mysql+pymysql',
 #       username=db_user,
  #      password=db_pass,
   #     database=db_name,
    #    query={
     #       'unix_socket': '/cloudsql/{}'.format(cloud_sql_instance_name)
#
#
#postgresql+psycopg2://<USER>:<PASSWORD>@localhost:5432/
# USER   = 'root'
# PASS   = [CHANGE_PASSWORD]
# HOST   = [CHANGE_HOSTNAME]
# DBNAME = 'crud'

# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://{}:{}@{}/crud'.format(USER,PASS,HOST,DBNAME)
db_user="postgres"
db_pass="admin123"
cloud_sql_connection_name='s3582671-api-test1:australia-southeast1:testdb'
db_name="testdb"

#app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://{}:{}@{}/{}'.format(db_user,db_pass,cloud_sql_connection_name,db_name)

#postgresql+psycopg2://USER:PASSWORD@/DATABASE?host=/cloudsql/INSTANCE_CONNECTION_NAME

#app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://{}:{}@{}?host=/{}'.format(db_user,db_pass,db_name,cloud_sql_connection_name)

db = SQLAlchemy(app)
ma = Marshmallow(app)

# declaring our model, here is ORM in its full glory

class Survey_tl(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	title = db.Column(db.String(80))
	q1 = db.Column(db.String(120))
	q2 = db.Column(db.String(120))
	q3 = db.Column(db.String(120))
	q1_ans = db.Column(db.String(120))
	q2_ans = db.Column(db.String(120))
	q3_ans = db.Column(db.String(120))

	def __init__(self, title,q1,q2,q3,q1_ans,q2_ans,q3_ans):
		self.title=title
		self.q1 = q1
		self.q2 = q2
		self.q3 = q3
		self.q1_ans = q1_ans
		self.q2_ans = q2_ans
		self.q3_ans = q3_ans

class SurveySchema(ma.Schema):
	class Meta:
        # Fields to expose
		fields = ('id','title', 'q1','q2','q3','q1_ans','q2_ans','q3_ans')

survey_schema = SurveySchema()
survey_schema = SurveySchema(many=True)

# endpoint to create new survey
@app.route("/survey", methods=["POST"])
def add_survey():
	title = request.json['title']
	q1 = request.json['q1']
	q2 = request.json['q2']
	q3 = request.json['q3']
	q1_ans = request.json['q1_ans']
	q2_ans = request.json['q2_ans']
	q3_ans = request.json['q3_ans']
	
	new_survey = Survey_tl(title,q1,q2,q3,q1_ans,q2_ans,q3_ans)

	db.session.add(new_survey)
	db.session.commit()

	return jsonify(new_survey)

# endpoint to show all surveys
@app.route("/survey", methods=["GET"])
def get_survey():
	all_survey = Survey_tl.query.all()
	result = survey_schema.dump(all_survey)
	return jsonify(result.data)


# endpoint to get survey detail by id
@app.route("/survey/<id>", methods=["GET"])
def survey_detail(id):

	survey = Survey_tl.query.get(id)

	return survey_schema.jsonify(survey)


# endpoint to update survey
@app.route("/survey/<id>", methods=["PUT"])
def survey_update(id):
	survey = Survey_tl.query.get(id)
	title = request.json['title']
	q1 = request.json['q1']
	q2 = request.json['q2']
	q3 = request.json['q3']
	q1_ans = request.json['q1_ans']
	q2_ans = request.json['q2_ans']
	q3_ans = request.json['q3_ans']
	
	db.session.commit()
	return survey_schema.jsonify(survey)

# endpoint to delete survey
@app.route("/survey/<id>", methods=["DELETE"])
def survey_delete(id):
	survey = Survey_tl.query.get(id)
	db.session.delete(survey)
	db.session.commit()

	return survey_schema.jsonify(survey)

# will 0.0.0.0 work with RMIT's network?
if __name__ == '__main__':
    app.debug = True
    app.run()
