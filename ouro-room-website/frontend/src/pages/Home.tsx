import { Text, Image } from "@mantine/core";
import Header from "../components/Header";
import Logo from "../assets/ouro-logo.png";
import { useNavigate } from "react-router-dom";
import NextEventCard from "../components/NextEventCard";
import Footer from "../components/Footer";

import "../App.css";
import LatestMixCard from "../components/LatestMix";
// import EventCard from "../components/EventCard";
import DJCard from "../components/DJSpotlightCard";

export default function Home() {
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
        Collective Rhythm. Infinite Sound
      </Text>
      <div className="page-section">
        <Text
          className="page-section-header"
          style={{ position: "relative", zIndex: 3 }}
        >
          Next Event
        </Text>
        <NextEventCard />
      </div>

      <div className="page-section">
        <Text
          className="page-section-header"
          style={{ position: "relative", zIndex: 3 }}
        >
          Latest Mixes
        </Text>
        <div
          className="latest-mix-scroll-container"
          style={{ position: "relative", zIndex: 2 }}
        >
          {" "}
          <LatestMixCard />
          <LatestMixCard />
          <LatestMixCard />
        </div>
      </div>

      <div className="page-section">
        <Text
          className="page-section-header"
          style={{ position: "relative", zIndex: 3 }}
        >
          DJ Spotlight
        </Text>
        <div
          className="latest-mix-container"
          style={{ position: "relative", zIndex: 2 }}
        >
          <DJCard />
        </div>
      </div>
        <Footer/>

    </>
  );
}
