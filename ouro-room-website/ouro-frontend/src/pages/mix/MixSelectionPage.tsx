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
  audio: string;
  image?: string | null;
  isSelected?: boolean;
  isLatest: boolean;
};

export default function MixSelectionPage() {
  const navigate = useNavigate();
  const [mixes, setMixes] = useState<Mix[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  const normalizeUrl = (u?: string | null) =>
    typeof u === "string" && u.length > 0 && !u.startsWith("http")
      ? `${API}${u}`
      : (u ?? "");

  const patchOne  = (id: number, body: any) =>
    axios.patch(`${API}/api/elements/mixes/${id}/`, body);

  const deleteOne = (id: number) =>
    axios.delete(`${API}/api/elements/mixes/${id}/`);

  const onToggleLatest = async (id: number) => {
    const target = mixes.find(m => m.id === id);
    if (!target) return;
    const next = !target.isLatest;
    setMixes(prev => prev.map(m => (m.id === id ? { ...m, isLatest: next } : m)));
    try { await patchOne(id, { isLatest: next }); }
    catch (e) { console.error("Failed isLatest", e); setMixes(prev => prev.map(m => (m.id === id ? { ...m, isLatest: !next } : m))); }
    finally { await load(); }
  };

  const onToggleSelected = async (id: number) => {
    const target = mixes.find(m => m.id === id);
    if (!target) return;
    const next = !target.isSelected;
    setMixes(prev => prev.map(m => (m.id === id ? { ...m, isSelected: next } : m)));
    try { await patchOne(id, { isSelected: next }); }
    catch (e) { console.error("Failed isSelected", e); setMixes(prev => prev.map(m => (m.id === id ? { ...m, isSelected: !next } : m))); }
    finally { await load(); }
  };

  const handleDelete = async (id: number) => {
    const snapshot = mixes;
    setMixes(prev => prev.filter(m => m.id !== id));
    try { await deleteOne(id); }
    catch (e) { console.error("Failed delete", e); setMixes(snapshot); }
    finally { await load(); }
  };

  const load = async () => {
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
      setError(null);
    } catch (err: any) {
      console.error(err);
      setError(`Failed to load mixes (${err?.response?.status ?? "network"})`);
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

  if (loading) return <p style={{ position: "relative", zIndex: 9, color: "white" }}>Loading mixes...</p>;
  if (error)   return <p style={{ position: "relative", zIndex: 9, color: "white" }}>Error: {error}</p>;

  return (
    <>
      <Header />
      <div className="select-container">
        <div className="form-header">
          <Button className="back-button" variant="outline" onClick={() => navigate(-1)}>Back</Button>
          <Title className="select-header">Choose <strong style={{ fontWeight: 600 }}>Mixes</strong></Title>
        </div>
        <div className="select-cards-layout">
          {mixes.length === 0 ? (
            <p>No mixes available.</p>
          ) : (
            mixes.map(mix => (
              <MixCardSelect
                key={mix.id}
                mix={mix}
                onToggleSelected={() => onToggleSelected(mix.id)}
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