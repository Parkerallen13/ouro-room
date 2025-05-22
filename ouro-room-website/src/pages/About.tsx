import { Text } from "@mantine/core";
import Header from "../components/Header";
import "../App.css";

export default function About() {
  return (
    <>
      <div style={{ position: "relative", zIndex: 2 }}>
        <Header />
        <div style={{ position: "relative", zIndex: 1 }}>
        <Text className="page-intro-text">About OURO</Text>
      </div>
      </div>
    </>
  );
}
