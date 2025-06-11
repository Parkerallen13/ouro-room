// src/pages/DJProfile.tsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Text, Container, Image, Loader, Button } from "@mantine/core";
import axios from "axios";
import StarField from "../StarBackground";
import { useNavigate } from "react-router-dom";

type Event = {
  id: number;
  title: string;
  image: string;
  date: string;
  artists: { name: string; time: string }[]; // <-- changed from single artist/time
  location: string;
  description: string;
  rsvp_link: string;
  isSelected: boolean;
};

export default function EventProfile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8002/api/elements/events/${id}/`)
      .then((res) => setEvent(res.data))
      .catch((err) => console.error("Failed to load event", err));
  }, [id]);

  if (!event) return <Loader />;

  return (
    <>
      <StarField className="starfield" />
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

            <Text
              style={{ marginTop: "2vw", marginBottom: "2vw" }}
              className="big-text"
            >
              {event.title}
            </Text>
            <Text
              style={{ marginTop: "2vw", marginBottom: "2vw" }}
              className="small-text"
            >
              {event.description}
            </Text>
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
    </>
  );
}
