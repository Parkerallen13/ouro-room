// pages/AdminPage.tsx
import Header from "../../components/Header";
import "../../App.css";
import Footer from "../../components/Footer";
import AdminChooseButtons from "../../components/admin/AdminChooseButtons";
import { Text } from '@mantine/core';

export default function AdminChoose() {
  return (
    <>
        <Header />

      <div
        className="admin-container"
        style={{ position: "relative", zIndex: 2 }}
      >
        <Text className="page-intro-text">Choose Content for Website</Text>

        <div>
          <AdminChooseButtons />
        </div>
      </div>
      <div style={{ position: "relative", zIndex: 10 }}>
      </div>
        <Footer />

    </>
  );
}
