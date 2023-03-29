import React, { useState } from "react";
import './Estilos/App.css';
import { useNavigate } from 'react-router-dom';
import { useSession, setSession } from 'react-session';
import Cristiano from'./Imagenes/Cristiano.jpg';
import Tablero1 from'./Imagenes/Tablero1.png';

//const URL = "https://6e01-146-158-156-138.eu.ngrok.io/api/usuarios/login/";
const URL = "http://51.142.118.71:8000/api/usuarios/login/";

function Jugador(props) {
  return (
    <div className='App-EsJugador' >
      <img src={Cristiano} className="App-imagenJugador"/>
      <a style={{color:"white", fontSize:"30px"}}>{props.texto} </a>
    </div>
  )
}


const EsperandoJugadores = () => {
  const [body, setBody] = useState({ username: "", password: "" });
  const [errores, setErorres] = useState("");
  const [show, setShow] = useState(true);

  const navigate = useNavigate();
  const handleChange = (e) => {
    setBody({
      ...body,
      [e.target.name]: e.target.value,
    });
  };

  const abandonar = async (event) => {
    navigate(process.env.PUBLIC_URL+ '/MenuJuego');
  };       

  return (
    
    <div className="App">

      {show ? (
        <div>
          <div className="App-CuadradoNegro" style={{ width: "80%", height: "70%", position: "absolute", zIndex: "3", top: "15%", left: "10%"}}>
            <div style={{marginTop: "3%"}}>                
              <a style={{color:"white", fontSize:"50px"}}>Esperando Jugadores </a>
              <div style={{display:"flex", marginTop:"50px"}}>
                <Jugador texto=".La"/>
                <Jugador texto="Madre"/>
                <Jugador texto="De"/>
                <Jugador texto="Diego"/>
                <Jugador texto="chupa"/>
                <Jugador texto="pollas"/>
              </div>
                <button className="App-boton" style= {{marginTop:"2%"}} onClick={() => setShow(!show) } > Abandonar Sala </button>
            </div>
          </div>
          <div className="App-header" style={{ zIndex: "1",  filter: 'blur(5px)'}}>    
            <div style={{ position: "absolute", zIndex: "2", height:"100%", width:"55%",  filter: 'blur(5px)'}}>
              <img src={Tablero1} style={{height:"100%", width:"100%"}}/> 
            </div> 
          </div>
          <div className="App-header" style={{ zIndex: "1",  filter: 'blur(5px)'}}>    
            <div style={{ position: "absolute", zIndex: "2", height:"100%", width:"55%",  filter: 'blur(5px)'}}>
              <img src={Tablero1} style={{height:"100%", width:"100%"}}/> 
            </div> 
          </div>
        </div>
      ) : (
        <div>
          <div className="App-CuadradoNegro" style={{filter: 'blur(5px)', width: "80%", height: "70%", position: "absolute", zIndex: "3", top: "15%", left: "10%"}}>
            <div style={{marginTop: "3%"}}>                
              <a style={{color:"white", fontSize:"50px"}}>Esperando Jugadores </a>
              <div style={{display:"flex", marginTop:"50px"}}>
                <Jugador texto=".La"/>
                <Jugador texto="Madre"/>
                <Jugador texto="De"/>
                <Jugador texto="Diego"/>
                <Jugador texto="chupa"/>
                <Jugador texto="pollas"/>
              </div>
            </div>
          </div>
          <div className="App-CuadradoNegro" style={{ width: "1200px", height: "750px", position: "absolute", zIndex: "1", top: "25%", left: "26%", zIndex: "4"}}>
                <div style={{marginTop: "3%"}}>                
                  <a style={{color:"white", fontSize:"30px"}}>¿Estas seguro de que quieres abandonar la sala? </a>
                  <div style={{marginTop:"30px", color: "white"}}>
                    <a> ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯</a>
                  </div>
                  <div style={{marginTop: "10%"}}>    
                    <a style={{color:"white", fontSize:"20px"}}> Como eres el creador de la sala, al abandonar la sala desaparecerá la misma </a>
                  </div>
                  <div> 
                    <button className="App-botonCancelar" style= {{marginTop:"180px", marginRight:"50px"}} onClick={() => abandonar() } > Abandonar </button>
                    <button className="App-botonConfirmar" style= {{marginTop:"180px", marginLeft:"50px"}} onClick={() => setShow(!show) } > Permanecer </button>
                  </div>
                </div>
              </div>
          <div className="App-header" style={{ zIndex: "1",  filter: 'blur(5px)'}}>    
            <div style={{ position: "absolute", zIndex: "2", height:"100%", width:"55%",  filter: 'blur(5px)'}}>
              <img src={Tablero1} style={{height:"100%", width:"100%"}}/> 
            </div> 
          </div>
          <div className="App-header" style={{ zIndex: "1",  filter: 'blur(5px)'}}>    
            <div style={{ position: "absolute", zIndex: "2", height:"100%", width:"55%",  filter: 'blur(5px)'}}>
              <img src={Tablero1} style={{height:"100%", width:"100%"}}/> 
            </div> 
          </div>
        </div>
        )}
    </div>
  );
};

export default EsperandoJugadores;