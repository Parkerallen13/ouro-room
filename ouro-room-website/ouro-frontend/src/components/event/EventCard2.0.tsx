import { useNavigate } from "react-router-dom";
import { Image } from "@mantine/core";

import "../../App.css";

type Event = {
  title: string;
  id: number;
  image: string;
};

export default function EventCard2({ event }: { event: Event }) {
  const navigate = useNavigate();
  return (
    <>
      <Image
        src={event.image}
        style={{ cursor: "pointer", borderRadius: 8 }}
        onClick={() => navigate(`/event-profile/${event.id}`)}
      />
    </>
  );
}
