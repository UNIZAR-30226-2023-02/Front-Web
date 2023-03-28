import React, { useState } from "react";
import './Estilos/App.css';
import { useNavigate } from 'react-router-dom';
import Atras from './Imagenes/Atras.png';
import { useSession, setSession } from 'react-session';

//const URL = "https://6e01-146-158-156-138.eu.ngrok.io/api/usuarios/login/";
const URL = "http://51.142.118.71:8000/api/usuarios/login/";

function CuadroTextoFijo(props) {
  return (
    <div>
      <a className="App-CuadroTexto" style={{marginRight:"17px"}}> {props.texto}:  </a>
      <input className="App-texto"
        value={props.valor}
        readOnly
      />
    </div>
  )
}

function CuadroTexto(props) {
  return (
    <div>
      <a className="App-CuadroTexto" style={{marginRight:"17px"}}> {props.texto}:  </a>
      <input className="App-texto"
      color="black"
      margin="normal"
      variant="outlined"
      label={props.label}
      name={props.nombre}
      value={props.valor}
      onChange={props.funcion}
      />
    </div>
  )
}

const PerfilConfirmacion = () => {
  const [body, setBody] = useState({ username: "", fecha_nac: "dd-mm-aaaa", correo: " ", telefono: ""});
  const navigate = useNavigate();

  const [isBlurred, setIsBlurred] = useState(true);

  return (
    <div className="App">
        <div className = "App-header" style={{ filter: 'blur(5px)'}} > 
            <div className="App-titulo" style= {{top: "7%"}} > Perfil
                <div className="App-Quesitos" style= {{left: "20%"}}> </div> 
            </div>
            <div className="App-CuadradoNegro" style={{ width: "1000px", height: "600px", marginTop: "5%", position: ""}}> </div>
        </div>
    </div>
  );
};

export default PerfilConfirmacion;
