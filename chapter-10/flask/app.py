from flask import Flask, render_template, flash, request
from wtforms import Form, TextField, TextAreaField, validators, StringField, SubmitField
import time

# App config.
DEBUG = True
app = Flask(__name__)
app.config.from_object(__name__)
app.config['SECRET_KEY'] = 'supersecret'


class ReusableForm(Form):
    name = TextField('Name:', validators=[validators.required()])

    @app.route("/", methods=['GET', 'POST'])
    def hello():
        now = time.time()

        form = ReusableForm(request.form)

        if request.method == 'POST':
            name = request.form['name']
            if name == '':
                flash("You didn't enter your name!")
            else:
                flash("Hello, %s" % name)
  
        return render_template('hello.html', form=form, now=now)

if __name__ == "__main__":
    app.run()
