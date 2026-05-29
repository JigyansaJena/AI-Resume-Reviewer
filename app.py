from flask import Flask, request, jsonify
from flask_cors import CORS
from groq import Groq
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

@app.route("/analyze", methods=["POST"])
def analyze():
  data = request.json
  resume = data.get("resume", "")

  response = client.chat.completions.create(
    model="llama-3.3-70b-versatile",
    messages=[
      {
        "role": "system",
        "content": """You are an expert resume reviewer. Analyze the resume and respond in this exact JSON format:
        {
         "score": 7.5,
                    "strengths": ["point 1", "point 2", "point 3"],
                    "weaknesses": ["point 1", "point 2", "point 3"],
                    "suggestions": ["point 1", "point 2", "point 3"],
                    "ats_tips": ["point 1", "point 2", "point 3"]
        }
        Only respond with JSON, nothing else.
        """
      },
      {
        "role": "user",
        "content": f"Review this resume:\n\n{resume}"
      }
    ]
  )

  feedback = response.choices[0].message.content
  return jsonify({"feedback": feedback})

if __name__ == "__main__":
  app.run(debug=True)