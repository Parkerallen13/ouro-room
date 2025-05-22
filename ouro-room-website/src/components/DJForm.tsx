// components/AdminForm.tsx
import { useState } from "react";
import {
  TextInput,
  Textarea,
  Button,
  FileInput,
  Group,
  Title,
  Divider,
} from "@mantine/core";

export default function DJForm() {
  // States for each section
  const [djName, setDjName] = useState("");
  const [djBio, setDjBio] = useState("");
  const [djImage, setDjImage] = useState<File | null>(null);

  const handleSubmit = () => {
    // Here you'd send data to your backend or Firebase
    console.log({
      dj: { name: djName, bio: djBio, image: djImage },
    });
    alert("Submitted! (Replace with real backend logic)");
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "2rem" }}>
      <Title order={2}>Admin Dashboard</Title>

      {/* DJ Info */}
      <Divider my="md" label="Add DJ" />
      <TextInput
        label="DJ Name"
        value={djName}
        onChange={(e) => setDjName(e.currentTarget.value)}
      />
      <Textarea
        label="DJ Bio"
        value={djBio}
        onChange={(e) => setDjBio(e.currentTarget.value)}
      />
      <FileInput label="DJ Image" onChange={setDjImage} />

      <Group mt="xl">
        <Button onClick={handleSubmit}>Submit All</Button>
      </Group>
    </div>
  );
}
