// pages/AdminPage.tsx
import Header from "../components/Header";
import AdminUploadButtons from "../components/AdminUploadButtons";
import "../App.css";
import Footer from "../components/Footer";
import { Text } from '@mantine/core';

export default function AdminUpload() {
  return (
    <>
      <Header />

      <div
        className="admin-container"
        style={{ position: "relative", zIndex: 2 }}
      >
        <Text className="header-text">Upload Content for Website</Text>

        <div>
          <AdminUploadButtons />
        </div>
      </div>
      <div style={{ position: "relative", zIndex: 10 }}>
        <Footer />
      </div>
    </>
  );
}
