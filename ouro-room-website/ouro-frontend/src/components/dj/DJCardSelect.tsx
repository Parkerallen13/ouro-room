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
      <img
        style={{ width: "250px" }}
        className="select-item"
        src={dj.image}
        alt="DJ Image"
      />
      <Text className="select-item-header select-item">Name:</Text>
      <Text className="select-item-footer select-item">{dj.artist}</Text>
      <Text className="select-item-header select-item">Description:</Text>
      <Text className="select-item-footer select-item">{dj.description}</Text>
      <div className="select-buttons  select-item">
        <Button
          style={{
            backgroundColor: dj.isSelected ? "rgb(223, 177, 240)" : undefined,
          }}
          className="select-button"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          {selected ? "Deselect" : "Select"}
        </Button>

        <Button
          style={{
            backgroundColor: dj.isSpotlight ? "rgb(223, 177, 240)" : undefined,
          }}
          className="select-button"
          onClick={async (e) => {
            e.stopPropagation();
            try {
              await axios.patch(
                `http://localhost:8002/api/elements/djs/${dj.id}/`,
                {
                  isSpotlight: !spotlight,
                }
              );
              onSetSpotlight(); // Optional callback to re-fetch or update state in parent
            } catch (err) {
              console.error("Failed to update spotlight status:", err);
            }
          }}
        >
          {spotlight ? "Remove Spotlight" : "Set Spotlight"}
        </Button>

        <Button
          className="delete-button"
          style={{}}
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
          {" "}
          Delete
        </Button>
      </div>
    </div>
  );
};

export default DJCardSelect;
