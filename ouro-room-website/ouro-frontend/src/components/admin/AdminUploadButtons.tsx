// pages/AdminPage.tsx
import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer";

export default function AdminUploadButtons() {
  const navigate = useNavigate();
  return (
    <>
      <div style={{ position: "relative", zIndex: 2 }}>
        <div style={{ position: "relative", zIndex: 1 }}>
          <Button
            className="back-button"
            variant="outline"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
          <Button
            className="admin-button"
            variant="outline"
            onClick={() => navigate("/mix-form")}
          >
            Add Mix
          </Button>
          <Button
            className="admin-button"
            variant="outline"
            onClick={() => navigate("/dj-form")}
          >
            Add DJ
          </Button>
          <Button
            className="admin-button"
            variant="outline"
            onClick={() => navigate("/event-form")}
          >
            Add Event
          </Button>
          <Button
            className="admin-button"
            variant="outline"
            onClick={() => navigate("/gallery-form")}
          >
            Add Gallery Images
          </Button>
        </div>
      </div>
    </>
  );
}
