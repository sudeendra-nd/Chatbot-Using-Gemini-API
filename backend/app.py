from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import google.generativeai as genai
from dotenv import load_dotenv
app = Flask(__name__)
CORS(app)

api_key = os.getenv('GOOGLE_API_KEY')
genai.configure(api_key=api_key)

@app.route('/api/data', methods=['POST'])
def receive_data():
    data = request.json
    user_input = data.get('input', '')
    response = createmodel(user_input)
    return jsonify({'reply': response})

def createmodel(user_input):
    model = genai.GenerativeModel('gemini-pro')
    response = model.generate_content(user_input)
    return response.text[:500]
if __name__ == '__main__':
    app.run(debug=True)