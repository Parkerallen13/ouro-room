// src/pages/dj/DJs.tsx
import { Text } from "@mantine/core";
import Header from "../../components/Header";
import DJCard from "../../components/dj/DJCard";
import Footer from "../../components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../api/config";  // for image prefix

type DJ = {
  id: number;
  artist: string;
  description: string;
  image: string;
  socialMedia: string;
  isSelected: boolean;
  isSpotlight: boolean;
};

export default function DJs() {
  const [djs, setDJs] = useState<DJ[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      const res = await axios.get(`${API}/api/elements/djs/`);
      const all: DJ[] = res.data.map((m: any) => ({
        id: m.id,
        artist: m.artist,
        description: m.description ?? "",
        socialMedia: m.socialMedia ?? "",
        image:
          typeof m.image === "string" && !m.image.startsWith("http")
            ? `${API}${m.image}`
            : (m.image ?? ""),
        isSelected: !!m.isSelected,
        isSpotlight: !!m.isSpotlight,
      }));
      setDJs(all);
      setError(null);
    } catch (e: any) {
      console.error("Error fetching djs:", e);
      setError("Failed to load djs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();

    // 🔁 keep everyone up-to-date with minimal code
    const onFocus = () => load();
    window.addEventListener("visibilitychange", onFocus);
    const id = setInterval(load, 30_000);

    return () => {
      window.removeEventListener("visibilitychange", onFocus);
      clearInterval(id);
    };
  }, []);

  return (
    <>
      <Header />
      <Text className="page-section-header" style={{ position: "relative", zIndex: 3 }}>
        DJs
      </Text>

      <div className="dj-container">
        {loading && <Text>Loading...</Text>}
        {error && <Text>{error}</Text>}
        {!loading && !error &&
          djs.filter(dj => dj.isSelected).map(dj => <DJCard key={dj.id} dj={dj} />)}
      </div>

      <Footer />
    </>
  );
}