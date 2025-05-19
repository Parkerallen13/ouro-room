import { useNavigate } from "react-router-dom";
import { Button } from '@mantine/core'
import '../App.css';

export default function PageButtons () {
    const navigate = useNavigate();

    return (
        <>
         <Button className='button' onClick={() => navigate("/")} >Home</Button>
         <Button className='button' onClick={() => navigate("/mission")} >Mission</Button>
         <Button className='button' onClick={() => navigate("/events")} >Events</Button>
         <Button className='button' onClick={() => navigate("/artists")} >Artists</Button>
         </>
    )
}