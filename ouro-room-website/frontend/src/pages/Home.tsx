import { Button, Container, Text, Image } from "@mantine/core";
import Header from "../components/Header";
import Logo from "../assets/ouro-logo.png";
import { useNavigate } from 'react-router-dom'


import "../App.css";
import LatestMixCard from "../components/LatestMix";
// import EventCard from "../components/EventCard";
import DJCard from "../components/DJSpotlightCard";

export default function Home() {
  const navigate = useNavigate();
  return (
    <>
      <div style={{ position: "relative", zIndex: 2 }}>
        <Header />
        <Image className="home-logo" src={Logo} onClick={() => navigate("/")}></Image>

        <div style={{ position: "relative", zIndex: 1 }}>
          <Text className="page-intro-text">
            Collective Rhythm. Infinite Sound
          </Text>
          <Container className="page-section">
            <Text className="page-section-header">Next Event</Text>
            <div className="next-event-container">
              <Text className="next-event-date">date</Text>
              <div className="next-event-info">
                <div className="next-event-card">
                  {/* <Image className="next-event-item" height="200px" src={Record} /> */}
                  <div className="next-event-item">
                    <Text style={{ fontSize: "2rem"}}>
                      Ouro Presents: Artist
                    </Text>
                    <Text style={{ fontSize: "1rem"}}>Location</Text>
                    <Text style={{ fontSize: "1rem"}}>Description</Text>
                    <Button variant="outline" className="rsvp-button glow-button">
                      RSVP
                    </Button>
                  </div>
                  
                </div>
              </div>
            </div>
          </Container>
          <Container className="page-section">
            <Text className="page-section-header">Latest Mixes</Text>
            <div className="latest-mix-container">
              <LatestMixCard />
              <LatestMixCard />
              <LatestMixCard />
            </div>
          </Container>

          <Container className="page-section">
            <Text className="page-section-header">DJ Spotlight</Text>
            <div className="latest-mix-container">
              <DJCard />
            </div>
          </Container>
        </div>
      </div>
    </>
  );
}
