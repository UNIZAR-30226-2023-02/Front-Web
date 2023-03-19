import './Estilos/App.css';
import React from 'react';

function colores() {
  return (
    <div className="quesitos">
      <div className="quesito quesito-verde"></div>
      <div className="quesito quesito-amarillo"></div>
      <div className="quesito quesito-naranja"></div>
      <div className="quesito quesito-rojo"></div>
      <div className="quesito quesito-azul"></div>
      <div className="quesito quesito-rosa"></div>
    </div>
  );
}

function Inicio() {
    return (
      <div className="App">
        <header className="App-header">
            <div className="App-titulo" > Trivial B2B  
            <div>{colores()}</div>
            </div>
        </header>
      </div>
    );
  }

  export default Inicio;
