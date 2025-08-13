import { Text, Loader, Center } from "@mantine/core";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import MixCard from "../../components/mix/MixCard";
import { useEffect, useState } from "react";
import axios from "axios";
import "../../App.css";
import { API_PROD } from '../../api/config';
const API = API_PROD;

// 👇 rename to avoid name clash with MixCard's internal type
interface UIMix {
  id: number;
  title: string;
  artist: string;
  audio: string;           // absolute URL
  description?: string;
  image?: string;          // <- no null
  isSelected: boolean;
}

export default function Mixes() {
  const [mixes, setMixes] = useState<UIMix[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSelectedMixes = async () => {
      try {
        const res = await axios.get(`${API}/api/elements/mixes/`);

        const allMixes: UIMix[] = res.data.map((m: any) => {
          const audioRel = m.audio ?? m.audioPath ?? m.filePath ?? "";
          const audio =
            typeof audioRel === "string" && !audioRel.startsWith("http")
              ? `${API}${audioRel}`
              : audioRel;

          const imgRel = m.imagePath ?? m.image ?? undefined;
          const image =
            typeof imgRel === "string"
              ? (imgRel.startsWith("http") ? imgRel : `${API}${imgRel}`)
              : undefined; // 👈 force undefined instead of null

          return {
            id: m.id,
            title: m.title,
            artist: m.artist,
            audio,
            description: m.description ?? "",
            image,                                 // 👈 now string | undefined
            isSelected: m.isSelected ?? false,
          };
        });

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

  const selected = mixes.filter((m) => m.isSelected);

  return (
    <>
      <Header />
      <div className="page-section">
        <Text className="page-section-header" style={{ position: "relative", zIndex: 3 }}>
          Mixes
        </Text>

        {loading ? (
          <Center style={{ marginTop: "2rem" }}><Loader /></Center>
        ) : error ? (
          <Center style={{ color: "red", marginTop: "2rem" }}>{error}</Center>
        ) : selected.length === 0 ? (
          <Center style={{ marginTop: "2rem" }}>
            <Text color="dimmed">No mixes selected yet.</Text>
          </Center>
        ) : (
          <div className="mix-container" style={{ position: "relative", zIndex: 2 }}>
            {selected.map((mix) => (
              <MixCard
                key={mix.id}
                mix={mix}                  // ✅ now compatible
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