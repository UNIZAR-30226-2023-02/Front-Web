import React, { useState } from "react";
import './Estilos/App.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const URL = "http://51.142.118.71:8000/api/salas/crear/";

function CuadroTexto(props) {
return (
    <div>
    <a style={{color:"#174a67"}}> {props.texto}:  </a>
    <input className="App-textoNegro"
      label={props.label}
      name={props.nombre}
      value={props.valor}
      onChange={props.funcion}
    />
    </div>
)
}

const ModoTematica = () => {
    
  const [body, setBody] = useState({ nombre_sala: "", tiempo_respuesta: "10", password_sala: "", n_jugadores: "2", tipo_partida: "Tematico", tematica: "Geografia" });
  const [errores, setErorres] = useState("");
  const navigate = useNavigate();
  const cookies= new Cookies();
  const token = cookies.get('token');
  const usuario = cookies.get('tokenUsuario');

  const handleChange = (e) => {
    setBody({
      ...body,
      [e.target.name]: e.target.value,
    });
  };

  const cancelar = async (event) => {
    navigate(process.env.PUBLIC_URL + '/CrearPartida');
  };

  const onSubmit = () => {
    fetch(URL, {
      method: "POST",
      headers: {"Authorization": "Token " + token, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())

      .then((data) => { 
        if (data.OK == "True"){
          setErorres("")
          cookies.set('nombre_sala', body.nombre_sala, {path: '/'})
          cookies.set('tiempo_respuesta', body.tiempo_respuesta, {path: '/'})
          cookies.set('password_sala', body.password_sala, {path: '/'})
          cookies.set('n_jugadores', body.n_jugadores, {path: '/'})
          cookies.set('tipo_partida', body.tipo_partida, {path: '/'})
          cookies.set('WebSocketEsperando', data.websocket, {path: '/'})
          cookies.set('noCreador', 0, {path: '/'})
          navigate(process.env.PUBLIC_URL+'/EsperandoJugadores');
        }
        else {
          if (data.error_nombre_sala !== "") {
            setErorres("Error con el nombre de la sala");
          }
          else if (data.error_tipo_sala !== ""){
            setErorres("Error: Ya estas en una partida");
          }
          else if (data.error_tipo_partida !== ""){
            setErorres("Error tipo partida");
          }
          else if (data.error_n_jugadores !== ""){
            setErorres("Error en el número de jugadores");
          }
          else if (data.error_tiempo_respuesta !== ""){
            setErorres("Error tiempo respuesta");
          }
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="App">
      <div className = "App-header" > 
        <div className="App-titulo"  style= {{top: "7%"}}> Modo Temática
          <div className="App-Quesitos" style= {{left: "36%"}}/> 
        </div>
        <div className="App-CuadradoAmarillo" style={{ width: "1730px", height: "620px", position: "absolute", zIndex: "1", top: "24%", left: "5%"}}>
          <div style={{marginTop:"4px"}}>
            <a  style= {{ color: "#174a67", fontSize: "60px", fontStyle: "italic" }}>
                Creación de Sala de modo Temática:   
            </a>
            <div style={{marginTop:"0px", top:"10%", color: "#174a67"}}>
              <a> ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯</a>
            </div>
          </div>
          <form className="App-Input" style={{marginTop:"2%"}}>
            <div className="App-CuadrosTextoIzq" > 
              <div style={{marginLeft: "3%"}}>
              <CuadroTexto texto="Nombre de la sala" label="nombre_sala" nombre="nombre_sala" valor={body.nombre_sala} funcion={handleChange} />
              </div>
              <div style={{marginTop:"3%"}}>
                <label for="tiempoRespuesta" style={{color: "#174a67"}} > Tiempo de respuesta </label>
                <select name="tiempoRespuesta" id="tiempoRespuesta" className="App-textoNegro" style={{width:"530px", height:"70px" }}   
                onChange={(event) => setBody({
                ...body,
                tiempo_respuesta: event.target.value
                })}>
                    <option value="10" >10 segundos</option>
                    <option value="15">15 segundos</option>
                    <option value="20">20 segundos</option>
                    <option value="25">25 segundos</option>
                    <option value="30">30 segundos</option>
                </select> 
                </div>
            </div>
            <div className="App-CuadrosTextoDer" style={{marginRight: "1%"}} > 
              <label for="numeroJugadores" style={{color: "#174a67"}}> Nº de jugadores: </label>
              <select name="numeroJugadores" id="numeroJugadores" className="App-textoNegro" style={{width:"530px", height:"70px" }}onChange={(event) => setBody({
                ...body,
                n_jugadores: event.target.value
                })}>
                  <option value="2">2</option>
                  <option value="4">4</option>
                  <option value="6">6</option>
              </select> 
              <div style={{marginTop:"3%", marginLeft: "6%"}}>            
                  <CuadroTexto texto="*  Contraseña" label="password" nombre="password_sala" valor={body.password_sala} funcion={handleChange} />
              </div>

            </div>
          </form>
          <div style={{top:"59%", left: "25%", position: "absolute"}}>
            <label for="tematica" style={{color: "#174a67", fontSize:"40px"}}> Tematica: </label>
            <select name="tematica" id="tematica" className="App-textoNegro" style={{width:"530px", height:"70px" }}onChange={(event) => setBody({
              ...body,
              tematica: event.target.value
              })}>
                <option value="Geografia">Geografia</option>
                <option value="Historia">Historia</option>
                <option value="Arte">Arte</option>
                <option value="Ciencia">Ciencia</option>
                <option value="Entretenimiento">Entretenimiento</option>
                <option value="Deportes">Deportes</option>
            </select> 
          </div>
          <div style={{fontSize:"23px", color:"red", position:"absolute", left:"45%", top:"65%"}}>
            <a  > {errores}</a>
          </div>
          <div style={{fontSize:"23px", color:"black", position:"absolute", left:"36%", top:"74%"}}> 
            <a >Los elementos con asterisco (*) son opcionales</a>
          </div>
          <div>
              <button className="App-botonCancelar" style= {{top: "83%", left: "33%", position:"absolute"}} onClick={() => cancelar()} >
                Cancelar
              </button>
              <button className="App-botonConfirmar" style= {{top: "83%", left: "54%" , position:"absolute"}}onClick={() => onSubmit()} >
                Confirmar
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModoTematica;