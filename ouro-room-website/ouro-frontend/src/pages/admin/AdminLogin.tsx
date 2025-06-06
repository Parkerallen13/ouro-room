import { Text } from "@mantine/core";
import Header from "../../components/Header";
import "../../App.css";
import Footer from "../../components/Footer";
import {
  IconBrandInstagram,
  IconBrandLinkedin,
  IconMail,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();
  return (
    <>
        <Header />

      <div style={{ position: "relative", zIndex: 2 }}>
        <div
          className="admin-login-container"
          style={{ position: "relative", zIndex: 1 }}
        >
          <div>
            <h1 className=" contact-item header-text">Login</h1>
            <form
              className="contact-item"
              onSubmit={(e) => {
                e.preventDefault();
                navigate("/admin");
              }}
            >
              <label className="contact-item">
               Username
                <input
                  className="login-box"
                  type="email"
                  name="email"
                  required
                />
              </label>

              <label className="contact-item">
                Password
                <input
                  className="login-box"
                  type="email"
                  name="email"
                  required
                />
              </label>

              <button className="contact-item button" type="submit">
                Login
              </button>
            </form>
            <div></div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
