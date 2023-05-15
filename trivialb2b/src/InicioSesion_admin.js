import React, { useState} from "react";
import './Estilos/App.css';
import { useNavigate } from 'react-router-dom';
import Atras from "./Imagenes/Atras.png";
import Cookies from 'universal-cookie';

const URL = "http://51.142.118.71:8000/api/admin/login/";

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

const InicioSesion_admin = () => {
  const [body, setBody] = useState({ username: "", password: "" });
  const [errores, setErorres] = useState("");
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

  const fun = () => {
    fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
       
        if ((body.username=="") && (body.password=="")) {
          setErorres("Algún campo está vacío");
        }
        else if (data.OK == "True"){
          setErorres("");
          cookies.set('token', data.token, {path: '/'})
          cookies.set('tokenUsuario', body.username, {path: '/'})
          navigate(process.env.PUBLIC_URL+ '/MenuAdmin');
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
      <div className="App-titulo" style={{top:"10%"}} > Inicio Sesión {"(Admin)"}
        <div className="App-Quesitos"> </div> 
      </div>
        <form className="App-Input" style={{left: "10%", top:"40%", height:"30%", width: "70%", position:"absolute"}}>
          <div style={{marginLeft:"4%", marginBottom:"2%"}}>
            <Boton texto="Usuario" label="username" nombre="username" valor={body.username} onchange={handleChange} />
          </div>
          <Boton texto="Contraseña" type="password" label="password" nombre="password"  valor={body.password} onchange={handleChange}/>
          </form>
          <div style={{top:"62%", position:"absolute", fontSize:"33px"}}>
            <span style={{color:"red"}}>{errores}</span>
          </div>
        <br></br>
        <button className="App-boton" style= {{top: "70%", left: "auto", position:"absolute"}} onClick={() => fun()} >
          Iniciar Sesion
        </button>
        <img src={Atras} style={{width:"170px", height:"170px", top:"75%", left:"5%", cursor: "pointer", position: "absolute"}} onClick={() => flechaAtras()}/>
      </div>
    </div>
  );
};

export default InicioSesion_admin;
