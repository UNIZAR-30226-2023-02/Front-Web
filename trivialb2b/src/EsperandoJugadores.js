import React, { useState , useEffect, useRef } from "react";
import './Estilos/App.css';
import { useNavigate } from 'react-router-dom';
import { useSession, setSession } from 'react-session';
import Usuario from'./Imagenes/Usuario.png';
import Tablero1 from'./Imagenes/Tablero1.png';
import Cookies from 'universal-cookie';

//const URL = "https://6e01-146-158-156-138.eu.ngrok.io/api/usuarios/login/";

const EsperandoJugadores = () => {
  const [body, setBody] = useState({ username: "", password: "" });
  const [errores, setErorres] = useState("");
  const [show, setShow] = useState(true);


  const vectorJugadores = ["Acher", "Miguel", "pablo", "Luis"];

  const cookies= new Cookies();
  const token = cookies.get('tokenUsuario');
  const websocket = cookies.get('WebSocketEsperando');
  console.log(websocket);

  const chatSocketRef = useRef(null);
  console.log(token)
  useEffect(() => {
    chatSocketRef.current = new WebSocket("ws://51.142.118.71:8000" + websocket + "?token=" + token);
 
    chatSocketRef.current.onmessage = function(event) {
      const data = JSON.parse(event.data);
      try {
        console.log("Mensaje del Backend:");
        console.log(data)

      } catch (err) {
        console.log(err);
      }
    };
    chatSocketRef.current.onerror = function(event) {
      console.error('Game socket error:', event);
    };
    
    chatSocketRef.current.onclose = function(event) {
      console.error('Game socket closed unexpectedly');
    }

    return () => {
      chatSocketRef.current.close();
    };
  },[]);

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

  
  function jugadores() {
    return vectorJugadores.map((elemento) => (
      <div className='App-EsJugador' >
        <img src={Usuario} className="App-imagenJugador" style={{backgroundColor:"white"}}/><br></br>
        <a style={{color:"white", fontSize:"30px"}}>{elemento} </a>
      </div>
    ));
  }

  return (
    
    <div className="App">

      {show ? (
        <div>
          <div className="App-CuadradoNegro" style={{ width: "80%", height: "70%", position: "absolute", zIndex: "3", top: "15%", left: "10%"}}>
            <div style={{marginTop: "3%"}}>                
              <a style={{color:"white", fontSize:"50px"}}>Esperando Jugadores </a>
              <div style={{display:"flex", marginTop:"50px", placeContent:"center"}}>
                {jugadores()}
              </div>
                <button className="App-boton" style= {{marginTop:"5%"}} onClick={() => setShow(!show) } > Abandonar Sala </button>
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
              <div style={{display:"flex", marginTop:"50px",  placeContent:"center"}}>
                {jugadores()}
              </div>
            </div>
          </div>
          <div className="App-CuadradoNegro" style={{ width: "1200px", height: "720px", position: "absolute", zIndex: "1", top: "12%", left: "19%", zIndex: "4",   backgroundColor:"#303030"}}>
                <div style={{marginTop: "3%"}}>                
                  <a style={{color:"white", fontSize:"40px"}}>¿Estas seguro de que quieres abandonar la sala? </a>
                  <div style={{marginTop:"30px", color: "white"}}>
                    <a> ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯</a>
                  </div>
                  <div style={{marginTop: "10%"}}>    
                    <a style={{color:"white", fontSize:"30px"}}> Como eres el creador de la sala, al abandonar la sala desaparecerá la misma </a>
                  </div>
                  <div> 
                    <button className="App-botonCancelar" style= {{marginTop:"220px", marginRight:"50px"}} onClick={() => abandonar() } > Abandonar </button>
                    <button className="App-botonConfirmar" style= {{marginTop:"220px", marginLeft:"50px"}} onClick={() => setShow(!show) } > Permanecer </button>
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