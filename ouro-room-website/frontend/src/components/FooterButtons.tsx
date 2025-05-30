import { useNavigate, useLocation } from "react-router-dom";
import { Button, Image } from "@mantine/core";
import "../App.css";

export default function FooterButtons() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const underlineStyle = (path: string) => ({
    borderBottom: isActive(path) ? "2px solid white" : "none",
    paddingBottom: "10px",
  });

  return (
    <>
      <Button
        className="footer-button footer-text"
        onClick={() => navigate("/home")}
      >
        <span>HOME</span>
      </Button>
      <Button
        className="footer-button footer-text"
        onClick={() => navigate("/events")}
      >
        <span>EVENTS</span>
      </Button>
      <Button
        className="footer-button footer-text"
        onClick={() => navigate("/djs")}
      >
        <span>DJs</span>
      </Button>
      <Button
        className="footer-button footer-text"
        onClick={() => navigate("/mixes")}
      >
        <span>MIXES</span>
      </Button>
      <Button
        className="footer-button footer-text"
        onClick={() => navigate("/about")}
      >
        <span>ABOUT</span>
      </Button>
      <Button
        className="footer-button footer-text"
        onClick={() => navigate("/gallery")}
      >
        <span>GALLERY</span>
      </Button>
      <Button
        className="footer-button footer-text"
        onClick={() => navigate("/contact")}
      >
        <span>CONTACT</span>
      </Button>
    </>
  );
}
