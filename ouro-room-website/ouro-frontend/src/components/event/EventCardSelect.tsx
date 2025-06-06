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
};

type Props = {
  event: Event;
  onClick: () => void;
  selected: boolean;
  deleted: boolean;
  onDelete: () => void;
};

const EventCardSelect = ({
  event,
  onClick,
  selected,
  deleted,
  onDelete,
}: Props) => {
  return (
    <div className="event-select-card">
      <div className="select-row">
        <Text className="select-item-header">Title:</Text>
        <Text className="select-item-footer select-item">{event.title}</Text>
      </div>
      <div className="select-row">
        <Text className="select-item-header">Date:</Text>
        <Text className="select-item-footer select-item">{event.date}</Text>
      </div>{" "}
      <div className="flex flex-col space-y-1">
        <Text className="text-sm font-semibold text-gray-500">Artists</Text>
        {event.artists?.length > 0 ? (
          event.artists.map((artist, index) => (
            <Text key={index} className="text-gray-700">
              {artist.name} — {artist.time}
            </Text>
          ))
        ) : (
          <Text className="text-gray-500 italic">No artists listed</Text>
        )}
      </div>
      <div className="select-row">
        <Text className="select-item-header">Location:</Text>
        <Text className="select-item-footer select-item">{event.location}</Text>
      </div>
      <div className="rsvp-container">
        <Button
          className="url-button  select-item"
          component="a"
          href={event.rsvp_link}
          target="_blank"
          rel="noopener noreferrer"
        >
          RSVP URL
        </Button>
      </div>
      <div>
        <Button className="select-button  select-item" onClick={onClick}>
          {selected ? "Deselect" : "Select"}
        </Button>
        <Button
          className="delete-button"
          style={{}}
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
          {" "}
          Delete
        </Button>
      </div>
    </div>
  );
};

export default EventCardSelect;
