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
import AdminHomeButtons from "./AdminButtons";


export default function GalleryForm() {
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
            <AdminHomeButtons />
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
        <Button className="general-button glow-button" onClick={handleSubmit}>Submit</Button>
      </Group>
      </div>
      </>
  );
}