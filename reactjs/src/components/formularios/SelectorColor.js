import React from "react";
import {FormLabel} from '@chakra-ui/react';
import '../../assets/styles/color.css';

export default function SelectorColor ({ selectedColor, onColorChange }) {

  const handleColorClick = (event, color) => {
    event.preventDefault(); 
    onColorChange(color);
  };

  return (
    <>
    <FormLabel htmlFor="color">Seleccione un color para el viaje</FormLabel>
    <div className="circle-picker">
      {colors.map((color, index) => (
        <div
          key={index}
          className={`color-circle ${selectedColor === color ? "selected" : ""}`}
          style={{ backgroundColor: color }}
          onClick={(event) => handleColorClick(event,color)}
        ></div>
      ))}
    </div>
    </>
  )
}

const colors = [
  "#FFC0CB", // Rosa claro
  "#C2FFC2", // Verde muy clarito
  "#FF7F50", // Naranja coral
  "#D8BFD8", // Violeta clarito
  "#ADD8E6",  // Azul pastel
  "#B18F6A", //Marrón clarito
  "#F44E3B", // Rojo oscuro
  "#FE9200", // Naranja
  "#FCDC00", // Amarillo brillante
  "#00FF00",  // Verde lima
  "#3498DB", // Azul claro
  "#9B59B6", // Morado
  "#1ABC9C" // Turquesa
];