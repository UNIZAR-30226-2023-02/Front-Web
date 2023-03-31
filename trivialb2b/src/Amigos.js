import React, { useState } from "react";
import './Estilos/App.css';
import { useNavigate } from 'react-router-dom';
import { useSession, setSession } from 'react-session';
import Cristiano from'./Imagenes/Cristiano.jpg';
import Tablero1 from'./Imagenes/Tablero1.png';

//const URL = "https://6e01-146-158-156-138.eu.ngrok.io/api/usuarios/login/";
const URL = "http://51.142.118.71:8000/api/usuarios/login/";

const Amigos = () => {
  const [body, setBody] = useState({ username: "", password: "" });
  const [errores, setErorres] = useState("");
  const [show, setShow] = useState(true);


  const vectorJugadores = ["Acher", "Miguel", "pablo", "Luis"];
  //const listaJugadores = jugadores.map((jugador) => jugador);


  const navigate = useNavigate();
  const handleChange = (e) => {
    setBody({
      ...body,
      [e.target.name]: e.target.value,
    });
  };

  return (
    
    <div className="App">
    </div>
  );
};

export default Amigos;