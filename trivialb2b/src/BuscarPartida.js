import React, { useState, useEffect, useRef } from "react";
import './Estilos/App.css';
import { useNavigate } from 'react-router-dom';
import Buscar from'./Imagenes/BuscarPartida.png';
import Candado from'./Imagenes/Candado.png';
import Transparente from'./Imagenes/Transparente.png';
import InfiniteScroll from 'react-infinite-scroll-component';
import Cookies from 'universal-cookie';

const URL = "http://51.142.118.71:8000/api/salas/lista-salas/";
const URL2 = "http://51.142.118.71:8000/api/salas/validar/";
const URL3 = "http://51.142.118.71:8000/api/partida/activa/";
const URL1 = "http://51.142.118.71:8000/api/salas/listar-peticiones-sala/";

const ModoClasico = () => {
  const [contraseña, setContraseña] = useState("");

  const [sala, setSala] = useState({ nombre: "", tiempo: "", numJugadores: "", password: "", creador: "", modo: "", tipo: ""});
  const [pet, setPet] = useState({ me_invita: "", ws: "" });
  const [peticiones, setPeticiones] = useState([]);
  const [salas, setSalas] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [webs, setWeb] = useState();



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
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);

  
  const navigate = useNavigate();

  const cookies= new Cookies();
  const token = cookies.get('token');
  const usuario = cookies.get('tokenUsuario');
  console.log(usuario)
  
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

    fetch(URL3, {
      method: "POST",
      headers: {"Authorization": "Token " + token, "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {console.log(data)
        if (data.OK == "True") {
          setWeb(data.ws_partida)
          setShow4(true)
        }
        
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

  const handleChange2 = (e) => {
    setPet({
      ...pet,
      ["me_invita"]: e.me_invita,
      ["ws"]: e.ws,
    })
  };  


  const cancelar = async (event) => {
    navigate(process.env.PUBLIC_URL + '/MenuJuego');
  }; 


  const invitaciones = async (event) => {
    fetch(URL1, {
      method: "POST",
      headers: {"Authorization": "Token " + token, "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {console.log(data)
        if (data.OK = "true"){
          console.log(peticiones)
          peticiones.length = 0
          console.log(peticiones)
          data.peticiones.forEach(element => {
            peticiones.push(element)
          })
          setPeticiones(peticiones)
          setShow2(false)
          console.log(peticiones)
        }
 
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  };  

  const handleChange4 = (e) => {
    setContraseña(e.target.value);
  };

  function funcionEntrar() {
    fetch(URL2, {
      method: "POST",
      headers: { "Authorization": "Token " + token, "Content-Type": "application/json" },
      body: JSON.stringify({"nombre_sala": sala.nombre, "password_sala": contraseña })
    })

      .then((response) => response.json())
      .then((data) => {console.log(data)
      if (data.OK == "True") {
        cookies.set('n_jugadores', sala.numJugadores, {path: '/'})
        cookies.set('noCreador', 1, {path: '/'})
        cookies.set('WebSocketEsperando', data.ws, {path: '/'})
        navigate(process.env.PUBLIC_URL+'/EsperandoJugadores');
      }
      else {
        //Gestión de error error_sala
      }
        
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  }

  function funcionEntrar2() {
    cookies.set('n_jugadores', 4, {path: '/'})  ///!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1
    cookies.set('noCreador', 1, {path: '/'})
    cookies.set('WebSocketEsperando', pet.ws, {path: '/'})
    navigate(process.env.PUBLIC_URL+'/EsperandoJugadores');
  }

  function funcionEntrar3() {
    cookies.set('WebSocketTablero', webs, {path: '/'})
    navigate(process.env.PUBLIC_URL+ '/Tablero');
  }


  function jugadores() {
    return searchResults.map(elemento  => (
      <div className="App-CuadradoBlanco" style={{ width: "99.6%", height: "15%", position: "relative", left: "0%",cursor: "pointer"}} onClick={() => {handleChange(elemento); setShow(!show); if (elemento.tipo_sala == "Privado"){setShow1(false)} else{setShow1(true)}}}>
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


  function invitaciones_lista() {

    return peticiones.map(elemento  => (
      <div className="App-CuadradoBlanco" style={{ width: "99.6%", height: "15%", position: "relative", left: "0%",cursor: "pointer"}}onClick={() => {handleChange2(elemento);setShow3(true)}}>
        <a  style= {{ color: "black", fontSize: "40px", fontStyle: "italic" ,position: "absolute", top: "15%", left: "5%"}}>
          {elemento.me_invita}
        </a>
        <a  style= {{ color: "black", fontSize: "40px", fontStyle: "italic" ,position: "absolute", top: "15%", left: "25%"}}>
          {elemento.ws}
        </a>
        <a  style= {{ color: "black", fontSize: "40px", fontStyle: "italic" ,position: "absolute", top: "15%", left: "45%"}}>
          {elemento.me_invita}
        </a>
        <a  style= {{ color: "black", fontSize: "40px", fontStyle: "italic" ,position: "absolute", top: "15%", left: "70%"}}>
          {elemento.me_invita}
        </a>
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
            
          {show4 ? (
            <button className="App-botonConfirmar" style= {{top: "1%", left: "64%" , weith:"20%", position:"absolute", fontSize:"30px"}} onClick={() => funcionEntrar3()} >
              Partida <br></br>
              Activa
            </button>
          ) : (
            <div/>
          )}
            <button className="App-botonCancelar" style= {{top: "3%", left: "90%" , position:"absolute", fontSize:"30px"}} onClick={() => cancelar()} >
              Volver
            </button>
          </div>
          {show2 ? (
            <div>
              <img src={Buscar} style={{width:"5%", height:"7%", left:"29%",zIndex: "1", top:"3%", position:"absolute"}}/>
              <input className="App-textoNegro" label="pepe" name="pepe" onChange={handleChange3} value={searchTerm} style= {{top: "2%", left: "2%", position:"absolute", width: "500px", height: "50px"}} />
              <button className="App-botonAzul" style= {{top: "3%", left: "75%" , position:"absolute", fontSize:"30px"}} onClick={() => invitaciones()} >
                Invitaciones
              </button>
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
            </div>
          ) : (
            <div>
              <button className="App-botonAzul" style= {{top: "3%", left: "78%" , position:"absolute", fontSize:"30px"}} onClick={() => {setShow2(true)}} >
                Salas
              </button>
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
                    Amigo
                </a>
              </div>
              <div className="App-CuadradoBlanco" style={{ width: "100%", height: "73%", position: "absolute", top: "27%", left: "-0.2%"}}>
                <InfiniteScroll
                  dataLength={peticiones.length}
                  pageStart={0}
                  loadMore={invitaciones_lista}
                  hasMore={true || false}
                  loader={<div className="loader" key={0}></div>}
                  useWindow={false}
                  style={{position:"absolute", width: "100%", height: "100%"}}
                >
                  {invitaciones_lista()}
                </InfiniteScroll>
              </div>
            
              {show3 ? (
                <div className="App-CuadradoAmarillo" style={{ width: "800px", height: "500px", position: "absolute", top: "20%", left: "30%"}}>
                  <a  style= {{ color: "black", fontSize: "50px", fontStyle: "italic" ,position: "absolute", top: "8%", left: "35%"}}>
                    Invitación Sala
                  </a>
                  <a  style= {{ color: "black", fontSize: "30px", fontStyle: "italic" ,position: "absolute", top: "30%", left: "10%"}}>
                    Nombre de la sala: {peticiones.me_invita}
                  </a>
                  <a  style= {{ color: "black", fontSize: "30px", fontStyle: "italic" ,position: "absolute", top: "40%", left: "10%"}}>
                    Modo de juego: {peticiones.me_invita}
                  </a>
                  <a  style= {{ color: "black", fontSize: "30px", fontStyle: "italic" ,position: "absolute", top: "50%", left: "10%"}}>
                    Jugadores: {peticiones.me_invita}
                  </a>
                  <button className="App-botonConfirmar" style= {{top: "75%", left: "20%" , position:"absolute"}} onClick={funcionEntrar2} >
                    Entrar
                  </button>
                  <button className="App-botonCancelar" style= {{top: "75%", left: "55%" , position:"absolute"}}onClick={() => setShow3(!show3)} >
                    Cancelar
                  </button>
                </div>
              ) : (
                <div/>
              )}
              
            </div>
          )}
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
              <img src={Buscar} style={{width:"5%", height:"7%", left:"29%",zIndex: "1", top:"3%", position:"absolute"}}/>
              <input className="App-textoNegro" label="pepe" name="pepe" style= {{top: "2%", left: "2%", position:"absolute", width: "500px", height: "50px"}}/>
              <button className="App-botonAzul" style= {{top: "3%", left: "90%" , position:"absolute", fontSize:"30px"}} >
                Volver
              </button>
              <button className="App-botonAzul" style= {{top: "3%", left: "75%" , position:"absolute", fontSize:"30px"}} onClick={() => invitaciones()} >
                Invitaciones
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