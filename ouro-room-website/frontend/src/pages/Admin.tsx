// pages/AdminPage.tsx
import Header from "../components/Header";
import AdminButtons from "../components/AdminButtons";
import "../App.css";
import Footer from "../components/Footer";

export default function Admin() {
  return (
    <>
      <div
        className="admin-container"
        style={{ position: "relative", zIndex: 2 }}
      >
        <Header />
        <div>
          <AdminButtons />
        </div>
      </div>
      <div style={{ position: "relative", zIndex: 10 }}>
        <Footer />
      </div>
    </>
  );
}
