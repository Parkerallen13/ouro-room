import { Button, Container, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import Record from "../assets/ouro-record.png";

import "../App.css";

export default function DJCard() {
  return (
    <Container
      className="page-section"
      style={{ position: "relative", zIndex: 10 }} // Add these styles
    >
      <div
        className="dj-spotlight-card"
        style={{ position: "relative", zIndex: 10 }}
      >
        <div className="dj-spotlight-card-item">
          <img src={Record} className="record-placeholder-img" />
        </div>
        <div className="dj-spotlight-card-item">
          <Text className="artist-text">Artist Name</Text>
          <Text className="body-text">Description of a great artist</Text>
          <Button variant="outline" className="button">
            View Profile
          </Button>
        </div>
      </div>
    </Container>
  );
}
