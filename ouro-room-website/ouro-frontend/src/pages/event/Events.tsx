import { Text, Image } from "@mantine/core";
import Header from "../../components/Header";
import Logo from "../../assets/ouro-logo.png";
import { useNavigate } from "react-router-dom";
import EventCard from "../../components/event/EventCard";
import Footer from "../../components/Footer";
import "../../App.css";
import { useEffect, useState } from "react";
import axios from "axios";

type Event = {
  id: number;
  title: string;
  date: string;
  artists: { name: string; time: string }[]; // ✅ this replaces 'artist'
  location: string;
  description: string;
  rsvp_link: string;
  isSelected: boolean;
};

const API = import.meta.env.VITE_API_URL;

export default function Events() {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSelectedEvents = async () => {
      try {
        const res = await axios.get(`${API}/api/elements/events/`);
        console.log("Raw response:", res.data);
      const allEvents = res.data.map(
  (m: any): Event => ({
    id: m.id,
    title: m.title,
    date: m.date,
    artists: m.artists ?? [{ name: m.artist, time: m.time }],
    location: m.location,
    description: m.description,
    rsvp_link: m.rsvp_link ?? m.rsvpLink,
    isSelected: m.isSelected ?? false,
  })
);
        setEvents(allEvents);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load events.");
      } finally {
        setLoading(false);
      }
    };
    fetchSelectedEvents();
  }, []);

  return (
    <>
      <Header />
      <Image
        className="home-logo"
        src={Logo}
        onClick={() => navigate("/")}
        style={{ position: "relative", zIndex: 4 }}
      />
      <Text
        className="page-intro-text"
        style={{ position: "relative", zIndex: 1 }}
      >
        Experience The Collective Rhythm
      </Text>
      <div className="page-section">
        <Text
          className="page-section-header"
          style={{ position: "relative", zIndex: 3 }}
        >
          Events
        </Text>
        {loading && <Text>Loading...</Text>}
        {error && <Text>{error}</Text>}

        {!loading &&
          !error &&
          events.map((event) => <EventCard key={event.id} event={event} />)}
      </div>

      <Footer />
    </>
  );
}
