import { Button, Container, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";

import "../../App.css";

type Event = {
  id: number;
  title: string;
  date: string;
  artists: { name: string; time: string }[]; // <-- changed from single artist/time
  location: string;
  description: string;
  rsvp_link: string;
  isSelected: boolean;
};

export default function EventCard({ event }: { event: Event }) {
  const navigate = useNavigate();
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
          <Text className="event-date date-text">{event.date}</Text>
        </div>
        <div className="event-item">
          <Text className="body-text">Ouro Presents:</Text>
          <Text className="artist-text">{event.title}</Text>
          {event.artists.map(({ name, time }, idx) => (
            <Text key={idx} className="artist-text">
              {time} - {name}
            </Text>
          ))}
          <Text className="location-text">{event.location}</Text>
          <Text className="body-text">{event.description}</Text>
          <Button
            variant="outline"
            className="button"
            onClick={() => navigate(`/profile/${event.rsvp_link}`)}
          >
            RSVP
          </Button>
        </div>
      </div>
    </Container>
  );
}
