import React, { useState } from "react";
import './Estilos/App.css';
import { useNavigate } from 'react-router-dom';
import amigos from'./Imagenes/Amigos.png';

//const URL = "https://6e01-146-158-156-138.eu.ngrok.io/api/usuarios/login/";
const URL = "https://51.142.118.71:8000/api/usuarios/login/";

const InicioSesion = () => {
  const [show, setShow] = useState(true);
  

  return (
    <div className="App">
      <header className="App-header">
          <div className="App-titulo" style= {{top: "7%"}} > TrivialB2B 
          <div className="App-Quesitos"> </div> </div>

          <button
        type="button"
        onClick={() => {
          setShow(!show);
        }}
      >
        Mostrar {show ? 'Div 2' : 'Div 1'}
      </button>

      {show ? (
        <div style={{ color: 'red' }}>Div 1</div>
      ) : (
        <div style={{ color: 'blue' }}>Div 2</div>
      )}

        </header>
    </div>
  );
};

export default InicioSesion;
