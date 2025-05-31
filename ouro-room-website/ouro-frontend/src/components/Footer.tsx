import FooterButtons from "./FooterButtons";
import "../App.css";
import { Text, Image, Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import {
  IconBrandInstagram,
  IconBrandLinkedin,
  IconMail,
} from "@tabler/icons-react";

export default function Footer() {
  const navigate = useNavigate();
  return (
    <>
      <div className="footer-container">
        <div className="site-footer footer-item">
          <p>© 2025 Ouro Room — All rights reserved.</p>
        </div>
        <div className="footer-item">
          <FooterButtons />
        </div>

        <div className="footer-social-icons footer-item">
          <a
            style={{ color: "grey" }}
            href="https://instagram.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <IconBrandInstagram size={32} />
          </a>
          <a
            style={{ color: "grey" }}
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <IconBrandLinkedin size={32} />
          </a>
            
          <a style={{ color: "grey" }} href="mailto:youremail@example.com" className="social-link">
            <IconMail size={32} />
          </a>
        </div>
        <Button
          className="footer-item footer-button"
          style={{ fontWeight: "900" }}
          onClick={() => navigate("/admin-login")}
        >
          <span>ADMIN</span>
        </Button>
      </div>
    </>
  );
}
