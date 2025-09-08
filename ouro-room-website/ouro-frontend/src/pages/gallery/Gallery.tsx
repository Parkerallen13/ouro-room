import { useEffect, useState } from "react";
import axios from "axios";
import "../../App.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import GalleryCard from "../../components/gallery/GalleryCard";
import { API } from "../../api/config";

type ImageT = { id: number; image: string; isSelected: boolean };

export default function Gallery() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);
  const [images, setImages]   = useState<ImageT[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${API}/api/elements/gallery/`);
        const all: ImageT[] = res.data.map((i: any) => {
          const raw = i.imagePath ?? i.image ?? "";
          const image = typeof raw === "string" && !raw.startsWith("http") ? `${API}${raw}` : raw;
          return { id: i.id, image, isSelected: i.isSelected ?? false };
        });
        setImages(all);
      } catch (err) {
        console.error("Error fetching gallery:", err);
        setError("Failed to load gallery.");
      } finally {
        setLoading(false);
      }
    })();
  }, [location.key]);

  return (
    <>
      <Header />
      <div className="gallery-container">
        {loading && !error && <p>Loading…</p>}
        {error && <p>{error}</p>}
        {!loading && !error && images.filter(i => i.isSelected).map(i => (
          <GalleryCard key={i.id} image={i} />
        ))}
      </div>
      <Footer />
    </>
  );
}