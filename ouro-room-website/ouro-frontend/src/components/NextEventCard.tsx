import { Button, Container, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";

import "../App.css";

export default function NextEventCard() {
  return (
    <Container
      className="page-section"
      style={{ position: "relative", zIndex: 10 }} // Add these styles
    >
      <div
        className="event-container section-item"
        style={{ position: "relative", zIndex: 10 }}
      >
        <div className="event-item">
          <Text className="event-date date-text"> Oct 31st, 2025</Text>
        </div>
        <div className="event-item ">
          <Text  className="body-text">Ouro Presents:</Text>
          <Text  className="artist-text">Artist Name</Text>
          <Text className="location-text">Location Ave 19th st </Text>
          <Text className="body-text">Description of a great experience</Text>
          <Button variant="outline" className="button">
            RSVP
          </Button>
        </div>
      </div>
    </Container>
  );
}
