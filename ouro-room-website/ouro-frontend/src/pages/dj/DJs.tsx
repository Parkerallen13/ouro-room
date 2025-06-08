import { Text } from "@mantine/core";
import Header from "../../components/Header";
import DJCard from "../../components/dj/DJCard";
import Footer from "../../components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";

interface DJ {
  id: number;
  artist: string;
  description: string;
  image: string;
  socialMedia: string;
  isSelected: boolean;
  isSpotlight: boolean;
}

const API = import.meta.env.VITE_API_URL;

export default function DJs() {
  const [djs, setDJs] = useState<DJ[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSelectedDJs = async () => {
      try {
        const res = await axios.get(`${API}/api/elements/djs/`);
        console.log("Raw response:", res.data);

        const allDJs = res.data.map(
          (m: any): DJ => ({
            id: m.id,
            artist: m.artist,
            description: m.description,
            socialMedia: m.socialmedia,
            image: m.image,
            isSelected: m.isSelected ?? false,
            isSpotlight: m.isSpotlight,
          })
        );

        setDJs(allDJs);
      } catch (err) {
        console.error("Error fetching djs:", err);
        setError("Failed to load djs.");
      } finally {
        setLoading(false);
      }
    };
    fetchSelectedDJs();
  }, []);

  return (
    <>
      <Header />
      <Text
        className="page-section-header"
        style={{ position: "relative", zIndex: 3 }}
      >
        DJs
      </Text>

      <div className="dj-container">
        {loading && <Text>Loading...</Text>}
        {error && <Text>{error}</Text>}

        {!loading &&
          !error &&
          djs
            .filter((dj) => dj.isSelected)
            .map((dj) => <DJCard key={dj.id} dj={dj} />)}
      </div>

      <Footer />
    </>
  );
}
