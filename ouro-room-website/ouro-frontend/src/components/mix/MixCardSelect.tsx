import { Text, Button } from "@mantine/core";
import "../../App.css";

type Mix = {
  id: number;
  title: string;
  artist: string;
  audio: string;
  image?: string;
};

interface Props {
  mix: Mix;
  selected: boolean;
  onClick: () => void;
  setLatest: boolean;
  onSetLatest: () => void;
  deleted: boolean;
  onDelete: () => void;
}

const MixCardSelect = ({
  mix,
  selected,
  onClick,
  setLatest,
  onSetLatest,
  deleted,
  onDelete,
}: Props) => {
  return (
    <div className="select-card select-item">
      <Text className="select-item-header select-item">Title:</Text>
      <Text className="select-item-footer select-item">{mix.title}</Text>
      <Text className="select-item-header select-item">Artist:</Text>
      <Text className="select-item-footer select-item">{mix.artist}</Text>
      <Text className="select-item-header select-item">Audio Clip:</Text>
      <audio className="select-item-footer select-item" src={mix.audio} controls />

      <div className="select-buttons select-item">
        {/* Select / Deselect */}
        <Button
          className="select-button"
          style={{
            backgroundColor: selected ? "green" : undefined,
            color: selected ? "white" : undefined,
          }}
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          {selected ? "Deselect" : "Select"}
        </Button>

      
       <Button
      
          className="delete-button"
          style={{
          }}
          onClick={(e) => {
            if (window.confirm("Are you sure you want to permanently delete this event?"))
            e.stopPropagation();
            onDelete();
          }}
        > Delete
        </Button>
      </div>
    </div>
  );
};

export default MixCardSelect;