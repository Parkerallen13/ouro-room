// pages/AdminPage.tsx
import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";

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
            onClick={() => navigate("/mix-select")}
          >
            Choose Mixes
          </Button>
          <Button className="admin-button"
            variant="outline"
            onClick={() => navigate("/dj-select")}
          >
            Choose DJs
          </Button>
          <Button className="admin-button"
            variant="outline"
            onClick={() => navigate("/event-select")}
          >
            Choose Events
          </Button>
          <Button className="admin-button"
            variant="outline"
            onClick={() => navigate("/gallery-select")}
          >
            Choose Gallery Images
          </Button>
        </div>
      </div>
    </>
  );
}
