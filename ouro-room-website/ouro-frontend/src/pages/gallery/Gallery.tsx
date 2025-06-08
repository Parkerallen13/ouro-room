import { useEffect, useState } from "react";
import axios from "axios";
import "../../App.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import GalleryCard from "../../components/gallery/GalleryCard";

type Image = {
  id: number;
  image: string;
  isSelected: boolean;
};

const API = import.meta.env.VITE_API_URL || 'http://localhost:8002';

export default function Gallery() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    const fetchSelectedImages = async () => {
      try {
        const res = await axios.get(`${API}/api/elements/gallery/`);
        console.log("Raw response:", res.data);
        const allImages = res.data.map(
          (i: any): Image => ({
            id: i.id,
            image: i.image,
            isSelected: i.isSelected ?? i.isSelected ?? false,
          })
        );
        setImages(allImages);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load events.");
      } finally {
        setLoading(false);
      }
    };
    fetchSelectedImages();
  }, []);

  return (
    <>
      <Header />
      <div className="gallery-container">
        {!loading &&
          !error &&
          images.map((images) => (
            <GalleryCard key={images.id} image={images} />
          ))}
      </div>
      <Footer />
    </>
  );
}
