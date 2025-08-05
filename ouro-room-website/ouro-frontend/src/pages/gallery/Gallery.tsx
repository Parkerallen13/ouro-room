import { useEffect, useState } from "react";
import axios from "axios";
import "../../App.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import GalleryCard from "../../components/gallery/GalleryCard";

type Image = {
  id: number;
  image: string;
  isSelected: boolean;
};

import { API } from '../../api/config';

export default function Gallery() {
  const navigate = useNavigate();
  const location = useLocation(); // ⬅️ added
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [images, setImages] = useState<Image[]>([]);

  const fetchSelectedImages = async () => {
    try {
      const res = await axios.get(`${API}/api/elements/gallery/`);
      const allImages = res.data.map(
        (i: any): Image => ({
          id: i.id,
          image: i.image,
          isSelected: i.isSelected ?? false,
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

  useEffect(() => {
    fetchSelectedImages();
  }, [location.key]); // ⬅️ This ensures the effect runs whenever the user navigates back

  return (
    <>
      <Header />
      <div className="gallery-container">
        {!loading &&
          !error &&
          images
            .filter((img) => img.isSelected) // ⬅️ make sure to filter for selected ones only
            .map((img) => <GalleryCard key={img.id} image={img} />)}
      </div>
      <Footer />
    </>
  );
}
