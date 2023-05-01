import React, { useState, useEffect, useRef } from "react";
import './Estilos/App.css';
import { useNavigate } from 'react-router-dom';
import Buscar from'./Imagenes/BuscarPartida.png';
import Candado from'./Imagenes/Candado.png';
import Transparente from'./Imagenes/Transparente.png';
import InfiniteScroll from 'react-infinite-scroll-component';
import Cookies from 'universal-cookie';


//const URL = "https://6e01-146-158-156-138.eu.ngrok.io/api/usuarios/login/";
const URL = "http://51.142.118.71:8000/api/salas/lista-salas/";


/*function Algo(){
  console.log("Algo")
  
  const ws = new WebSocket("ws://51.142.118.71:8000" + "/ws/lobby/");
}
*/
function Entrar(nombre, usuario, contraseña) {
  console.log(nombre, usuario, contraseña);
  useEffect(() => {
    const ws  = new WebSocket("ws://51.142.118.71:8000" + "/ws/lobby/" +  nombre + "/?username=" + usuario + "&password=" + contraseña);
    ws.onmessage = function(event) {
      const data = JSON.parse(event.data);
      try {
        console.log("Mensaje del Backend:");
        /*if (data.accion = "nuevo_usuario") {
          jugadoresSala.push(data.username);
        }
        else if (data.accion = "usuarios_listos"){
          setShow1(false)
        }
        else {
          cookies.set('websocket_partida', data.websocket, {path: '/'})
          navigate(process.env.PUBLIC_URL+ '/Tablero');
        }*/

      } catch (err) {
        console.log(err);
      }
    };
    ws.onerror = function(event) {
      console.error('Game socket error:', event);
    };
    
    ws.onclose = function(event) {
      console.error('Game socket closed unexpectedly');
    }

    return () => {
      ws.current.close();
    };
  }, []);
}

const ModoClasico = () => {
  const [contraseña, setContraseña] = useState("");

  const [sala, setSala] = useState({ nombre: "", tiempo: "", numJugadores: "", password: "", creador: "", modo: "", tipo: ""});
  const [salas, setSalas] = useState([]);
  

  const [salasBuscadas, setSalasBuscadas] = useState();


  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);


  const handleChange3 = event => {
    setSearchTerm(event.target.value);
     const results = salas.filter(salas =>
      salas["nombre_sala"].startsWith(event.target.value)
    );
    setSearchResults(results);
  };
  

  const [show, setShow] = useState(true);
  const [show1, setShow1] = useState(true);
  const [show2, setShow2] = useState(false);

  
  const navigate = useNavigate();

  const cookies= new Cookies();
  const token = cookies.get('token');
  const usuario = cookies.get('tokenUsuario');
  
  useEffect(() => {
    fetch(URL, {
      method: "POST",
      headers: {"Authorization": "Token " + token, "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {console.log(data)
        data.forEach(element => {
          salas.push(element)
        })
        setSearchResults(salas);
        setSalas(salas)
        
        setShow2(true)
        
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  },[]);
  
  const handleChange = (e) => {
    setSala({
      ...sala,
      ["nombre"]: e.nombre_sala,
      ["tiempo"]: e.tiempo_respuesta,
      ["numJugadores"]: e.n_jugadores,
      ["creador"]: e.creador_username,
      ["modo"]: e.tipo_partida,
      ["tipo"]: e.tipo_sala,
    })
  };  


  const cancelar = async (event) => {
    navigate(process.env.PUBLIC_URL + '/MenuJuego');
  };  

  /*const handleChange4 = (e) => {
    setContraseña({
      ...contraseña,
      [e.target.name]: e.target.value,
    });
  };*/

  const handleChange4 = (e) => {
    setContraseña(e.target.value);
  };

  function funcionEntrar() {
    console.log("FuncionEntrar");
    Entrar(sala.nombre, usuario, contraseña);
    /*console.log(sala.nombre, usuario, contraseña);
    useEffect(() => {
      const ws  = new WebSocket("ws://51.142.118.71:8000" + "/ws/lobby/" +  sala.nombre + "/?username=" + usuario + "&password=" + contraseña);
      ws.onmessage = function(event) {
        const data = JSON.parse(event.data);
        try {
          console.log("Mensaje del Backend:");
          if (data.accion = "nuevo_usuario") {
            jugadoresSala.push(data.username);
          }
          else if (data.accion = "usuarios_listos"){
            setShow1(false)
          }
          else {
            cookies.set('websocket_partida', data.websocket, {path: '/'})
            navigate(process.env.PUBLIC_URL+ '/Tablero');
          }
  
        } catch (err) {
          console.log(err);
        }
      };
      ws.onerror = function(event) {
        console.error('Game socket error:', event);
      };
      
      ws.onclose = function(event) {
        console.error('Game socket closed unexpectedly');
      }
  
      return () => {
        ws.current.close();
      };
    }, []);*/
  }
  /*
  function funcionEntrar() {
    console.log("FuncionEntrar");
    Algo()
    return <Entrar nombre={sala.nombre} usuarioSala={usuario} contraseñaSala ={contraseña} />;
  }*/


  function jugadores() {

    return searchResults.map(elemento  => (
      <div className="App-CuadradoBlanco" style={{ width: "99.6%", height: "15%", position: "relative", left: "0%",cursor: "pointer"}}onClick={() => {handleChange(elemento);setShow(!show); if (elemento.tipo_sala){setShow1(false)}else{setShow1(true)}}}>
        <a  style= {{ color: "black", fontSize: "40px", fontStyle: "italic" ,position: "absolute", top: "15%", left: "5%"}}>
          {elemento.nombre_sala}
        </a>
        <a  style= {{ color: "black", fontSize: "40px", fontStyle: "italic" ,position: "absolute", top: "15%", left: "25%"}}>
          {elemento.tipo_partida}
        </a>
        <a  style= {{ color: "black", fontSize: "40px", fontStyle: "italic" ,position: "absolute", top: "15%", left: "45%"}}>
          {elemento.n_jugadores}
        </a>
        <a  style= {{ color: "black", fontSize: "40px", fontStyle: "italic" ,position: "absolute", top: "15%", left: "70%"}}>
          {elemento.creador_username}
        </a>

        { (elemento.tipo_sala == "Privado") ?
          <img src={Candado} style= {{width:"auto", height:"70%",position: "absolute", top: "15%", left: "93%"}}/>
          :
          <img src={Transparente} style= {{width:"auto", height:"90%",position: "absolute", top: "15%", left: "93%"}}/>
        }
      </div>
    ));
  }
  return (
    <div className="App">
      <div className = "App-header" > 


      {show ? (
        <div className="App-CuadradoAmarillo" style={{ width: "1730px", height: "780px", position: "absolute", top: "8%", left: "5%"}}>
          <div style={{marginTop:"10px"}}>
            <a  style= {{ color: "#174a67", fontSize: "60px", fontStyle: "italic" }}>
                Buscar Partida   
            </a>
          </div>
          <div>
            <img src={Buscar} style={{width:"5%", height:"7%", left:"29%",zIndex: "1", top:"3%", cursor: "pointer", position:"absolute"}} /*onClick={search}*//>
            <input className="App-textoNegro" label="pepe" name="pepe" onChange={handleChange3} value={searchTerm} style= {{top: "2%", left: "2%", position:"absolute", width: "500px", height: "50px"}} />;
            <button className="App-botonAzul" style= {{top: "2%", left: "85%" , position:"absolute"}} onClick={() => cancelar()} >
              Volver
            </button>
          </div>

          <div className="App-CuadradoGris" style={{ width: "100%", height: "85%", position: "absolute", top: "15%", left: "-0.2%"}}>
            <a  style= {{ color: "black", fontSize: "40px", fontStyle: "italic" ,position: "absolute", top: "1%", left: "5%"}}>
                Nombre
            </a>
            <a  style= {{ color: "black", fontSize: "40px", fontStyle: "italic" ,position: "absolute", top: "1%", left: "25%"}}>
                Modo
            </a>
            <a  style= {{ color: "black", fontSize: "40px", fontStyle: "italic" ,position: "absolute", top: "1%", left: "45%"}}>
                Jugadores
            </a>
            <a  style= {{ color: "black", fontSize: "40px", fontStyle: "italic" ,position: "absolute", top: "1%", left: "70%"}}>
                Creador
            </a>
          </div>
          {show2 ? (
          <div className="App-CuadradoBlanco" style={{ width: "100%", height: "73%", position: "absolute", top: "27%", left: "-0.2%"}}>
          <InfiniteScroll
            dataLength={salas.length}
            pageStart={0}
            loadMore={jugadores}
            hasMore={true || false}
            loader={<div className="loader" key={0}></div>}
            useWindow={false}
            style={{position:"absolute", width: "100%", height: "100%"}}
          >
            {jugadores()}
          </InfiniteScroll>
          </div>
          ) : (
            <div/>
          )}
          a
        </div>

        ) : (

        <div>
          <div className="App-CuadradoAmarillo" style={{ width: "1730px", height: "780px", position: "absolute", top: "8%", left: "5%", filter: 'blur(5px)'}}>
            <div style={{marginTop:"10px"}}>
              <a  style= {{ color: "#174a67", fontSize: "60px", fontStyle: "italic" }}>
                  Buscar Partida   
              </a>
            </div>
            <div>
              <img src={Buscar} style={{width:"5%", height:"7%", left:"29%",zIndex: "1", top:"3%", cursor: "pointer", position:"absolute"}} onClick={cancelar}/>
              <input className="App-textoNegro" label="pepe" name="pepe" onChange={handleChange} style= {{top: "2%", left: "2%", position:"absolute", width: "500px", height: "50px"}}/>
              <button className="App-botonAzul" style= {{top: "2%", left: "85%" , position:"absolute"}}onClick={() => cancelar()} >
                Volver
              </button>
            </div>

            <div className="App-CuadradoGris" style={{ width: "100%", height: "85%", position: "absolute", top: "15%", left: "-0.2%"}}>
              <a  style= {{ color: "black", fontSize: "40px", fontStyle: "italic" ,position: "absolute", top: "1%", left: "5%"}}>
                  Nombre
              </a>
              <a  style= {{ color: "black", fontSize: "40px", fontStyle: "italic" ,position: "absolute", top: "1%", left: "25%"}}>
                  Modo
              </a>
              <a  style= {{ color: "black", fontSize: "40px", fontStyle: "italic" ,position: "absolute", top: "1%", left: "45%"}}>
                  Jugadores
              </a>
              <a  style= {{ color: "black", fontSize: "40px", fontStyle: "italic" ,position: "absolute", top: "1%", left: "70%"}}>
                  Creador
              </a>
            </div>
              {show2 ? (
              <div className="App-CuadradoBlanco" style={{ width: "100%", height: "73%", position: "absolute", top: "27%", left: "-0.2%"}}>
              <InfiniteScroll
                dataLength={salas.length}
                pageStart={0}
                loadMore={jugadores}
                hasMore={true || false}
                loader={<div className="loader" key={0}></div>}
                useWindow={false}
                style={{position:"absolute", width: "100%", height: "100%"}}
              >
                {jugadores()}
              </InfiniteScroll>
              </div>
            ) : (
              <div/>
            )}

          </div>

          {show1 ? (

          <div className="App-CuadradoAmarillo" style={{ width: "800px", height: "500px", position: "absolute", top: "20%", left: "30%"}}>
            <a  style= {{ color: "black", fontSize: "50px", fontStyle: "italic" ,position: "absolute", top: "8%", left: "35%"}}>
              Sala Pública
            </a>
            <a  style= {{ color: "black", fontSize: "30px", fontStyle: "italic" ,position: "absolute", top: "30%", left: "10%"}}>
              Nombre de la sala: {sala.nombre}
            </a>
            <a  style= {{ color: "black", fontSize: "30px", fontStyle: "italic" ,position: "absolute", top: "40%", left: "10%"}}>
              Modo de juego: {sala.modo}
            </a>
            <a  style= {{ color: "black", fontSize: "30px", fontStyle: "italic" ,position: "absolute", top: "50%", left: "10%"}}>
              Jugadores: {sala.numJugadores}
            </a>
            <button className="App-botonConfirmar" style= {{top: "75%", left: "20%" , position:"absolute"}}onClick={funcionEntrar} >
              Entrar
            </button>
            <button className="App-botonCancelar" style= {{top: "75%", left: "55%" , position:"absolute"}}onClick={() => setShow(!show)} >
              Cancelar
            </button>
          </div>
          ) : (
            <div className="App-CuadradoAmarillo" style={{ width: "800px", height: "500px", position: "absolute", top: "20%", left: "30%"}}>
            <a  style= {{ color: "black", fontSize: "50px", fontStyle: "italic" ,position: "absolute", top: "8%", left: "35%"}}>
              Sala Privada
            </a>
            <a  style= {{ color: "black", fontSize: "30px", fontStyle: "italic" ,position: "absolute", top: "30%", left: "10%"}}>
              Nombre de la sala: {sala.nombre}
            </a>
            <a  style= {{ color: "black", fontSize: "30px", fontStyle: "italic" ,position: "absolute", top: "40%", left: "10%"}}>
              Modo de juego: {sala.modo}
            </a>
            <a  style= {{ color: "black", fontSize: "30px", fontStyle: "italic" ,position: "absolute", top: "50%", left: "10%"}}>
              Jugadores: {sala.numJugadores}
            </a>
            <div  style= {{ position: "absolute", top: "63%", left: "10%"}}>
              <a style= {{ color: "black", fontSize: "30px", fontStyle: "italic"}}> Contraseña:  </a>
              <input className="App-textoNegro" style={{ width: "400px"}} label="" name="" onChange={handleChange4} />
            </div>
            <button className="App-botonConfirmar" style= {{top: "80%", left: "20%" , position:"absolute"}} onClick={funcionEntrar} >
              Entrar
            </button>
            <button className="App-botonCancelar" style= {{top: "80%", left: "55%" , position:"absolute"}}onClick={() => setShow(!show)} >
              Cancelar
            </button>
          </div>
           )}

        </div>
          )}
      </div>
    </div>
  );
};

export default ModoClasico;