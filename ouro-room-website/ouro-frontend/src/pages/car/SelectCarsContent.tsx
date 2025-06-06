import React, { createContext, useContext, useState, ReactNode } from "react";

interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
}

interface SelectedCarsContextType {
  selectedCars: Car[];
  addCar: (car: Car) => void;
  removeCar: (id: number) => void;
}

const SelectedCarsContext = createContext<SelectedCarsContextType | undefined>(undefined);

export const SelectedCarsProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCars, setSelectedCars] = useState<Car[]>([]);

  const addCar = (car: Car) => {
    setSelectedCars((prev) => [...prev, car]);
  };

  const removeCar = (id: number) => {
    setSelectedCars((prev) => prev.filter((car) => car.id !== id));
  };

  return (
    <SelectedCarsContext.Provider value={{ selectedCars, addCar, removeCar }}>
      {children}
    </SelectedCarsContext.Provider>
  );
};

export const useSelectedCars = () => {
  const context = useContext(SelectedCarsContext);
  if (!context) throw new Error("useSelectedCars must be used within SelectedCarsProvider");
  return context;
};