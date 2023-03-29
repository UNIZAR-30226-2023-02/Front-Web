import './Estilos/App.css';
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import amigos from'./Imagenes/Amigos.png';
import BuscarPartida from'./Imagenes/BuscarPartida.png';
import CrearPartida from'./Imagenes/CrearPartida.png';
import Tienda from'./Imagenes/Tienda.png';
import Perfil from'./Imagenes/Perfil.png';
import Logo from './Imagenes/Logo.png';
import Estadisticas from './Estadisticas';

//const URL = "https://6e01-146-158-156-138.eu.ngrok.io/api/usuarios/login/";
const URL = "https://51.142.118.71:8000/api/usuarios/login/";

function CeldaDesplegable( props ) {
 return (
    <div>
      <a style={{color:"white", fontSize:"30px"}}>{props.texto} </a>
      <br></br>
      <a style={{color:"white", fontSize:"20px"}}>____________________________________________</a>
    </div>
 )
}

const MenuJuego = () => {
  
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
      <header className="App-header">
          <div className="App-titulo" style= {{top: "7%"}} > TrivialB2B 
          <div className="App-Quesitos"/>           
          </div>
          <button
            className='App-IconoPerfil'
            type="button"             
            onClick={() => {
              setShow(!show);
            }}>
            {show ? '' : ''}
            <img src={Perfil} style={{width:"100%", height:"100%"}} /> 
          </button> 

          {show ? (
          <div className="App-Imagenes">   
              <div className="App-ImagenBoton"> 
                  <img src={CrearPartida} style={{width:"50%", height:"50%", paddingBottom:"10%"}} /> 
                  <button className="App-boton" type="submit" onClick={() => onCrearPartida()} > Crear Partida </button>
              </div>  
              <div className="App-ImagenBoton"> 
                  <img src={BuscarPartida} style={{width:"50%", height:"50%", paddingBottom:"10%"}} /> 
                  <button className="App-boton" type="submit" onClick={() => onBuscarPartida()}> Buscar Partida </button>
              </div>  
              <div className="App-ImagenBoton"> 
                  <img src={amigos} style={{width:"50%", height:"50%", paddingBottom:"10%"}} /> 
                  <button className="App-boton" type="submit" onClick={() => onAmigos()}> Amigos </button>
              </div>  
              <div className="App-ImagenBoton"> 
                  <img src={Tienda} style={{width:"50%", height:"50%", paddingBottom:"10%"}} /> 
                  <button className="App-boton" type="submit" onClick={() => onTienda()}> Tienda</button>
              </div>  
          </div>
          ) : (
            <div>
              <div className="App-Imagenes">   
              <div className="App-ImagenBoton"> 
                  <img src={CrearPartida} style={{width:"50%", height:"50%", paddingBottom:"10%"}} /> 
                  <button className="App-boton" type="submit" onClick={() => onCrearPartida()} > Crear Partida </button>
              </div>  
              <div className="App-ImagenBoton"> 
                  <img src={BuscarPartida} style={{width:"50%", height:"50%", paddingBottom:"10%"}} /> 
                  <button className="App-boton" type="submit" onClick={() => onBuscarPartida()}> Buscar Partida </button>
              </div>  
              <div className="App-ImagenBoton"> 
                  <img src={amigos} style={{width:"50%", height:"50%", paddingBottom:"10%"}} /> 
                  <button className="App-boton" type="submit" onClick={() => onAmigos()}> Amigos </button>
              </div>  
              <div className="App-ImagenBoton"> 
                  <img src={Tienda} style={{width:"50%", height:"50%", paddingBottom:"10%"}} /> 
                  <button className="App-boton" type="submit" onClick={() => onTienda()}> Tienda</button>
              </div>
              </div>
              <div className="App-Desplegable">
                <div>
                <img src={Perfil} style={{width:"100px", height:"100px", left:"10%", marginTop:"20px", marginRight:"400px", marginLeft:"20px", marginBottom:"150px", cursor: "pointer"}} onClick={() => setShow(!show)}/>
                <img src={Logo} style={{width:"100px", height:"100px", marginTop:"20px", marginLeft:"20px", marginBottom:"150px"}} />  
                </div>
                <button className='App-CeldaDesplegable' type="submit" onClick={() => onPerfil()} > <CeldaDesplegable texto="Perfil" /> </button>
                <button className='App-CeldaDesplegable' type="submit" onClick={() => onHistorial()} > <CeldaDesplegable texto="Historial"  /> </button>
                <button className='App-CeldaDesplegable' type="submit" onClick={() => onContacto()} > <CeldaDesplegable texto="Contacto" /> </button>
                <button className='App-CeldaDesplegable' type="submit" onClick={() => onRedesSociales()} > <CeldaDesplegable texto="Redes Sociales"  /> </button>
                <button className='App-CeldaDesplegable' type="submit" onClick={() => onEstadisticas()} > <CeldaDesplegable texto="Estadísticas" /> </button>

                <button className="App-boton" style={{marginLeft:"170px", marginTop:"100px", width:"300px"}} type="submit" onClick={() => onCerrarSesion()}> Cerrar Sesion</button>

                </div>
            </div>
          )}
        </header>
    </div>
  );
};

export default MenuJuego;
