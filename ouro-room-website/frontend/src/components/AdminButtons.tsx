// pages/AdminPage.tsx
import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export default function AdminButtons() {
  const navigate = useNavigate();
  return (
    <>
      
      <div style={{ position: "relative", zIndex: 2 }}>
        <div style={{ position: "relative", zIndex: 1 }}>
          <Button className="admin-button"
            variant="outline"
            onClick={() => navigate("/songform")}
          >
            Song Form
          </Button>
          <Button className="admin-button"
            variant="outline"
            onClick={() => navigate("/djform")}
          >
            DJ Form
          </Button>
          <Button className="admin-button"
            variant="outline"
            onClick={() => navigate("/eventform")}
          >
            Event Form
          </Button>
          <Button className="admin-button"
            variant="outline"
            onClick={() => navigate("/galleryform")}
          >
            Gallery Form
          </Button>
        </div>
      </div>
    </>
  );
}
