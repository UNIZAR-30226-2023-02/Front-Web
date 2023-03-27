import './Estilos/App.css';
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import amigos from'./Imagenes/Amigos.png';
import BuscarPartida from'./Imagenes/BuscarPartida.png';
import CrearPartida from'./Imagenes/CrearPartida.png';
import Tienda from'./Imagenes/Tienda.png';
import Perfil from'./Imagenes/Perfil.png';

//const URL = "https://6e01-146-158-156-138.eu.ngrok.io/api/usuarios/login/";
const URL = "https://51.142.118.71:8000/api/usuarios/login/";

function CeldaDesplegable(props) {
  return (
    <button className='App-CeldaDesplegable' >
        <a >{props.texto}  </a>
        <br></br>
        <a color="white">____________________________________________</a>
    </button>
  )
}


const MenuJuego = () => {
  
  const navigate = useNavigate();
  const [show, setShow] = useState(true);

  const onSubmit1 = async (event) => {
      navigate(process.env.PUBLIC_URL + '/CrearPartida');
  };
  const onSubmit2 = async (event) => {
    navigate(process.env.PUBLIC_URL + '/BuscarPartida');
  };
  const onSubmit3 = async (event) => {
    navigate(process.env.PUBLIC_URL + '/Amigos');
  };
  const onSubmit4 = async (event) => {
    navigate(process.env.PUBLIC_URL + '/Tienda');
  };
  const onSubmit5 = async (event) => {
    navigate(process.env.PUBLIC_URL + '/CrearPartida');
  };
  const onSubmit6 = async (event) => {
    navigate(process.env.PUBLIC_URL + '/BuscarPartida');
  };
  const onSubmit7 = async (event) => {
    navigate(process.env.PUBLIC_URL + '/Amigos');
  };
  const onSubmit8 = async (event) => {
    navigate(process.env.PUBLIC_URL + '/Tienda');
  };
  const onSubmit9 = async (event) => {
    navigate(process.env.PUBLIC_URL + '/Tienda');
  };
  


  return (
    <div className="App">
      <header className="App-header">
          <div className="App-titulo" style= {{top: "7%"}} > TrivialB2B 
          <div className="App-Quesitos"> </div>           
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
                  <button className="App-boton" type="submit" onClick={() => onSubmit1()} > Crear Partida </button>
              </div>  
              <div className="App-ImagenBoton"> 
                  <img src={BuscarPartida} style={{width:"50%", height:"50%", paddingBottom:"10%"}} /> 
                  <button className="App-boton" type="submit" onClick={() => onSubmit2()}> Buscar Partida </button>
              </div>  
              <div className="App-ImagenBoton"> 
                  <img src={amigos} style={{width:"50%", height:"50%", paddingBottom:"10%"}} /> 
                  <button className="App-boton" type="submit" onClick={() => onSubmit3()}> Amigos </button>
              </div>  
              <div className="App-ImagenBoton"> 
                  <img src={Tienda} style={{width:"50%", height:"50%", paddingBottom:"10%"}} /> 
                  <button className="App-boton" type="submit" onClick={() => onSubmit4()}> Tienda</button>
              </div>  
          </div>
          ) : (
            <div>
              <div className="App-Imagenes">   
              <div className="App-ImagenBoton"> 
                  <img src={CrearPartida} style={{width:"50%", height:"50%", paddingBottom:"10%"}} /> 
                  <button className="App-boton" type="submit" onClick={() => onSubmit1()} > Crear Partida </button>
              </div>  
              <div className="App-ImagenBoton"> 
                  <img src={BuscarPartida} style={{width:"50%", height:"50%", paddingBottom:"10%"}} /> 
                  <button className="App-boton" type="submit" onClick={() => onSubmit2()}> Buscar Partida </button>
              </div>  
              <div className="App-ImagenBoton"> 
                  <img src={amigos} style={{width:"50%", height:"50%", paddingBottom:"10%"}} /> 
                  <button className="App-boton" type="submit" onClick={() => onSubmit3()}> Amigos </button>
              </div>  
              <div className="App-ImagenBoton"> 
                  <img src={Tienda} style={{width:"50%", height:"50%", paddingBottom:"10%"}} /> 
                  <button className="App-boton" type="submit" onClick={() => onSubmit4()}> Tienda</button>
              </div>
              </div>
              <div className="App-Desplegable">
                <img src={Perfil} style={{width:"100px", height:"100px", left:"10%", marginTop:"20px", marginLeft:"20px", marginBottom:"150px"}} /> 
                <CeldaDesplegable texto="Perfil" />
                <CeldaDesplegable texto="Historial" />
                <CeldaDesplegable texto="Contacto" />
                <CeldaDesplegable texto="Redes Sociales" />
                <CeldaDesplegable texto="Estadísticas" />
              </div>
            </div>
          )}
        </header>
    </div>
  );
};

export default MenuJuego;
