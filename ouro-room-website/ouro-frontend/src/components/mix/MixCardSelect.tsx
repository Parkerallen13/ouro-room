// src/components/mix/MixCardSelect.tsx
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
  onToggleSelected: () => void; // <-- renamed
  deleted: boolean;
  onDelete: () => void;
  onToggleLatest: () => void;
}

const MixCardSelect = ({
  mix,
  onToggleSelected,
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
            onToggleSelected(); // <-- toggle select
          }}
        >
          {mix.isSelected ? "Deselect" : "Select"}
        </Button>

        <Button
          className="select-button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleLatest();
          }}
          style={{
            backgroundColor: mix.isLatest ? "rgb(221, 135, 212)" : undefined,
          }}
        >
          {mix.isLatest ? "Undo Latest" : "Is Latest"}
        </Button>

        <Button
          className="delete-button"
          onClick={(e) => {
            e.stopPropagation();
            if (window.confirm("Are you sure you want to permanently delete this mix?")) {
              onDelete();
            }
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default MixCardSelect;