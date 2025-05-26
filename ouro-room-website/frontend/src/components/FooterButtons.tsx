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
      <Button className="header-button header-text" onClick={() => navigate("/home")}>
        <span style={underlineStyle("/home")}>HOME</span>
      </Button>
      <Button className="header-button header-text" onClick={() => navigate("/events")}>
        <span style={underlineStyle("/events")}>EVENTS</span>
      </Button>
      <Button className="header-button header-text" onClick={() => navigate("/djs")}>
        <span style={underlineStyle("/djs")}>DJs</span>
      </Button>
      <Button className="header-button header-text" onClick={() => navigate("/mixes")}>
        <span style={underlineStyle("/mixes")}>MIXES</span>
      </Button>
      <Button className="header-button header-text" onClick={() => navigate("/about")}>
        <span style={underlineStyle("/about")}>ABOUT</span>
      </Button>
      <Button className="header-button header-text" onClick={() => navigate("/gallery")}>
        <span style={underlineStyle("/gallery")}>GALLERY</span>
      </Button>
      <Button className="header-button header-text" onClick={() => navigate("/contact")}>
        <span style={underlineStyle("/contact")}>CONTACT</span>
      </Button>
      <Button
        style={{ fontWeight: "900" }}
        className="header-button header-text"
        onClick={() => navigate("/Admin")}
      >
        <span className="header-button header-text" style={underlineStyle("/Admin")}>ADMIN</span>
      </Button>
    </>
  );
}
