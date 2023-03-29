import React, { useState } from "react";
import './Estilos/App.css';
import { useNavigate } from 'react-router-dom';
import { useSession, setSession } from 'react-session';

//const URL = "https://6e01-146-158-156-138.eu.ngrok.io/api/usuarios/login/";
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


const InicioSesion = () => {
  const [body, setBody] = useState({ username: "", password: "" });
  const [errores, setErorres] = useState("");

  const navigate = useNavigate();
  const handleChange = (e) => {
    setBody({
      ...body,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = () => {
    //console.log(body);
    navigate(process.env.PUBLIC_URL+'/MenuJuego');
    fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      //.then((data) => console.log(data))
      .then((data) => {console.log(data)
        if ((body.username=="") && (body.password=="")) {
          setErorres("Vacio")
        }
        if (data.OK == "True"){
          setErorres("");
          const usuario = { nombre: body.username, contraseña: body.password};
          setSession({usuario});
          navigate(process.env.PUBLIC_URL+'/MenuPrincipal');
        }
        else {
          if (data.error_username !== "") {
            setErorres("Error name");
          }
          else if (data.error_password !== ""){
            setErorres("Error password");
          }
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
        <font color="red" > {errores}</font>
        <br></br>
        <button
          className="App-boton"
          style= {{top: "70%", left: "46%", position:"absolute"}}
          onClick={() => onSubmit()}
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default InicioSesion;
