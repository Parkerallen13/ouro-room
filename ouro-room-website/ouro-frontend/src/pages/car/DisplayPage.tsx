import { useSelectedCars } from "../../context/SelectedCarsContext";
import SelectedCarCard from "../car/SelectedCarCard";

const DisplayPage = () => {
  const { selectedCars } = useSelectedCars();

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Selected Cars</h1>
      {selectedCars.length === 0 ? (
        <p>No cars selected.</p>
      ) : (
        selectedCars.map((car) => <SelectedCarCard key={car.id} car={car} />)
      )}
    </div>
  );
};

export default DisplayPage;