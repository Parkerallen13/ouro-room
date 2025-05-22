import { Container, Text } from "@mantine/core";
import Header from "../components/Header";
import "../App.css";
import Record from "../assets/ouro-record.png"; // <-- You need a record image


export default function DJs() {
  return (
    <>
      <div style={{ position: "relative", zIndex: 2 }}>
        <Header />
        <div style={{ position: "relative", zIndex: 1 }}>
          <Text className="page-intro-text">OURO DJs</Text>
          <br />

          <Container>
            <Text>Artist Name</Text>
            <img src={Record} alt="record" className="gallery-test-image" />

            <Text>Artist Description</Text>
          </Container>
          <br />
          <Container>
            <Text>Artist Name</Text>
            <img src={Record} alt="record" className="gallery-test-image" />

            <Text>Artist Description</Text>
          </Container>
          <br />
          <Container>
            <Text>Artist Name</Text>
            <img src={Record} alt="record" className="gallery-test-image" />

            <Text>Artist Description</Text>
          </Container>
        </div>
      </div>
    </>
  );
}
