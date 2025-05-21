import PageButtons from "./PageButtons";
import StarField from "./StarBackground";
import "../App.css";

export default function Header() {
  return (
    <>
      <StarField className="starfield" />
      <div className="header" style={{ position: "relative", zIndex: 2 }}>
        <PageButtons />
      </div>
    </>
  );
}
