import { Text } from "@mantine/core";
import Header from "../components/Header";
import "../App.css";
import Footer from "../components/Footer";
import {
  IconBrandInstagram,
  IconBrandLinkedin,
  IconMail,
} from "@tabler/icons-react";

export default function Contact() {
  return (
    <>
      <div style={{ position: "relative", zIndex: 2 }}>
        <Header />
        <div
          className="contact-container"
          style={{ position: "relative", zIndex: 1 }}
        >
          <div className="social-container">
                <h2 className="social-section">Follow Us</h2>
                <div className="social-icons">
                  <a
                    href="https://instagram.com/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                  >
                    <IconBrandInstagram size={32} />
                  </a>
                  <a
                    href="https://linkedin.com/in/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                  >
                    <IconBrandLinkedin size={32} />
                  </a>
                  <a
                    href="mailto:youremail@example.com"
                    className="social-link"
                  >
                    <IconMail size={32} />
                  </a>
                </div>
              </div>
            <div>
              <h1 className=" contact-item header-text">Contact Us</h1>
              <form
                className="contact-item"
                onSubmit={(e) => e.preventDefault()}
              >
                <label className="contact-item">
                  Name
                  <input
                    className="form-box"
                    type="text"
                    name="name"
                    required
                  />
                </label>

                <label className="contact-item">
                  Email
                  <input
                    className="form-box"
                    type="email"
                    name="email"
                    required
                  />
                </label>

                <label className="contact-item">
                  Message
                  <textarea
                    className="form-box"
                    name="message"
                    rows={5}
                    required
                  />
                </label>

                <button className="contact-item button" type="submit">
                  Send
                </button>
              </form>
          <div>
              
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
