from flask import Flask, render_template, request
import requests
import json

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def home():
    response_data = None

    if request.method == 'POST':
        data = request.form.get('data')
        try:
            input_data = json.loads(data)
            response = requests.post('https://waseemr02.pythonanywhere.com/bfhl', json=input_data)
            response_data = response.json()
        except json.JSONDecodeError:
            response_data = "Invalid JSON"

    return render_template('index.html', response_data=response_data)

if __name__ == '__main__':
    app.run(debug=True,port=5050)