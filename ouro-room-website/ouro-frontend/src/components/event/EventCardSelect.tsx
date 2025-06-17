import { Text, Button } from "@mantine/core";
import "../../App.css";

type Event = {
  id: number;
  title: string;
  date: string;
  artists: { name: string; time: string }[];
  location: string;
  description: string;
  rsvp_link: string;
  isSelected: boolean;
  isUpcoming: boolean;
};

type Props = {
  event: Event;
  onClick: () => void;
  selected: boolean;
  deleted: boolean;
  onDelete: () => void;
  onToggleUpcoming: () => void;
};

const EventCardSelect = ({
  event,
  onClick,
  selected,
  deleted,
  onDelete,
  onToggleUpcoming,
}: Props) => {
  return (
    <div className="select-card">
      <Text className="select-item-header">Title:</Text>
      <Text className="select-item-footer">{event.title}</Text>
      <Text className="select-item-header">Date:</Text>
      <Text className="select-item-footer">
        {new Date(event.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </Text>
      <Text className="select-item-header">Artists:</Text>
      {event.artists?.length > 0 ? (
        event.artists.map((artist, index) => (
          <Text key={index} className="select-item-footer">
            {artist.name} — {artist.time}
          </Text>
        ))
      ) : (
        <Text className="text-gray-500 italic">No artists listed</Text>
      )}
      <Text className="select-item-header">Location:</Text>
      <Text className="select-item-footer">{event.location}</Text>
      <div className="select-buttons">
        <Button
          className="select-button"
          style={{
            backgroundColor: selected ? "rgb(223, 177, 240)" : undefined,
          }}
          onClick={onClick}
        >
          {selected ? "Deselect" : "Select"}
        </Button>
        <Button
          className="select-button"
          onClick={onToggleUpcoming}
          style={{
            backgroundColor: event.isUpcoming
              ? "rgb(223, 177, 240)"
              : undefined,
          }}
        >
          {event.isUpcoming ? "Undo Upcoming" : "Mark as Upcoming"}
        </Button>
        <Button
          className="delete-button"
          onClick={(e) => {
            if (
              window.confirm(
                "Are you sure you want to permanently delete this event?"
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

export default EventCardSelect;