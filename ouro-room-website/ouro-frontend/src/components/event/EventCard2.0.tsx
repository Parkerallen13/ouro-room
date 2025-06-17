import { useNavigate } from "react-router-dom";
import { Image, Text, Box } from "@mantine/core";
import "../../App.css";
import fallbackImage from "../../assets/record.png"; // use your imported image here

type Event = {
  title: string;
  id: number;
  image: string | null;
  date: string;
};

export default function EventCard2({ event }: { event: Event }) {
  const navigate = useNavigate();
  console.log("Final event image URL:", event.image);

  return (
    <Box
      onClick={() => navigate(`/event-profile/${event.id}`)}
      className='poster-img'
    >
      {event.image ? (
        <Image
          className="poster-img"
          src={event.image}
          alt={event.title}
          style={{ borderRadius: 8, maxWidth: "100%" }}
        />
      ) : (
        <>
          <img
            src={event.image || fallbackImage}
            alt={event.title}
            style={{ maxWidth: "100%", borderRadius: 8 }}
          />
        </>
      )}
    </Box>
  );
}
