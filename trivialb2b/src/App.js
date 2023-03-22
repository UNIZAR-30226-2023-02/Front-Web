import './Estilos/App.css';
import React from 'react';

/*Inputs no controlados
class Componente extends React.Component {
  render() {
    return (
      <form>
        <h1> {"Formularios no controlados"} </h1>
        <input type="text" placeholder='Nombre'/>
        <input type="text" placeholder='Correo'/>
        <button>Enviar</button>
      </form>

      hola
    )
  }
}*/



const App = () => {
  return (
    <div className="App">
      <header className="App-header">
          <div className="App-titulo" > Trivial B2B  
          <div className="App-Quesitos"> </div> 
          </div>
          <button className="App-boton" style= {{top: "50%", left: "43%"}} onClcik={() => console.log("El botón Inicio de sesión ha sido presionado")}>
          Inicio Sesión
          </button>
          <button className="App-boton" style= {{top: "70%", left: "44%"}} onClcik={() => console.log("El botón Registrarse ha sido presionado")}>
          Registrarse
          </button>
      </header>
    </div>
  );
};

export default App;




