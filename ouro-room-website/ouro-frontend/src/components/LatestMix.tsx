import { Button, Container, Text } from "@mantine/core";
import Record from '../assets/ouro-record.png'

import "../App.css";

export default function LatestMixcard() {
  return (
    <Container
      className="page-section"
      style={{ position: "relative", zIndex: 10 }} // Add these styles
    >
      <div
        className="mix-card section-item"
        style={{ position: "relative", zIndex: 10 }}
      >
        <div className="mix-img">
          <img src={Record} className="record-placeholder-img"/>
        </div>
        <div className="mix-item">
          <Text  className="mix-text">Artist Name</Text>
          <Text>Audio Clip</Text>
        </div>
      </div>
    </Container>
  );
}
