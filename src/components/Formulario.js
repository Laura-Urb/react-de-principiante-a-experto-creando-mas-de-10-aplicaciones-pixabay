import React, { useState } from "react";
import Error from "./Error";

const Formulario = ({setBusqueda}) => {
  const [termino, setTermino] = useState("");
  const [error, setError] = useState(false);

  const buscarImagenes = (e) => {
    e.preventDefault();

    //validar
    if (termino.trim() === "") {
      setError(true);
      return;
    }
    setError(false);

    //Enviar término de búsqueda hacia el componente principal
    setBusqueda(termino);
  };

  return (
    <form onSubmit={buscarImagenes}>
      <div className="row">
        <div className="form-group col-md-8">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Buscar una imagen, ejemplo: futbol o café"
            onChange={(e) => setTermino(e.target.value)}
          ></input>
        </div>
        <div className="form-group col-md-4">
          <input
            type="submit"
            className="btn btn-lg btn-danger btn-block"
            value="Buscar"
          ></input>
        </div>
      </div>
      {error ? <Error mensaje="Ingrese un valor"></Error> : null}
    </form>
  );
};

export default Formulario;
