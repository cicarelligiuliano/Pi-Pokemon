import React from "react";
import { typeColor } from "./const";

function FoundColor(el) {
  let color = typeColor[el.nombre];

  return <span style={{ backgroundColor: `${color}` }}>{el.nombre}</span>;
}

export default FoundColor;
