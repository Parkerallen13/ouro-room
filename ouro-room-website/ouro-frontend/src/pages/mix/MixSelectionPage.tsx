import { useEffect, useState } from "react";
import MixCardSelect from "../../components/mix/MixCardSelect";
import { Button, Text, Title } from "@mantine/core";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Mix {
  id: number;
  title: string;
  artist: string;
  audio: string;
  description?: string;
  image?: string;
  isSelected: boolean;
  isLatest: boolean;
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8002";

export default function MixSelectionPage() {
  const navigate = useNavigate();
  const [mixes, setMixes] = useState<Mix[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMixIds, setSelectedMixIds] = useState<Set<number>>(new Set());
  const [latestMixIds, setLatestMixIds] = useState<Set<number>>(new Set());
  const [deletedMixIds, setDeletedMixIds] = useState<Set<number>>(new Set());

  const toggleSelection = (id: number) => {
    setSelectedMixIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };
  
 const onToggleLatest = (id: number) => {
  const targetMix = mixes.find((mix) => mix.id === id);
  if (targetMix) {
    const newIsLatest = !targetMix.isLatest;

    // Send the correct new value to the backend
axios.patch(`${API_URL}/api/elements/mixes/${id}/`, { isLatest: true });

    // THEN update local state
    setMixes((prevMixes) =>
      prevMixes.map((mix) =>
        mix.id === id ? { ...mix, isLatest: newIsLatest } : mix
      )
    );
  }
};

 const handleDelete = async (id: number) => {
  try {
    const res = await fetch(`${API_URL}/api/elements/mixes/${id}/`, {
      method: "DELETE",
    });

    if (res.ok) {
      await fetchMixes(); // <-- Refresh list after deletion
    } else {
      console.error("Failed to delete mix");
    }
  } catch (err) {
    console.error("Error deleting mix:", err);
  }
};

  const fetchMixes = async () => {
  try {
    const res = await fetch(`${API_URL}/api/elements/mixes/`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    setMixes(data);
    setLoading(false);
  } catch (err: any) {
    console.error("Fetch error:", err);
    setError(err.message);
    setLoading(false);
  }
};

  useEffect(() => {
    console.log("mix list mounted, fetching mixes...");
    fetch(`${API_URL}/api/elements/mixes/`)
      .then((res) => {
        console.log("Fetch response:", res);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Mixes data received:", data); // was 'Cars data'
        setMixes(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError(err.message);
        setLoading(false);
      });
      fetchMixes();
  }, []);

  if (loading)
    return (
      <p style={{ position: "relative", zIndex: 9, color: "white" }}>
        Loading mixes...
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
            Choose <strong style={{ fontWeight: "600" }}>Mixes</strong>
          </Title>
        </div>
        <div className="select-cards-layout">
          {mixes.length === 0 ? (
            <p>No mixes available.</p>
          ) : (
            mixes.map((mix) => (
              <MixCardSelect
                key={mix.id}
                mix={mix}
                onClick={() => toggleSelection(mix.id)}
                selected={selectedMixIds.has(mix.id)}
                deleted={deletedMixIds.has(mix.id)}
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


