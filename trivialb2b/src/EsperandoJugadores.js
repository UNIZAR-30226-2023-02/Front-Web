import React, { useState , useEffect, useRef } from "react";
import './Estilos/App.css';
import { useNavigate } from 'react-router-dom';
import { useSession, setSession } from 'react-session';
import Usuario from'./Imagenes/Usuario.png';
import Tablero1 from'./Imagenes/Tablero1.png';
import Cookies from 'universal-cookie';



const EsperandoJugadores = () => {

  const [body, setBody] = useState({ username: "", password: "" });
  const [errores, setErorres] = useState("");
  const [show, setShow] = useState(true);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);

  const navigate = useNavigate();

  const [jugadoresSala, setJugadoresSala] = useState([]);
  const [vectorJugadores, setVectorJugadores ]  = useState([]);
  let [jRestantes, setjRestantes ]  = useState([]);

  
  let [vectorJugadores2, setVectorJugadores2 ] = useState(["", ""]);
  let [vectorJugadores4, setVectorJugadores4 ] = useState(["", "", "", ""]);
  let [vectorJugadores6, setVectorJugadores6 ] = useState(["", "", "", "", "", ""]);


  const cookies= new Cookies();
  const usuario = cookies.get('tokenUsuario');
  console.log(usuario)
  const websocket = cookies.get('WebSocketEsperando');
  let noCreador = cookies.get('noCreador');
  const contraseña = cookies.get('password_sala');
  const numJugadores = cookies.get('n_jugadores');
  jRestantes = numJugadores;
  
  console.log(websocket);

  const chatSocketRef = useRef(null);
  useEffect(() => {
    if (noCreador == 1) {
      chatSocketRef.current = new WebSocket("ws://51.142.118.71:8000" + websocket);
    }
    else{
      chatSocketRef.current = new WebSocket("ws://51.142.118.71:8000" + websocket + "?username=" + usuario + "&password=" + contraseña);
    }
    chatSocketRef.current.onmessage = function(event) {
      const data = JSON.parse(event.data)
      try {
        console.log(data)
        if (data.accion == "actualizar_lista") {
          jRestantes=jRestantes-1
          setjRestantes(jRestantes)
          console.log(jRestantes)
          if (numJugadores == 2) {
            vectorJugadores2 = data.usernames.split(",");
            console.log(vectorJugadores2)
            setVectorJugadores(vectorJugadores2)
            console.log(vectorJugadores)
            setShow2(true)
          }
          else if (numJugadores == 4) {
            vectorJugadores4 = data.usernames.split(",");
            setVectorJugadores(vectorJugadores4)
            setShow2(true)
          } 
          else if (numJugadores == 6) {
            vectorJugadores6 = data.usernames.split(",");
            setVectorJugadores(vectorJugadores6)
            setShow2(true)
          }
        }
        else if (data.accion == "empezar_partida") {
          console.log("selal")
          cookies.set('WebSocketTablero', data.url_partida, {path: '/'})
          chatSocketRef.current.close();
          navigate(process.env.PUBLIC_URL+ '/Tablero');
          
        }

      } catch (err) {
        console.log(err);
      }
    };
    chatSocketRef.current.onerror = function(event) {
      console.error('Socket error:', event);
    };
    
    chatSocketRef.current.onclose = function(event) {
      console.error('El socket de esperando en la sala se ha cerrado');
    }

  return () => {
      chatSocketRef.current.close();
  };
  },[]);

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
              <a style={{color:"white", fontSize:"50px"}}>Esperando a {jRestantes} jugadores</a>
              {show2 ? (
                <div style={{display:"flex", marginTop:"50px", placeContent:"center"}}>
                  {jugadores()}
                </div>
                ) : (
                  <div style={{display:"flex", marginTop:"50px", placeContent:"center"}}>
                  {jugadores()}
                  </div>
                )}
            </div>
          </div>
          <button className="App-botonCancelar" style= {{position: "absolute", top: "64%", left: "50%", zIndex: "5"}} onClick={() => setShow(!show) } > Abandonar Sala </button>
        </div>

      ) : (
        <div>
          <div className="App-CuadradoNegro" style={{filter: 'blur(5px)', width: "80%", height: "70%", position: "absolute", zIndex: "3", top: "15%", left: "10%"}}>
            <div style={{marginTop: "3%"}}>                
              <a style={{color:"white", fontSize:"50px"}}> Esperando Jugadores </a>
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
        </div>
        )}
        <div className="App-header" style={{ zIndex: "1",  filter: 'blur(5px)'}}>    
            <div style={{ position: "absolute", zIndex: "2", height:"98%", width:"55%",  filter: 'blur(5px)'}}>
              <img src={Tablero1} style={{height:"98%", width:"98%"}}/> 
            </div> 
          </div>
    </div>
  );
};

export default EsperandoJugadores;