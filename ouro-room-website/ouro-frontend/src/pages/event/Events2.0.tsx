import { Text, Image } from "@mantine/core";
import Header from "../../components/Header";
import Logo from "../../assets/ouro-logo.png";
import { useNavigate } from "react-router-dom";
import EventCard from "../../components/event/EventCard";
import EventCard2 from "../../components/event/EventCard2.0";
import Footer from "../../components/Footer";
import "../../App.css";
import { useEffect, useState } from "react";
import axios from "axios";

import { API } from '../../api/config';

type Event = {
  id: number;
 image: string;
 title: string;
 date: string;
};

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
    image: m.image,
    title: m.title,
    date: m.date,
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
          events.map((event) => <EventCard2 key={event.id} event={event} />)}
      </div>

      <Footer />
    </>
  );
}
