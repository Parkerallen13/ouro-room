import FooterButtons from "./FooterButtons";
import "../App.css";
import { Text, Image, Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import {
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandX,
  IconMail,
  IconHome,
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
            href="https://instagram.com/ourocollective"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-icons"
          >
            <IconBrandInstagram size={32} />
          </a>

          <a
            href="https://x.com/ourocollective"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-icons"
          >
            <IconBrandX size={32} />
          </a>
        </div>
        <div className="footer-item" style={{ display: "flex", gap: "8px" }}>
          <Button
            className="footer-button"
            style={{ fontWeight: "900" }}
            onClick={() => navigate("/admin-login")}
          >
            <span>ADMIN</span>
          </Button>

          <Button
            variant="transparent"
            onClick={() => navigate("/admin-home")}
            style={{
              padding: "4px",
              height: "auto",
              display: "flex",
              alignItems: "center",
              backgroundColor: "transparent",
              boxShadow: "none",
            }}
          >
            <IconHome size={18} color="gray" />
          </Button>
        </div>
      </div>
    </>
  );
}
