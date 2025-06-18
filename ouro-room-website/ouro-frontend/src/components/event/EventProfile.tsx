// src/pages/DJProfile.tsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Text, Container, Image, Loader, Button } from "@mantine/core";
import axios from "axios";
import StarField from "../StarBackground";
import { useNavigate } from "react-router-dom";
import fallbackImage from "../../assets/record.png"; // use your imported image here

type Event = {
  id: number;
  title: string;
  image: string | null;
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
      <Button
        onClick={() => navigate(-1)}
        className="card-button"
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          zIndex: 1000, // make sure it appears above other content
          margin: "2vw",
        }}
      >
        Back
      </Button>
      <Container
        className="event-profile-container"
        style={{ position: "relative", zIndex: 10 }} // Add these styles
      >
        <div className="event-profile-item-box">
          {event.image ? (
            <Image
              style={{
                cursor: "pointer",
                borderRadius: 8,
                maxWidth: "30vw",
                position: "relative",
                display: "inline-block",
              }}
              src={event.image}
              alt={event.title}
            />
          ) : (
            <>
              <img
                src={event.image || fallbackImage}
                alt={event.title}
                style={{ maxWidth: "100%", borderRadius: 8 }}
              />
            </>
          )}
        </div>
        <div className="event-profile-item-box">
          <div style={{ position: "relative", zIndex: 10 }}>
            <Text
              className="event-profile-header-text event-profile-item"
            >
              {event.title}
            </Text>
            <Text className="event-profile-body-text event-profile-item">
              {new Date(event.date).toLocaleDateString("en-US", {
                weekday: "short", // e.g., "Tue"
                year: "numeric", // e.g., "2025"
                month: "short", // e.g., "Jun"
                day: "numeric", // e.g., "10"
              })}
            </Text>
            <Text className="event-profile-header-text event-profile-item">
              Featuring:
            </Text>

            {event.artists.map(({ name, time }, idx) => (
              <Text
                key={idx}
                className="event-profile-body-text event-profile-item"
                style={{ textAlign: "center" }}
              >
                {name} - {time}
              </Text>
            ))}

            <Text
              style={{ marginTop: "2vw", marginBottom: "2vw" }}
              className="event-profile-body-text event-profile-item"
            >
              {event.description}
            </Text>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                event.location
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <Text
                style={{
                  textDecoration: "underline",
                  color: "#ADD8E6",
                  cursor: "pointer",
                }}
                className="event-profile-body-text event-profile-item glow-text"
              >
                {event.location}
              </Text>
            </a>
            <Button
              variant="outline"
              className="card-button event-profile-item"
              onClick={() => window.open(event.rsvp_link, "_blank")}
            >
              RSVP
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
}
