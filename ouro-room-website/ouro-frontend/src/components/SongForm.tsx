// components/AdminForm.tsx
import { useState } from "react";
import { TextInput, Button, Group, Title, FileInput } from "@mantine/core";
import "../App.css";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

export default function SongForm() {
  const navigate = useNavigate();
  // States for each section

  const [songTitle, setSongTitle] = useState("");
  const [songArtist, setSongArtist] = useState("");
  const [audioTrack, setAudioTrack] = useState<File | null>(null);

  const handleSubmit = () => {
    // Here you'd send data to your backend or Firebase
    console.log({
      song: { title: songTitle, artist: songArtist, audio: audioTrack },
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
          Add Song
        </Title>
        {/* <AdminButtons /> */}
      </div>
      <Button
        className="back-button"
        variant="outline"
        onClick={() => navigate(-1)}
      >
        Back
      </Button>

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
        {/* Song Info */}
        <TextInput
          className="form-element"
          label="Song Title"
          value={songTitle}
          onChange={(e) => setSongTitle(e.currentTarget.value)}
        />
        <TextInput
          className="form-element"
          label="Artist"
          value={songArtist}
          onChange={(e) => setSongArtist(e.currentTarget.value)}
        />

        <FileInput label="Audio Track" onChange={setAudioTrack} />

        <Group mt="xl">
          <Button className="general-button glow-button" onClick={handleSubmit}>
            Submit Song
          </Button>
        </Group>
      </div>
    </>
  );
}
