import React, { useEffect, useState } from "react";
import CarCard from "../components/CarCard";
import { useSelectedCars } from "../context/SelectedCarsContext";
import { Link } from "react-router-dom";

interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
}

export default function CarAdmin() {
  const [cars, setCars] = useState<Car[]>([]);
  const { selectedCars, addCar, removeCar } = useSelectedCars(); // <-- make sure removeCar is here

  useEffect(() => {
    fetch("http://localhost:8000/api/cars/")
      .then((res) => res.json())
      .then((data) => setCars(data));
  }, []);

  // <-- Put toggleCarSelection here, inside CarAdmin component
  function toggleCarSelection(car: Car): void {
    const isSelected = selectedCars.some((c) => c.id === car.id);
    if (isSelected) {
        console.log(`Removing car: ${car.id}`);
      removeCar(car.id); // remove from selected
    } else {
        console.log(`Adding car: ${car.id}`);
      addCar(car); // add to selected
    }
  }

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
      {cars.map((car) => (
        <CarCard
          key={car.id}
          make={car.make}
          model={car.model}
          year={car.year}
          selected={selectedCars.some((c) => c.id === car.id)}
          onClick={() => toggleCarSelection(car)} // calls toggle here
        />
      ))}
       <Link to="/display">Go to Selected Cars</Link>
    </div>
  );
}