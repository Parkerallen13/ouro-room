// pages/AdminPage.tsx
import Header from "../components/Header";
import AdminButtons from "../components/AdminButtons";
import '../App.css'

export default function Admin() {
  return (
    <>
      <div style={{ position: "relative", zIndex: 2 }}>
        <Header />
        <div>
        <AdminButtons />
        </div>
      </div>
    </>
  );
}
