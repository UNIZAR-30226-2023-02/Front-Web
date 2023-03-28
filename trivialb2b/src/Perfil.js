import React, { useState } from "react";
import './Estilos/App.css';
import { useNavigate } from 'react-router-dom';
import Atras from './Imagenes/Atras.png';
import { useSession, setSession } from 'react-session';

//const URL = "https://6e01-146-158-156-138.eu.ngrok.io/api/usuarios/login/";
const URL = "http://51.142.118.71:8000/api/usuarios/login/";

function CuadroTextoFijo(props) {
  return (
    <div>
      <a className="App-CuadroTexto" style={{marginRight:"17px"}}> {props.texto}:  </a>
      <input className="App-texto"
        value={props.valor}
        readOnly
      />
    </div>
  )
}

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

const Perfil = () => {
  const [body, setBody] = useState({ username: "", fecha_nac: "dd-mm-aaaa", correo: " ", telefono: ""});
  const [errores, setErorres] = useState("");
  const navigate = useNavigate();
  const [show, setShow] = useState(true);

  const handleChange = (e) => {
    setBody({
      ...body,
      [e.target.name]: e.target.value,
    });
  };

  const flechaAtras = async (event) => {
      navigate(process.env.PUBLIC_URL+ '/MenuJuego');
  };

  const Confirmar = () => {
    console.log(body);
    //navigate(process.env.PUBLIC_URL + '/MenuJuego');
    
    fetch(URL, {
      method: "POST",
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      
      .then((data) => { 
        console.log(data)
        /*if (data.OK == "True"){
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
        }*/
      })
      .catch((error) => console.error(error));
      navigate(process.env.PUBLIC_URL + '/PerfilConfirmacion');
  };

  return (
    <div className="App">
      <div className = "App-header" > 
      <div className="App-titulo" style= {{top: "7%"}} > Perfil
        <div className="App-Quesitos" style= {{left: "20%"}}> </div> 
        <div className="App-iconoRegistro"style= {{marginLeft:"40px"}}> </div> </div>

        {show ? (
          <form className="App-CuadrosTexto">
            <div style={{marginTop:"12%"}}>
              <div className="App-CuadrosTextoIzq" > 
                <div style={{marginBottom: "7%"}}>
                  <CuadroTextoFijo texto="Nombre Usuario" valor="Acher" />
                </div>
                <CuadroTextoFijo texto="Fecha de nacimiento" valor="01-02-2002"   /> 
              </div>

              <div className="App-CuadrosTextoDer" > 
                <div style={{marginBottom: "7%"}}>
                  <CuadroTextoFijo texto="Correo electronico" valor="pepe@unizar.es"  />
                </div>
                <CuadroTextoFijo texto="Teléfono móvil" valor="605828074"  />
              </div>
            </div>
          </form>
          ) : (
          <form className="App-CuadrosTexto">
            <div style={{marginTop:"12%"}}>
              <div className="App-CuadrosTextoIzq" > 
                <div style={{marginBottom: "7%"}}>
                  <CuadroTexto texto="Nombre Usuario" label="username" nombre="username" valor={body.username} funcion={handleChange} />
                </div>
                <CuadroTexto texto="Fecha de nacimiento" label="fecha_nac" nombre="fecha_nac" valor={body.fecha_nac} funcion={handleChange} /> 
              </div>
              <div className="App-CuadrosTextoDer"> 
                <div style={{marginBottom: "7%"}}>
                  <CuadroTexto texto="Correo electronico" type="email" label="correo" nombre="correo" valor={body.correo} funcion={handleChange} />
                </div>
                <CuadroTexto texto="Teléfono móvil" type="number" label="telefono" nombre="telefono" valor={body.telefono} funcion={handleChange} />
              </div>
            </div>

            <div style={{marginTop:"30%"}}>
              <button
                className="App-botonCancelar"
                style= {{top: "80%", left: "44%", marginRight:"8%"}}
                onClick={() => setShow(!show) }
                >
                Cancelar
              </button>
              <button
                marginLeft= "10%"
                className="App-botonConfirmar"
                style= {{top: "80%", left: "44%" ,marginLeft:"8%"}}
                onClick={() => { Confirmar()}}>
                Confirmar
              </button>
            </div>
          </form>
          )}
            { show && <div style={{marginTop: "2%"}}>
              <button
                variant="contained"

                color="secondary"
                className="App-boton"
                style= {{top: "80%", left: "44%"}}
                onClick={() => {
                  setShow(!show);
                }}>
                {show ? '' : ''}
                Cambiar datos
              </button>
            </div>
            }
            <img src={Atras} style={{width:"170px", height:"170px", top:"80%", left:"5%", cursor: "pointer", position: "absolute"}} onClick={() => flechaAtras()}/>
        </div>
    </div>
  );
};

export default Perfil;
