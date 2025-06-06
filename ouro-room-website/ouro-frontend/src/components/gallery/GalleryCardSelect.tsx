import React, { useState } from "react";
import { Button } from "@mantine/core";
import "../../App.css";

type Image = {
  id: number;
  image: string;
};

interface Props {
  image: Image; // contains id and image string
  selected: boolean;
  onClick: () => void;
  deleted: boolean; // You are not using this inside component though
  onDelete: () => void;
}

const GalleryCardSelect = ({ image, selected, onClick, onDelete }: Props) => {
  return (
    <div className="gallery-select-card">
      <img
        className="gallery-select-img"
        src={image.image}
        alt="Gallery Image"
      />
      <div>
        <Button
          className="select-button"
          style={{
            backgroundColor: selected ? "green" : undefined,
            color: selected ? "white" : undefined,
          }}
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          {selected ? "Deselect" : "Select"}
        </Button>
        <Button
          className="delete-button"
          style={{}}
          onClick={(e) => {
            if (
              window.confirm(
                "Are you sure you want to permanently delete this event?"
              )
            ) {
              e.stopPropagation();
              onDelete();
            }
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default GalleryCardSelect;
