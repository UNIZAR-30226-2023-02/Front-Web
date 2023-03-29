import React, { useState } from "react";
import './Estilos/App.css';
import { useNavigate } from 'react-router-dom';
import { useSession, setSession } from 'react-session';

//const URL = "https://6e01-146-158-156-138.eu.ngrok.io/api/usuarios/login/";
const URL = "http://51.142.118.71:8000/api/usuarios/login/";


const Contacto = () => {
  const [body, setBody] = useState({ username: "", fecha_nac: "dd-mm-aaaa", correo: " ", telefono: ""});
  const navigate = useNavigate();

  const continuar = async (event) => {
    navigate(process.env.PUBLIC_URL+ '/MenuJuego');
  };
  return (
    <div className="App">
              <div className="App-CuadradoNegro" style={{ width: "1200px", height: "750px", position: "absolute", zIndex: "1", top: "25%", left: "6%"}}>
                <div style={{marginTop: "3%"}}>                
                  <a style={{color:"white", fontSize:"50px"}}>Contactanos: </a>
                  <div style={{marginTop:"30px", color: "white"}}>
                    <a> ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯</a>
                  </div>
                  <div style={{marginTop: "7%"}}>    
                    <a style={{color:"white", fontSize:"50px", textDecoration: "underline"}}> Correo electrónico: </a> <a style={{color:"white", fontSize:"50px"}}>  nano@gmail.com </a>
                  </div>
                  <div style={{marginTop: "7%"}}>    
                    <a style={{color:"white", fontSize:"50px", textDecoration: "underline"}}> Telefono: </a> <a style={{color:"white", fontSize:"50px"}}>  696969696 </a>
                  </div>
                  <div> <button className="App-boton" style= {{marginTop:"130px", left: "44%"}} onClick={() => continuar() } > Continuar </button></div>
                </div>
              </div>
        <div className = "App-header" style={{ filter: 'blur(5px)'}} > 
            <div className="App-titulo" style= {{top: "7%"}} > Contacto
                <div className="App-Quesitos" style= {{left: "40%"}}> </div> 
            </div>
        </div>
    </div>
  );
};

export default Contacto;