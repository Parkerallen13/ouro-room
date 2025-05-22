import { Button, Card, Container, Text } from "@mantine/core";
import Header from "../components/Header";
import "../App.css";

export default function Home() {
  return (
    <>
      <div style={{ position: "relative", zIndex: 2 }}>
        <Header />
        <div style={{ position: "relative", zIndex: 1 }}>
          <Text className="page-intro-text">Collective Rhythm. Infinite Sound</Text>
        <Container>
          <Text>Next Event</Text>
          <Text>date</Text>
          <div>
          <Text>Ouro Presents: Artist</Text>
          <Text>Location</Text>
          <Text>Description</Text>
          <Button variant="outline" style={{backgroundColor: "red"}}>RSVP</Button>
          </div>
        </Container>
        <br/>
        <Container>
          <Text>Latest Mixes</Text>
          <div>
            <Card>Card</Card>
            <Card>Card</Card>
            <Card>Card</Card>
            <Card>Card</Card>
          </div>
        </Container>
        <br/>

         <Container>
          <Text>DJ Spotlights</Text>
          <div>
            <Card>Card</Card>
          </div>
        </Container>
      </div>
      </div>
    </>
  );
}
