import React, { useState } from "react";
import { Container, Header, Card, Form, Button, Message, Accordion, Icon } from 'semantic-ui-react';
import { uploadImage } from '../api/uploadImage';
import 'semantic-ui-css/semantic.min.css';
import NationalitySelect from '../components/NationalitySelect';

const UploadImage = () => {
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("");
  const [nationality, setNationality] = useState<string>("");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!nationality) {
      setMessage("Please select your nationality.");
      return;
    }
    if (!image) {
      setMessage("Please select an image.");
      return;
    }
    try {
      const msg = await uploadImage(image, nationality);
      setMessage(msg || "Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      setMessage("Failed to upload image.");
    }
  };

  const imagePreviewUrl = image ? URL.createObjectURL(image) : null;

  const handleAccordionClick = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

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
          maxWidth: '600px',
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
            Please select your nationality and upload a clear photo of your passport
          </p>

          <Form onSubmit={handleSubmit} size="large">
            <NationalitySelect value={nationality} onChange={setNationality} />

            <Form.Field style={{ marginTop: '1.5rem' }}>
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

            {/* Image Preview Section using Accordion */}
            <Accordion>
              <Accordion.Title
                active={activeIndex === 0}
                index={0}
                onClick={() => handleAccordionClick(0)}
                style={{
                  fontWeight: '600',
                  fontSize: '1.1rem',
                  padding: '1rem',
                  backgroundColor: '#f7f7f7',
                  cursor: 'pointer'
                }}
              >
                <Icon name="dropdown" />
                {imagePreviewUrl ? "Image Preview" : "No Preview Available"}
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 0}>
                {imagePreviewUrl ? (
                  <img
                    src={imagePreviewUrl}
                    alt="Passport Preview"
                    style={{
                      maxWidth: '100%',
                      height: 'auto',
                      objectFit: 'contain',
                      borderRadius: '4px',
                      transition: 'transform 0.3s ease-in-out',
                    }}
                  />
                ) : (
                  <p style={{ textAlign: 'center', color: '#777' }}>
                    No image selected yet.
                  </p>
                )}
              </Accordion.Content>
            </Accordion>

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
