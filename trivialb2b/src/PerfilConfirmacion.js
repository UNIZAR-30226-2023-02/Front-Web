import React, { useState } from "react";
import './Estilos/App.css';
import { useNavigate } from 'react-router-dom';
import Atras from './Imagenes/Atras.png';
import { useSession, setSession } from 'react-session';

//const URL = "https://6e01-146-158-156-138.eu.ngrok.io/api/usuarios/login/";
const URL = "http://51.142.118.71:8000/api/usuarios/login/";



const PerfilConfirmacion = () => {
  const [body, setBody] = useState({ username: "", fecha_nac: "dd-mm-aaaa", correo: " ", telefono: ""});
  const navigate = useNavigate();

  const continuar = async (event) => {
    navigate(process.env.PUBLIC_URL+ '/Perfil');
  };
  return (
    <div className="App">
              <div className="App-CuadradoNegro" style={{ width: "1000px", height: "600px", position: "absolute", zIndex: "1", top: "30%", left: "29%"}}>
                <div style={{marginTop: "10%"}}>                
                  <a style={{color:"white", fontSize:"50px"}}>Se han cambiado los datos personales </a>
                  <br></br>
                  <a style={{color:"green", fontSize:"50px"}}> correctamente</a>
                  <div> <button className="App-boton" style= {{marginTop:"130px", left: "44%"}} onClick={() => continuar() } > Continuar </button></div>
                </div>
              </div>
        <div className = "App-header" style={{ filter: 'blur(5px)'}} > 
            <div className="App-titulo" style= {{top: "7%"}} > Datos Personales
                <div className="App-Quesitos" style= {{left: "40%"}}> </div> 
            </div>
        </div>
    </div>
  );
};

export default PerfilConfirmacion;
