import { Text, Button } from "@mantine/core";
import "../../App.css";
import axios from "axios";

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
  selected: boolean;
  onClick: () => void;
  deleted: boolean;
  onDelete: () => void;
  onToggleLatest: () => void;
}

const MixCardSelect = ({
  mix,
  selected,
  onClick,
  onDelete,
  onToggleLatest,
}: Props) => {
  return (
    <div className="select-card select-item">
      <Text className="select-item-footer select-item">Title:</Text>
      <Text className="select-item-header select-item">{mix.title}</Text>
      <Text className="select-item-footer select-item">Artist:</Text>
      <Text className="select-item-header select-item">{mix.artist}</Text>
      <Text className="select-item-footer select-item">Audio Clip:</Text>
      {mix.audio ? (
        <audio
          className="select-item-footer select-item"
          src={mix.audio}
          controls
        />
      ) : (
        <Text className="select-item-footer select-item">
          No audio available
        </Text>
      )}

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
          className="select-button select-item"
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
