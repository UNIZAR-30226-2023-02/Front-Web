import React, { useState } from "react";
import './Estilos/App.css';
import { useNavigate } from 'react-router-dom';

//const URL = "https://6e01-146-158-156-138.eu.ngrok.io/api/usuarios/login/";
const URL = "http://51.142.118.71:8000/api/usuarios/register/";

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

const Registrarse = () => {
  const [body, setBody] = useState({ username: "Acher", password: "12345678", confirm_password: "12345678", fecha_nac: "22-01-22", correo: "pepe@gmail.com" });
  const [errores, setErorres] = useState("");

  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setBody({
      ...body,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = () => {
    console.log(body);
    //navigate(process.env.PUBLIC_URL + '/MenuJuego');
    
    fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      /*
      .then((data) => { 
        console.log(data)
        if (data.OK == "True"){
          setErorres("")
          navigate(process.env.PUBLIC_URL+'/MenuPrincipal');
        }
        else {
          if (data.error_username !== "") {
            setErorres("Error name");
          }
          else if (data.error_password !== ""){
            setErorres("Error password");
          }
          else if (data.error_confirm_password !== ""){
            setErorres("Error confirm password");
          }
          else if (data.error_fecha_nac !== ""){
            setErorres("Error fecha nac");
          }
          else if (data.error_correo !== ""){
            setErorres("Error correo");
          }
        }
      })*/
      .catch((error) => console.error(error));
  };

  return (
    <div className="App">
      <header className="App-header">
          <div className="App-titulo" > Registro  
          <div className="App-Quesitos"> </div> 
          </div>
          <form className="App-Botones">
          <Boton texto="Usuario" label="username" nombre="username" valor={body.username} onchange={handleChange}/>
          <Boton texto="Contraseña" type="password" label="password" nombre="password"  valor={body.password} onchange={handleChange}/>
          <Boton texto="Confirmar" type="password" label="confpassword" nombre="confirm_password"  valor={body.confirm_password} onchange={handleChange}/>
          </form>
          <font color="red"> {errores}</font>
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

export default Registrarse;
