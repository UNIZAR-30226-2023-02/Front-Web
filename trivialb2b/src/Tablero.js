import React, { useState } from "react";
import './Estilos/App.css';
import { useNavigate } from 'react-router-dom';
import { useSession, setSession } from 'react-session';
import Cristiano from'./Imagenes/Cristiano.jpg';
import Tablero1 from'./Imagenes/Tablero1.png';

//const URL = "https://6e01-146-158-156-138.eu.ngrok.io/api/usuarios/login/";
const URL = "http://51.142.118.71:8000/api/usuarios/login/";


const Tablero = () => {
  const [body, setBody] = useState({ username: "", password: "" });
  const [errores, setErorres] = useState("");
  const [show, setShow] = useState(true);

  const vectorJugadores = ["Acher", "Miguel", "pablo", "Luis"];

  const navigate = useNavigate();
  const handleChange = (e) => {
    setBody({
      ...body,
      [e.target.name]: e.target.value,
    });
  };

  function Linea1() {
    return(
        <div style={{position: "absolute", height: "10%", width:"41%", top:"45%", left:"2%"}}>
            <button style={{ backgroundColor:"white" , height: "100%", width:"25%"}}>  </button>
            <button style={{ backgroundColor:"yellow" , height: "100%", width:"15%"}}>  </button>
            <button style={{ backgroundColor:"blue", height: "100%", width:"15%"}}>  </button>
            <button style={{ backgroundColor:"green", height: "100%", width:"15%"}}>  </button>
            <button style={{ backgroundColor:"pink", height: "100%", width:"15%"}}>  </button>
            <button style={{ backgroundColor:"orange", height: "100%", width:"15%"}}>  </button>
        </div>
    )
  }

  function Linea2() {
    return(
        <div style={{position:"absolute", height:"100%", width:"100%"}}>
            <button style={{ backgroundColor:"white" , height: "100%", width:"25%"}}>  </button>
            <button style={{ backgroundColor:"yellow" , height: "100%", width:"15%"}}>  </button>
            <button style={{ backgroundColor:"blue", height: "100%", width:"15%"}}>  </button>
            <button style={{ backgroundColor:"green", height: "100%", width:"15%"}}>  </button>
            <button style={{ backgroundColor:"pink", height: "100%", width:"15%"}}>  </button>
            <button style={{ backgroundColor:"orange", height: "100%", width:"15%"}}>  </button>
        </div>
    )
  }

  function Linea3() {
    return(
        <div style={{position:"absolute", height:"100%", width:"100%"}}>
            <button style={{ backgroundColor:"yellow" , height: "100%", width:"15%"}}>  </button>
            <button style={{ backgroundColor:"blue", height: "100%", width:"15%"}}>  </button>
            <button style={{ backgroundColor:"green", height: "100%", width:"15%"}}>  </button>
            <button style={{ backgroundColor:"pink", height: "100%", width:"15%"}}>  </button>
            <button style={{ backgroundColor:"orange", height: "100%", width:"15%"}}>  </button>
            <button style={{ backgroundColor:"red", height: "100%", width:"15%"}}>  </button>
        </div>
    )
  }

  return (
    
    <div className="App">
      <header className="App-headerJuego" style={{zIndex: "1"}}>     
            <div style={{ position: "absolute", zIndex: "2", height:"74%", width:"39%", top:"10%", left:"30.2%"}}>
                <Linea1> </Linea1>
                <div style={{ position:"absolute", left:"17%", transform: "rotate(+60deg)", height:"10%", width:"41%", top:"20%"}}>
                    <Linea2> </Linea2>
                </div>
                <div style={{ position:"absolute", left:"45%", transform: "rotate(+120deg)", height:"10%", width:"41%", top:"20%"}}>
                    <Linea2> </Linea2>
                </div>
                <div style={{ position:"absolute", left:"60%", transform: " scaleX(-1)", height:"10%", width:"41%", top:"45%"}}>
                    <Linea2> </Linea2>
                </div>
                <div style={{ position:"absolute", left:"45%", transform: "rotate(-120deg)",  height:"10%", width:"41%", top:"70%"}}>
                    <Linea2> </Linea2>
                </div>
                <div style={{ position:"absolute", left:"17%", transform: "rotate(-60deg)", height:"10%", width:"41%", top:"70%"}}>
                    <Linea2> </Linea2>
                </div>

                
                <div style={{ position:"absolute", left:"33.5%", height:"10.5%", width:"37%", top:"3.5%"}}>
                    <Linea3> </Linea3>
                </div>
                <div style={{ position:"absolute", transform: "rotate(-120deg)", left:"68.5%", height:"10.5%", width:"37%", top:"24%"}}>
                    <Linea3> </Linea3>
                </div>
                <div style={{ position:"absolute", transform: "rotate(-60deg)", left:"68.5%", height:"10.5%", width:"37%", top:"65.5%"}}>
                    <Linea3> </Linea3>
                </div>
                <div style={{ position:"absolute", transform: "rotate(-60deg)", left:"68.5%", height:"10.5%", width:"37%", top:"65.5%"}}>
                    <Linea3> </Linea3>
                </div>
                <div style={{ position:"absolute", transform: "rotate(-60deg)", height:"10.5%", width:"37%", left:"-2%", top:"24%"}}>
                    <Linea3> </Linea3>
                </div>
                <div style={{ position:"absolute", height:"10.5%", width:"37%", left:"33%", top:"86.5%"}}>
                    <Linea3> </Linea3>
                </div>
                <div style={{ position:"absolute", transform: "rotate(60deg)", height:"10.5%", width:"37%", left:"-2%", top:"65.5%"}}>
                    <Linea3> </Linea3>
                </div>
            </div>

        </header>
    </div> 
  );
};

export default Tablero;