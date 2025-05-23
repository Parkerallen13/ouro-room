import { Text } from "@mantine/core";
import Header from "../components/Header";
import "../App.css";

export default function Contact() {
  return (
    <>
      <div style={{ position: "relative", zIndex: 2 }}>
        <Header />
        <div style={{ position: "relative", zIndex: 1 }}>
        {/* <Text className="page-intro-text">Contact Us</Text> */}
      </div>
      </div>
    </>
  );
}
