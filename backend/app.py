import os
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from models.file_model import FileModel
from config import UPLOAD_FOLDER, ALLOWED_EXTENSIONS

app = Flask(__name__)
CORS(app)

def allowedFile(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload', methods=['POST'])
def uploadFile():
    if 'file' not in request.files:
        return jsonify({"error": "No file provided."}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "File name must not be empty."}), 400
    
    if file and allowedFile(file.filename):
        try:
            rotated_path = FileModel.saveAndRotate(file)
            filename = os.path.basename(rotated_path)
            return jsonify({
                "msg": "File uploaded successfully!",
                "download_url": f"/download/{filename}"
            }), 200
        except Exception as e:
            return jsonify({"error": "Something went wrong. Try it again!"}), 400
        
@app.route('/download/<filename>', methods=["GET"])
def downloadFile(filename):
    return send_from_directory(
        directory=os.path.join(app.root_path, 'static', 'uploads'),
        path=filename,
        as_attachment=True
    )

if __name__ == '__main__':
    app.run(debug=True)