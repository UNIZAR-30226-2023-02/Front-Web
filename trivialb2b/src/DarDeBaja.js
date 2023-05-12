import React, { useState } from "react";
import './Estilos/App.css';
import { useNavigate } from 'react-router-dom';
import { useSession, setSession } from 'react-session';
import Cookies from 'universal-cookie';

//const URL = "https://6e01-146-158-156-138.eu.ngrok.io/api/usuarios/login/";
const URL = "http://51.142.118.71:8000/api/usuarios/dar-baja/";


const DarDeBaja = () => {

  const cookies= new Cookies();
  const token = cookies.get('token');

  const navigate = useNavigate();
  const irse = async () => {
    navigate(process.env.PUBLIC_URL+ '/MenuJuego');
  };
  const darDeBaja = async () => {
    fetch(URL, {
      method: "POST",
      headers: { "Authorization": "Token " + token, "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {console.log(data)
      if (data == "Deleted") {
        navigate(process.env.PUBLIC_URL+ '/');
      }
        
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  };

  return (
  <div className="App">
    <div className = "App-header" > 
        <div className="App-titulo" style= {{top: "7%"}} > Dar de Baja
            <div className="App-Quesitos" style= {{left: "35%"}}> </div> 
        </div>
        <div className="App-CuadradoNegro" style={{ width: "50%", height: "50%", position: "absolute", zIndex: "1", top: "30%", left: "25%"}}>
          <div style={{marginTop: "7%"}}>                
            <a style={{color:"white", fontSize:"40px"}}>¿Estar seguro de que quieres darte de baja en la aplicación? </a>
            <button className="App-botonCancelar" style= {{top:"70%", left: "20%", position:"absolute"}} onClick={() => irse() } > Cancelar </button>
            <button className="App-botonConfirmar" style= {{top:"70%", left: "60%", position:"absolute"}} onClick={() => darDeBaja() } > Confirmar </button>
          </div>
        </div>
    </div>

    
  </div>
  );
};

export default DarDeBaja;