import { useEffect, useState } from "react";
import EventCardSelect from "../../components/event/EventCardSelect";
import { Button, Title } from "@mantine/core";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";

type Event = {
  id: number;
  title: string;
  date: string;
  artists: { name: string; time: string }[]; 
  location: string;
  description: string;
  rsvp_link: string;
  isSelected: boolean;
  isLatest?: boolean;
};

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8002";

export default function EventSelectionPage() {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedEventIds, setSelectedEventIds] = useState<Set<number>>(
    new Set()
  );

  const toggleSelection = (id: number) => {
    setSelectedEventIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(
        `http://localhost:8002/api/elements/events/${id}/`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        setEvents((prevEvents) => prevEvents.filter((e) => e.id !== id));
      } else {
        console.error("Failed to delete event");
      }
    } catch (err) {
      console.error("Error deleting event:", err);
    }
  };

  useEffect(() => {
    console.log("event list mounted, fetching Events...");
    fetch(`${API_URL}/api/elements/events/`)
      .then((res) => {
        console.log("Fetch response:", res);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        const transformedEvents = data.map((event: any) => ({
          ...event,
          artists: [{ name: event.artist, time: event.time }],
          artist: undefined,
          time: undefined,
        }));
        setEvents(transformedEvents);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
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
            Choose <strong style={{ fontWeight: "600" }}>Events</strong>
          </Title>
        </div>
        <div className="select-cards-layout">
          {events.length === 0 ? (
            <p>No events available.</p>
          ) : (
            events.map((event) => (
              <EventCardSelect
                key={event.id}
                event={event}
                onClick={() => toggleSelection(event.id)}
                selected={selectedEventIds.has(event.id)}
                deleted={false}
                onDelete={() => handleDelete(event.id)}
              />
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
