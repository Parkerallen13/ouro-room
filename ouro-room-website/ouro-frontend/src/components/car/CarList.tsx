import React, { useEffect, useState } from "react";
import CarCard from "./CarCard";

interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
}

export default function CarList() {
  const [selectedCarId, setSelectedCarId] = useState<number | null>(null);
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("CarList mounted, fetching cars...");
    fetch("http://localhost:8000/api/cars/")
      .then((res) => {
        console.log("Fetch response:", res);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Cars data received:", data);
        setCars(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{ position: "relative", zIndex: 9, color: "white" }}>Loading cars...</p>;
  if (error) return <p style={{ position: "relative", zIndex: 9, color: "white" }}>Error: {error}</p>;

  return (
    <div style={{ position: "relative", zIndex: 9, display: "flex", gap: "1rem" }}>
      {cars.map((car) => (
  <CarCard
    key={car.id}
    make={car.make}
    model={car.model}
    year={car.year}
    onClick={() => setSelectedCarId(car.id)}
    selected={selectedCarId === car.id}
  />
))}
    </div>
  );
}
