// components/AdminForm.tsx
import { useState } from "react";
import {
  Button,
  FileInput,
  Group,
  Title,
} from "@mantine/core";
import '../App.css'
import Header from "./Header";
import AdminButtons from "./AdminUploadButtons";
import { useNavigate } from 'react-router-dom'
;

export default function GalleryForm() {
  const navigate = useNavigate();
  // States for each section
 

  const [galleryImages, setGalleryImages] = useState<File[]>([]);

  const handleSubmit = () => {
    // Here you'd send data to your backend or Firebase
    console.log({
     
      gallery: galleryImages,
    });
    alert("Submitted! (Replace with real backend logic)");
  };

  return (
    <>
         <div className="form-header-container">
            <Header />
                <Button
         style={{
            zIndex: "2",
            position: "relative",
          }}
          className="back-button"
          variant="outline"
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
            <Title
              order={2}
              style={{
                zIndex: "2",
                position: "relative",
              }}
            >
              {" "}
              Add Images
            </Title>
            {/* <AdminButtons /> */}
          </div>

      {/* Gallery Upload */}
       <div
        className="form-element-container"
        style={{
          maxWidth: 600,
          margin: "0 auto",
          padding: "2rem",
          zIndex: "2",
          position: "relative",
        }}
      >
      <FileInput
        label="Upload Gallery Images"
        multiple
        onChange={setGalleryImages}
      />

      <Group mt="xl">
        <Button className="button" onClick={handleSubmit}>Submit</Button>
      </Group>
      </div>
      </>
  );
}