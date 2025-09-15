import { useEffect, useState } from "react";
import axios from "axios";
import EventCardSelect2 from "../../components/event/EventCardSelect2"
import { Button, Title } from "@mantine/core";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import { API } from "../../api/config";

interface GalleryImage {
  id: number;
  image: string;
  isSelected: boolean;
}

export default function GallerySelectionPage() {
  const navigate = useNavigate();
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  const patchOne  = (id: number, body: any) =>
    axios.patch(`${API}/api/elements/gallery/${id}/`, body);

  const deleteOne = (id: number) =>
    axios.delete(`${API}/api/elements/gallery/${id}/`);

  const load = async () => {
    try {
      const { data } = await axios.get<GalleryImage[]>(`${API}/api/elements/gallery/`);
      setImages(data);
      setError(null);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to load images");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    const onFocus = () => load();
    document.addEventListener("visibilitychange", onFocus);
    const id = setInterval(load, 30000);
    return () => { document.removeEventListener("visibilitychange", onFocus); clearInterval(id); };
  }, []);

  const onToggleSelection = async (id: number) => {
    const target = images.find(i => i.id === id);
    if (!target) return;

    const next = !target.isSelected;
    setImages(prev => prev.map(i => i.id === id ? { ...i, isSelected: next } : i));
    try { await patchOne(id, { isSelected: next }); }
    catch (e) { console.error("toggle gallery failed", e); setImages(prev => prev.map(i => i.id === id ? { ...i, isSelected: !next } : i)); }
    finally { await load(); }
  };

  const handleDelete = async (id: number) => {
    const snapshot = images;
    setImages(prev => prev.filter(i => i.id !== id));
    try { await deleteOne(id); }
    catch (e) { console.error("delete gallery failed", e); setImages(snapshot); }
    finally { await load(); }
  };

  if (loading) return <p style={{ position: "relative", zIndex: 9, color: "white" }}>Loading images...</p>;
  if (error)   return <p style={{ position: "relative", zIndex: 9, color: "white" }}>Error: {error}</p>;

  return (
    <>
      <Header />
      <div className="select-container">
        <div className="form-header">
          <Button className="back-button" variant="outline" onClick={() => navigate(-1)}>Back</Button>
          <Title className="select-header">Choose <strong style={{ fontWeight: 600 }}>Gallery Images</strong></Title>
        </div>
        <div className="select-cards-layout">
          {images.map(img => (
            <EventCardSelect2
              key={img.id}
              image={img}
              selected={img.isSelected}
              deleted={false}
              onClick={() => onToggleSelection(img.id)}
              onDelete={() => handleDelete(img.id)}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}