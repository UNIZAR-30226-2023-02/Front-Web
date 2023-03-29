import React, { useState } from "react";
import './Estilos/App.css';
import { useNavigate } from 'react-router-dom';
import { useSession, setSession } from 'react-session';

//const URL = "https://6e01-146-158-156-138.eu.ngrok.io/api/usuarios/login/";
const URL = "http://51.142.118.71:8000/api/usuarios/login/";


const CerrarSesion = () => {
  const [body, setBody] = useState({ username: "", password: "" });
  const [errores, setErorres] = useState("");

  const navigate = useNavigate();
  const handleChange = (e) => {
    setBody({
      ...body,
      [e.target.name]: e.target.value,
    });
  };

  const cancelar = async (event) => {
    navigate(process.env.PUBLIC_URL+ '/MenuJuego');
  };
  const confirmar = async (event) => {
    navigate(process.env.PUBLIC_URL+ '/InicioSesion');
  };


  return (
    <div className="App">
              <div className="App-CuadradoNegro" style={{ width: "1200px", height: "750px", position: "absolute", zIndex: "1", top: "25%", left: "26%"}}>
                <div style={{marginTop: "3%"}}>                
                  <a style={{color:"white", fontSize:"50px"}}>Cerrar Sesion </a>
                  <div style={{marginTop:"30px", color: "white"}}>
                    <a> ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯</a>
                  </div>
                  <div style={{marginTop: "10%"}}>    
                    <a style={{color:"white", fontSize:"30px"}}> ¿Estás seguro de que quieres cerrar sesión? </a>
                  </div>
                  <div> 
                    <button className="App-botonCancelar" style= {{marginTop:"180px", marginRight:"50px"}} onClick={() => cancelar() } > Cancelar </button>
                    <button className="App-botonConfirmar" style= {{marginTop:"180px", marginLeft:"50px"}} onClick={() => confirmar() } > Confirmar </button>
                  </div>
                </div>
              </div>
        <div className = "App-header" style={{ filter: 'blur(5px)'}} > 
            <div className="App-titulo" style= {{top: "7%"}} > Cerrar Sesion
                <div className="App-Quesitos" style= {{left: "40%"}}> </div> 
            </div>
        </div>
    </div>
  );
};

export default CerrarSesion;