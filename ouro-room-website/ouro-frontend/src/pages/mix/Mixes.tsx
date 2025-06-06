import { Text, Loader, Center } from "@mantine/core";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import MixCard from "../../components/mix/MixCard";
import { useEffect, useState } from "react";
import axios from "axios";

import "../../App.css";

interface Mix {
  id: number;
  title: string;
  artist: string;
  audio: string;
  description?: string;
  image?: string;
  isSelected: boolean;
}

const API = import.meta.env.VITE_API_URL;

export default function Mixes() {
  const [mixes, setMixes] = useState<Mix[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSelectedMixes = async () => {
      try {
        const res = await axios.get(`${API}/api/elements/mixes/`);
        console.log("Raw response:", res.data);

        const allMixes = res.data.map((m: any) => ({
          ...m,
          isSelected: m.isSelected ?? m.isSelected,
        }));
        setMixes(allMixes);
      } catch (err) {
        console.error("Error fetching mixes:", err);
        setError("Failed to load mixes.");
      } finally {
        setLoading(false);
      }
    };

    fetchSelectedMixes();
  }, []);

  return (
    <>
      <Header />

      <div className="page-section">
        <Text
          className="page-section-header"
          style={{ position: "relative", zIndex: 3 }}
        >
          Mixes
        </Text>

        {loading ? (
          <Center style={{ marginTop: "2rem" }}>
            <Loader />
          </Center>
        ) : error ? (
          <Center style={{ color: "red", marginTop: "2rem" }}>{error}</Center>
        ) : mixes.length === 0 ? (
          <Center style={{ marginTop: "2rem" }}>
            <Text color="dimmed">No mixes selected yet.</Text>
          </Center>
        ) : (
          <div
            className="latest-mix-scroll-container"
            style={{ position: "relative", zIndex: 2 }}
          >
            {mixes.map((mix) => (
              <MixCard
                mix={mix}
                key={mix.id}
                title={mix.title}
                artist={mix.artist}
                audioSrc={mix.audio}
              />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
