import { useNavigate, useLocation, Link } from "react-router-dom";
import { Button, Image } from "@mantine/core";
import "../App.css";
import Logo from "../assets/ouro-logo.png";

export default function PageButtons() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const underlineStyle = (path: string) => ({
    borderBottom: isActive(path) ? "2px solid white" : "none",
    paddingBottom: "10px",
  });

  return (
    <>
      {/* <Link to="/add-car">Add a Car</Link> */}
      <div className="logo-container">
        <div>
        <Image
          className="logo"
          src={Logo}
          onClick={() => navigate("/")}
        ></Image>
        </div>
        <div>
      <Button
        className="header-button header-text"
        onClick={() => navigate("/home")}
      >
        <span style={underlineStyle("/home")}>HOME</span>
      </Button>
      <Button
        className="header-button  header-text"
        onClick={() => navigate("/events")}
      >
        <span style={underlineStyle("/events")}>EVENTS</span>
      </Button>
      <Button
        className="header-button  header-text"
        onClick={() => navigate("/djs")}
      >
        <span style={underlineStyle("/djs")}>DJs</span>
      </Button>
      <Button
        className="header-button  header-text"
        onClick={() => navigate("/mixes")}
      >
        <span style={underlineStyle("/mixes")}>MIXES</span>
      </Button>
      <Button
        className="header-button  header-text"
        onClick={() => navigate("/about")}
      >
        <span style={underlineStyle("/about")}>ABOUT</span>
      </Button>
      <Button
        className="header-button  header-text"
        onClick={() => navigate("/gallery")}
      >
        <span style={underlineStyle("/gallery")}>GALLERY</span>
      </Button>
      <Button
        className="header-button  header-text"
        onClick={() => navigate("/contact")}
      >
        <span style={underlineStyle("/contact")}>CONTACT</span>
      </Button>
      </div>
      </div>

    </>
  );
}
