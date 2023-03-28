import React, { useState } from "react";
import './Estilos/App.css';
import { useNavigate } from 'react-router-dom';


//const URL = "https://6e01-146-158-156-138.eu.ngrok.io/api/usuarios/login/";
const URL = "http://51.142.118.71:8000/api/usuarios/register/";

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


const Registrarse = () => {
  const [body, setBody] = useState({ username: "", password: "", confirm_password: "", fecha_nac: "dd-mm-aaaa", correo: "pepe"});
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
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      //.then((data) => console.log(data))
      
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
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="App">
      <header className="App-header">
          <div className="App-titulo" style= {{top: "7%"}} > Registrarse 
          <div className="App-Quesitos"> </div> 
          </div>
          <div className="App-iconoRegistro"> </div>

          <form className="App-CuadrosTexto">
            <div className="App-CuadrosTextoIzq" > 
            <CuadroTexto texto="Usuario" label="username" nombre="username" valor={body.username} funcion={handleChange} />
            <CuadroTexto texto="Contraseña" type="password" label="password" nombre="password"  valor={body.password} funcion={handleChange} />
            <CuadroTexto texto="Confirmar" type="password" label="confpassword" nombre="confirm_password"  valor={body.confirm_password} funcion={handleChange} />

            </div>
            <div className="App-CuadrosTextoDer" > 
            <CuadroTexto texto="Fecha de nacimiento" label="fecha_nac" nombre="fecha_nac"  valor={body.fecha_nac} funcion={handleChange} /> 
            <CuadroTexto texto="Correo electronico" type="email" label="correo" nombre="correo" valor={body.correo} funcion={handleChange} />
            </div>
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

export default Registrarse;
