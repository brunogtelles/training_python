import os
from PIL import Image
from config import UPLOAD_FOLDER

class FileModel:
    @staticmethod
    def saveAndRotate(file):
        original_path = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(original_path)

        rotated_path = os.path.join(UPLOAD_FOLDER, f"rotated_{file.filename}")
        img = Image.open(original_path)
        img_rotated = img.rotate(-90, expand=True)
        img_rotated.save(rotated_path)

        return rotated_path