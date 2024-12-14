import { useState } from "react";

const UploadImage = () => {
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!image) {
      setMessage("Please select an image.");
      return;
    }

    try {
      // Convert the file to base64
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = async () => {
        const base64String = (reader.result as string).split(",")[1];

        const body = {
            imageBase64: base64String,
        };
        
        console.log(body)

        const optionsResponse = await fetch('https://zujssf5jhl.execute-api.eu-west-2.amazonaws.com/dev/upload', {
            method: "OPTIONS",
            headers: {
                "Access-Control-Request-Method": "POST",   // The method you intend to use (POST in your case)
                "Access-Control-Request-Headers": "Content-Type", // Any custom headers your request will use (in this case Content-Type)
                "Origin": window.location.origin,          // The origin of your client (e.g., "https://your-domain.com")
            }
        });

        // You may want to log the response or inspect it
        const optionsResponseBody = await optionsResponse.text();
        console.log(optionsResponseBody);

        const response = await fetch(`https://zujssf5jhl.execute-api.eu-west-2.amazonaws.com/dev/upload?filename=${image.name}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(body),
        });

        const result = await response.json();
        if (response.ok) {
          setMessage(result.message);
        } else {
          setMessage(`Error: ${result.message}`);
        }
      };
    } catch (error) {
      console.error("Error uploading image:", error);
      setMessage("Failed to upload image.");
    }
  };

  return (
    <div>
      <h1>Upload Image</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UploadImage;