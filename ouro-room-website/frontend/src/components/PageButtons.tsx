import { useNavigate, useLocation } from "react-router-dom";
import { Button, Image } from '@mantine/core';
import '../App.css';
import Logo from "../assets/ouro-logo.png";


export default function PageButtons() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const underlineStyle = (path: string) => ({
    borderBottom: isActive(path) ? '2px solid white' : 'none',
    paddingBottom: '10px',
  });

  return (
    <>
    
        <Image className="logo" src={Logo} onClick={() => navigate("/")}></Image>
<Button className="button" onClick={() => navigate("/home")}>
        <span style={underlineStyle("/home")}>HOME</span>
      </Button>
      <Button className="button" onClick={() => navigate("/events")}>
        <span style={underlineStyle("/events")}>EVENTS</span>
      </Button>
       <Button className="button" onClick={() => navigate("/djs")}>
        <span style={underlineStyle("/djs")}>DJs</span>
      </Button>
      <Button className="button" onClick={() => navigate("/about")}>
        <span style={underlineStyle("/about")}>ABOUT</span>
      </Button>
         <Button className="button" onClick={() => navigate("/gallery")}>
        <span style={underlineStyle("/gallery")}>GALLERY</span>
      </Button>
         <Button className="button" onClick={() => navigate("/contact")}>
        <span style={underlineStyle("/contact")}>CONTACT</span>
      </Button>
      <Button className="button" onClick={() => navigate("/adminhome")}>
        <span style={underlineStyle("/adminhome")}>ADMIN</span>
      </Button>
    </>
  );
}