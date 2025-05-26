import record from "../assets/record.png";
import "../App.css";
import Header from "../components/Header";

const images = Array(6).fill(record); // 6 visible per row

export default function Gallery() {
  return (
    <>
      <Header />
      <div className="gallery-container">
        <div className="gallery-row">
          <img className="gallery-img" src={record} />
          <img className="gallery-img" src={record} />
          <img className="gallery-img" src={record} />
        </div>
        <div className="gallery-row">
          <img className="gallery-img" src={record} />
          <img className="gallery-img" src={record} />
          <img className="gallery-img" src={record} />
        </div>
        <div className="gallery-row">
          <img className="gallery-img" src={record} />
          <img className="gallery-img" src={record} />
          <img className="gallery-img" src={record} />
        </div>
        <div className="gallery-row">
          <img className="gallery-img" src={record} />
          <img className="gallery-img" src={record} />
          <img className="gallery-img" src={record} />
        </div>
      </div>
    </>
  );
}
