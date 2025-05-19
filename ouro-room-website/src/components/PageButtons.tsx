import { useNavigate } from "react-router-dom";
import { Button } from '@mantine/core'

export default function PageButtons () {
    const navigate = useNavigate();

    return (
        <>
         <Button onClick={() => navigate("/")} >Home</Button>
         <Button onClick={() => navigate("/mission")} >Mission</Button>
         <Button onClick={() => navigate("/events")} >Events</Button>
         <Button onClick={() => navigate("/artists")} >Artists</Button>
         </>
    )
}