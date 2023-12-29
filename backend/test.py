from flask import Flask
from flask_sock import Sock

app = Flask(__name__)

sock = Sock()

sock.init_app(app)


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@sock.route('/echo')
def echo(ws):
    while True:
        data = ws.receive()
        ws.send(data)