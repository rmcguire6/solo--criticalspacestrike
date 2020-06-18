from flask import Flask, jsonify, request, render_template
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String
from flask_marshmallow import Marshmallow
from operator import itemgetter
import os

app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'scores.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)

@app.before_first_request
def create_tables():
    db.create_all()

@app.route('/')
def play_game():
    return render_template('index.html'),200

@app.route('/scores', methods=['POST','GET'])
def scores():
    new_score = None
    player =  ''
    if request.method == 'POST':
        new_score = request.form['new_score']
        player = request.form['player']
        if player == '':
            player = 'Player'
        score = Score(score=new_score, player=player)
        db.session.add(score)
        db.session.commit()
    scores = Score.query.all()
    scores = scores_schema.dump(scores)
    new_list = []
    for score in scores:
        element =(score['score'], score['player'], score[id])
        new_list.append(element)
    display = sorted(new_list, key=itemgetter(0),reverse=True)
    display = display[0:5]
    return render_template('scores.html', scores=display)

# database models

class Score(db.Model):
    __tablename__ = 'scores'
    id = Column(Integer, primary_key=True)
    player = Column(String, default="")
    score = Column(Integer, nullable=False)


class ScoreSchema(ma.Schema):
    class Meta:
        fields = ('id', 'score', 'player')


score_schema = ScoreSchema()
scores_schema = ScoreSchema(many=True)

@app.cli.command('db_create')
def db_create():
    db.create_all()
    print('Database created!')


@app.cli.command('db_drop')
def db_drop():
    db.drop_all()
    print('Database dropped')

@app.cli.command('db_seed')
def db_seed():
    score1 = Score(player='Player 1', score=3600)
    score2 = Score(player='Player 2', score=1200)
    score3 = Score(player='Player 3', score=1600)
    db.session.add(score1)
    db.session.add(score2)
    db.session.add(score3)
    db.session.commit()
    print('Database seeded')


if __name__ == '__main__':
    app.run()
