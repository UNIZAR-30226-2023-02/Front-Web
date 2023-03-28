import React, { useState } from "react";
import './Estilos/App.css';
import { useNavigate } from 'react-router-dom';

//const URL = "https://6e01-146-158-156-138.eu.ngrok.io/api/usuarios/login/";
const URL = "http://51.142.118.71:8000/api/usuarios/login/";

function Boton(props) {
  return (
    <div>
      <a margin= "40px" > {props.texto}: </a>
      <input className="App-texto"
      type={props.type}
      color="black"
      margin="normal"
      variant="outlined"
      label={props.label}
      name={props.nombre}
      value={props.valor}
      onChange={props.onchange}
      />
    </div>
  )
}


const ModoEquipos = () => {
  return (
    <div className="App">
      <div className = "App-header" > 
      <div className="App-titulo"  style= {{top: "7%"}}> ModoEquipos
        <div className="App-Quesitos"> </div> 
        </div>
      </div>
    </div>
  );
};

export default ModoEquipos;