import React from "react";
import './Estilos/App.css';
import { useNavigate } from 'react-router-dom';

const URL = "http://51.142.118.71:8000/api/usuarios/login/";

function LetraContacto(props) {
  return (
    <div style={{marginTop: "3%"}}>    
      <a style={{color:"white", fontSize:"40px", fontWeight: "bold"}}> {props.titulo} </a> <a style={{color:"white", fontSize:"40px"}}> {props.variable} </a>
    </div>
  )
}

const Contacto = () => {
  const navigate = useNavigate();

  const continuar = async (event) => {
    navigate(process.env.PUBLIC_URL+ '/MenuJuego');
  };
  return (
    <div className="App">
              <div className="App-CuadradoNegro" style={{ width: "70%", height: "65%", position: "absolute", zIndex: "1", top: "23%", left: "16%"}}>
                <div style={{marginTop: "3%"}}>                
                  <a style={{color:"white", fontSize:"50px"}}>Contáctanos </a>
                  <div style={{marginTop:"2%", color: "white"}}>
                    <a> ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯</a>
                  </div>
                  <div>
                    <LetraContacto titulo="Correo electronico:   " variable="trivialB2B@gmail.com"/>
                    <LetraContacto titulo="Telefono:   " variable="605828074"/>
                  </div>
                  <div> <button className="App-botonCancelar" style= {{top:"78%", left: "46%", position:"absolute"}} onClick={() => continuar() } > Volver </button></div>
                </div>
              </div>
        <div className = "App-header"> 
            <div className="App-titulo" style= {{top: "7%"}} > Contacto
                <div className="App-Quesitos" style= {{left: "40%"}}> </div> 
            </div>
        </div>
    </div>
  );
};

export default Contacto;