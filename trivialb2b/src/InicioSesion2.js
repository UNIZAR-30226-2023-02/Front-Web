import React, { useState } from "react";
import './Estilos/App.css';
import { useNavigate } from 'react-router-dom';

//const URL = "https://6e01-146-158-156-138.eu.ngrok.io/api/usuarios/login/";
const URL = "https://51.142.118.71:8000/api/usuarios/login/";

function InicioSesion2() {
    const navigate = useNavigate();
    const [username, setUsuario] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [errorUsuario, setErrorUsuario] = useState('');
    const [errorContraseña, setErrorContraseña] = useState('');   
    const [error, setError] = useState('');   

    const handleUsuarioChange = (event) => {
        setUsuario(event.target.value);
    };
    
    const handleContraseñaChange = (event) => {
        setContraseña(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!username || !contraseña) {
            setError('Por favor, complete todos los campos'); // Configuración del mensaje de error
            return;
        }       

        fetch(URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify( {username, contraseña}),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data){
                navigate(process.env.PUBLIC_URL+'/MenuPrincipal');
            }
        })
        .catch(error => console.error(error));
    };

  return (
    <div className="App">
      <header className="App-header">
          <div className="App-titulo" > Inicio Sesión 
          <div className="App-Quesitos"> </div> 
          </div>
          <form onSubmit={handleSubmit} className="App-Botones">
            <div>
                <a margin= "40px" > Usuario: </a>
                <input className="App-texto"
                color="black"
                margin="normal"
                variant="outlined"
                label="Username"
                name="username"
                value={username}
                onChange={handleUsuarioChange}
                />
                {errorUsuario && (
                    <p style={{ color: "red", margin: 0 }}>{errorUsuario}</p>
                )}
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
                value={contraseña}
                onChange={handleContraseñaChange}
                />
                 {errorContraseña && (
                    <p style={{ color: "red", margin: 0 }}>{errorContraseña}</p>
                )}
            </div>
            {error && <p style={{ color: "red", margin: 0 }}>{error}</p>}
          </form>
          <button
            variant="contained"
            color="secondary"
            className="App-boton"
            style= {{top: "70%", left: "44%"}}
            type= "submit"
            onClick={() => handleSubmit()}
          >
            Sign In
          </button>
        </header>
    </div>
  );
}

export default InicioSesion2;
