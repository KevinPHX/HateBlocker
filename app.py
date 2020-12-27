from flask import Flask, jsonify, request, render_template
from google.cloud import language_v1
import json
import os
os.environ["GOOGLE_APPLICATION_CREDENTIALS"]=""
app = Flask(__name__)

@app.route('/analyzeText', methods=['GET', 'POST'])
def analyzeText():

    # POST request
    if request.method == 'POST':
        print(request)
        print(request.form.to_dict(flat=False))
        print(request.form.to_dict(flat=False)['text'][0])
        text_content = request.form.to_dict(flat=False)['text'][0]
        client = language_v1.LanguageServiceClient()
        type_ = language_v1.Document.Type.PLAIN_TEXT
        language = "en"
        document = {"content": text_content, "type_": type_, "language": language}
        encoding_type = language_v1.EncodingType.UTF8
        response = client.analyze_sentiment(request = {'document': document, 'encoding_type': encoding_type})
        print(response)
        if response.document_sentiment.score > 0.25:
            return "positive"
        elif response.document_sentiment.score < 0.0:
            return "negative"
        else:
            return "neutral"

    # GET request
    else:
        client = language.LanguageServiceClient()
        type_ = language.Document.Type.PLAIN_TEXT
        language = "en"
        document = {"content": text_content, "type_": type_, "language": language}
        encoding_type = language.EncodingType.UTF8
        response = client.analyze_sentiment(request = {'document': document, 'encoding_type': encoding_type})
        print(response)
        if response.document_sentiment.score > 0.25:
            return False
        elif response.document_sentiment.score < -0.25:
            return True
        else:
            return False
@app.route('/')
def test_page():
    # look inside `templates` and serve `index.html`
    return "Hello world"
if __name__ == '__main__':
    app.run(host="localhost", port=5000, debug=True)
