import React from "react";

interface CarCardProps {
  make: string;
  model: string;
  year: number;
  selected?: boolean;
  onClick?: () => void;
}

export default function CarCard({ make, model, year, selected, onClick }: CarCardProps) {
  return (
    <div
      style={{
        border: "1px solid white",
        padding: "1rem",
        backgroundColor: selected ? "#444" : "#222",
        color: "white",
        borderRadius: "8px",
      }}
    >
      <h3>{make} {model} ({year})</h3>
      <button onClick={onClick}>
        {selected ? "Deselect" : "Select"}
      </button>
    </div>
  );
}