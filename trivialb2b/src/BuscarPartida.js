import React, { useState } from "react";
import './Estilos/App.css';
import { useNavigate } from 'react-router-dom';
import Buscar from'./Imagenes/BuscarPartida.png';
import Candado from'./Imagenes/Candado.png';
import Transparente from'./Imagenes/Transparente.png';
import InfiniteScroll from 'react-infinite-scroll-component'


//const URL = "https://6e01-146-158-156-138.eu.ngrok.io/api/usuarios/login/";
const URL = "http://51.142.118.71:8000/api/usuarios/login/";



const ModoClasico = () => {
    
  const [sala, setSala] = useState({ nombre: "", tiempo: "", numJugadores: "", password: "", creador: "", modo: ""});
  const [sala1, setSala1] = useState({ nombre: "Sala 1", tiempo: "", numJugadores: "2", password: "pepe1", creador: "Acher", modo: "Clasico", publica: true});
  const [sala2, setSala2] = useState({ nombre: "Sala 2", tiempo: "", numJugadores: "4", password: "", creador: "Roberto", modo: "Equipos", publica: false});
  const [sala3, setSala3] = useState({ nombre: "Sala 3", tiempo: "", numJugadores: "2", password: "pepe1", creador: "Acher", modo: "Clasico", publica: true});
  const [sala4, setSala4] = useState({ nombre: "Sala 4", tiempo: "", numJugadores: "2", password: "pepe1", creador: "Acher", modo: "Clasico", publica: true});
  const [sala5, setSala5] = useState({ nombre: "Sala 5", tiempo: "", numJugadores: "4", password: "", creador: "Roberto", modo: "Equipos", publica: false});
  const [sala6, setSala6] = useState({ nombre: "Sala 6", tiempo: "", numJugadores: "2", password: "pepe1", creador: "Acher", modo: "Clasico", publica: true});
  const [sala7, setSala7] = useState({ nombre: "Sala 7", tiempo: "", numJugadores: "4", password: "", creador: "Roberto", modo: "Equipos", publica: false});

  const salas = [sala1,sala2,sala3,sala4,sala5,sala6,sala7];

  const [show, setShow] = useState(true);
  const [show1, setShow1] = useState(true);

  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setSala({
      ...sala,
      ["nombre"]: e.nombre,
      ["tiempo"]: e.tiempo,
      ["numJugadores"]: e.numJugadores,
      ["password"]: e.password,
      ["creador"]: e.creador,
      ["modo"]: e.modo,
    })
  };

  const cancelar = async (event) => {
    navigate(process.env.PUBLIC_URL + '/MenuJuego');
  };  
  const onPassword = (e) => {
    if (e.target.value == sala.password) {
      navigate(process.env.PUBLIC_URL + '/MenuJuego');
    }
  };

  function jugadores() {

    return salas.map((elemento) => (
      <div className="App-CuadradoBlanco" style={{ width: "99.6%", height: "15%", position: "relative", left: "0%",cursor: "pointer"}}onClick={() => {handleChange(elemento);setShow(!show); if (elemento.publica){setShow1(false)}}}>
        <a  style= {{ color: "black", fontSize: "40px", fontStyle: "italic" ,position: "absolute", top: "15%", left: "5%"}}>
          {elemento.nombre}
        </a>
        <a  style= {{ color: "black", fontSize: "40px", fontStyle: "italic" ,position: "absolute", top: "15%", left: "25%"}}>
          {elemento.modo}
        </a>
        <a  style= {{ color: "black", fontSize: "40px", fontStyle: "italic" ,position: "absolute", top: "15%", left: "45%"}}>
          {elemento.numJugadores}
        </a>
        <a  style= {{ color: "black", fontSize: "40px", fontStyle: "italic" ,position: "absolute", top: "15%", left: "70%"}}>
          {elemento.creador}
        </a>

        { elemento.publica ?
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
            <img src={Buscar} style={{width:"5%", height:"7%", left:"29%",zIndex: "1", top:"3%", cursor: "pointer", position:"absolute"}} onClick={cancelar}/>
            <input className="App-textoNegro" label="pepe" name="pepe" onChange={handleChange} style= {{top: "2%", left: "2%", position:"absolute", width: "500px", height: "50px"}}/>
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

          <div className="App-CuadradoBlanco" style={{ width: "100%", height: "73%", position: "absolute", top: "27%", left: "-0.2%"}}>
          <InfiniteScroll
            dataLength={salas.length}
            pageStart={0}
            loadMore={jugadores}
            hasMore={true || false}
            loader={<div className="loader" key={0}>Loading ...</div>}
            useWindow={false}
            style={{position:"absolute", width: "100%", height: "100%"}}
          >
            {jugadores()}
          </InfiniteScroll>
          </div>
          
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

            <div className="App-CuadradoBlanco" style={{ width: "100%", height: "73%", position: "absolute", top: "27%", left: "-0.2%"}}>

              <div className="App-CuadradoBlanco" style={{ width: "100%", height: "15%", position: "relative",left: "-0.2%",cursor: "pointer"}}>
                <a  style= {{ color: "black", fontSize: "40px", fontStyle: "italic" ,position: "absolute", top: "15%", left: "5%"}}>
                  {sala1.nombre}
                </a>
                <a  style= {{ color: "black", fontSize: "40px", fontStyle: "italic" ,position: "absolute", top: "15%", left: "25%"}}>
                  {sala1.modo}
                </a>
                <a  style= {{ color: "black", fontSize: "40px", fontStyle: "italic" ,position: "absolute", top: "15%", left: "45%"}}>
                  {sala1.numJugadores}
                </a>
                <a  style= {{ color: "black", fontSize: "40px", fontStyle: "italic" ,position: "absolute", top: "15%", left: "70%"}}>
                  {sala1.creador}
                </a>
                <img src={Candado} style= {{width:"auto", height:"70%",position: "absolute", top: "15%", left: "93%"}}/>
              </div>

              <div className="App-CuadradoBlanco" style={{ width: "100%", height: "15%", position: "relative",left: "-0.2%",cursor: "pointer"}}>
                  <a  style= {{ color: "black", fontSize: "40px", fontStyle: "italic" ,position: "absolute", top: "15%", left: "5%"}}>
                    {sala2.nombre}
                  </a>
                  <a  style= {{ color: "black", fontSize: "40px", fontStyle: "italic" ,position: "absolute", top: "15%", left: "25%"}}>
                    {sala2.modo}
                  </a>
                  <a  style= {{ color: "black", fontSize: "40px", fontStyle: "italic" ,position: "absolute", top: "15%", left: "45%"}}>
                    {sala2.numJugadores}
                  </a>
                  <a  style= {{ color: "black", fontSize: "40px", fontStyle: "italic" ,position: "absolute", top: "15%", left: "70%"}}>
                    {sala2.creador}
                  </a>
              </div>

            </div>
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
            <button className="App-botonConfirmar" style= {{top: "75%", left: "20%" , position:"absolute"}}onClick={() => cancelar()} >
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
              <input className="App-textoNegro" style={{ width: "400px"}} label="" name="" onChange={() => onPassword()}/>
            </div>
            <button className="App-botonConfirmar" style= {{top: "80%", left: "20%" , position:"absolute"}}onClick={() => cancelar()} >
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