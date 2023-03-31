import React, { useState } from "react";
import './Estilos/App.css';
import { useNavigate } from 'react-router-dom';

//const URL = "https://6e01-146-158-156-138.eu.ngrok.io/api/usuarios/login/";
const URL = "http://51.142.118.71:8000/api/usuarios/login/";

function CuadroTexto(props) {
return (
    <div>
    <a style={{color:"#174a67"}}> {props.texto}:  </a>
    <input className="App-textoNegro"
      label={props.label}
      name={props.nombre}
      value={props.valor}
      onChange={props.funcion}
    />
    </div>
)
}

const ModoClasico = () => {
    
  const [body, setBody] = useState({ salaNombre: "", time: "", numJugadores: "", password: ""});
  const [errores, setErorres] = useState("");

  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setBody({
      ...body,
      [e.target.name]: e.target.value,
    });
  };

  const cancelar = async (event) => {
    navigate(process.env.PUBLIC_URL + '/CrearPartida');
  };

  const onSubmit = () => {
    console.log(body);
    navigate(process.env.PUBLIC_URL + '/EsperandoJugadores');
    /*
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
      .catch((error) => console.error(error));*/
  };

  return (
    <div className="App">
      <div className = "App-header" > 
        <div className="App-titulo"  style= {{top: "7%"}}> Modo Clasico
          <div className="App-Quesitos" style= {{left: "36%"}}/> 
        </div>

        <div className="App-CuadradoAmarillo" style={{ width: "1730px", height: "620px", position: "absolute", zIndex: "1", top: "24%", left: "5%"}}>
          <div style={{marginTop:"10px"}}>
            <a  style= {{ color: "#174a67", fontSize: "60px", fontStyle: "italic" }}>
                Creación de Sala de modo Clásico:   
            </a>
            <div style={{marginTop:"0px", top:"10%", color: "#174a67"}}>
              <a> ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯</a>
            </div>
          </div>

          <form className="App-Input" style={{marginTop:"3%"}}>

            <div className="App-CuadrosTextoIzq" > 
              <div style={{marginLeft: "3%"}}>
              <CuadroTexto texto="Nombre de la sala" label="salaNombre" nombre="salaNombre" valor={body.salaNombre} funcion={handleChange} />
              </div>
              <div style={{marginTop:"7%"}}>
                <label for="tiempoRespuesta" style={{color: "#174a67"}}> Tiempo de respuesta </label>
                <select name="tiempoRespuesta" id="tiempoRespuesta" className="App-textoNegro" style={{width:"530px", height:"70px" }}>
                    <option value="10">10 segundos</option>
                    <option value="15">15 segundos</option>
                    <option value="20">20 segundos</option>
                    <option value="25">25 segundos</option>
                    <option value="30">30 segundos</option>
                </select> 
                </div>
            </div>

            <div className="App-CuadrosTextoDer" style={{marginRight: "1%"}} > 
              <label for="numeroJugadores" style={{color: "#174a67"}}> Nº de jugadores: </label>
              <select name="numeroJugadores" id="numeroJugadores" className="App-textoNegro" style={{width:"530px", height:"70px" }}>
                  <option value="dos">2</option>
                  <option value="cuatro">4</option>
                  <option value="seis">6</option>
              </select> 
              <div style={{marginTop:"7%", marginLeft: "6%"}}>            
                  <CuadroTexto texto="*  Contraseña" label="password" nombre="password" valor={body.password} funcion={handleChange} />
              </div>
            </div>

          </form>

          <div style={{fontSize:"23px", color:"red", position:"absolute", left:"45%", top:"65%"}}>
            <a  >epepepeppepep{errores}</a>
          </div>

          <div style={{fontSize:"23px", color:"black", position:"absolute", left:"36%", top:"73%"}}> 
            <a >Los elementos con asterisco (*) son opcionales</a>
          </div>

          <div>
              <button className="App-botonCancelar" style= {{top: "83%", left: "33%", position:"absolute"}} onClick={() => cancelar()} >
                Cancelar
              </button>
              <button className="App-botonConfirmar" style= {{top: "83%", left: "54%" , position:"absolute"}}onClick={() => onSubmit()} >
                Confirmar
              </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ModoClasico;