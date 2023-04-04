import React, { useState } from "react";
import './Estilos/App.css';
import { useNavigate } from 'react-router-dom';
import Clasico from'./Imagenes/Clasico.png';
import Equipos from'./Imagenes/Equipos.png';
import Tematica from'./Imagenes/Tematica.png';
import Perfil from'./Imagenes/Perfil.png';
import Logo from './Imagenes/Logo.png';
import Atras from "./Imagenes/Atras.png";

//const URL = "https://6e01-146-158-156-138.eu.ngrok.io/api/usuarios/login/";
const URL = "https://51.142.118.71:8000/api/usuarios/login/";

function CeldaDesplegable( props ) {
  return (
    <button className='App-CeldaDesplegable' type="submit" onClick={props.function} > 
      <a style={{color:"white", fontSize:"30px"}}>{props.texto} </a>
      <br></br>
      <a style={{color:"white", fontSize:"15px"}}>____________________________________________</a>
    </button>
  )
 }

 function Desplegable( props ) {
  return (
    <div className="App-Desplegable">
      <div style={{marginTop: "3%"}}>
      <img src={props.img1} style={{width:"100px", height:"100px", left:"10%", marginRight:"5%", marginLeft:"5%", cursor: "pointer"}} onClick={props.funcionShow}/>
      <img src={props.img2} style={{width:"100px", height:"100px", marginLeft:"45%"}} />  
      </div>

      <CeldaDesplegable texto="Perfil" function={props.functionP}/> 
      <CeldaDesplegable texto="Historial" function={props.functionH} /> 
      <CeldaDesplegable texto="Contacto" function={props.functionC}/> 
      <CeldaDesplegable texto="Redes Sociales" function={props.functionR}/> 
      <CeldaDesplegable texto="Estadísticas" function={props.functionE}/> 

      <button className="App-boton" style={{marginLeft:"20%", width:"60%", marginTop:"10%"}} type="submit" onClick={props.funcionCerrarS}> Cerrar Sesion</button>
    </div>
  )
 }

 
 function Modo( props ) {
  return (
    <div className="App-ImagenBoton" style={{marginRight: "100px"}}> 
      <img src={props.img} style={{width:"50%", height:"50%", paddingBottom:"10%"}} /> 
      <button className="App-boton" type="submit" onClick={props.funcion} > {props.texto} </button>
    </div>  
  )
 }

const CrearPartida = () => {

  const navigate = useNavigate();
  const [show, setShow] = useState(true);

  const flechaAtras = async (event) => {
    navigate(process.env.PUBLIC_URL+ '/MenuJuego');
  };

  const onSubmit1 = async (event) => {
    navigate(process.env.PUBLIC_URL + '/ModoClasico');
  };
  const onSubmit2 = async (event) => {
    navigate(process.env.PUBLIC_URL + '/ModoEquipos');
  };
  const onSubmit3 = async (event) => {
    navigate(process.env.PUBLIC_URL + '/Tablero');
  };
  const onPerfil = async (event) => {
    navigate(process.env.PUBLIC_URL + '/Perfil');
  };
  const onHistorial = async (event) => {
    navigate(process.env.PUBLIC_URL + '/Historial');
  };
  const onContacto = async (event) => {
    navigate(process.env.PUBLIC_URL + '/Contacto');
  };
  const onRedesSociales = async (event) => {
    navigate(process.env.PUBLIC_URL + '/RedesSociales');
  };
  const onEstadisticas = async (event) => {
    navigate(process.env.PUBLIC_URL + '/Estadisticas');
  };
  const onCerrarSesion = async (event) => {
    navigate(process.env.PUBLIC_URL + '/CerrarSesion');
  };

  
  return (
    <div className="App">
      <header className = "App-header" > 
      <div className="App-titulo" style= {{top: "7%"}} > CrearPartida 
        <div className="App-Quesitos"/> 
        </div>
        <button className='App-IconoPerfil' type="button" onClick={() => {setShow(!show);}}>
          <img src={Perfil} style={{width:"100%", height:"100%"}} /> 
        </button> 
        {show ? (
          <div className="App-Imagenes">   
            <Modo texto="Modo Clasico"funcion={onSubmit1} img={Clasico}/>
            <Modo texto="Modo Equipos"funcion={onSubmit2} img={Equipos}/>
            <Modo texto="Modo Tematica"funcion={onSubmit3} img={Tematica}/> 
          </div>
        ) : (
          <div>
            <div className="App-Imagenes">   
              <Modo texto="Modo Clasico"funcion={onSubmit1} img={Clasico}/>
              <Modo texto="Modo Equipos"funcion={onSubmit2} img={Equipos}/>
              <Modo texto="Modo Tematica"funcion={onSubmit3} img={Tematica}/> 
            </div>
            <Desplegable funcionShow={setShow} functionP={onPerfil} functionH={onHistorial} functionC={onContacto} functionR={onRedesSociales} functionE={onEstadisticas} funcionCerrarS={onCerrarSesion} img1={Perfil} img2={Logo}/>
          </div>
        )}
        <img src={Atras} style={{width:"170px", height:"170px", top:"75%", left:"5%", cursor: "pointer", position: "absolute"}} onClick={() => flechaAtras()}/>
      </header>
    </div>
  );
};

export default CrearPartida;
