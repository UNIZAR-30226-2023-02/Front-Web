import React, { useState, useEffect, useRef} from "react";
import './Estilos/App.css';
import { useNavigate } from 'react-router-dom';
import { useSession, setSession } from 'react-session';
import Atras from "./Imagenes/Atras.png";

//const URL = "https://6e01-146-158-156-138.eu.ngrok.io/api/usuarios/login/";
const URL = "http://51.142.118.71:8000/api/usuarios/login/";

  const Estadisticas = () => {
    const navigate = useNavigate();
    const flechaAtras = async () => {
      navigate(process.env.PUBLIC_URL+ '/MenuJuego');
    };


  
    return (
      <div className="App">
        <div className="App-CuadradoNegro" style={{ width: "850px", height: "600px", position: "absolute", top: "25%", left: "5%", border: "2px solid white"}}>

          <div className="App-CuadradoNegro" style={{ width: "45%", height: "25%", position: "absolute", top: "5%", left: "2%", border: "2px solid white"}}>

            <div className="App-CuadradoNegro" style={{ width: "99%", height: "20%", position: "absolute", top: "-1.5%", left: "0%", borderRadius: "100px 100px 0px 0px", border: "2px solid white",}}>

            </div>
            <a  style= {{ color: "black", fontSize: "30px", fontStyle: "italic" ,position: "absolute", top: "15%", left: "25%"}}>
              pepe
            </a>
        
          </div>

        </div>


        <div className="App-CuadradoNegro" style={{ width: "850px", height: "600px", position: "absolute", top: "25%", left: "50%", border: "2px solid white"}}>

          <div className="App-CuadradoNegro" style={{ width: "50%", height: "88%", position: "absolute", top: "5%", left: "2%", borderRadius: "50px 0px 0px 50px", border: "2px solid white"}}>

            <div className="App-CuadradoNegro" style={{ width: "50%", height: "88%", position: "absolute", top: "5%", left: "2%", borderRadius: "50px 0px 0px 50px", border: "2px solid white"}}>

            </div>
            <a  style= {{ color: "black", fontSize: "30px", fontStyle: "italic" ,position: "absolute", top: "15%", left: "25%"}}>
              pepe
            </a>
        
          </div>

        </div>
        <img src={Atras} style={{width:"150px", height:"150px", top:"5%", left:"5%", cursor: "pointer", position: "absolute"}} onClick={() => flechaAtras()}/>
        <div className = "App-header" > 
            <div className="App-titulo" style= {{top: "7%"}} > Estadisticas
                <div className="App-Quesitos" style= {{left: "35%"}}> </div> 
            </div>
        </div>

        
      </div>
    );
  };
  

export default Estadisticas;