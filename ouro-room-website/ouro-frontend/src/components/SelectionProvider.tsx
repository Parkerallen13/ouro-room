// src/context/SelectionContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

type SelectableItem = {
  id: number;
  type: "dj" | "mix" | "event" | "gallery-img"; // You can add more types
  data: any;
};

type SelectionContextType = {
  selectedItems: SelectableItem[];
  toggleItem: (item: SelectableItem) => void;
  isSelected: (id: number, type: string) => boolean;
  clearSelections: () => void;
};

const SelectionContext = createContext<SelectionContextType | undefined>(undefined);

export function SelectionProvider({ children }: { children: ReactNode }) {
  const [selectedItems, setSelectedItems] = useState<SelectableItem[]>([]);

  const toggleItem = (item: SelectableItem) => {
    setSelectedItems((prev) =>
      prev.find((i) => i.id === item.id && i.type === item.type)
        ? prev.filter((i) => !(i.id === item.id && i.type === item.type))
        : [...prev, item]
    );
  };

  const isSelected = (id: number, type: string) =>
    selectedItems.some((i) => i.id === id && i.type === type);

  const clearSelections = () => setSelectedItems([]);

  return (
    <SelectionContext.Provider value={{ selectedItems, toggleItem, isSelected, clearSelections }}>
      {children}
    </SelectionContext.Provider>
  );
}

export const useSelection = () => {
  const context = useContext(SelectionContext);
  if (!context) throw new Error("useSelection must be used within a SelectionProvider");
  return context;
};