import React, { useState } from "react";
import './Estilos/App.css';
import { useNavigate } from 'react-router-dom';

//const URL = "https://6e01-146-158-156-138.eu.ngrok.io/api/usuarios/login/";
const URL = "https://51.142.118.71:8000/api/usuarios/login/";

function Boton(props,handleChange) {
  return (
    <div>
      <a margin= "40px" > {props.texto}: </a>
      <input className="App-texto"
      color="black"
      margin="normal"
      variant="outlined"
      label={props.label}
      name={props.nombre}
      value={props.valor}
      onChange={handleChange}
      />
    </div>
  )
}


const InicioSesion = () => {
  const [body, setBody] = useState({ nombre: "", nacimiento: "", correo: "", telefono:"" });

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
          <div className="App-titulo" style= {{top: "7%"}} > DatosRegistro 
          <div className="App-Quesitos"> </div> 
          </div>
          <div className="App-icono" style={{ maxWidth: '100%', maxHeight: '100%', backgroundImage: "url('../Imagenes/DatosUsuario.png')" }} > </div>
          <form className="App-Botones">
            <Boton texto="Nombre de suario" label="nombre" nombre="nombre" valor={body.nombre} />
            <Boton texto="Fecha de nacimiento" label="nacimiento" nombre="nacimiento"  valor={body.nacimiento}/>
            <Boton texto="Correo electronico" type="email" label="correo" nombre="correo" valor={body.correo}/>
            <Boton texto="Teléfono móvil" type="number" label="telefono" nombre="telefono"  valor={body.telefono}/>
          </form>

          <button
            variant="contained"
            color="secondary"
            className="App-boton"
            style= {{top: "80%", left: "44%"}}
            onClick={() => onSubmit()}
          >
            Sign In
          </button>
        </header>
    </div>
  );
};

export default InicioSesion;
