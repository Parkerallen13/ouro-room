import { Text, Button } from "@mantine/core";
import axios from "axios";
import "../../App.css";

type DJ = {
  id: number;
  image: string;
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

const DJCardSelect = ({
  dj,
  selected,
  onClick,
  spotlight,
  onSetSpotlight,
  onDelete,
}: Props) => {
  return (
    <div className="select-card">
      {/* <img
        style={{ width: "250px" }}
        className="select-item"
        src={dj.image}
        alt="DJ Image"
      /> */}
      <Text className="select-item-header">Name:</Text>
      <Text className="select-item-footer">{dj.artist}</Text>
      <Text className="select-item-header">Description:</Text>
      <Text className="select-item-footer">{dj.description}</Text>
      <div className="select-buttons">
        <Button
          className="select-button"
          style={{
            backgroundColor: dj.isSelected ? "rgb(223, 177, 240)" : undefined,
          }}
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          {selected ? "Deselect" : "Select"}
        </Button>
        <Button
          className="select-button"
          style={{
            backgroundColor: dj.isSpotlight ? "rgb(223, 177, 240)" : undefined,
          }}
          onClick={async (e) => {
            e.stopPropagation();
            try {
              await axios.patch(
                `http://localhost:8002/api/elements/djs/${dj.id}/`,
                {
                  isSpotlight: !spotlight,
                }
              );
              onSetSpotlight();
            } catch (err) {
              console.error("Failed to update spotlight status:", err);
            }
          }}
        >
          {spotlight ? "Remove Spotlight" : "Set Spotlight"}
        </Button>
        <Button
          className="delete-button"
          onClick={(e) => {
            if (
              window.confirm(
                "Are you sure you want to permanently delete this dj?"
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

export default DJCardSelect;