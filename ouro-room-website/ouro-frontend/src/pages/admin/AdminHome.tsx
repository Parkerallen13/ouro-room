// pages/AdminPage.tsx
import { Button, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import AdminUploadButtons from "../../components/admin/AdminUploadButtons";
import AdminChooseButtons from "../../components/admin/AdminChooseButtons";

export default function AdminHome() {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <div
        className="admin-container"
        style={{ position: "relative", zIndex: 2 }}
      >
        <div
          style={{ display: "flex", flexDirection: "row", marginBottom: "5vh" }}
        >
          <Button
            className="back-button"
            variant="outline"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
          <Text className="header-text">Admin Home</Text>
        </div>
        <div className="admin-section">
          <Text className="admin-header">Upload Content</Text>
          <AdminUploadButtons />
        </div>
        <div className="admin-section">
          <Text className="admin-header">Choose Content</Text>
          <AdminChooseButtons />
        </div>
      </div>
      <Footer />
    </>
  );
}
