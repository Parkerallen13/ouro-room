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

export default function EventForm() {
  // States for each section

  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventImage, setEventImage] = useState<File | null>(null);

  const handleSubmit = () => {
    // Here you'd send data to your backend or Firebase
    console.log({
      event: {
        title: eventTitle,
        date: eventDate,
        desc: eventDescription,
        image: eventImage,
      },
    });
    alert("Submitted! (Replace with real backend logic)");
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "2rem" }}>
      <Title order={2}>Admin Dashboard</Title>

      {/* DJ Info */}

      {/* Event Info */}
      <Divider my="md" label="Add Event" />
      <TextInput
        label="Event Title"
        value={eventTitle}
        onChange={(e) => setEventTitle(e.currentTarget.value)}
      />
      <TextInput
        label="Event Date"
        value={eventDate}
        onChange={(e) => setEventDate(e.currentTarget.value)}
      />
      <Textarea
        label="Event Description"
        value={eventDescription}
        onChange={(e) => setEventDescription(e.currentTarget.value)}
      />
      <FileInput label="Event Image" onChange={setEventImage} />

      <Group mt="xl">
        <Button onClick={handleSubmit}>Submit All</Button>
      </Group>
    </div>
  );
}
