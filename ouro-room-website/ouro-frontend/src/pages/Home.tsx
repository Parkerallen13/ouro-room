import { Text, Image, Center, Loader } from "@mantine/core";
import Header from "../components/Header";
import Logo from "../assets/ouro-logo.png";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import "../App.css";

import EventCard from "../components/event/EventCard";
import MixCard from "../components/mix/MixCard";
import DJCard from "../components/dj/DJCard";

import { useState, useEffect } from "react";
import axios from "axios";

interface DJ {
  id: number;
  image: string;
  artist: string;
  description: string;
  isSelected: boolean;
  isSpotlight: boolean;
}

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

type Event = {
  id: number;
  title: string;
  date: string;
  artist: string;
  location: string;
  description: string;
  rsvp_link: string;
  isSelected: boolean;
};
const API = import.meta.env.VITE_API_URL;

export default function Home() {
  const navigate = useNavigate();

  const [events, setEvents] = useState<Event[]>([]);
  const [mixes, setMixes] = useState<Mix[]>([]);
  const [djs, setDjs] = useState<DJ[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSelectedMixes = async () => {
      try {
        const res = await axios.get(`${API}/api/elements/mixes/`);
        console.log("Raw response:", res.data);

        const allMixes = res.data.map((m: any) => ({
          ...m,
          isSelected: m.isSelected ?? m.isSelected,
        }));
        setMixes(allMixes);
      } catch (err) {
        console.error("Error fetching mixes:", err);
        setError("Failed to load mixes.");
      } finally {
        setLoading(false);
      }
    };

    fetchSelectedMixes();
    const fetchSelectedEvents = async () => {
      try {
        const res = await axios.get(`${API}/api/elements/events/`);
        console.log("Raw response:", res.data);
        const allEvents = res.data.map(
          (m: any): Event => ({
            id: m.id,
            title: m.title,
            date: m.date,
            artist: m.artist,
            location: m.location,
            description: m.description,
            rsvp_link: m.rsvp_link ?? m.rsvpLink, // fallback if frontend expects camelCase
            isSelected: m.isSelected ?? m.isSelected ?? false,
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
    axios
      .get("http://localhost:8002/api/elements/djs/")
      .then((res) => {
        setDjs(res.data);
      })
      .catch((err) => {
        console.error("Error fetching DJs:", err);
      });

    axios
      .get("http://localhost:8002/api/elements/mixes/")
      .then((res) => {
        setMixes(res.data);
      })
      .catch((err) => {
        console.error("Error fetching mixes:", err);
      });

    axios
      .get("http://localhost:8002/api/elements/events/")
      .then((res) => {
        setEvents(res.data);
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
      });
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
        Collective Rhythm. Infinite Sound
      </Text>

      <div className="page-section">
        <Text
          className="page-section-header"
          style={{ position: "relative", zIndex: 3 }}
        >
          Next Event
        </Text>
        {loading && <Text>Loading...</Text>}
        {error && <Text>{error}</Text>}

        {!loading &&
          !error &&
          events.map((event) => <EventCard key={event.id} event={event} />)}
      </div>

      <div className="page-section">
        <Text
          className="page-section-header"
          style={{ position: "relative", zIndex: 3 }}
        >
          Latest Mixes
        </Text>

        {loading ? (
          <Center style={{ marginTop: "2rem" }}>
            <Loader />
          </Center>
        ) : error ? (
          <Center style={{ color: "red", marginTop: "2rem" }}>{error}</Center>
        ) : mixes.length === 0 ? (
          <Center style={{ marginTop: "2rem" }}>
            <Text color="dimmed">No mixes selected yet.</Text>
          </Center>
        ) : (
          <div
            className="latest-mix-scroll-container"
            style={{ position: "relative", zIndex: 2 }}
          >
            {mixes.map((mix) => (
              <MixCard
                mix={mix}
                key={mix.id}
                title={mix.title}
                artist={mix.artist}
                audioSrc={mix.audio}
              />
            ))}
          </div>
        )}
      </div>

      <div className="page-section">
        <Text
          className="page-section-header"
          style={{ position: "relative", zIndex: 3 }}
        >
          DJ Spotlight
        </Text>
        {djs.length === 0 && <Text>No DJs found.</Text>}
{djs
  .filter((dj) => dj.isSpotlight)
  .map((dj) => (
    <DJCard key={dj.id} dj={dj} />
  ))}
      </div>

      <Footer />
    </>
  );
}
