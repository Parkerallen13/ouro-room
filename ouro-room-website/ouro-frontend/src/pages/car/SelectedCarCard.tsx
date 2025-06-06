import { Card, Text } from "@mantine/core";
import { Car } from "../../context/SelectedCarsContext";

interface Props {
  car: Car;
}

const SelectedCarCard = ({ car }: Props) => {
  return (
    <Card shadow="md" radius="lg" padding="lg" style={{ backgroundColor: "#111", color: "#fff", marginBottom: "1rem" }}>
      <Text size="lg">
        {car.year} {car.make} {car.model}
      </Text>
    </Card>
  );
};

export default SelectedCarCard;