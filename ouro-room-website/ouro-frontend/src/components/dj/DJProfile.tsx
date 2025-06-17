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
    zIndex: 1000, // make sure it appears above other content
    margin: "2vw",
  }}
>
  Back
</Button>
      <div className="profile-container">
        <div className="profile-item-box">
          <Image
            className="profile-img profile-item"
            src={dj.image}
            alt={dj.artist}
          />
          <Text className="profile-header-text profile-item">{dj.artist}</Text>
          <Text className="profile-body-text">{dj.description}</Text>
          <Text
            className="profile-body-text"
            component="a"
            href={dj.socialMedia}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#4dabf7", textDecoration: "underline" }}
          >
            {dj.socialMedia}
          </Text>
        </div>
      </div>
    </>
  );
}
