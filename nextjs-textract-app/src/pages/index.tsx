import { useState } from 'react';
import FileUpload from '../components/FileUpload'

export default function Home() {
    const [uploadResponse, setUploadResponse] = useState<string | null>(null);

    const handleFileUpload = async (file: File) => {
        const fileName = file.name;
        const reader = new FileReader();

        reader.onload = async () => {
            const fileContent = reader.result?.toString().split(',')[1]; // Base64 content
            try {
                const response = await fetch('/api/upload', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ fileName, fileContent }),
                });
                const data = await response.json();
                setUploadResponse(JSON.stringify(data, null, 2));
            } catch (error) {
                console.error('Upload failed:', error);
                setUploadResponse('Upload failed. Check console for details.');
            }
        };

        reader.readAsDataURL(file);
    };

    return (
        <div>
            <h1>Passport Upload</h1>
            <FileUpload onFileUpload={handleFileUpload} />
            {uploadResponse && <pre>{uploadResponse}</pre>}
        </div>
    );
}
