from flask import Flask
import os

app = Flask(__name__, static_folder=os.getcwd())


@app.route('/')
def root():
    return app.send_static_file('index.html')


@app.route('/data')
def query():
    return 'Todo...'
