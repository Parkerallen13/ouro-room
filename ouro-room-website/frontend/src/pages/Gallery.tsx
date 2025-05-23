import { useEffect, useState } from "react";
import "../App.css";
import Header from "../components/Header";

function chunkArray<T>(arr: T[], size: number): T[][] {
  const res: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    res.push(arr.slice(i, i + size));
  }
  return res;
}

export default function Gallery() {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    fetch("/gallery-images.json") // no "../" because public is the root for assets
      .then((res) => res.json())
      .then((data: string[]) => {
        setImages(data);
      })
      .catch(console.error);
  }, []);

  const rows = chunkArray(images, 5);

  return (
    <div>
      <Header />
      <div className="gallery-container">
        {rows.map((row, index) => (
          <div
            className={`gallery-row ${index % 2 !== 0 ? "reverse" : ""}`}
            key={index}
          >
            <div className="gallery-row-inner">
              {[...row, ...row].map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`gallery-img-${i}`}
                  className="backup-image-gallery"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}