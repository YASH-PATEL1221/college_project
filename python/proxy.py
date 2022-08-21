from flask import Flask , request , redirect , json
import requests
from datetime import datetime, timedelta
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/login",methods=["GET","POST"])
def loign():
    if request.method == "POST":

        admin = request.form["name"]
        password = request.form["password"]

        res = requests.post(url="http://localhost:8000/sms/api/admin/admin.php",data={
            'name':admin,
            "password":password,
        }).content

        IS_AUTHORIZED = json.loads(res)['authorized']

        if IS_AUTHORIZED:
            file = open("login.txt","a")
            file.write(f"Logged in on {datetime.now()} by {admin} \n")
            file.close()
            return redirect("http://localhost:3000/dashboard")
        else:
            return redirect("http://localhost:3000")

if __name__ == "__main__":
    app.run(port=3001,debug=True)