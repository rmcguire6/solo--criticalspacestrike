from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer
import os

app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'scores.db')

db = SQLAlchemy(app)

@app.cli.command('db_create')
def db_create():
    db.create_all()
    print('Database created!')


@app.cli.command('db_drop')
def db_drop():
    db.drop_all()
    print('Database dropped!')

@app.cli.command('db_test_seed')
def db_seed():
    score1 = Score(score='435')
    score2 = Score(score='87')
    score3 = Score(score='47')
    score4 = Score(score='000')

    db.session.add(score1)
    db.session.add(score2)
    db.session.add(score3)
    db.session.add(score4)
    db.session.commit()
    print('Database seeded!')


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
