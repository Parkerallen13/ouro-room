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

import { API_PROD, API_LOCAL, API } from "../../api/config";

// one-time helpful logs
console.log("[DJForm] hostname:", window.location.hostname);
console.log("[DJForm] API_LOCAL:", API_LOCAL);
console.log("[DJForm] API_PROD:", API_PROD);
console.log("[DJForm] chosen API:", API);

export default function DJForm() {
  const navigate = useNavigate();
  const [artist, setArtist] = useState("");
  const [description, setDescription] = useState("");
  const [socialMedia, setsocialMedia] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      alert("no image selected");
      return;
    }

    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("artist", artist);
      fd.append("description", description);
      fd.append("socialMedia", socialMedia); // matches your backend reads
      fd.append("image", image);

      const res = await axios.post(`${API}/api/elements/djs/`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("[dj create] OK", res.status, res.data);
      alert("DJ Added!");
    } catch (error: any) {
      const status = error?.response?.status;
      const data = error?.response?.data;
      console.error("Failed to add DJ:", status, data || error?.message);
      alert(`Failed to add DJ${status ? ` (status ${status})` : ""}`);
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
              <FileInput
                className="form-element"
                label="Upload Image"
                placeholder="click to upload"
                value={image}
                onChange={setImage}
                accept="image/jpeg,image/png"
                required
              />
              <Textarea
                className="form-element"
                label="Description (Optional)"
                value={description}
                onChange={(e) => setDescription(e.currentTarget.value)}
              />
              <Textarea
                className="form-element"
                label="Instagram (Optional)"
                value={socialMedia}
                onChange={(e) => setsocialMedia(e.currentTarget.value)}
              />
              <Button type="submit" loading={loading} className="submit-button">
                Addddddd
              </Button>
            </Stack>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
