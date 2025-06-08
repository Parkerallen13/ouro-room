// pages/AdminPage.tsx
import { Button, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { IconFileUpload, IconLayersIntersect } from "@tabler/icons-react";
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

        <Text style={{ fontSize: "1.5vw" }}>Upload Content</Text>
        <AdminUploadButtons />
        <Text style={{ fontSize: "1.5vw" }}>Choose Content</Text>
        <AdminChooseButtons />
      </div>
      {/* </div> */}
      <Footer />
    </>
  );
}
