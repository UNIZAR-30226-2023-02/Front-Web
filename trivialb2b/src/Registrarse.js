import React, { useState } from "react";
import './Estilos/App.css';
import { useNavigate } from 'react-router-dom';
import Atras from "./Imagenes/Atras.png";


//const URL = "http://e4d3-146-158-156-138.eu.ngrok.io/api/usuarios/register/";
const URL = "http://51.142.118.71:8000/api/usuarios/register/";

function CuadroTexto(props) {
  return (
    <div>
      <a> {props.texto}:  </a>
      <input className="App-textoNegro"
        type={props.type}
        label={props.label}
        name={props.nombre}
        value={props.valor}
        onChange={props.accion}
      />
    </div>
  )
}


const Registrarse = () => {
  const [body, setBody] = useState({ username: "", password: "", confirm_password: "", fecha_nac: "aaaa-mm-dd", correo: "", telefono:""});
  const [errores, setErorres] = useState("");
  const [usuario, setUsuario] = useState();

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


  const Registrarse = () => {
    
    fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {console.log(data)

        if ((body.username="")&&(body.password="") && (body.confirm_password="") && (body.fecha_nac="") && (body.correo="") && (body.telefono="")) {
          setErorres("Algún campo esta vacío");
        }
        else if (data.OK == "True"){
          setErorres("");
          navigate(process.env.PUBLIC_URL+'/MenuJuego');
        }
        else {
          if (data.error_username !== "") {
            setErorres(data.error_username);
          }
          else if (data.error_password !== ""){
            setErorres(data.error_password);
          }
          else if (data.error_confirm_password !== ""){
            setErorres(data.error_confirm_password);
          }
          else if (data.error_fecha_nac !== ""){
            setErorres(data.error_fecha_nac);
          }
          else if (data.error_correo !== ""){
            setErorres(data.error_correo);
          }
          else if (data.error_telefono !== "") {
            setErorres(data.error_telefono);
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

          <form className="App-Input" style={{left: "10%", top:"45%", height:"30%", width: "83%", position: "absolute"}}>
            <div className="App-CuadrosTextoIzq" > 
              <div style={{marginLeft:"6.9%"}}>
                <CuadroTexto texto="Usuario" type="username" label="username" nombre="username" valor={body.username} accion={handleChange} />
              </div>
              <CuadroTexto texto="Contraseña" type="password" label="password" nombre="password"  valor={body.password} accion={handleChange} />
              <div style={{marginLeft:"2.8%"}}>
                <CuadroTexto texto="Confirmar" type="password" label="confpassword" nombre="confirm_password"  valor={body.confirm_password} accion={handleChange} />
              </div>
            </div>
            <div className="App-CuadrosTextoDer" > 
              <CuadroTexto texto="Fecha de nacimiento" type="fecha_nac" label="fecha_nac" nombre="fecha_nac"  valor={body.fecha_nac} accion={handleChange} /> 
              <div style={{marginLeft:"3%"}}>
                <CuadroTexto texto="Correo electronico" type="email" label="correo" nombre="correo" valor={body.correo} accion={handleChange} />
              </div>
              <div style={{marginLeft:"20%"}}>
                <CuadroTexto texto="Telefono" type="telefono" label="telefono" nombre="telefono"  valor={body.telefono} accion={handleChange} />
              </div>
            </div>
          </form>
          <div style={{top:"62%", position:"absolute", fontSize:"25px"}}>
            <font color="red" > {errores}</font>
          </div>
          <button className="App-boton" style= {{top: "80%", left: "auto", position:"absolute"}} onClick={() => Registrarse()} >
            Registrarse
          </button>
          <img src={Atras} style={{width:"170px", height:"170px", top:"75%", left:"5%", cursor: "pointer", position: "absolute"}} onClick={() => flechaAtras()}/>
        </header>
    </div>
  );
};

export default Registrarse;
