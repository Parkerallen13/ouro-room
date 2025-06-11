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
          {event.artists.map(({ name, time }, idx) => (
            <Text key={idx} className="artist-text event-card-item">
              {name} - {time}
            </Text>
          ))}

          {/* <Text
            style={{ marginTop: "2vw", marginBottom: "2vw" }}
            className="big-text"
          >
            {event.title}
          </Text> */}
          {/* <Text
            style={{ marginTop: "2vw", marginBottom: "2vw" }}
            className="small-text"
          >
            {event.description}
          </Text> */}
        </div>
        <div className="event-item">
          <Text className="event-date date-text">
            {new Date(event.date).toLocaleDateString("en-US", {
              weekday: "short", // e.g., "Tue"
              year: "numeric", // e.g., "2025"
              month: "short", // e.g., "Jun"
              day: "numeric", // e.g., "10"
            })}
          </Text>
          <Text className="location-text event-card-item">
            {event.location}
          </Text>
          <Button
            variant="outline"
            className="button event-item-section event-card-item"
            onClick={() => navigate(`/profile/${event.rsvp_link}`)}
          >
            RSVP
          </Button>
        </div>
      </div>
    </Container>
  );
}
