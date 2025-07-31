import { useState, useEffect } from 'react';
import { FiUpload, FiRotateCw, FiDownload } from 'react-icons/fi';
import { uploadImage, downloadImageFile } from '../services/api';

export function ImageUploader() {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState('');
    const [downloadUrl, setDownloadUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        console.log("DownloadUrl atualizado:", downloadUrl);
    }, [downloadUrl]);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
        // setDownloadUrl('');
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return;

        setIsLoading(true);
        try {
            const response = await uploadImage(file);
            const newDownloadUrl = response.data.download_url;
            console.log("URL do backend:", newDownloadUrl);

            setDownloadUrl(newDownloadUrl);
            setError('');

            console.log("URL para uso imediato:", newDownloadUrl);
        } catch (err) {
            setError(err.response?.data?.error || 'Erro ao enviar imagem');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDownload = async () => {
        try {
            const filename = downloadUrl.split('/download/')[1];

            const response = await downloadImageFile(filename);

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (err) {
            console.error("Erro ao baixar:", err);
        }
    };

    return (
        <div className="upload-container">
            <form onSubmit={handleSubmit}>
                <label className="file-input-label">
                    <FiUpload className="icon" />
                    <span>{file ? file.name : 'Selecione uma imagem'}</span>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        accept="image/*"
                        className="file-input"
                    />
                </label>

                <button
                    type="submit"
                    disabled={!file || isLoading}
                    className="submit-button"
                >
                    {isLoading ? (
                        <FiRotateCw className="icon spin" />
                    ) : (
                        'Rotacionar e Enviar'
                    )}
                </button>
            </form>

            {preview && (
                <div className="preview-section">
                    <h3>Pré-visualização:</h3>
                    <img src={preview} alt="Preview" className="preview-image" />
                </div>
            )}

            {error && <p className="error-message">{error}</p>}

            {downloadUrl && (
                <button onClick={handleDownload} className="download-link">
                    <FiDownload className="icon" />
                    Baixar Imagem Rotacionada
                </button>
            )}
        </div>
    );
}