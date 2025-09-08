import { useEffect, useState } from "react";
import EventCardSelect2 from "../../components/event/EventCardSelect2.0";
import { Button, Title } from "@mantine/core";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import axios from "axios";
import { API } from "../../api/config";

type EventItem = {
  id: number;
  title: string;
  image: string;
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
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const patchEvent = (id: number, body: Partial<EventItem>) =>
    axios.patch(`${API}/api/elements/events/${id}/`, body, {
      headers: { "Content-Type": "application/json" },
    });

  const deleteEvent = (id: number) =>
    axios.delete(`${API}/api/elements/events/${id}/`);

  const load = async () => {
    try {
      const { data } = await axios.get<EventItem[]>(`${API}/api/elements/events/`);
      setEvents(data);
      setError(null);
    } catch (err: any) {
      console.error(err);
      setError(err.message ?? "Failed to load events");
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
    const target = events.find((e) => e.id === id);
    if (!target) return;
    setEvents((prev) => prev.map((e) => (e.id === id ? { ...e, isSelected: !target.isSelected } : e)));
    try { await patchEvent(id, { isSelected: !target.isSelected }); }
    catch (err) { console.error("Failed isSelected", err); }
    finally { await load(); }
  };

  const onToggleUpcoming = async (id: number) => {
    const target = events.find((e) => e.id === id);
    if (!target) return;
    setEvents((prev) => prev.map((e) => (e.id === id ? { ...e, isUpcoming: !target.isUpcoming } : e)));
    try { await patchEvent(id, { isUpcoming: !target.isUpcoming }); }
    catch (err) { console.error("Failed isUpcoming", err); }
    finally { await load(); }
  };

  const handleDelete = async (id: number) => {
    const snapshot = events;
    setEvents((prev) => prev.filter((e) => e.id !== id));
    try { await deleteEvent(id); }
    catch (err) { console.error("Failed delete", err); setEvents(snapshot); }
    finally { await load(); }
  };

  if (loading) return <p style={{ position: "relative", zIndex: 9, color: "white" }}>Loading events...</p>;
  if (error)   return <p style={{ position: "relative", zIndex: 9, color: "white" }}>Error: {error}</p>;

  return (
    <>
      <Header />
      <div className="select-container">
        <div className="form-header">
          <Button className="back-button" variant="outline" onClick={() => navigate(-1)}>Back</Button>
          <Title className="select-header">Choose <strong style={{ fontWeight: 600 }}>Events</strong></Title>
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