import React, { useState } from "react";
import './Estilos/App.css';
import { useNavigate } from 'react-router-dom';
import amigos from'./Imagenes/Amigos.png';

//const URL = "https://6e01-146-158-156-138.eu.ngrok.io/api/usuarios/login/";
const URL = "https://51.142.118.71:8000/api/usuarios/login/";

const InicioSesion = () => {
  const [body, setBody] = useState({ nombre: "", nacimiento: "", correo: "", telefono:"" });

  const handleChange = (e) => {
    setBody({
      ...body,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const onSubmit1 = async (event) => {
      navigate(process.env.PUBLIC_URL+ '/InicioSesion');
  };
  const onSubmit2 = async (event) => {
    navigate(process.env.PUBLIC_URL+ '/Registrarse');
  };

  return (
    <div className="App">
      <header className="App-header">
          <div className="App-titulo" style= {{top: "7%"}} > TrivialB2B 
          <div className="App-Quesitos"> </div> </div>

          <div className="App-Imagenes">   
              <div className="App-ImagenBoton"> 
                  <img src={amigos} style={{width:"50%", height:"50%", paddingBottom:"10%"}} /> 
                  <button className="App-boton" type="submit" onClick={() => onSubmit1()} > Buscar Partida </button>
              </div>  
              <div className="App-ImagenBoton"> 
                  <img src={amigos} style={{width:"50%", height:"50%", paddingBottom:"10%"}} /> 
                  <button className="App-boton" type="submit" onClick={() => onSubmit1()}> Crear Partida </button>
              </div>  
              <div className="App-ImagenBoton"> 
                  <img src={amigos} style={{width:"50%", height:"50%", paddingBottom:"10%"}} /> 
                  <button className="App-boton" type="submit" onClick={() => onSubmit1()}> Amigos </button>
              </div>  
              <div className="App-ImagenBoton"> 
                  <img src={amigos} style={{width:"50%", height:"50%", paddingBottom:"10%"}} /> 
                  <button className="App-boton" type="submit" onClick={() => onSubmit1()}> Tienda</button>
              </div>  
          </div>
        </header>
    </div>
  );
};

export default InicioSesion;
