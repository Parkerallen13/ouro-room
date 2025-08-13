import "../../App.css";

type ImageT = { id: number; image: string; isSelected: boolean };

export default function GalleryCard({ image }: { image: ImageT }) {
  return <img className="gallery-card" src={image.image} alt="" />;
}