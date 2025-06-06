// src/components/dj/DJCard.tsx
import { Button, Container, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import "../../App.css";

type DJ = {
  id: number;
  image: string;
  artist: string;
  description: string;
  isSelected: boolean;
  isSpotlight: boolean;
};

export default function DJCard({ dj }: { dj: DJ }) {
  const navigate = useNavigate();

  return (
    <Container
      className="page-section"
      style={{ position: "relative", zIndex: 10 }}
    >
      <div
        className="dj-spotlight-card"
        style={{ position: "relative", zIndex: 10 }}
      >
        <div className="dj-spotlight-card-item">
          <img 
        style={{ width: "250px" }}
          className="card-item" src={dj.image} alt="DJ Image" />
        </div>
        <div className="dj-spotlight-card-item">
          <Text className="artist-text">{dj.artist}</Text>
          <Text className="body-text">{dj.description}</Text>
          <Button
            variant="outline"
            className="button"
            onClick={() => navigate(`/profile/${dj.id}`)}
          >
            View Profile
          </Button>
        </div>
      </div>
    </Container>
  );
}
