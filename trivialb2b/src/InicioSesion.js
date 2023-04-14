import React, { useState, useEffect } from "react";
import './Estilos/App.css';
import { useNavigate } from 'react-router-dom';
import Atras from "./Imagenes/Atras.png";
import CryptoJS from 'crypto-js';
import Cookies from 'universal-cookie';

//const URL = "http://b64b-146-158-156-138.eu.ngrok.io/api/usuarios/login/";
const URL = "http://51.142.118.71:8000/api/usuarios/login/";

function Boton(props) {
  return (
    <div style={{marginLeft: "2%"}}>
      <a> {props.texto}: </a>
      <input className="App-textoNegro"
        type={props.type}
        label={props.label}
        name={props.nombre}
        value={props.valor}
        onChange={props.onchange}
      />
    </div>
  )
}

/*
const valorOriginal = 'hola mundo';
const clave = 'mi clave secreta';
const valorCifrado = CryptoJS.AES.encrypt(valorOriginal, clave).toString();*/

const InicioSesion = ({ miVariable, setMiVariable }) => {
  const [body, setBody] = useState({ username: "", password: "" });
  const [errores, setErorres] = useState("");
  const [usuario, setUsuario] = useState();


  const cookies= new Cookies();
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setBody({
      ...body,
      [e.target.name]: e.target.value,
    });
  };

  const flechaAtras = async (event) => {
    navigate(process.env.PUBLIC_URL+ '/');
  };

  const IniciarSesion = () => {
    
    fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {console.log(data)
       
        if ((body.username=="") && (body.password=="")) {
          setErorres("Algún campo está vacío");
        }
        else if (data.OK == "True"){
          setErorres("");
          cookies.set('token', data.token, {path: '/'})
          cookies.set('tokenUsuario', body.username, {path: '/'})
          navigate(process.env.PUBLIC_URL+ '/MenuJuego');
        }
        else if (data.error_username != "") {
            setErorres(data.error_username);
        }
        else {
          setErorres(data.error_password);
        }

      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="App">
      <div className = "App-header" > 
      <div className="App-titulo" style={{top:"10%"}} > Inicio Sesión 
        <div className="App-Quesitos"> </div> 
      </div>
        <form className="App-Input" style={{left: "10%", top:"40%", height:"30%", width: "70%", position:"absolute"}}>
          <div style={{marginLeft:"4%", marginBottom:"2%"}}>
            <Boton texto="Usuario" label="username" nombre="username" valor={body.username} onchange={handleChange} />
          </div>
          
          <Boton texto="Contraseña" type="password" label="password" nombre="password"  valor={body.password} onchange={handleChange}/>
          </form>
          <div style={{top:"62%", position:"absolute", fontSize:"25px"}}>
            <font color="red" > {errores}</font>
          </div>
        <br></br>
        <button className="App-boton" style= {{top: "70%", left: "auto", position:"absolute"}} onClick={() => IniciarSesion()} >
          Iniciar Sesion
        </button>
        <img src={Atras} style={{width:"170px", height:"170px", top:"75%", left:"5%", cursor: "pointer", position: "absolute"}} onClick={() => flechaAtras()}/>
      </div>
    </div>
  );
};

//export  { valorCifrado, clave};
export default InicioSesion;
