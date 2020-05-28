from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer
import os

app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'scores.db')

db = SQLAlchemy(app)


@app.route('/')
def hello_players():
    return jsonify(message='Hello Players'),200

    
# database models


class Score(db.Model):
    __tablename__ = 'scores'
    id = Column(Integer, primary_key=True)
    score = Column(Integer)


class ScoreSchema(ma.Schema):
    class Meta:
        fields = ('id', 'score')


score_schema = ScoreSchema()
scores_schema = ScoreSchema(many=True)


if __name__ == '__main__':
    app.run()
