import React, { useState } from "react";
import './Estilos/App.css';
import { useNavigate } from 'react-router-dom';
import { useSession, setSession } from 'react-session';
import Atras from "./Imagenes/Atras.png";
import Vinicius from "./Imagenes/Usuario.png";

//const URL = "https://6e01-146-158-156-138.eu.ngrok.io/api/usuarios/login/";
const URL = "http://51.142.118.71:8000/api/usuarios/login/";


const Historial = () => {

  const [desc, setDes] = useState({ modo: "" });
  const [show, setShow] = useState(true);
  

  const navigate = useNavigate();
  const flechaAtras = async () => {
    navigate(process.env.PUBLIC_URL+ '/MenuJuego');
  };
  const clasico = async () => {
    setShow(false);
  };
  const equipos = async () => {
    setShow(false);
  };
  const tematica = async () => {
    setShow(false);
  };

  return (
  <div className="App">

    <img src={Atras} style={{width:"150px", height:"150px", top:"5%", left:"5%", cursor: "pointer", position: "absolute"}} onClick={() => flechaAtras()}/>
    <div className = "App-header" > 
        <div className="App-titulo" style= {{top: "7%"}} > Historial
            <div className="App-Quesitos" style= {{left: "35%"}}> </div> 
        </div>
    </div>

    
  </div>
  );
};

export default Historial;