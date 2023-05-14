import React, { useState , useEffect, useRef } from "react";
import './Estilos/App.css';
import { useNavigate } from 'react-router-dom';
import { useSession, setSession } from 'react-session';
import Usuario from'./Imagenes/Usuario.png';
import Tablero1 from'./Imagenes/Tablero1.png';
import Cookies from 'universal-cookie';
import Cristiano from'./Imagenes/Usuario.png';
import InfiniteScroll from 'react-infinite-scroll-component'

const URL = "http://51.142.118.71:8000/api/salas/enviar-peticion/";
const URL1 = "http://51.142.118.71:8000/api/usuarios/datos-yo/";

const EsperandoJugadores = () => {

  const [body, setBody] = useState({ username: "", password: "" });
  const [errores, setErorres] = useState("");
  const [show, setShow] = useState(true);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(true);

  const navigate = useNavigate();

  const [jugadoresSala, setJugadoresSala] = useState([]);
  const [vectorJugadores, setVectorJugadores ]  = useState([]);
  let [jRestantes, setjRestantes ]  = useState([]);

  const [nuevoA, setNuevoA] = useState("");
  const nombreAñadir = (e) => {
    setNuevoA(e.target.value)
  };

  let [soli, setSoli] = useState("");
  const [solicitudes, setSolicitudes] = useState([]);
  
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

  function invitar (a) {
    fetch(URL, {
      method: "POST",
      headers: { "Authorization": "Token " + token, "Content-Type": "application/json" },
      body: JSON.stringify({"username_amigo": a}),
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
          let var1 = data.usernames.split(",");
          console.log(numJugadores)
          console.log(var1.length)
          jRestantes = numJugadores - var1.length
          setjRestantes(jRestantes)
          console.log(jRestantes)
          setShow3(!show3)
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
          else if (tipoPartida == "Equipo") {
            navigate(process.env.PUBLIC_URL+ '/TableroEquipos');
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

  function listar_amigos () {
    fetch(URL1, {
      method: "POST",
      headers: { "Authorization": "Token " + token, "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {console.log(data)
        if (data.OK == "True"){
          solicitudes.length = 0
          data.amigos.forEach(element => {
            solicitudes.push(element);
          });
          setSolicitudes(solicitudes);
          setShow1(!show1)
        }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  }

  function f_invitaciones() {
    return solicitudes.map((solicitud, elemento) => (
      <div key={elemento} className="App-CuadradoBlanco" style={{ width: "90%", height: "40%", position: "relative", left: "0%", border: "0px black"}}  onClick={() => {}}>
        <a  style= {{ color: "black", fontSize: "30px", fontStyle: "italic", position: "absolute", top: "35%", left: "20%"}} >
          {solicitud}
        </a>
        <img src={Cristiano} style= {{width:"auto", height:"70%",position: "absolute", top: "15%", left: "0%"}}/>
        <a  style= {{ color: "black", fontSize: "40px", fontStyle: "italic", position: "absolute", top: "70%", left: "0%"}}>
          ________________________________________________________
        </a>
        <button className="App-botonConfirmar" style= {{fontSize:"32px", top: "33%", left: "65%", position:"absolute"}} onClick={() =>{invitar(solicitud)}} >
          Invitar
        </button>
      </div>
    ));
  }


  return (
    <div className="App">
      {show ? (
        <div>
          <div className="App-CuadradoNegro" style={{ width: "80%", height: "70%", position: "absolute", zIndex: "3", top: "15%", left: "10%"}}>
            <div style={{marginTop: "3%"}}>                
              {show3 ? (  
                <a style={{color:"white", fontSize:"50px"}}>Esperando a {jRestantes} jugadores</a>
              ) : (
                <a style={{color:"white", fontSize:"50px"}}>Esperando a {jRestantes} jugadores</a>
              )}
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
          <button className="App-botonConfirmar" style= {{position: "absolute", top: "20%", left: "70%", zIndex: "5"}} onClick={() => listar_amigos() } > Invitar Amigos </button>

          {show1 ? (
          <div className="App-CuadradoNegro" style={{ width: "1000px", height: "600px", position: "absolute", zIndex: "1", top: "18%", left: "25%", zIndex: "5",   backgroundColor:"#303030"}}>
            <div style={{marginTop: "3%"}}>      
        
              <a style={{color:"white", fontSize:"40px"}}>Invitar Amigo </a>
              <div style={{marginTop:"30px", color: "white"}}>
                <a> ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯</a>
                <div className="App-CuadradoBlanco" style={{ width: "90%", height: "70%", position: "absolute", top: "25%", left: "5%", borderRadius: "50px 0px 0px 50px"}}>
                  <InfiniteScroll
                    dataLength={solicitudes.length}
                    pageStart={0}
                    loadMore={f_invitaciones}
                    hasMore={true || false}
                    useWindow={false}
                    style={{position:"absolute", width: "95%", height: "99.7%", top:"0.1%", left:"5%"}}
                  >
                    {f_invitaciones()}
                  </InfiniteScroll>
                </div>
                <button className="App-botonCancelar" style= {{position: "absolute", top: "4%", left: "75%"}} onClick={() => setShow1(!show1) } > Cancelar </button>
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