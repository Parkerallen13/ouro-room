// OpeningPage.tsx
import { useNavigate } from "react-router-dom";
import { Image } from "@mantine/core";
import StarField from "../components/StarBackground";
import Logo from "../assets/ouro-logo.png";
import Record from "../assets/record.png"; // <-- You need a record image
import "../App.css";

export default function OpeningPage() {
  const navigate = useNavigate();

  return (
    <>
      <StarField />
      <div className="opening-container">
        <img src={Record} alt="record" className="record" />
        <Image
          src={Logo}
          className="logo-overlay"
          onClick={() => navigate("/home")}
        />
      </div>
    </>
  );
}