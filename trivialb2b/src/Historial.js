import React, { useState } from "react";
import './Estilos/App.css';
import { useNavigate } from 'react-router-dom';
import { useSession, setSession } from 'react-session';
import Atras from "./Imagenes/Atras.png";
import Vinicius from "./Imagenes/Vinicius.png";

//const URL = "https://6e01-146-158-156-138.eu.ngrok.io/api/usuarios/login/";
const URL = "http://51.142.118.71:8000/api/usuarios/login/";


const Historial = () => {

  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);

  const navigate = useNavigate();
  const flechaAtras = async () => {
    navigate(process.env.PUBLIC_URL+ '/MenuJuego');
  };
  const clasico = async () => {
    setShow1(true);
  };
  const equipos = async () => {
    setShow2(true);
  };
  const tematica = async () => {
    setShow3(true);
  };

  function Partida(props) {
    return (    
      <div style={{ width: "800px", height: "100px", position: "relative", border: "2px solid white", backgroundColor:props.color, borderRadius:"50px", marginTop:"20px", cursor:"pointer"}} onClick={props.function}>
        <img src={props.src} style={{width:"14%", height:"90%", top:"5%", left:"5%", cursor: "pointer", position: "absolute"}}/>
        <a  style= {{ color: "white", fontSize: "30px", fontStyle: "italic", top:"20%", left:"40%", position: "absolute"}}> {props.modo} </a>
      </div>
    );
  }

  return (
  <div className="App">


    <div style={{ width: "45%", height: "65%", position: "absolute", top: "23%", left: "5%",  borderRadius:"50px"}}>
      <Partida src={Vinicius} modo="Modo Clasico" color="green" function={clasico}/>
      <Partida src={Vinicius} modo="Modo Equipos" color="red" function={equipos}/>
      <Partida src={Vinicius} modo="Modo Clasico" color="green"/>
      <Partida src={Vinicius} modo="Modo Clasico" color="red" />
      <Partida src={Vinicius} modo="Modo Equipos" color="red" />
    </div>

    <div style={{ width: "45%", height: "65%", position: "absolute", top: "23%", left: "53%", borderRadius:"50px"}}>
      <Partida src={Vinicius} modo="Modo Tematica" color="blue" function={tematica}/>
      <Partida src={Vinicius} modo="Modo Tematica" color="blue" />
      <Partida src={Vinicius} modo="Modo Clasico" color="green" />
      <Partida src={Vinicius} modo="Modo Equipos" color="green" />
      <Partida src={Vinicius} modo="Modo Clasico" color="green" />
    </div>


    {show1 ? (
      <div>
        <a  style= {{ color: "white", fontSize: "40px", fontStyle: "italic", top:"17%", left:"20%", position: "absolute"}}> Modo Clasico </a>
        <button className="App-boton" style= {{position: "absolute", top: "10%", left: "80%" }} onClick={() => { setShow1(false)}}>Volver </button>
        <div className="App-CuadradoNegro" style={{ width: "90.5%", height: "68%", position: "absolute", top: "23%", left: "5%",border: "2px solid white"}}>

        </div>
      </div>
    ) : (
      <div/>

    )}

    {show2 ? (
      <div>
        <a  style= {{ color: "white", fontSize: "40px", fontStyle: "italic", top:"17%", left:"20%", position: "absolute"}}> Modo Equipos </a>
        <button className="App-boton" style= {{position: "absolute", top: "10%", left: "80%" }} onClick={() => { setShow2(false)}}>Volver </button>
        <div className="App-CuadradoNegro" style={{ width: "90.5%", height: "68%", position: "absolute", top: "23%", left: "5%",border: "2px solid white"}}>

        </div>
      </div>
    ) : (
      <div/>

    )}

    {show3 ? (
      <div>
        <a  style= {{ color: "white", fontSize: "40px", fontStyle: "italic", top:"17%", left:"20%", position: "absolute"}}> Modo Tematica </a>
        <button className="App-boton" style= {{position: "absolute", top: "10%", left: "80%" }} onClick={() => { setShow2(false)}}>Volver </button>
        <div className="App-CuadradoNegro" style={{ width: "90.5%", height: "68%", position: "absolute", top: "23%", left: "5%",border: "2px solid white"}}>

        </div>
      </div>
    ) : (
      <div/>

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