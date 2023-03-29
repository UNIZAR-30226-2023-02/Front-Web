import './Estilos/App.css';
import React from 'react';
//pepe
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




function App() {
  return (
    <div className="App">
      <header className="App-header">
          <div className="App-titulo" > Trivial B2B  
          <div>{colores()}</div>
          <button className="App-boton" style= {{top: "50%", left: "43%"}} onClcik={() => console.log("El botón Inicio de sesión ha sido presionado")}>
           Inicio Sesión
          </button>
          <button className="App-boton" style= {{top: "70%", left: "44%"}} onClcik={() => console.log("El botón Registrarse ha sido presionado")}>
            Registrarse
          </button>
          </div>
      </header>
    </div>
  );
}
export default App;



