const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors()); // Allow frontend requests from different origin
app.use(express.json()); // Parse JSON bodies

// Create transporter using Gmail (you can use others too)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "parkerjeanneallen@gmail.com",       // your Gmail address
    pass: "Pa7207425481$%",     // your Gmail app password or account password
  },
});

app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: email,
    to: "parkerjeanneallen@gmail.com", // destination email
    subject: `New message from ${name}`,
    text: `You got a new message from ${name} (${email}):\n\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Error sending message" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});