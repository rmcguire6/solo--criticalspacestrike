from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello_players():
    return 'Hello Players'



if __name__ == '__main__':
    app.run()