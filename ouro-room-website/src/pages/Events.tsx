import { Text } from "@mantine/core";
import Header from "../components/Header";
import "../App.css";

export default function Events() {
  return (
    <>
      <div style={{ position: "relative", zIndex: 2 }}>
        <Header />
        <div style={{ position: "relative", zIndex: 1 }}>
        <Text>Test</Text>
      </div>
      </div>
    </>
  );
}
