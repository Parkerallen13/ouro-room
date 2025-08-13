import { Button } from "@mantine/core";
import "../../App.css";

type ImageT = { id: number; image: string };

interface Props {
  image: ImageT;
  selected: boolean;
  onClick: () => void;
  deleted: boolean;     // unused but kept for API parity
  onDelete: () => void;
}

const GalleryCardSelect = ({ image, selected, onClick, onDelete }: Props) => {
  return (
    <div className="gallery-select-card">
      <img className="gallery-select-img" src={image.image} alt="Gallery" />
      <div>
        <Button
          className="select-button"
          style={{
            backgroundColor: selected ? "rgb(223, 177, 240)" : undefined,
            color: selected ? "white" : undefined,
          }}
          onClick={(e) => { e.stopPropagation(); onClick(); }}
        >
          {selected ? "Selected" : "Select"}
        </Button>
        <Button
          className="delete-button"
          onClick={(e) => {
            e.stopPropagation();
            if (window.confirm("Delete this image permanently?")) onDelete();
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default GalleryCardSelect;