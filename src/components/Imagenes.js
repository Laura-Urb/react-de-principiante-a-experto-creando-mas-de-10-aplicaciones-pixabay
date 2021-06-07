import React from "react";
import Imagen from "./Imagen";

const Imagenes = ({ imagenes }) => {
  return (
    <div className="col-12 p-5 row">
      {imagenes &&
        imagenes.map((imagen) => (
          <Imagen key={imagen.id} imagen={imagen}></Imagen>
        ))}
    </div>
  );
};

export default Imagenes;
