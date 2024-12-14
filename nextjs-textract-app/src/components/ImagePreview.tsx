import React from "react";

interface ImagePreviewProps {
  image: File | null;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ image }) => {
  if (!image) return null;

  const previewUrl = URL.createObjectURL(image);

  return (
    <div>
      <h2>Image Preview</h2>
      <img src={previewUrl} alt="Preview" style={{ maxWidth: "300px", maxHeight: "300px" }} />
    </div>
  );
};

export default ImagePreview;
