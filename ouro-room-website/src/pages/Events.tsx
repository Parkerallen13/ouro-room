import { Button, Card, Text } from "@mantine/core";
import Header from "../components/Header";
import "../App.css";

export default function Events() {
  return (
    <>
      <div style={{ position: "relative", zIndex: 2 }}>
        <Header />
        <div style={{ position: "relative", zIndex: 1 }}>
        <Text className="page-intro-text">Experience the Collective Rhythm</Text>
        <Button>All Events</Button>
        <Button>Upcoming</Button>
        <Button>Past Events</Button>
       <Card>card</Card>
       <Card>card</Card>
       <Card>card</Card>
       <Card>card</Card>
      </div>
      </div>
    </>
  );
}
