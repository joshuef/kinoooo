from flask import Flask
app = Flask(__name__)

@app.route("/")
def hello():
    return "Hellllllo World!"

if __name__ == "__main__":
    app.run()
