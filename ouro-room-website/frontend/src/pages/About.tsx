import Header from "../components/Header";
import "../App.css";
import Footer from "../components/Footer";
import { Text } from "@mantine/core";
import Record from "../assets/record.png";

export default function About() {
  return (
    <>
      <Header />

      <div
        className="about-container home-container"
        style={{ position: "relative", zIndex: 2 }}
      >
        <div className="rolling-record-container">
          <img src={Record} alt="rolling record" className="rolling-record" />
        </div>
        <div style={{ position: "relative", zIndex: 1 }}>
          <Text className="header-text about-item">About Ouro</Text>
          <Text className="body-text about-item">
            Ouro started as a DIY response to a scene that felt too filtered. No
            velvet ropes. No polished stages. Just a room, a system, and people
            who care about the music.
          </Text>
          <Text className="body-text about-item">
            Based in Boulder and now popping up across Denver, Ouro brings
            together DJs from around the area for intimate, high-energy sets
            that feel more like a session than a show. Inspired by Boiler Room,
            we keep it low to the ground—close to the crowd and stripped of
            pretense.
          </Text>
          <Text className="body-text about-item">
            Our mission is simple: create a space where local artists can play
            what they want, how they want. No rules, no warm-ups, no
            hierarchy—just music, people, and the moment.
          </Text>
        </div>
      </div>
      <Footer />
    </>
  );
}
