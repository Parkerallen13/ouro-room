import { Card, Text } from "@mantine/core";
import Record from "../assets/ouro-record.png"; // <-- You need a record image

export default function LatestMixCard() {
  return (
    <Card className="latest-mix-card">
      <Card.Section>
        <img src={Record} alt="record" className="backup-image-home" />
      </Card.Section>

      <Text style={{ fontSize: "2rem"}} className="latest-mix-card-description">
       Artist Name
      </Text>

      <Text className="latest-mix-card-description">
        Description
      </Text>

      <Text className="latest-mix-card-description">
        Audio Track
      </Text>
    </Card>
  );
}
