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
      <div  className="profile-button-container">
      <Button className="submit-button" onClick={() => navigate(-1)}>
        Back
      </Button>
      </div>
      <Container  className="profile-container">
        <Image className="profile-img" src={dj.image} alt={dj.artist} />
        <div className="profile-info">
          <Text className="profile-text-big">{dj.artist}</Text>

          <Text className="profile-text-big">{dj.description}</Text>
          <Text className="profile-text-big">{dj.socialMedia}</Text>
        </div>
      </Container>
    </>
  );
}
