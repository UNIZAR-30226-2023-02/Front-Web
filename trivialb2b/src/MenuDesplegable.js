import React, { useState } from "react";
import './Estilos/App.css';
import { useNavigate } from 'react-router-dom';
/*import amigos from'./Imagenes/Amigos.png';
import BuscarPartida from'./Imagenes/BuscarPartida.png';
import CrearPartida from'./Imagenes/CrearPartida.png';
import Tienda from'./Imagenes/Tienda.png';
*/

//const URL = "https://6e01-146-158-156-138.eu.ngrok.io/api/usuarios/login/";
const URL = "https://51.142.118.71:8000/api/usuarios/login/";

/*
         <button
            type="button"
            onClick={() => {
              setShow(!show);
            }}
            >
            Mostrar {show ? 'Div 2' : 'Div 1'}
        </button>

        {show ? (
          <div style={{ color: 'red' }}>Div 1</div>
        ) : (
          <div style={{ color: 'blue' }}>Div 2</div>
        )}

        */

const MenuDesplegable = () => {
  const [show, setShow] = useState(true);
  

  return (
    <div className="App">
      <header className="App-header">
          <div className="App-titulo" style= {{top: "7%"}} > TrivialB2B 
          <div className="App-Quesitos"> </div> </div>

         <button
            type="button"
            onClick={() => {
              setShow(!show);
            }}
            >
            Mostrar {show ? 'Div 2' : 'Div 1'}
        </button>

        {show ? (
                <div className="App-Imagenes">   
                  <div className="App-ImagenBoton"> 
                      <img src={CrearPartida} style={{width:"50%", height:"50%", paddingBottom:"10%"}} /> 
                      <button className="App-boton" type="submit" > Crear Partida </button>
                  </div>  
                  <div className="App-ImagenBoton"> 
                      <img src={BuscarPartida} style={{width:"50%", height:"50%", paddingBottom:"10%"}} /> 
                      <button className="App-boton" type="submit"> Buscar Partida </button>
                  </div>  
                  <div className="App-ImagenBoton"> 
                      <img src={amigos} style={{width:"50%", height:"50%", paddingBottom:"10%"}} /> 
                      <button className="App-boton" type="submit"> Amigos </button>
                  </div>  
                  <div className="App-ImagenBoton"> 
                      <img src={Tienda} style={{width:"50%", height:"50%", paddingBottom:"10%"}} /> 
                      <button className="App-boton" type="submit"> Tienda</button>
                  </div>  
                </div>
        ) : (
          <div style={{ color: 'blue' }}>Div 2</div>
        )}

        </header>
    </div>
  );
};

export default MenuDesplegable;
