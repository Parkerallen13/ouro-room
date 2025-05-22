import { Text } from "@mantine/core";
import Header from "../components/Header";
import "../App.css";
import Record from "../assets/ouro-record.png"; // <-- You need a record image



export default function Gallery() {
  return (
    <>
      <div style={{ position: "relative", zIndex: 2 }}>
        <Header />
        <div style={{ position: "relative", zIndex: 1 }}>
        <Text className="page-intro-text">Gallery</Text>
                <img src={Record} alt="record" className="gallery-test-image" />
                <img src={Record} alt="record" className="gallery-test-image" />
                <img src={Record} alt="record" className="gallery-test-image" />
                <img src={Record} alt="record" className="gallery-test-image" />
                <img src={Record} alt="record" className="gallery-test-image" />

      </div>
      </div>
    </>
  );
}
