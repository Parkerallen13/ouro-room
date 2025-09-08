// src/components/dj/DJCardSelect.tsx
import { Text, Button } from "@mantine/core";
import "../../App.css";

type DJ = {
  id: number;
  imagePath?: string;
  artist: string;
  description: string;
  socialMedia: string;
  isSelected?: boolean;
  isSpotlight?: boolean;
};

interface Props {
  dj: DJ;
  selected: boolean;
  onClick: () => void;
  spotlight: boolean;
  onSetSpotlight: () => void;
  deleted: boolean;
  onDelete: () => void;
}

const DJCardSelect = ({ dj, selected, onClick, spotlight, onSetSpotlight, onDelete }: Props) => {
  return (
    <div className="select-card">
      <Text className="select-item-header">Name:</Text>
      <Text className="select-item-footer">{dj.artist}</Text>
      <Text className="select-item-header">Description:</Text>
      <Text className="select-item-footer">{dj.description}</Text>
      <div className="select-buttons">
        <Button
          className="select-button"
          style={{ backgroundColor: dj.isSelected ? "rgb(223, 177, 240)" : undefined }}
          onClick={(e) => { e.stopPropagation(); onClick(); }}
        >
          {selected ? "Deselect" : "Select"}
        </Button>
        <Button
          className="select-button"
          style={{ backgroundColor: dj.isSpotlight ? "rgb(223, 177, 240)" : undefined }}
          onClick={(e) => { e.stopPropagation(); onSetSpotlight(); }}
        >
          {spotlight ? "Remove Spotlight" : "Set Spotlight"}
        </Button>
        <Button
          className="delete-button"
          onClick={(e) => {
            e.stopPropagation();
            if (window.confirm("Are you sure you want to permanently delete this dj?")) {
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

export default DJCardSelect;