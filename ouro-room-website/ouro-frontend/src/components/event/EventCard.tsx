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
    <div
      className="event-container"
      style={{ position: "relative", zIndex: 10 }}
    >
      <div className="event-card">
        <div className="event-card-item">
          {event.artists.map(({ name, time }, idx) => (
            <Text key={idx} className="artist-text event-card-item">
              {name} - {time}
            </Text>
          ))}
        </div>
        <div className="event-card-item">
          <Text className="event-date date-text event-card-item">
            {new Date(event.date).toLocaleDateString("en-US", {
              weekday: "short", // e.g., "Tue"
              year: "numeric", // e.g., "2025"
              month: "short", // e.g., "Jun"
              day: "numeric", // e.g., "10"
            })}
          </Text>
          <Text className="body-text event-card-item">{event.location}</Text>
          <Button
            variant="outline"
            className="card-button event-card-item"
            onClick={() => navigate(`/profile/${event.rsvp_link}`)}
          >
            RSVP
          </Button>
        </div>
      </div>
    </div>
  );
}
