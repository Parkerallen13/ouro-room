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
    <div className="dj-container">
      <div className="dj-card" style={{ position: "relative", zIndex: "8" }}>
        <div>
          <img className="dj-img" src={image} alt="DJ Image" />
        </div>
        <div>
          <Text className="header-text dj-card-item">{artist}</Text>
          {/* <Text className="body-text dj-card-item">{description}</Text> */}
          {/* <Text className="body-text dj-card-item">{socialMedia}</Text> */}
          <Button
            className="card-button dj-card-item"
            onClick={() => navigate(`/profile/${dj.id}`)}
          >
            View Profile
          </Button>
        </div>
      </div>
    </div>
  );
}
