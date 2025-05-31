// CarCard.tsx
import React from "react";

interface CarCardProps {
  make: string;
  model: string;
  year: number;
}

export default function CarCard({ make, model, year }: CarCardProps) {
  return (
    <div style={{ color: "white", border: "1px solid white", padding: "1rem", borderRadius: "8px" }}>
      <h3>{make} {model}</h3>
      <p>{year}</p>
    </div>
  );
}