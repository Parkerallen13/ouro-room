import { useState } from "react";
import { Text } from "@mantine/core";
import Header from "../components/Header";
import "../App.css";
import Footer from "../components/Footer";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandX,
} from "@tabler/icons-react";

import { API } from '../api/config';


export default function Contact() {
  const [nameValue, setNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [messageValue, setMessageValue] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/api/contact`, {
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
              <a
                href="https://x.com/ourocollective"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <IconBrandFacebook size={32} />
              </a>
            </div>
          </div>
          <h1 className="social-section">Call Us:</h1>

          <Text>720-742-5481</Text>
          <div>
            <button
              className="social-section button message-button"
              onClick={() => setShowForm((prev) => !prev)}
            >
              Leave a Message
            </button>
            {showForm && (
              <form className="contact-item" onSubmit={handleSubmit}>
                <label className="contact-item">
                  Name
                  <input
                    className="contact-box"
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
                    className="contact-box"
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
                    className="contact-box"
                    name="message"
                    rows={5}
                    required
                    value={messageValue}
                    onChange={(e) => setMessageValue(e.target.value)}
                  />
                </label>

                <button className="contact-item card-button" type="submit">
                  Send
                </button>
              </form>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
