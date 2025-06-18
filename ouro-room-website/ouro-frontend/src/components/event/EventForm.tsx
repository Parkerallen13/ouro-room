import { useState } from "react";
import { TextInput, Button, Title, Stack, FileInput } from "@mantine/core";
import "../../App.css";
import axios from "axios";
import Header from "../Header";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer";

export default function EventForm() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");

  // Date parts state
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");

  // Artists with time as strings in format "HH:MM AM/PM"
  const [artists, setArtists] = useState([
    { name: "", hour: "", minute: "", ampm: "AM" },
  ]);

  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [rsvpLink, setRsvpLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = Array.from({ length: 11 }, (_, i) =>
    (new Date().getFullYear() + i).toString()
  );
  const months = monthNames.map((name, index) => ({
    label: name,
    value: (index + 1).toString().padStart(2, "0"),
  }));
  const days = Array.from({ length: 31 }, (_, i) =>
    (i + 1).toString().padStart(2, "0")
  );
  const hours = Array.from({ length: 12 }, (_, i) =>
    (i + 1).toString().padStart(2, "0")
  ); // 1-12
  const minutes = ["00", "30"]; // only 00 and 30
  const ampmOptions = ["AM", "PM"];

  const handleArtistChange = (
    index: number,
    field: "name" | "hour" | "minute" | "ampm",
    value: string
  ) => {
    const updated = [...artists];
    updated[index][field] = value;
    setArtists(updated);
  };

  const addArtist = () => {
    setArtists([...artists, { name: "", hour: "", minute: "", ampm: "AM" }]);
  };

  const removeArtist = (index: number) => {
    setArtists(artists.filter((_, i) => i !== index));
  };

  // Helper: Convert hour/minute/ampm to 24-hour time string "HH:MM"
  const convertTo24Hour = (hour: string, minute: string, ampm: string) => {
    let h = parseInt(hour);
    if (ampm === "PM" && h !== 12) h += 12;
    if (ampm === "AM" && h === 12) h = 0;
    return `${h.toString().padStart(2, "0")}:${minute}`;
  };

  const dateString = year && month && day ? `${year}-${month}-${day}` : "";
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!dateString) {
      alert("Please select a valid date");
      setLoading(false);
      return;
    }

    const artistsWithTime = artists.map(({ name, hour, minute, ampm }) => {
      if (!name || !hour || !minute || !ampm) {
        alert("Please fill out all artist time fields");
        setLoading(false);
        throw new Error("Incomplete artist fields");
      }
      return {
        name,
        time: convertTo24Hour(hour, minute, ampm),
      };
    });

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("date", dateString);
      formData.append("artists", JSON.stringify(artistsWithTime));
      formData.append("location", location);
      formData.append("description", description);
      formData.append("rsvp_link", rsvpLink);

      if (image) {
        formData.append("image", image);
      }

      console.log("Submitting event:", formData);

      await axios.post("http://localhost:8002/api/elements/events/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Event uploaded!");
      // Optionally clear the form here
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <div className="form-header-container">
        <div className="form-header">
          <Button
            className="back-button"
            variant="outline"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
          <Title className="admin-title">Add Event</Title>
        </div>

        <div
          className="form-element-container"
          style={{
            maxWidth: 600,
            margin: "0 auto",
            padding: "2rem",
            zIndex: "2",
            position: "relative",
          }}
        >
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <Stack>
              <FileInput
                className="form-element"
                label="Image (Event Poster)"
                placeholder="click to upload"
                value={image}
                onChange={setImage}
                accept="image/jpeg,image/png,application/pdf"
                required
              />
              <TextInput
                className="form-element"
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.currentTarget.value)}
                required
              />

              {/* Date dropdowns */}
              <div
                className="form-element"
                style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
              >
                <label>Date:</label>
                <select
                  value={month}
                  onChange={(e) => setMonth(e.currentTarget.value)}
                  required
                >
                  <option value="">Month</option>
                  {months.map((m) => (
                    <option key={m.value} value={m.value}>
                      {m.label}
                    </option>
                  ))}
                </select>

                <select
                  value={day}
                  onChange={(e) => setDay(e.currentTarget.value)}
                  required
                >
                  <option value="">Day</option>
                  {days.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                <select
                  value={year}
                  onChange={(e) => setYear(e.currentTarget.value)}
                  required
                >
                  <option value="">Year</option>
                  {years.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>

              {/* Artists */}
              {artists.map((artist, index) => (
                <div
                className="form-element"
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: "1rem",
                  }}
                >
                  <TextInput
                    label={`Artist ${index + 1}`}
                    placeholder="Artist name"
                    value={artist.name}
                    onChange={(e) =>
                      handleArtistChange(index, "name", e.currentTarget.value)
                    }
                    required
                  />

                  {/* Time dropdowns */}
                  <div
                    style={{
                      display: "flex",
                      gap: "0.25rem",
                      alignItems: "center",
                    }}
                  >
                    <label>Time:</label>

                    <select
                      value={artist.hour}
                      onChange={(e) =>
                        handleArtistChange(index, "hour", e.currentTarget.value)
                      }
                      required
                    >
                      <option value="">Hour</option>
                      {hours.map((h) => (
                        <option key={h} value={h}>
                          {h}
                        </option>
                      ))}
                    </select>

                    <select
                      value={artist.minute}
                      onChange={(e) =>
                        handleArtistChange(
                          index,
                          "minute",
                          e.currentTarget.value
                        )
                      }
                      required
                    >
                      <option value="">Minute</option>
                      {minutes.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>

                    <select
                      value={artist.ampm}
                      onChange={(e) =>
                        handleArtistChange(index, "ampm", e.currentTarget.value)
                      }
                      required
                    >
                      {ampmOptions.map((ap) => (
                        <option key={ap} value={ap}>
                          {ap}
                        </option>
                      ))}
                    </select>
                  </div>

                  {artists.length > 1 && (
                    <Button
                      color="red"
                      variant="light"
                      onClick={() => removeArtist(index)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}

              <Button
                style={{ marginTop: "1vw" }}
                className="header-button "
                variant="outline"
                onClick={addArtist}
              >
                + Add Artist
              </Button>

              <TextInput
                className="form-element"
                label="Location"
                value={location}
                onChange={(e) => setLocation(e.currentTarget.value)}
                required
              />
              <TextInput
                className="form-element"
                label="Description (Optional)"
                placeholder="byob/ breaking bad theme"
                value={description}
                onChange={(e) => setDescription(e.currentTarget.value)}
              />
              <TextInput
                className="form-element"
                label="RSVP Link"
                type="url"
                value={rsvpLink}
                onChange={(e) => setRsvpLink(e.currentTarget.value)}
                placeholder="https://example.com/rsvp"
                required
              />
              <Button className="submit-button" type="submit" loading={loading}>
                Add
              </Button>
            </Stack>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
