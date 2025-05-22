// components/AdminForm.tsx
import { useState } from "react";
import {
  TextInput,
  Button,
  Group,
  Title,
  Divider,
} from "@mantine/core";

export default function SongForm() {
  // States for each section

  const [songTitle, setSongTitle] = useState("");
  const [songArtist, setSongArtist] = useState("");

  const handleSubmit = () => {
    // Here you'd send data to your backend or Firebase
    console.log({
      song: { title: songTitle, artist: songArtist },
    });
    alert("Submitted! (Replace with real backend logic)");
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "2rem" }}>
      <Title order={2}>Admin Dashboard</Title>

      {/* Song Info */}
      <Divider my="md" label="Add Song" />
      <TextInput
        label="Song Title"
        value={songTitle}
        onChange={(e) => setSongTitle(e.currentTarget.value)}
      />
      <TextInput
        label="Artist"
        value={songArtist}
        onChange={(e) => setSongArtist(e.currentTarget.value)}
      />

      <Group mt="xl">
        <Button onClick={handleSubmit}>Submit All</Button>
      </Group>
    </div>
  );
}
