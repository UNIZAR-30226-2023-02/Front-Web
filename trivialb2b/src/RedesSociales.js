import React, { useState } from "react";
import './Estilos/App.css';
import { useNavigate } from 'react-router-dom';
import Instagram from'./Imagenes/Instagram.png';
import Facebook from'./Imagenes/Facebook.png';
import Twitter from'./Imagenes/Twitter.png';
import { useSession, setSession } from 'react-session';

//const URL = "https://6e01-146-158-156-138.eu.ngrok.io/api/usuarios/login/";
const URL = "http://51.142.118.71:8000/api/usuarios/login/";

const RedesSociales = () => {
  const [body, setBody] = useState({ username: "", fecha_nac: "dd-mm-aaaa", correo: " ", telefono: ""});
  const navigate = useNavigate();

  const onInstagram = async (event) => {
    navigate(process.env.PUBLIC_URL + '/BuscarPartida');
  };
  const onFacebook = async (event) => {
    navigate(process.env.PUBLIC_URL + '/Amigos');
  };
  const onTwitter = async (event) => {
    navigate(process.env.PUBLIC_URL + '/Tienda');
  };
  const continuar = async (event) => {
    navigate(process.env.PUBLIC_URL+ '/MenuJuego');
  };

  return (
    <div className="App">
              <div className="App-CuadradoNegro" style={{ width: "1200px", height: "750px", position: "absolute", zIndex: "1", top: "25%", left: "26%"}}>
                <div style={{marginTop: "3%"}}>                
                  <a style={{color:"white", fontSize:"50px"}}>RedesSociales: </a>
                  <div style={{marginTop:"30px", color: "white"}}>
                    <a> ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯</a>
                  </div>
                  <div style={{ display:"flex", marginTop:"50px", marginLeft: "80px" }}>
                    <div style={{ marginRight: "20%", width:"200px", height:"200px" }}>
                      <img src={Instagram} style={{ width:"100%", height:"100%", cursor: "pointer" }} onClick={() => onInstagram()}/>
                      <a style={{ color: "white", fontSize:"20px", textAlign:"center" }}>Instagram</a>
                    </div>
                    <div style={{ marginRight: "20%", width:"200px", height:"200px" }}>
                      <img src={Facebook} style={{ width:"100%", height:"100%", cursor: "pointer", marginLeft:"9%"}} onClick={() => onFacebook()}/>
                      <a style={{ color: "white", fontSize:"20px", textAlign:"center" }}>Facebook</a>
                    </div>
                    <div style={{ width:"200px", height:"200px" }}>
                      <img src={Twitter} style={{ width:"100%", height:"100%", cursor: "pointer" }} onClick={() => onTwitter()}/>
                      <a style={{ color: "white", fontSize:"20px", textAlign:"center" }}>Twitter</a>
                    </div>
                  </div>
                  <div> <button className="App-boton" style= {{marginTop:"130px", left: "44%"}} onClick={() => continuar() } > Continuar </button></div>
                </div>
              </div>
        <div className = "App-header" style={{ filter: 'blur(5px)'}} > 
            <div className="App-titulo" style= {{top: "7%"}} > RedesSociales
                <div className="App-Quesitos" style= {{left: "40%"}}> </div> 
            </div>
        </div>
    </div>
  );
};

export default RedesSociales;