import React, { useState , useEffect, useRef } from "react";
import './Estilos/App.css';
import { useNavigate } from 'react-router-dom';
import { useSession, setSession } from 'react-session';
import Usuario from'./Imagenes/Usuario.png';
import Tablero1 from'./Imagenes/Tablero1.png';
import Cookies from 'universal-cookie';

const URL = "http://51.142.118.71:8000/api/salas/enviar-peticion/";

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

  const [nuevoA, setNuevoA] = useState("");
  const nombreAñadir = (e) => {
    setNuevoA(e.target.value)
  };
  
  let [vectorJugadores2, setVectorJugadores2 ] = useState(["", ""]);
  let [vectorJugadores4, setVectorJugadores4 ] = useState(["", "", "", ""]);
  let [vectorJugadores6, setVectorJugadores6 ] = useState(["", "", "", "", "", ""]);


  const cookies= new Cookies();
  const token = cookies.get('token');
  const usuario = cookies.get('tokenUsuario');
  const websocket = cookies.get('WebSocketEsperando');
  let noCreador = cookies.get('noCreador');
  const contraseña = cookies.get('password_sala');
  const numJugadores = cookies.get('n_jugadores');
  const tipoPartida = cookies.get('tipo_partida');
  jRestantes = numJugadores;

  function invitar () {
    fetch(URL, {
      method: "POST",
      headers: { "Authorization": "Token " + token, "Content-Type": "application/json" },
      body: JSON.stringify({"username_amigo": nuevoA}),
    })
      .then((response) => response.json())
      .then((data) => {console.log(data)
        if (data.OK == "True"){
          setShow1(!show1)
        }
        else {
          setErorres(data.error)
        }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  };

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
          cookies.set('WebSocketTablero', data.url_partida, {path: '/'})
          chatSocketRef.current.close()
          console.log(tipoPartida)
          if (tipoPartida == "Clasico") {
            navigate(process.env.PUBLIC_URL+ '/Tablero');
          }
          else if (tipoPartida == "Tematico") {
            navigate(process.env.PUBLIC_URL+ '/TableroTematica');
          }
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
          <button className="App-botonCancelar" style= {{position: "absolute", top: "70%", left: "41.5%", zIndex: "5"}} onClick={() => setShow(!show) } > Abandonar Sala </button> 
          <button className="App-botonConfirmar" style= {{position: "absolute", top: "20%", left: "70%", zIndex: "5"}} onClick={() => setShow1(!show1) } > Invitar Amigos </button>

          {show1 ? (
          <div className="App-CuadradoNegro" style={{ width: "1000px", height: "600px", position: "absolute", zIndex: "1", top: "18%", left: "25%", zIndex: "5",   backgroundColor:"#303030"}}>
            <div style={{marginTop: "3%"}}>                
              <a style={{color:"white", fontSize:"40px"}}>Invitar Amigo </a>
              <div style={{marginTop:"30px", color: "white"}}>
                <a> ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯</a>
              </div>
              <a style={{position: "absolute", top: "30%", left: "6%", color:"white", fontSize:"30px", textAlign:"left"}}> Escribe a continuacion el nombre del amigo que quieres añadir: </a>
              <a style={{position: "absolute", top: "50%", left: "17%",color:"white", fontSize:"30px"}}> Nombre: </a>
              <input className="App-textoNegro"
                type="nombre"
                label="nombre"
                name="nombre"
                onChange={nombreAñadir}
                style={{position: "absolute", top: "48%", left: "30%"}}
              />
              <div> 
                <button className="App-botonCancelar" style= {{position: "absolute", top: "75%", left: "30%"}} onClick={() => setShow1(!show1) } > Cancelar </button>
                <button className="App-botonConfirmar" style= {{position: "absolute", top: "75%", left: "56%"}} onClick={() => invitar() } > Añadir </button>
              </div>
            </div>
          </div>
          ) : (
            <div/>
          )}
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
          <div className="App-CuadradoNegro" style={{ width: "1000px", height: "400px", position: "absolute", zIndex: "1", top: "30%", left: "25%", zIndex: "4",   backgroundColor:"#303030"}}>
            <div style={{marginTop: "3%"}}>                
              <a style={{color:"white", fontSize:"40px"}}>¿Estas seguro de que quieres abandonar la sala? </a>
              <div style={{marginTop:"30px", color: "white"}}>
                <a> ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯</a>
              </div>
              <div style={{marginTop: "10%"}}>    
                <a style={{color:"white", fontSize:"30px"}}> </a>
              </div>
              <div> 
                <button className="App-botonCancelar" style= {{marginTop:"20px", marginRight:"50px"}} onClick={() => abandonar() } > Abandonar </button>
                <button className="App-botonConfirmar" style= {{marginTop:"20px", marginLeft:"50px"}} onClick={() => setShow(!show) } > Permanecer </button>
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