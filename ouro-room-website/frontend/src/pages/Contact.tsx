import { Text } from "@mantine/core";
import Header from "../components/Header";
import "../App.css";
import Footer from "../components/Footer";

export default function Contact() {
  return (
    <>
      <div style={{ position: "relative", zIndex: 2 }}>
        <Header />
        <div
          className="contact-container"
          style={{ position: "relative", zIndex: 1 }}
        >
          <div>
            <div>
            <h1 className="section-header">Contact Us</h1>
            <form className="contact-item" onSubmit={(e) => e.preventDefault()}>
              <label className="contact-item">
                Name
                <input className="form-box" type="text" name="name" required />
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
          </div>
          {/* <div className="social-container">
            <h2 className="social-section">Follow Us</h2>
            <ul>
              <div className="social-section">
                <a
                  href="https://instagram.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </div>
              <div className="social-section">
                <a
                  href="https://linkedin.com/in/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </div>
              <div className="social-section">
                <a href="mailto:youremail@example.com">Email Us</a>
              </div>
            </ul>
          </div> */}
        </div>
        </div>
        <Footer />

      </div>

    </>
  );
}
