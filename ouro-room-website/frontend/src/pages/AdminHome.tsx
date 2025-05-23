// pages/AdminPage.tsx
import Header from "../components/Header";
import AdminHomeButtons from "../components/AdminButtons";

export default function AdminHome() {
  return (
    <>
      <div style={{ position: "relative", zIndex: 2 }}>
        <Header />
        <AdminHomeButtons />
      </div>
    </>
  );
}
