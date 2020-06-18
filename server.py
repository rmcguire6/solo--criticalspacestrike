from flask import Flask, jsonify, request, render_template
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String
from flask_marshmallow import Marshmallow
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
def scores(new_score=None):
    if request.method == 'POST':
        new_score = request.form['new_score']
        player = request.form['player']
        score = Score(score=new_score, player=player)
        db.session.add(score)
        db.session.commit()
    scores_list = Score.query.all()
    scores = scores_schema.dump(scores_list)
    return render_template('scores.html', scores=scores, new_score=new_score)

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

if __name__ == '__main__':
    app.run()
