// src/components/dj/DJCard.tsx
import { Button, Container, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import "../../App.css";

type DJ = {
  id: number;
  image: string;
  artist: string;
  description: string;
  socialMedia: string;
};

interface DJCardProps {
  dj: DJ;
  id: number;
  image: string;
  artist: string;
  description: string;
  socialMedia: string;
  isSelected: boolean;
  isSpotlight: boolean;
}

export default function DJCard({ dj }: DJCardProps) {
  const { image, artist, description, socialMedia } = dj;

  const navigate = useNavigate();

  return (
    <div
      className="dj-spotlight-card"
      style={{ position: "relative", zIndex: "8" }}
    >
      <div className="dj-spotlight-card-item">
        <img className="card-item dj-img" src={image} alt="DJ Image" />
      </div>
      <div className="dj-spotlight-card-item">
        <Text className="artist-text dj-text">{artist}</Text>
        <Text className="body-text dj-text">{description}</Text>
        <Text className="body-text dj-text">{socialMedia}</Text>
        <Button
          variant="outline"
          className="button dj-text"
          onClick={() => navigate(`/profile/${dj.id}`)}
        >
          View Profile
        </Button>
      </div>
    </div>
  );
}
