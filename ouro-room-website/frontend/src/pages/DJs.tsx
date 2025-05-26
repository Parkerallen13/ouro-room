import { Text, Image } from "@mantine/core";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

import "../App.css";
import DJCard from "../components/DJSpotlightCard";
import Footer from "../components/Footer";

export default function DJs() {
  return (
    <>
      <Header />

      <div className="page-section">
        <Text
          className="page-section-header"
          style={{ position: "relative", zIndex: 3 }}
        >
          DJs
        </Text>

        <DJCard />
        <DJCard />
        <DJCard />
        <DJCard />
        <DJCard />
        <DJCard />
      </div>
      <Footer />
    </>
  );
}
