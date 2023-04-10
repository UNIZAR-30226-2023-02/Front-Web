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

    function Tema(props) {
      return (    
      <div className="App-CuadradoNegro" style={{ width: "45%", height: "25%", position: "absolute", top: props.top, left: props.left, border: "2px solid white"}}>  
        <div className="App-CuadradoNegro" style={{ width: "99%", height: "25%", position: "absolute", top: "-1.5%", left: "0%", borderRadius: "100px 100px 0px 0px", border: "2px solid white", backgroundColor:props.color, textAlign:"center"}}>
          <a  style= {{ color: "white", fontSize: "30px", fontStyle: "italic"}}> {props.tema} </a>
        </div>
        <a  style= {{ color: "white", fontSize: "20px", fontStyle: "italic" ,position: "absolute", top: "30%", left: "10%"}}> Respuestas <font color="green">acertadas</font>: {props.aciertos} </a>

        <a  style= {{ color: "white", fontSize: "20px", fontStyle: "italic" ,position: "absolute", top: "50%", left: "10%"}}> Respuestas <font color="red">falladas</font>: {props.fallos} </a>
        <br></br>
        <a  style= {{ color: "white", fontSize: "20px", fontStyle: "italic" ,position: "absolute", top: "70%", left: "15%"}}> Porcentajes de acierto: {props.porcentaje} </a>
      </div>
      );
    }
  
    return (
      <div className="App">
        <div className="App-CuadradoNegro" style={{ width: "850px", height: "600px", position: "absolute", top: "25%", left: "5%", border: "2px solid white"}}>


          <Tema top="5%" left="2%" tema="Geografia" color="blue" aciertos="30" fallos="30" porcentaje="50%"/>
          <Tema top="5%" left="52%" tema="Ciencia y naturaleza" color="green" aciertos="20" fallos="20" porcentaje="50%"/>
          <Tema top="35%" left="2%" tema="Historia" color="#a0a856" aciertos="40" fallos="40" porcentaje="50%"/>
          <Tema top="35%" left="52%" tema="Entrtenimiento" color="rgb(226, 4, 255)" aciertos="70" fallos="70" porcentaje="50%"/>
          <Tema top="65%" left="2%" tema="Deporte" color="rgb(236, 134, 1)" aciertos="70" fallos="70" porcentaje="50%"/>
          <Tema top="65%" left="52%" tema="Arte y Literatura" color="Red" aciertos="80" fallos="80" porcentaje="50%"/>
          
        

        </div>


        <div className="App-CuadradoNegro" style={{ width: "850px", height: "600px", position: "absolute", top: "25%", left: "50%", border: "2px solid white"}}>

          <div className="App-CuadradoNegro" style={{ width: "100%", height: "50%", position: "absolute", top: "-0.3%", left: "-0.2%", borderRadius: "50px 50px 0px 0px", border: "2px solid white", textAlign:"center"}}>
            <a  style= {{ color: "white", fontSize: "50px", fontStyle: "italic"}}> Total de preguntas <br></br>100 </a>
          </div>
          <div className="App-CuadradoNegro" style={{ width: "260px", height: "260px", position: "absolute", top: "27%", left: "35%", borderRadius: "50%", border: "2px solid white", backgroundColor:"gray", zIndex:"1"}}>
            <a  style= {{ color: "white", fontSize: "50px", fontStyle: "italic" , position: "absolute", top: "25%", left: "17%"}}> Aciertos <br></br>50% </a>
          </div>
          <div className="App-CuadradoNegro" style={{ width: "50%", height: "50%", position: "absolute", top: "50%", left: "-0.2%", borderRadius: "0px 0px 0px 50px", border: "2px solid white", backgroundColor:"green"}}>
            <a  style= {{ color: "white", fontSize: "40px", fontStyle: "italic", position: "absolute", top: "30%", left: "-5%"}}> Total de respuestas correctas <br></br>50 </a>
          </div>
          <div className="App-CuadradoNegro" style={{ width: "50%", height: "50%", position: "absolute", top: "50%", left: "50%", borderRadius: "0px 0px 50px 0px", border: "2px solid white", backgroundColor:"red"}}>
          <a  style= {{ color: "white", fontSize: "40px", fontStyle: "italic", position: "absolute", top: "30%", left: "15%"}}> Total de respuestas incorrectas <br></br>50 </a>
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