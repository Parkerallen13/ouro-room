import "../../App.css";

type Image = {
  id: number;
  image: string;
  isSelected: boolean;
};

export default function GalleryCard({ image }: { image: Image }) {
  return (
    <>
      <img className="gallery-card" src={image.image} />
    </>
  );
}
