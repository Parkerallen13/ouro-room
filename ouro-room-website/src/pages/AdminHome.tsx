// pages/AdminPage.tsx
import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function AdminHome() {
  const navigate = useNavigate();
  return (
    <>
      <div style={{ position: "relative", zIndex: 2 }}>
        <Header />
        <div style={{ position: "relative", zIndex: 1 }}>
          <Button
            variant="outline"
            className="form-button"
            onClick={() => navigate("/songform")}
          >
            Song Form
          </Button>
          <Button
            variant="outline"
            className="form-button"
            onClick={() => navigate("/djform")}
          >
            DJ Form
          </Button>
          <Button
            variant="outline"
            className="form-button"
            onClick={() => navigate("/eventform")}
          >
            Event Form
          </Button>
          <Button
            variant="outline"
            className="form-button"
            onClick={() => navigate("/galleryform")}
          >
            Gallery Form
          </Button>
        </div>
      </div>
    </>
  );
}
