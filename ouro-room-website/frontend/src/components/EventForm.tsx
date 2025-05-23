// components/AdminForm.tsx
import { useState } from "react";
import {
  TextInput,
  Textarea,
  Button,
  FileInput,
  Group,
  Title,
} from "@mantine/core";
import "../App.css";
import Header from "./Header";
import AdminHomeButtons from "./AdminButtons";

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
    <>
      <div className="form-header-container">
        <Header />
        <Title
          order={2}
          style={{
            zIndex: "2",
            position: "relative",
          }}
        >
          {" "}
          Add Event
        </Title>
        <AdminHomeButtons />
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
        <TextInput
          label="Event Title"
          className="form-element"
          value={eventTitle}
          onChange={(e) => setEventTitle(e.currentTarget.value)}
        />
        <TextInput
          label="Event Date"
          className="form-element"
          value={eventDate}
          onChange={(e) => setEventDate(e.currentTarget.value)}
        />
        <Textarea
          label="Event Description"
          className="form-element"
          value={eventDescription}
          onChange={(e) => setEventDescription(e.currentTarget.value)}
        />
        <FileInput label="Event Image" onChange={setEventImage} />

        <Group  mt="xl">
          <Button className="general-button glow-button" onClick={handleSubmit}>Submit</Button>
        </Group>
      </div>
    </>
  );
}
