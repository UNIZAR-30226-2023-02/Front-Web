import './Estilos/App.css';
import React, { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import Amigos from'./Imagenes/Amigos.png';
import BuscarPartida from'./Imagenes/BuscarPartida.png';
import CrearPartida from'./Imagenes/CrearPartida.png';
import Tienda from'./Imagenes/Tienda.png';
import Perfil from'./Imagenes/Perfil.png';
import Logo from './Imagenes/Logo.png';
import Estadisticas from './Estadisticas';
import Cookies from 'universal-cookie';



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

function Modo( props ) {
  return (
    <div className="App-ImagenBoton"> 
      <img src={props.img} style={{width:props.tam, paddingBottom:props.pad}} /> 
      <button className="App-boton" type="submit" onClick={props.function}> {props.texto} </button>
    </div>  
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
      <CeldaDesplegable texto="Dar de baja" function={props.functionH} /> 
      <CeldaDesplegable texto="Contacto" function={props.functionC}/> 
      <CeldaDesplegable texto="Redes Sociales" function={props.functionR}/> 
      <CeldaDesplegable texto="Estadísticas" function={props.functionE}/> 

      <button className="App-boton" style={{marginLeft:"20%", width:"60%", marginTop:"10%"}} type="submit" onClick={props.funcionCerrarS}> Cerrar Sesion</button>
    </div>
  )
 }


const MenuJuego = () => {
  const cookies= new Cookies();
  const usuario = cookies.get('tokenUsuario');
  console.log(usuario)
  const location = useLocation();
  const navigate = useNavigate();
  const [show, setShow] = useState(true);

  const onCrearPartida = async (event) => {
    navigate(process.env.PUBLIC_URL + '/CrearPartida');
  };
  const onBuscarPartida = async (event) => {
    navigate(process.env.PUBLIC_URL + '/BuscarPartida');
  };
  const onAmigos = async (event) => {
    navigate(process.env.PUBLIC_URL + '/Amigos');
  };
  const onTienda = async (event) => {
    navigate(process.env.PUBLIC_URL + '/Tienda');
  };
  const onPerfil = async (event) => {
    let cambiarDatos = false;
    navigate(process.env.PUBLIC_URL + '/Perfil', {state: { cambiarDatos }});
  };
  const onDarDeBaja = async (event) => {
    navigate(process.env.PUBLIC_URL + '/DarDeBaja');
  };
  const onContacto = async (event) => {
    navigate(process.env.PUBLIC_URL + '/Contacto');
  };
  const onRedesSociales = async (event) => {
    navigate(process.env.PUBLIC_URL + '/RedesSociales');
  };
  const onEstadisticas = async (event) => {
    cookies.set('estadisticas', usuario, {path: '/'})
    cookies.set('estadisticas_pagina', "/MenuJuego", {path: '/'})
    navigate(process.env.PUBLIC_URL + '/Estadisticas');
  };
  const onCerrarSesion = async (event) => {
    navigate(process.env.PUBLIC_URL + '/CerrarSesion');
  };

  return (
    <div className="App">
      <header className="App-header">
          <div className="App-titulo" style= {{top: "7%"}} > TrivialB2B 
          <div className="App-Quesitos"/>           
          </div>
          <button className='App-IconoPerfil' type="button" onClick={() => { setShow(!show) }}>
            <img src={Perfil} style={{width:"100%", height:"100%"}} /> 
          </button> 

          {show ? (
          <div className="App-Imagenes">   
              <Modo texto="Crear Partida"function={onCrearPartida} img={CrearPartida} tam="50%" pad="10%"/>
              <Modo texto="Buscar Partida" function={onBuscarPartida} img={BuscarPartida}tam="70%" pad="20%"/> 
              <Modo texto="Amigos"function={onAmigos} img={Amigos}tam="50%" pad="10%"/>
              <Modo texto="Tienda" function={onTienda} img={Tienda}tam="50%" pad="10%"/>  
          </div>
          ) : (
            <div>
              <div className="App-Imagenes">   
              <Modo texto="Crear Partida"function={onCrearPartida} img={CrearPartida} tam="50%" pad="10%"/>
              <Modo texto="Buscar Partida" function={onBuscarPartida} img={BuscarPartida}tam="70%" pad="20%"/> 
              <Modo texto="Amigos"function={onAmigos} img={Amigos}tam="50%" pad="10%"/>
              <Modo texto="Tienda" function={onTienda} img={Tienda}tam="50%" pad="10%"/>  
              </div>
              <Desplegable funcionShow={setShow} functionP={onPerfil} functionH={onDarDeBaja} functionC={onContacto} functionR={onRedesSociales} functionE={onEstadisticas} funcionCerrarS={onCerrarSesion} img1={Perfil} img2={Logo}/>
            </div>
          )}
        </header>
    </div>
  );
};

export default MenuJuego;
