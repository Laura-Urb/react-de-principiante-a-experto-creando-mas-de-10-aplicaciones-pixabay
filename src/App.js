import React, { useEffect, useState } from "react";
import Formulario from "./components/Formulario";
import Imagenes from "./components/Imagenes";

function App() {
  const [busqueda, setBusqueda] = useState("");
  const [imagenes, setImagenes] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [paginas, setPaginas] = useState(1);

  useEffect(() => {
    if (busqueda === "") return;

    const consultarAPI = async () => {
      const imagenesPorPagina = 30;
      const key = "1732750-d45b5378879d1e877cd1d35a6";
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaActual}`;

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      setImagenes(resultado.hits);

      // calcular el total de paginas
      const calcularTotalPaginas = Math.ceil(
        resultado.totalHits / imagenesPorPagina
      );
      setPaginas(calcularTotalPaginas);

       // Mover la pantalla hacia arriba
       const jumbotron = document.querySelector('.jumbotron');
       jumbotron.scrollIntoView({ behavior: 'smooth' })
    };
    consultarAPI();
  }, [busqueda, paginaActual]);

  const paginaAnterior = () => {
    if (paginaActual > 1) setPaginaActual(paginaActual - 1);
  };

  const paginaSiguiente = () => {
    if (paginaActual < paginas) setPaginaActual(paginaActual + 1);
  };

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imágenes</p>
        <Formulario setBusqueda={setBusqueda}></Formulario>
      </div>
      <div className="row justify-content-center">
        <Imagenes imagenes={imagenes}></Imagenes>

        {paginaActual === 1 ? null : (
          <button
            type="button"
            className="bbtn btn-info mr-1"
            onClick={paginaAnterior}
          >
            &laquo; Anterior
          </button>
        )}

        {paginaActual === paginas ? null : (
          <button
            type="button"
            className="bbtn btn-info"
            onClick={paginaSiguiente}
          >
            Siguiente &raquo;
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
