// pages/AdminPage.tsx
import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

export default function AdminChooseButtons() {
  const navigate = useNavigate();
  return (
    <>
      
      <div style={{ position: "relative", zIndex: 2 }}>
        <div style={{ position: "relative", zIndex: 1 }}>
             <Button className="back-button"
            variant="outline"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
          <Button className="admin-button"
            variant="outline"
            onClick={() => navigate("/choose-mixes")}
          >
            Choose Mixes
          </Button>
          <Button className="admin-button"
            variant="outline"
            onClick={() => navigate("/choose-djs")}
          >
            Choose DJs
          </Button>
          <Button className="admin-button"
            variant="outline"
            onClick={() => navigate("/choose-events")}
          >
            Choose Events
          </Button>
          <Button className="admin-button"
            variant="outline"
            onClick={() => navigate("/choose-gallery-images")}
          >
            Choose Gallery Images
          </Button>
        </div>
      </div>
    </>
  );
}
