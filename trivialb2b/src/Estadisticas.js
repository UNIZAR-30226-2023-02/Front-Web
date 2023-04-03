import React, { useState } from "react";
import './Estilos/App.css';
import { useNavigate } from 'react-router-dom';
import { useSession, setSession } from 'react-session';

//const URL = "https://6e01-146-158-156-138.eu.ngrok.io/api/usuarios/login/";
const URL = "http://51.142.118.71:8000/api/usuarios/login/";


const Estadisticas = () => {

    const [position, setPosition] = useState(0);
  
    const handleClick = () => {
      // Mueve el componente 100px a la derecha
      setPosition(position + 100);
      
      // Vuelve a la posición original después de 1 segundo
      setTimeout(() => {
        setPosition(position - 100);
      }, 1000);
    };

  return (
    <div onClick={handleClick}
    style={{
      position: "absolute",
      left: `${position}px`,
      width: "50px",
      height: "50px",
      backgroundColor: "red"
    }}
  />
  );
};

export default Estadisticas;