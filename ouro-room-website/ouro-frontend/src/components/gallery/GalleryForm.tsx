import { useState } from "react";
import { Button, FileInput, Group, Title } from "@mantine/core";
import "../../App.css";
import Header from "../Header";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer";
import axios from "axios";
import { API } from "../../api/config";

export default function GalleryForm() {
  const navigate = useNavigate();
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (images.length === 0) return alert("No images selected");

    setLoading(true);
    try {
      for (const img of images) {
        const fd = new FormData();
        fd.append("image", img);
        // optional default
        fd.append("isSelected", "false");

        await axios.post(`${API}/api/elements/gallery/`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      alert("Image(s) added!");
      setImages([]);
    } catch (err) {
      console.error("[GalleryForm] Upload failed:", err);
      alert("Failed to add image(s)");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="form-header-container">
        <div className="form-header">
          <Button className="back-button" variant="outline" onClick={() => navigate(-1)}>
            Back
          </Button>
          <Title className="admin-title">Add Gallery Images</Title>
        </div>

        <div className="form-element-container" style={{ maxWidth: 600, margin: "0 auto", padding: "2rem", zIndex: "2", position: "relative" }}>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <FileInput
              className="form-element"
              label="Upload Gallery Images"
              accept="image/*"
              placeholder="click to upload"
              multiple
              value={images}
              onChange={(files) => setImages(files || [])}
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