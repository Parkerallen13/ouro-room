import { Button, Container, Text, Image } from "@mantine/core";
import Header from "../components/Header";
import Logo from "../assets/ouro-logo.png";
import { useNavigate } from "react-router-dom";
import NextEventCard from "../components/NextEventCard";
import EventCard from "../components/EventCard";
import Footer from "../components/Footer";

import "../App.css";
import LatestMixCard from "../components/LatestMix";
// import EventCard from "../components/EventCard";
import DJCard from "../components/DJSpotlightCard";

export default function Events() {
  const navigate = useNavigate();
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
        
        <EventCard />
        <EventCard />
        <EventCard />
      </div>
        <Footer/>


     
    </>
  );
}
