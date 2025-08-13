import { useEffect, useState } from "react";
import EventCardSelect2 from "../../components/event/EventCardSelect2.0";
import { Button, Title } from "@mantine/core";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import axios from "axios";
import { API } from "../../api/config";

type Event = {
  id: number;
  title: string;
  image: string | null;
  date: string;
  artists: { name: string; time: string }[];
  location: string;
  description: string;
  rsvp_link: string;
  isSelected: boolean;
  isUpcoming: boolean;
  isLatest?: boolean;
};

export default function EventSelectionPage() {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ----- single-API helpers -----
  const patchEvent = (id: number, body: Partial<Event>) => {
    const url = `${API}/api/elements/events/${id}/`;
    console.log("[PATCH]", url, body);
    return axios.patch(url, body, {
      headers: { "Content-Type": "application/json" },
    });
  };

  const deleteEvent = (id: number) => {
    const url = `${API}/api/elements/events/${id}/`;
    console.log("[DELETE]", url);
    return axios.delete(url);
  };

  // ----- toggles -----
  const onToggleSelection = async (id: number) => {
    const target = events.find((e) => e.id === id);
    if (!target) return;
    const next = !target.isSelected;

    try {
      await patchEvent(id, { isSelected: next });
      setEvents((prev) =>
        prev.map((e) => (e.id === id ? { ...e, isSelected: next } : e))
      );
    } catch (err) {
      console.error("Failed isSelected", err);
    }
  };

  const onToggleUpcoming = async (id: number) => {
    const target = events.find((e) => e.id === id);
    if (!target) return;
    const next = !target.isUpcoming;

    try {
      await patchEvent(id, { isUpcoming: next });
      setEvents((prev) =>
        prev.map((e) => (e.id === id ? { ...e, isUpcoming: next } : e))
      );
    } catch (err) {
      console.error("Failed isUpcoming", err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteEvent(id);
      setEvents((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      console.error("Failed delete", err);
    }
  };

  // ----- initial load -----
  useEffect(() => {
    const url = `${API}/api/elements/events/`;
    console.log("[GET]", url);
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: Event[]) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
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
            Choose <strong style={{ fontWeight: 600 }}>Events</strong>
          </Title>
        </div>

        <div className="select-cards-layout">
          {events.length === 0 ? (
            <p>No events available.</p>
          ) : (
            events.map((event) => (
              <EventCardSelect2
                key={event.id}
                event={event}
                deleted={false}
                onDelete={() => handleDelete(event.id)}
                onToggleUpcoming={() => onToggleUpcoming(event.id)}
                onToggleSelection={() => onToggleSelection(event.id)}
              />
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}