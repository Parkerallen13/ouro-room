import { Text, Button } from "@mantine/core";
import "../../App.css";

type Mix = {
  id: number;
  title: string;
  artist: string;
  audio: string;
  isSelected?: boolean;
  isLatest: boolean;
};

interface Props {
  mix: Mix;
  onClick: () => void;
  deleted: boolean;
  onDelete: () => void;
  onToggleLatest: () => void;
}

const MixCardSelect = ({
  mix,
  onClick,
  onDelete,
  onToggleLatest,
}: Props) => {
  return (
    <div className="select-card">
      <Text className="select-item-header">Title:</Text>
      <Text className="select-item-footer">{mix.title}</Text>
      <Text className="select-item-header">Artist:</Text>
      <Text className="select-item-footer">{mix.artist}</Text>
      <Text className="select-item-header">Audio Clip:</Text>
      {mix.audio ? (
        <audio className="select-item-footer" src={mix.audio} controls />
      ) : (
        <Text className="select-item-footer">No audio available</Text>
      )}
      <div className="select-buttons">
        <Button
          className="select-button"
          style={{
            backgroundColor: mix.isSelected ? "green" : undefined,
            color: mix.isSelected ? "white" : undefined,
          }}
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          {mix.isSelected ? "Deselect" : "Select"}
        </Button>
        <Button
          className="select-button"
          onClick={onToggleLatest}
          style={{
            backgroundColor: mix.isLatest ? "rgb(221, 135, 212)" : undefined,
          }}
        >
          {mix.isLatest ? "Undo Latest" : "Is Latest"}
        </Button>
        <Button
          className="delete-button"
          onClick={(e) => {
            if (
              window.confirm(
                "Are you sure you want to permanently delete this mix?"
              )
            )
              e.stopPropagation();
            onDelete();
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default MixCardSelect;