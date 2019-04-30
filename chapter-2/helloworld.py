from flask import Flask, Response

app = Flask(__name__)


@app.route('/')
def main():
    content = {'Hello World!'}
    return Response(content, status=200, mimetype='text/plain')
