import React, { useState } from "react";
import './Estilos/App.css';
import { useNavigate } from 'react-router-dom';

//const URL = "https://6e01-146-158-156-138.eu.ngrok.io/api/usuarios/login/";
const URL = "https://51.142.118.71:8000/api/usuarios/login/";


const InicioSesion = () => {
  const [body, setBody] = useState({ username: "", password: "" });
  const [errores, setErorres] = useState({ er: "sin_error"});

  const navigate = useNavigate();
  const handleChange = (e) => {
    setBody({
      ...body,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = () => {
    console.log(body);
    fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {console.log(data)
        if ((body.username="") && (body.password="")) {
          navigate(process.env.PUBLIC_URL+'/MenuJuego');
        }
        /*if (data.OK == "True"){
          navigate(process.env.PUBLIC_URL+'/MenuPrincipal');
        }*/
        else {
          navigate(process.env.PUBLIC_URL+'/Registrarse');/*
          if (data.error_username != "") {
            setErorres({er:"error_name"});
          }
          else if (data.error_password != ""){
            setErorres({er:"error_password"});
          }*/
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="App">
      <div className = "App-header" > 
      <div className="App-titulo" > BuscarPartida.js
        <div className="App-Quesitos"> </div> 
        </div>
      </div>
    </div>
  );
};

export default InicioSesion;