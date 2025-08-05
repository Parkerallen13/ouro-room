import { useState } from "react";
import { TextInput, FileInput, Button, Stack, Title } from "@mantine/core";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";

export default function MixForm() {
  let navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("artist", artist);

      if (!audioFile) {
        alert("No audio file selected");
        return;
      }
      formData.append("audio", audioFile);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const res = await axios.post(
        "http://3.134.207.90/api/elements/mixes/",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Response:", res);
      alert("Mix uploaded!");
      setTitle("");
      setArtist("");
      setAudioFile(null);
      setImageFile(null);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed");
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
          <Title className="admin-title">Add Mix</Title>
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
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.currentTarget.value)}
                required
              />
              <TextInput
                className="form-element"
                label="Artist"
                value={artist}
                onChange={(e) => setArtist(e.currentTarget.value)}
                required
              />
              <FileInput
                className="form-element"
                label="Audio File"
                placeholder="click to upload"
                value={audioFile}
                onChange={setAudioFile}
                accept="audio/*"
                required
              />
              <FileInput
                className="form-element"
                placeholder="click to upload"
                label="Cover Image (optional)"
                value={imageFile}
                onChange={setImageFile}
                accept="image/*"
              />
              <Button className="submit-button" type="submit" loading={loading}>
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
