// pages/AdminPage.tsx
import { Button, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { IconFileUpload, IconLayersIntersect } from '@tabler/icons-react'

export default function AdminHome() {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <div
        className="admin-container"
        style={{ position: "relative", zIndex: 2 }}
      >
        <Text className="header-text">Admin Home</Text>
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
            onClick={() => navigate("/admin-choose")}
          >
            <IconLayersIntersect style={{ marginRight: "0.5rem" }} />

            Choose Content
          </Button>
          <Button
            className="admin-button"
            variant="outline"
            onClick={() => navigate("/admin-upload")}
          >
            <IconFileUpload style={{ marginRight: "0.5rem" }} />
            Upload Content
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
}
