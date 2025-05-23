import { Button, Card, Text } from "@mantine/core";
import Record from "../assets/ouro-record.png"; // <-- You need a record image

export default function EventCard() {
  return (
    <Card className="event-card">
      <Card.Section>
        <img src={Record} alt="record" className="backup-image-home" />
      </Card.Section>
      <div className="card-text">
        <Text style={{ fontSize: "2rem" }} className="event-card-description">
          Location
        </Text>

        <Text style={{ fontSize: "2rem" }} className="event-card-description">
          Artist Name
        </Text>

        <Text>Event Description</Text>

        <Button className="rsvp-button glow-button">RSVP</Button>
      </div>
    </Card>
  );
}
