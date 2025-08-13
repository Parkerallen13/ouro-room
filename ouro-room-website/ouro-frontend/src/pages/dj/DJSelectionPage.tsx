import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Title } from "@mantine/core";
import DJCardSelect from "../../components/dj/DJCardSelect";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";



import { API_PROD, API_LOCAL } from '../../api/config';
const API = window.location.hostname === "localhost" ? API_LOCAL : API_PROD;


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

  const onToggleSelection = async (djId: number) => {
    setDJs(prev => prev.map(dj => dj.id === djId ? { ...dj, isSelected: !dj.isSelected } : dj));
    try {
      const dj = djs.find(d => d.id === djId);
      await axios.patch(`${API}/api/elements/djs/${djId}/`, {
        isSelected: !dj?.isSelected,
      });
    } catch (err) {
      console.error("Failed to toggle selection:", err);
    }
  };

  const handleDelete = async (id: number) => {
    const prev = djs;
    setDJs(p => p.filter(dj => dj.id !== id));
    try {
      const res = await fetch(`${API}/api/elements/djs/${id}/`, { method: "DELETE" });
      if (!res.ok) setDJs(prev);
    } catch (err) {
      console.error("Error deleting dj:", err);
      setDJs(prev);
    }
  };

  const toggleSpotlight = async (djId: number) => {
    setDJs(prev => prev.map(dj => dj.id === djId ? { ...dj, isSpotlight: !dj.isSpotlight } : dj));
    try {
      const dj = djs.find(d => d.id === djId);
      await axios.patch(`${API}/api/elements/djs/${djId}/`, {
        isSpotlight: !dj?.isSpotlight,
      });
    } catch (err) {
      console.error("Failed to toggle spotlight:", err);
    }
  };

  useEffect(() => {
    fetch(`${API}/api/elements/djs/`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => setDJs(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

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