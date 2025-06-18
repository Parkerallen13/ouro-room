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
  const [deletedMixIds, setDeletedMixIds] = useState<Set<number>>(new Set());

  const onToggleSelection = async (id: number) => {
  const targetMix = mixes.find((mix) => mix.id === id);
  if (!targetMix) return;

  const newIsSelected = !targetMix.isSelected;

  try {
    const res = await axios.patch(`${API_URL}/api/elements/mixes/${id}/`, {
      isSelected: newIsSelected,
    });

    if (res.status === 200 || res.status === 204) {
      setMixes((prevMixes) =>
        prevMixes.map((mix) =>
          mix.id === id ? { ...mix, isSelected: newIsSelected } : mix
        )
      );
    }
  } catch (err) {
    console.error("Failed to update isSelected:", err);
  }
};

const onToggleLatest = async (id: number) => {
  const targetMix = mixes.find((mix) => mix.id === id);
  if (!targetMix) return;

  const newIsLatest = !targetMix.isLatest;

  try {
    const res = await axios.patch(`${API_URL}/api/elements/mixes/${id}/`, {
      isLatest: newIsLatest,
    });

    if (res.status === 200 || res.status === 204) {
      setMixes((prevMixes) =>
        prevMixes.map((mix) =>
          mix.id === id ? { ...mix, isLatest: newIsLatest } : mix
        )
      );
    }
  } catch (err) {
    console.error("Failed to update isLatest:", err);
  }
};

const handleDelete = async (id: number) => {
  try {
    const res = await fetch(`${API_URL}/api/elements/mixes/${id}/`, {
      method: "DELETE",
    });

    if (res.ok) {
      await fetchMixes(); // Refreshes the list
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
                onClick={() => onToggleSelection(mix.id)}
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