import React, { useState } from 'react';
import './FileUpload.css'; // Import the external CSS file

interface FileUploadProps {
    onFileUpload: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                setErrorMessage('Please upload a valid image file.');
                setSelectedFile(null);
                return;
            }

            setErrorMessage(null);
            setSelectedFile(file);
            onFileUpload(file);
        }
    };

    return (
        <div className="file-upload-container">
            <h2>Upload Your Passport</h2>
            <p>Please upload a clear image of your passport to extract the necessary data.</p>
            <div className="file-upload-box">
                <input
                    type="file"
                    accept="image/*"
                    id="file-upload-input"
                    onChange={handleFileChange}
                    className="file-input"
                />
                <label htmlFor="file-upload-input" className="file-upload-label">
                    {selectedFile ? selectedFile.name : 'Click to select a file or drag it here'}
                </label>
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {selectedFile && <p className="success-message">File selected: {selectedFile.name}</p>}
        </div>
    );
};

export default FileUpload;
