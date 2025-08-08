import { useState } from "react";
import { Button, FileInput, Group, Title } from "@mantine/core";
import "../../App.css";
import Header from "../Header";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer";
import axios from "axios";

import { API } from '../../api/config';

export default function GalleryForm() {
  const navigate = useNavigate();

  const [images, setImages] = useState<File[]>([]);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (images.length === 0) {
        alert("No images selected");
        return;
      }

      for (const img of images) {
        const formData = new FormData();
        formData.append("image", img); // Must match Django model field name
        formData.append("isSelected", "false"); // optional

        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/elements/gallery/`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      }

      alert("Image(s) added!");
      setImages([]); // reset form
    } catch (error) {
      alert("Failed to add image(s)");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <div className="form-header-container">
        <div className="form-header">
          <Button
            className="back-button"
            variant="outline"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
          <Title className="admin-title">Add Gallery Images</Title>
        </div>

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
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <FileInput
              className="form-element"
              label="Upload Gallery Images"
              accept="image/*"
              placeholder="click to upload"
              multiple
              onChange={(files) => setImages(files || [])}
              value={images}
            />
            <Group>
              <Button className="submit-button" type="submit" loading={loading}>
                Add
              </Button>
            </Group>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
