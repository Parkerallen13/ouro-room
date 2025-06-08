import { useState } from "react";
import { Text } from "@mantine/core";
import Header from "../components/Header";
import "../App.css";
import Footer from "../components/Footer";
import {
  IconBrandInstagram,
  IconBrandX,
  IconMail,
  IconPhone,
} from "@tabler/icons-react";

export default function Contact() {
  // Add state for form inputs
  const [nameValue, setNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [messageValue, setMessageValue] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8002/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nameValue,
          email: emailValue,
          message: messageValue,
        }),
      });

      const result = await res.json();
      alert(result.message);
      // Optionally clear form on success
      if (res.ok) {
        setNameValue("");
        setEmailValue("");
        setMessageValue("");
      }
    } catch (error) {
      alert("Error sending message");
    }
  };

  return (
    <>
      <div style={{ position: "relative", zIndex: 2 }}>
        <Header />
        <div
          className="contact-container"
          style={{ position: "relative", zIndex: 1 }}
        >
          <div className="social-container">
            <h2 className="social-section">Follow Us:</h2>
            <div className="social-icons">
              <a
                href="https://instagram.com/ourocollective"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <IconBrandInstagram size={32} />
              </a>

              <a
                href="https://x.com/ourocollective"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <IconBrandX size={32} />
              </a>
            </div>
          </div>
           <h1 className="social-section">Call Us:</h1>

              <Text>720-742-5481</Text>
          <div>
            <h1 className="social-section">Leave a Message</h1>
            {/* <a href="tel:7207425481" className="social-link">
              <IconPhone size={32} />
            </a>
            <a
              href="mailto:parkerjeanneallen@gmail.com"
              className="social-link"
            >
              <IconMail size={32} />
            </a> */}
            <form className="contact-item" onSubmit={handleSubmit}>
              <label className="contact-item">
                Name
                <input
                  className="form-box"
                  type="text"
                  name="name"
                  required
                  value={nameValue}
                  onChange={(e) => setNameValue(e.target.value)}
                />
              </label>

              <label className="contact-item">
                Email
                <input
                  className="form-box"
                  type="email"
                  name="email"
                  required
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
                />
              </label>

              <label className="contact-item">
                Message
                <textarea
                  className="form-box"
                  name="message"
                  rows={5}
                  required
                  value={messageValue}
                  onChange={(e) => setMessageValue(e.target.value)}
                />
              </label>

              <button className="contact-item button" type="submit">
                Send
              </button>
            </form>
           

          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
