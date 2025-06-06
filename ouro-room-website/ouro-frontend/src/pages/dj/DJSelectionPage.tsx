import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Text, Title } from "@mantine/core";
import DJCardSelect from "../../components/dj/DJCardSelect";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";

type DJ = {
  id: number;
  artist: string;
  description: string;
  image: string;
  isSelected?: boolean;
  isSpotlight?: boolean;
};

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8002";

export default function DJSelectionPage() {
  const navigate = useNavigate();
  const [djs, setDJs] = useState<DJ[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDJIds, setSelectedDJIds] = useState<Set<number>>(new Set());
  const [deletedDJIds, setDeletedDJIds] = useState<Set<number>>(new Set());

  const toggleSelection = async (djId: number) => {
    setDJs((prevDjs) =>
      prevDjs.map((dj) =>
        dj.id === djId ? { ...dj, isSelected: !dj.isSelected } : dj
      )
    );

    try {
      const dj = djs.find((dj) => dj.id === djId);
      await axios.patch(`${API_URL}/api/elements/djs/${djId}/`, {
        isSelected: !dj?.isSelected,
      });
    } catch (error) {
      console.error("Failed to toggle selection:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:8002/api/elements/djs/${id}/`, {
        method: "DELETE",
      });

      if (res.ok) {
        setDJs((prevDJs) => prevDJs.filter((dj) => dj.id !== id));
      } else {
        console.error("Failed to delete event");
      }
    } catch (err) {
      console.error("Error deleting event:", err);
    }
  };

  const toggleSpotlight = async (djId: number) => {
    setDJs((prevDjs) =>
      prevDjs.map((dj) =>
        dj.id === djId ? { ...dj, isSpotlight: !dj.isSpotlight } : dj
      )
    );

    try {
      const dj = djs.find((dj) => dj.id === djId);
      await axios.patch(`${API_URL}/api/elements/djs/${djId}/`, {
        isSpotlight: !dj?.isSpotlight,
      });
    } catch (error) {
      console.error("Failed to toggle spotlight:", error);
    }
  };

  useEffect(() => {
    console.log("event list mounted, fetching DJs...");
    fetch(`${API_URL}/api/elements/djs/`)
      .then((res) => {
        console.log("Fetch response:", res);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("DJ data received:", data);
        setDJs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

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
            Choose <strong style={{ fontWeight: "600" }}>DJs</strong>
          </Title>
        </div>
        <div className="select-cards-layout">
          {djs.length === 0 ? (
            <p>No djs available.</p>
          ) : (
            djs.map((dj) => (
              <DJCardSelect
                key={dj.id}
                dj={dj}
                selected={dj.isSelected ?? false}
                onClick={() => toggleSelection(dj.id)}
                spotlight={dj.isSpotlight ?? false}
                onSetSpotlight={() => toggleSpotlight(dj.id)}
                onDelete={() => handleDelete(dj.id)}
                deleted={false}
              />
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
