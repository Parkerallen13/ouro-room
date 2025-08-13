import { Text, Image, Center, Loader } from "@mantine/core";
import Header from "../components/Header";
import Logo from "../assets/ouro-logo.png";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import "../App.css";

import MixCard from "../components/mix/MixCard";
import DJCard from "../components/dj/DJCard";

import { API_PROD } from "../api/config";
const API = API_PROD; // always read from prod

import { useState, useEffect } from "react";
import axios from "axios";
import EventCard2 from "../components/event/EventCard2.0";

interface DJ {
  id: number;
  image: string;
  artist: string;
  description: string;
  socialMedia: string;
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
  image: string | null;
  title: string;
  date: string;
  artists: { name: string; time: string }[];
  location: string;
  description: string;
  rsvp_link: string;
  isSelected: boolean;
  isUpcoming: boolean;
};

export default function Home() {
  const navigate = useNavigate();

  const [events, setEvents] = useState<Event[]>([]);
  const [mixes, setMixes] = useState<Mix[]>([]);
  const [djs, setDjs] = useState<DJ[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [mixRes, eventRes, djRes] = await Promise.all([
          axios.get(`${API}/api/elements/mixes/`),
          axios.get(`${API}/api/elements/events/`),
          axios.get(`${API}/api/elements/djs/`),
        ]);

        setMixes(mixRes.data);
        setEvents(eventRes.data);
        setDjs(djRes.data);
      } catch (err) {
        console.error("Error loading data:", err);
        setError("Failed to load one or more resources.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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

      <div className="home-container">
        <div className="page-section">
          <Text
            className="page-section-header"
            style={{ position: "relative", zIndex: 3 }}
          >
            Latest Mixes
          </Text>
          <div className="latest-mix-section">
            {loading && <Text>Loading...</Text>}
            {error && <Text>{error}</Text>}
            {!loading &&
              !error &&
              mixes
                .filter((mix) => mix.isLatest)
                .map((mix) => (
                  <MixCard
                    key={mix.id}
                    mix={mix}
                    artist={""}
                    title={""}
                    audioSrc={""}
                  />
                ))}
          </div>
        </div>

        <div className="page-section">
          <Text
            className="page-section-header"
            style={{ position: "relative", zIndex: 3 }}
          >
            Next Event
          </Text>
          <div className="latest-mix-section">
            {loading && <Text>Loading...</Text>}
            {error && <Text>{error}</Text>}
            {!loading &&
              !error &&
              events
                .filter((event) => event.isUpcoming)
                .map((event) => <EventCard2 key={event.id} event={event} />)}
          </div>
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
      </div>

      <Footer />
    </>
  );
}
