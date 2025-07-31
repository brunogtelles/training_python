import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000'
});

export const uploadImage = (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

export const downloadImage = (filename) => {
    console.log(filename)
    return `${api.defaults.baseURL}/download/${filename}`;
}

export const downloadImageFile = async (filename) => {
  return api.get(`/download/${filename}`, {
    responseType: 'blob', // Isso é crucial para arquivos binários!
  });
};