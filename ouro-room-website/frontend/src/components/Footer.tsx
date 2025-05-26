import FooterButtons from "./FooterButtons";
import "../App.css";
import { Text, Image } from "@mantine/core";
import Logo from "../assets/ouro-logo.png";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  return (
    <>
      <div className="footer-container">
        <div className="footer-item">
          <Image
            className="footer-logo"
            src={Logo}
            onClick={() => navigate("/")}
          ></Image>
        </div>
        <div style={{ position: "relative" }} className="footer-item">
          <FooterButtons />
        </div>
      </div>
    </>
  );
}
