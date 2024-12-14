import React, { useState } from "react";
import { Container, Header, Segment, Form, Button, Message, Card, Icon, SegmentInline } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

const UploadImage = () => {
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("");

  const handleUpload = () => {
    if (!image) {
      setMessage("Please select an image.");
      return;
    }
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
              "Access-Control-Request-Method": "POST",
              "Access-Control-Request-Headers": "Content-Type",
              "Origin": window.location.origin,
          }
      });

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
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      // Convert the file to base64 and upload
      handleUpload();
      setMessage("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      setMessage("Failed to upload image.");
    }
  };
  const imagePreviewUrl = image ? URL.createObjectURL(image) : null;

  return (
    <Container
    fluid
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(to right, #f0f0f0, #fafafa)',
      padding: '2rem'
    }}
  >
    <Card
      raised
      style={{
        maxWidth: '600px', // Increased the maxWidth for a larger container
        width: '100%',
        padding: '2rem',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}
    >
      <Card.Content>
        <Header as="h1" textAlign="center" style={{ marginBottom: '1.5rem', color: '#333' }}>
          Passport Analysis
          <Header.Subheader style={{ color: '#999', fontSize: '1rem' }}>
            Document Verification
          </Header.Subheader>
        </Header>
        <p style={{ textAlign: 'center', color: '#777', marginBottom: '2rem' }}>
          Please upload a clear photo of your passport
        </p>

        <Form onSubmit={handleSubmit} size="large">
          <Form.Field>
            <label style={{ marginBottom: '.5rem', fontWeight: '600' }}>Select a Photo</label>
            <input
              type="file"
              accept="image/*"
              style={{
                padding: '0.5rem',
                border: '1px solid #ccc',
                borderRadius: '4px',
                width: '100%'
              }}
              onChange={(e) =>
                setImage(e.target.files && e.target.files.length > 0 ? e.target.files[0] : null)
              }
            />
          </Form.Field>

          {/* Image Preview Section */}
          {imagePreviewUrl && (
            <div style={{ marginTop: '1rem', textAlign: 'center' }}>
              <img
                src={imagePreviewUrl}
                alt="Passport Preview"
                style={{ maxWidth: '100%', borderRadius: '4px' }}
              />
            </div>
          )}

          {message && (
            <Message
              positive={message === "Image uploaded successfully!"}
              negative={message !== "Image uploaded successfully!"}
              content={message}
              style={{ marginTop: '1rem' }}
            />
          )}

          <Button
            type="submit"
            fluid
            primary
            size="large"
            style={{
              marginTop: '1.5rem',
              backgroundColor: '#2185d0',
              fontWeight: 'bold'
            }}
          >
            Analyze Passport
          </Button>
        </Form>
      </Card.Content>
    </Card>
  </Container>

  );
};

export default UploadImage;
