import React, { useEffect, useState } from "react";

interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
}

export default function CarSelector() {
  const [cars, setCars] = useState<Car[]>([]);
  const [selectedCarId, setSelectedCarId] = useState<number | null>(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/cars/")
      .then((res) => res.json())
      .then((data) => setCars(data));
  }, []);

  const selectedCar = cars.find((car) => car.id === selectedCarId);

  return (
    <div style={{ color: "white" }}>
      <label htmlFor="car-select">Choose a car:</label>
      <select
        id="car-select"
        onChange={(e) => setSelectedCarId(Number(e.target.value))}
        defaultValue=""
      >
        <option value="" disabled>
          Select a car
        </option>
        {cars.map((car) => (
          <option key={car.id} value={car.id}>
            {car.make} {car.model} ({car.year})
          </option>
        ))}
      </select>

      {selectedCar && (
        <div style={{ marginTop: "1rem" }}>
          <strong>You selected:</strong> {selectedCar.make} {selectedCar.model} ({selectedCar.year})
        </div>
      )}
    </div>
  );
}