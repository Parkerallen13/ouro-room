// src/pages/selection/MixSelectionPage.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Title } from "@mantine/core";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import MixCardSelect from "../../components/mix/MixCardSelect";
import { API } from "../../api/config";

type Mix = {
  id: number;
  title: string;
  artist: string;
  audio: string;        // absolute or relative URL from API
  image?: string | null;
  isSelected?: boolean; // not used here but allowed
  isLatest: boolean;
};

export default function MixSelectionPage() {
  const navigate = useNavigate();
  const [mixes, setMixes] = useState<Mix[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  // normalize any relative URLs coming from the API
  const normalizeUrl = (u?: string | null) =>
    typeof u === "string" && u.length > 0 && !u.startsWith("http") ? `${API}${u}` : (u ?? "");

  // ---- API helpers (single env) ----
  const patchOne  = (id: number, body: any) => axios.patch(`${API}/api/elements/mixes/${id}/`, body);
  const deleteOne = (id: number)           => axios.delete(`${API}/api/elements/mixes/${id}/`);

  // ---- actions ----
  const onToggleLatest = async (id: number) => {
    const target = mixes.find(m => m.id === id);
    if (!target) return;
    const next = !target.isLatest;

    // optimistic UI
    setMixes(prev => prev.map(m => (m.id === id ? { ...m, isLatest: next } : m)));

    try {
      await patchOne(id, { isLatest: next });
    } catch (e) {
      console.error("Failed isLatest", e);
      // revert
      setMixes(prev => prev.map(m => (m.id === id ? { ...m, isLatest: !next } : m)));
    }
  };

  const handleDelete = async (id: number) => {
    const snapshot = mixes;
    setMixes(prev => prev.filter(m => m.id !== id));
    try {
      await deleteOne(id);
    } catch (e) {
      console.error("Failed delete", e);
      setMixes(snapshot); // revert on error
    }
  };

  // ---- load data ----
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${API}/api/elements/mixes/`);
        const data: Mix[] = res.data.map((m: any) => ({
          id: m.id,
          title: m.title,
          artist: m.artist,
          audio: normalizeUrl(m.audio),
          image: normalizeUrl(m.image),
          isSelected: m.isSelected ?? false,
          isLatest: m.isLatest ?? false,
        }));
        setMixes(data);
      } catch (err: any) {
        console.error(err);
        setError(`Failed to load mixes (${err?.response?.status ?? "network"})`);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p style={{ position: "relative", zIndex: 9, color: "white" }}>Loading mixes...</p>;
  if (error)   return <p style={{ position: "relative", zIndex: 9, color: "white" }}>Error: {error}</p>;

  return (
    <>
      <Header />
      <div className="select-container">
        <div className="form-header">
          <Button className="back-button" variant="outline" onClick={() => navigate(-1)}>
            Back
          </Button>
          <Title className="select-header">
            Choose <strong style={{ fontWeight: 600 }}>Mixes</strong>
          </Title>
        </div>

        <div className="select-cards-layout">
          {mixes.length === 0 ? (
            <p>No mixes available.</p>
          ) : (
            mixes.map(mix => (
              <MixCardSelect
                key={mix.id}
                mix={mix}
                onClick={() => { /* no isSelected toggle here; only isLatest */ }}
                deleted={false}
                onDelete={() => handleDelete(mix.id)}
                onToggleLatest={() => onToggleLatest(mix.id)}
              />
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}