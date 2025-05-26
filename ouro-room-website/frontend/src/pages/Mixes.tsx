import { Button, Container, Text, Image } from "@mantine/core";
import Header from "../components/Header";
import Logo from "../assets/ouro-logo.png";
import { useNavigate } from "react-router-dom";
import MixCard from "../components/Mixcard";
import Footer from "../components/Footer";

import "../App.css";
import LatestMixCard from "../components/LatestMix";
// import EventCard from "../components/EventCard";
import DJCard from "../components/DJSpotlightCard";

export default function Mixes() {
  return (
    <>
      <Header />

      <div className="page-section">
        <Text
          className="page-section-header"
          style={{ position: "relative", zIndex: 3 }}
        >
          All Mixes
        </Text>
        <div
          className="latest-mix-scroll-container"
          style={{ position: "relative", zIndex: 2 }}
        >
          {" "}
          <MixCard />
          <MixCard />
          <MixCard />
          <MixCard />
          <MixCard />
          <MixCard />
        </div>
      </div>
      <Footer/>
    </>
  );
}
