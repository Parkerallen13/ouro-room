import { Card, Text } from "@mantine/core";
import Record from "../assets/ouro-record.png"; // <-- You need a record image

export default function DJCard() {
  return (
    <Card className="dj-card">
      <Card.Section>
        <img src={Record} alt="record" className="backup-image-home" />
      </Card.Section>
      <div className="dj-card-text">

      <Text className="dj-card-description">
       DJ DTD and MATIS
      </Text>

     <Text>Artist Description</Text>
     <Text>Audio Track</Text>


      
      </div>
    </Card>
  );
}
