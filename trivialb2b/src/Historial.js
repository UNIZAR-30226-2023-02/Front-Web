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

  function Partida(props) {
    return (    
      <div style={{ width: "800px", height: "100px", position: "relative", border: "2px solid white", backgroundColor:props.color, borderRadius:"50px", marginTop:"20px", cursor:"pointer"}} onClick={props.function}>
        <img src={props.src} style={{width:"11%", height:"90%", top:"5%", left:"5%", cursor: "pointer", position: "absolute"}}/>
        <a  style= {{ color: "white", fontSize: "30px", fontStyle: "italic", top:"20%", left:"40%", position: "absolute"}}> {props.modo} </a>
      </div>
    );
  }

  function Descripcion(props) {
    return (    
      <div>
        <a  style= {{ color: "white", fontSize: "40px", fontStyle: "italic", top:"17%", left:"20%", position: "absolute"}}> {props.modo} </a>
        <button className="App-boton" style= {{position: "absolute", top: "10%", left: "80%" }} onClick={() => { setShow(true)}}>Volver </button>
        <div className="App-CuadradoNegro" style={{ width: "90.5%", height: "68%", position: "absolute", top: "23%", left: "5%",border: "2px solid white"}}>

        </div>
      </div>
    );
  }


  return (
  <div className="App">

    {show ? (
      <div>
        <div style={{ width: "45%", height: "65%", position: "absolute", top: "23%", left: "5%",  borderRadius:"50px"}}>
          <Partida src={Vinicius} modo="Modo Clasico" color="green" function={clasico}/>
          <Partida src={Vinicius} modo="Modo Equipos" color="red" function={equipos}/>
          <Partida src={Vinicius} modo="Modo Clasico" color="green"/>
          <Partida src={Vinicius} modo="Modo Clasico" color="red" />
          <Partida src={Vinicius} modo="Modo Equipos" color="red" />
        </div>

        <div style={{ width: "45%", height: "65%", position: "absolute", top: "23%", left: "53%", borderRadius:"50px"}}>
          <Partida src={Vinicius} modo="Modo Tematica" color="red" function={tematica}/>
          <Partida src={Vinicius} modo="Modo Tematica" color="green" />
          <Partida src={Vinicius} modo="Modo Clasico" color="green" />
          <Partida src={Vinicius} modo="Modo Equipos" color="green" />
          <Partida src={Vinicius} modo="Modo Clasico" color="green" />
        </div>
      </div>
    ) : (
        <Descripcion />

    )}




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