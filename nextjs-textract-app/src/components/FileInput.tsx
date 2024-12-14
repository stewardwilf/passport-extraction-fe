import React from "react";

interface FileInputProps {
  onFileChange: (file: File | null) => void;
}

const FileInput: React.FC<FileInputProps> = ({ onFileChange }) => (
  <div>
    <input
      type="file"
      accept="image/*"
      onChange={(event) => {
        const file = event.target.files?.[0] || null;
        onFileChange(file);
      }}
    />
  </div>
);

export default FileInput;
