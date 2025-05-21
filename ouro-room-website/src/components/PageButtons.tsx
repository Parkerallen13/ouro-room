import { useNavigate, useLocation } from "react-router-dom";
import { Button, Image } from '@mantine/core';
import '../App.css';
import Logo from "../assets/ouro-logo.png";


export default function PageButtons() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navButtonStyle = {
    backgroundColor: 'transparent',
    border: 'none',
    margin: "10px",
    paddingBottom: 0,
    height: 'auto',
    lineHeight: 1,
    color: 'white',
  };

  const underlineStyle = (path: string) => ({
    borderBottom: isActive(path) ? '2px solid white' : 'none',
    paddingBottom: '10px',
  });

  return (
    <>
    
        <Image className="logo" src={Logo} onClick={() => navigate("/")}></Image>

      <Button style={navButtonStyle} onClick={() => navigate("/events")}>
        <span style={underlineStyle("/events")}>Events</span>
      </Button>
       <Button style={navButtonStyle} onClick={() => navigate("/djs")}>
        <span style={underlineStyle("/djs")}>DJs</span>
      </Button>
      <Button style={navButtonStyle} onClick={() => navigate("/mission")}>
        <span style={underlineStyle("/mission")}>About</span>
      </Button>
         <Button style={navButtonStyle} onClick={() => navigate("/gallery")}>
        <span style={underlineStyle("/gallery")}>Gallery</span>
      </Button>
         <Button style={navButtonStyle} onClick={() => navigate("/contact")}>
        <span style={underlineStyle("/contact")}>Contact</span>
      </Button>
    </>
  );
}