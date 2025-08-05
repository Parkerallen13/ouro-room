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

import { API } from '../../api/config';

export default function GallerySelectionPage() {
  const navigate = useNavigate();
  const [images, setImages] = useState<Images[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIds, setSelectedImageIds] = useState<number[]>([]);

const onToggleSelection = async (id: number) => {
  const alreadySelected = selectedImageIds.includes(id);
  const newSelectedIds = alreadySelected
    ? selectedImageIds.filter((i) => i !== id)
    : [...selectedImageIds, id];

  setSelectedImageIds(newSelectedIds);

  // ✅ Update selection state in the backend
  try {
  await fetch(`${API}/api/elements/gallery/${id}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ isSelected: !alreadySelected }),
  });

  // ✅ Update the image in the local state too
  setImages((prevImages) =>
    prevImages.map((img) =>
      img.id === id ? { ...img, isSelected: !alreadySelected } : img
    )
  );
} catch (error) {
  console.error("Error updating selection:", error);
}
};

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`${API}/api/elements/gallery/${id}/`, {
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
  fetch(`${API}/api/elements/gallery/`)
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return res.json();
    })
 .then((data) => {
  const ids = data.map((d: any) => d.id);
  const selectedIds = data
    .filter((img: any) => img.isSelected)
    .map((img: any) => img.id); // <-- this is new

  console.log("Selected IDs on load:", selectedIds);

  setImages(data);
  setSelectedImageIds(selectedIds); // <-- THIS LINE FIXES YOUR ISSUE
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
              selected={selectedImageIds.includes(gallery.id)} // ← multiple selections
              deleted={false} // pass only once, or replace with your logic if you track deleted state
              onClick={() => onToggleSelection(gallery.id)}
              onDelete={() => handleDelete(gallery.id)} // pass gallery.id here correctly
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
