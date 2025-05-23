import { Button, Container, Text } from "@mantine/core";
import Header from "../components/Header";
import "../App.css";
import EventCard from "../components/EventCard";

export default function Events() {
  return (
    <>
      <div style={{ position: "relative", zIndex: 2 }}>
        <Header />
        <div className=""style={{ position: "relative", zIndex: 1 }}>
          <Text className="page-intro-text">
            Experience the Collective Rhythm
          </Text>
          <Button className="general-button glow-button">All Events</Button>
          <Button className="general-button glow-button">Upcoming</Button>
          <Button className="general-button glow-button">Past Events</Button>
           <Container className="page-section">
                      <Text className="page-section-header">Events</Text>
                      <div className="event-container">
                        <EventCard/>
                        <EventCard/>
                        <EventCard/>
                        <EventCard/>
          
                      </div>
                    </Container>
        </div>
      </div>
    </>
  );
}
