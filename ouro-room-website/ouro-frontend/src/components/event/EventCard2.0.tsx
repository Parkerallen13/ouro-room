import { Button, Container, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";

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
};

export default function EventCard({ event }: { event: Event }) {
  const navigate = useNavigate();
  return (

          <img  onClick={() => navigate(`/profile/${event.rsvp_link}`)} className="location-text event-card-item" />
          {event.image}

         
  );
}
