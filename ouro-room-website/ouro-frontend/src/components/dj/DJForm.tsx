import { useState } from "react";
import {
  TextInput,
  Textarea,
  Button,
  Stack,
  FileInput,
  Title,
} from "@mantine/core";
import "../../App.css";
import axios from "axios";
import Header from "../Header";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer";

export default function DJForm() {
  const navigate = useNavigate();
  const [artist, setArtist] = useState("");
  const [description, setDescription] = useState("");
  const [socialMedia, setSocialMedia] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("artist", artist);
      formData.append("description", description);

      if (image) {
        formData.append("image", image);
      } else {
        alert("No image selected");
        return;
      }

      const res = await axios.post("http://localhost:8002/api/elements/djs/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Response:", res);
      alert("DJ added!");
    } catch (error) {
      alert("Failed to add DJ");
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
          <Title className="admin-title">Add DJ</Title>
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
            <Stack>
              <TextInput
                className="form-element"
                label="Artist"
                value={artist}
                onChange={(e) => setArtist(e.currentTarget.value)}
                required
              />
              <Textarea
                className="form-element"
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.currentTarget.value)}
                required
              />
              <FileInput
                className="form-element"
                label="Image (JPG)"
                value={image}
                onChange={setImage}
                accept="jpg/*"
              />
                <Textarea
                className="form-element"
                label="Social Media"
                value={socialMedia}
                onChange={(e) => setSocialMedia(e.currentTarget.value)}
              />
              <Button 
              type="submit" loading={loading} className="submit-button">
                Add
              </Button>
            </Stack>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
