import './Estilos/App.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const App = () => {

  const navigate = useNavigate();

  const onSubmit1 = async (event) => {
      navigate(process.env.PUBLIC_URL+ '/InicioSesion');
  };
  const onSubmit2 = async (event) => {
    navigate(process.env.PUBLIC_URL+ '/Registrarse');
};

  return (
    <div className="App">
      <header className="App-header">
          <div className="App-titulo" > Trivial B2B  
          <div className="App-Quesitos"> </div> 
          </div>
          <button className="App-boton" style= {{top: "50%", left: "43%"}} type="submit" onClick={() => onSubmit1()}>
          Inicio Sesión
          </button>
          <button className="App-boton" style= {{top: "70%", left: "44%"}} type="submit"  onClick={() => onSubmit2()}>
          Registrarse
          </button>
      </header>
    </div>
  );
};

export default App;



