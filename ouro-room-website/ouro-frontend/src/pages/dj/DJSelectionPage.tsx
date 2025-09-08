import { useEffect, useState } from "react";
import { Button, Title } from "@mantine/core";
import DJCardSelect from "../../components/dj/DJCardSelect";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../../api/config";

type DJ = {
  id: number;
  artist: string;
  description: string;
  image: string;
  socialMedia: string;
  isSelected?: boolean;
  isSpotlight?: boolean;
};

export default function DJSelectionPage() {
  const navigate = useNavigate();
  const [djs, setDJs] = useState<DJ[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      const res = await axios.get(`${API}/api/elements/djs/`);
      const data: DJ[] = res.data.map((m: any) => ({
        ...m,
        image: typeof m.image === "string" && !m.image.startsWith("http")
          ? `${API}${m.image}`
          : (m.image ?? ""),
      }));
      setDJs(data);
      setError(null);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    const onFocus = () => load();
    document.addEventListener("visibilitychange", onFocus);
    const id = setInterval(load, 30_000);
    return () => {
      document.removeEventListener("visibilitychange", onFocus);
      clearInterval(id);
    };
  }, []);

  const onToggleSelection = async (djId: number) => {
    setDJs(prev => prev.map(d => d.id === djId ? { ...d, isSelected: !d.isSelected } : d));
    try {
      const cur = djs.find(d => d.id === djId);
      await axios.patch(`${API}/api/elements/djs/${djId}/`, { isSelected: !cur?.isSelected });
    } catch (err) {
      console.error("Failed isSelected:", err);
    } finally {
      await load();
    }
  };

  const toggleSpotlight = async (djId: number) => {
    setDJs(prev => prev.map(d => d.id === djId ? { ...d, isSpotlight: !d.isSpotlight } : d));
    try {
      const cur = djs.find(d => d.id === djId);
      await axios.patch(`${API}/api/elements/djs/${djId}/`, { isSpotlight: !cur?.isSpotlight });
    } catch (err) {
      console.error("Failed isSpotlight:", err);
    } finally {
      await load();
    }
  };

  const handleDelete = async (id: number) => {
    const snapshot = djs;
    setDJs(p => p.filter(d => d.id !== id));
    try {
      await axios.delete(`${API}/api/elements/djs/${id}/`);
    } catch (err) {
      console.error("Error deleting dj:", err);
      setDJs(snapshot);
    } finally {
      await load();
    }
  };

  if (loading) return <p>Loading DJs...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Header />
      <div className="select-container">
        <div className="form-header">
          <Button variant="outline" onClick={() => navigate(-1)}>Back</Button>
          <Title className="select-header">Choose <strong>DJs</strong></Title>
        </div>
        <div className="select-cards-layout">
          {djs.map(dj => (
            <DJCardSelect
              key={dj.id}
              dj={dj}
              selected={!!dj.isSelected}
              spotlight={!!dj.isSpotlight}
              onClick={() => onToggleSelection(dj.id)}
              onSetSpotlight={() => toggleSpotlight(dj.id)}
              onDelete={() => handleDelete(dj.id)}
              deleted={false}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}