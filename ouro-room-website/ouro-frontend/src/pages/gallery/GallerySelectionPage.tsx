import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Text, Title } from "@mantine/core";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import GalleryCardSelect from "../../components/gallery/GalleryCardSelect";

interface Images {
  id: number;
  image: string;
  isSelected: boolean;
}
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8002";

export default function GallerySelectionPage() {
  const navigate = useNavigate();
  const [images, setImages] = useState<Images[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageId, setSelectedImageId] = useState<number | null>(null);

  const toggleSelection = (id: number) => {
    setSelectedImageId((prev) => (prev === id ? null : id));
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`${API_URL}/api/elements/gallery/${id}/`, {
        method: "DELETE",
      });
      
      if (res.ok) {
        
        setImages((prevImages) => prevImages.filter((img) => img.id !== id));
      } else {
        console.error("Failed to delete image");
      }
    } catch (err) {
      console.error("Error deleting image:", err);
    }
  };

  useEffect(() => {
    console.log("event list mounted, fetching Images...");
    fetch(`${API_URL}/api/elements/gallery/`)
      .then((res) => {
        console.log("Fetch response:", res);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        const ids = data.map((d: any) => d.id);
        console.log("All IDs:", ids);
        const duplicates = ids.filter(
          (id: any, index: any) => ids.indexOf(id) !== index
        );
        console.log("Duplicate IDs:", duplicates);
        console.log("Events data received:", data);
        setImages(data);
        console.log("One image object:", data[0]);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <p style={{ position: "relative", zIndex: 9, color: "white" }}>
        Loading events...
      </p>
    );
  if (error)
    return (
      <p style={{ position: "relative", zIndex: 9, color: "white" }}>
        Error: {error}
      </p>
    );

  return (
    <>
      <Header />
      <div className="select-container">
        <div className="form-header">
          <Button
            className="back-button"
            variant="outline"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
          <Title className="select-header">
            Choose <strong style={{ fontWeight: "600" }}>Gallery Images</strong>
          </Title>
        </div>

        <div className="select-cards-layout">
          {images.map((gallery) => (
            <GalleryCardSelect
              key={gallery.id}
              image={gallery} // pass the single gallery object here
              selected={selectedImageId === gallery.id}
              deleted={false} // pass only once, or replace with your logic if you track deleted state
              onClick={() => toggleSelection(gallery.id)}
              onDelete={() => handleDelete(gallery.id)} // pass gallery.id here correctly
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
