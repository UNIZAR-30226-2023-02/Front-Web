import React, { useState } from "react";
import './Estilos/App.css';
import { InputLabel } from '@mui/material';

//const URL = "https://6e01-146-158-156-138.eu.ngrok.io/api/usuarios/login/";
const URL = "https://51.142.118.71:8000/api/usuarios/login/";

const InicioSesion = () => {
  const [body, setBody] = useState({ username: "", password: "" });

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
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  return (
    <div className="App">
      <header className="App-header">
          <div className="App-titulo" > Inicio Sesión 
          <div className="App-Quesitos"> </div> 
          </div>
          <form className="App-Botones">
            <div>
            <a margin= "40px" > Usuario: </a>
            <input className="App-texto"
            color="black"
            margin="normal"
            variant="outlined"
            label="Username"
            name="username"
            value={body.username}
            onChange={handleChange}
            />
            </div>
            <div>
            <a> Contraseña: </a>
            <input className="App-texto"
              type="password"
              color="primary"
              margin="normal"
              variant="outlined"
              label="Password"
              name="password"
              value={body.password}
              onChange={handleChange}
            />
            </div>
          </form>
          <button
            variant="contained"
            color="secondary"
            className="App-boton"
            style= {{top: "70%", left: "44%"}}
            onClick={() => onSubmit()}
          >
            Sign In
          </button>
        </header>
    </div>
  );
};

export default InicioSesion;
