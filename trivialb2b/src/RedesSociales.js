import React, { useState } from "react";
import './Estilos/App.css';
import { Link, useNavigate } from 'react-router-dom';
import Instagram from'./Imagenes/Instagram.png';
import Facebook from'./Imagenes/Facebook.png';
import Twitter from'./Imagenes/Twitter.png';
import { useSession, setSession } from 'react-session';

//const URL = "https://6e01-146-158-156-138.eu.ngrok.io/api/usuarios/login/";
const URL = "http://51.142.118.71:8000/api/usuarios/login/";

const RedesSociales = () => {
  
  const navigate = useNavigate();

  const continuar = async (event) => {
    navigate(process.env.PUBLIC_URL+ '/MenuJuego');
  };
  
  return (
    <div className="App">
      <div className="App-CuadradoNegro" style={{ width: "1200px", height: "600px", position: "absolute", zIndex: "1", top: "25%", left: "19%"}}>
        <div style={{marginTop: "3%"}}>                
          <a style={{color:"white", fontSize:"50px"}}> Redes Sociales </a>
          <div style={{marginTop:"30px", color: "white"}}>
            <a> ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯</a>
          </div>
          <div style={{ display:"flex", marginTop:"50px", marginLeft: "80px" }}>
            <div style={{ marginRight: "20%", width:"200px", height:"200px" }}>
              <Link to="https://www.instagram.com/trivialb2b/" target="_blank">
                <img src={Instagram} style={{ width:"100%", height:"100%", cursor: "pointer" }} />
              </Link>
              <a style={{ color: "white", fontSize:"20px", textAlign:"center" }}>Instagram</a>
            </div>
            <div style={{ marginRight: "20%", width:"200px", height:"200px" }}>
              <Link to="https://www.facebook.com/profile.php?id=100089906757742" target="_blank">
              <img src={Facebook} style={{ width:"100%", height:"100%", cursor: "pointer", marginLeft:"9%"}} />
              </Link>
              <a style={{ color: "white", fontSize:"20px", textAlign:"center" }}>Facebook</a>
            </div>
            <div style={{ width:"200px", height:"200px" }}>
              <Link to="https://twitter.com/TrivialB2B" target="_blank">
                <img src={Twitter} style={{ width:"100%", height:"100%", cursor: "pointer" }} />
              </Link>
              <a style={{ color: "white", fontSize:"20px", textAlign:"center" }}>Twitter</a>
            </div>
          </div>
          <button className="App-boton" style= {{top:"82%", left: "45%", position:"absolute"}} onClick={() => continuar() } > Volver </button>
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