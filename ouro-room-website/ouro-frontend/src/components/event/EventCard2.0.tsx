import { useNavigate } from "react-router-dom";

import "../../App.css";

type Event = {
  id: number;
  image: string;
};

export default function EventCard2({ event }: { event: Event }) {
  const navigate = useNavigate();
  return (<img src={event.image} onClick={() => navigate(`/event-profile/${event.id}`)} />) 
}
