// components/AdminForm.tsx
import { useState } from "react";
import {
  Button,
  FileInput,
  Group,
  Title,
  Divider,
} from "@mantine/core";

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
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "2rem" }}>
      <Title order={2}>Admin Dashboard</Title>

      {/* Gallery Upload */}
      <Divider my="md" label="Add to Gallery" />
      <FileInput
        label="Upload Gallery Images"
        multiple
        onChange={setGalleryImages}
      />

      <Group mt="xl">
        <Button onClick={handleSubmit}>Submit All</Button>
      </Group>
    </div>
  );
}