import { Text, Button } from "@mantine/core";
import "../../App.css";

type Event = {
  id: number;
  title: string;
  image: string;
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
  onClick?: () => void;
  deleted: boolean;
  onDelete: () => void;
  onToggleUpcoming: () => void;
  onToggleSelection: () => void;
};

const EventCardSelect2 = ({
  event,
  onClick,
  deleted,
  onDelete,
  onToggleUpcoming,
  onToggleSelection,
}: Props) => {
  const posterSrc = event.image || "/assets/record.png"; // graceful fallback

  return (
    <>
      <div className="event-select-card">
        <div>
          <div className="select-row">
            <img
              src={posterSrc}
              alt={`${event.title} poster`}
              style={{ width: "200px", margin: "3vw" }}
              className="select-item"
            />
          </div>
        </div>
        <div>
          <div className="select-row">
            <Text className="select-item-header">Title:</Text>
            <Text className="select-item-footer select-item">{event.title}</Text>
          </div>

          <div className="select-row">
            <Text className="select-item-header select-item">Date:</Text>
            <Text className="select-item-footer select-item">
              {new Date(event.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Text>
          </div>

          <div className="flex flex-col space-y-1">
            <Text className="select-item-header select-item">Artists:</Text>
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

          <div className="rsvp-container"></div>

          <div>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onToggleSelection();
              }}
              style={{
                backgroundColor: event.isSelected ? "rgb(223, 177, 240)" : undefined,
              }}
              className="select-button select-item"
            >
              {event.isSelected ? "Deselect" : "Select"}
            </Button>

            <Button
              className="select-button select-item"
              onClick={(e) => {
                e.stopPropagation();
                onToggleUpcoming();
              }}
              style={{
                backgroundColor: event.isUpcoming ? "rgb(223, 177, 240)" : undefined,
              }}
            >
              {event.isUpcoming ? "Undo Upcoming" : "Mark as Upcoming"}
            </Button>

            <Button
              className="delete-button"
              onClick={(e) => {
                e.stopPropagation(); // <-- move this BEFORE confirm
                if (
                  window.confirm("Are you sure you want to permanently delete this event?")
                ) {
                  onDelete();
                }
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventCardSelect2;