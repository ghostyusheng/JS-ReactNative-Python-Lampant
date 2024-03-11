from flask import Flask 
from flask import render_template
from gevent import pywsgi
from controller.city import IdeaController
from core.engine import Engine

Engine.boot()
app = Flask(__name__)

@app.route("/list")
def list():
    return IdeaController.search()


if __name__ == '__main__':
    server = pywsgi.WSGIServer(('0.0.0.0',5005),app)
    server.serve_forever()
