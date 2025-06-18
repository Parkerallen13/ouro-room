// src/pages/DJProfile.tsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Text, Container, Image, Loader, Button } from "@mantine/core";
import axios from "axios";
import StarField from "../StarBackground";
import { useNavigate } from "react-router-dom";

type DJ = {
  id: number;
  image: string;
  artist: string;
  description: string;
  socialMedia: string;
};

export default function DJProfile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [dj, setDJ] = useState<DJ | null>(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8002/api/elements/djs/${id}/`)
      .then((res) => setDJ(res.data))
      .catch((err) => console.error("Failed to load DJ", err));
  }, [id]);

  if (!dj) return <Loader />;

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
          zIndex: 1000,
          margin: "2vw",
        }}
      >
        Back
      </Button>
      <Container
        className="event-profile-container"
        style={{
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Left box: DJ Image */}
        <div className="event-profile-item-box" style={{ flex: 1 }}>
          <Image
            className="profile-img event-profile-item"
            src={dj.image}
            alt={dj.artist}
            style={{ maxWidth: "100%", borderRadius: 8, margin: "5vw" }}
          />
        </div>

        {/* Right box: DJ info */}
        <div className="event-profile-item-box">
          <Text className="event-profile-header-text event-profile-item">
            {dj.artist}
          </Text>
          <Text className="event-profile-body-text event-profile-item">
            {dj.description}
          </Text>
          <Text
            className="event-profile-body-text"
            component="a"
            href={dj.socialMedia}
            target="_blank"
            rel="noopener noreferrer"
          >
            {dj.socialMedia}
          </Text>
        </div>
      </Container>
    </>
  );
}
