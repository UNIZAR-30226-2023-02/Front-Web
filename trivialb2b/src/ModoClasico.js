import React, { useState } from "react";
import './Estilos/App.css';
import { useNavigate } from 'react-router-dom';
import Logo from './Imagenes/Logo.png';

//const URL = "https://6e01-146-158-156-138.eu.ngrok.io/api/usuarios/login/";
const URL = "http://51.142.118.71:8000/api/usuarios/login/";

function CuadroTexto(props) {
return (
    <div>
    <a className="App-CuadroTexto" style={{marginRight:"17px", color:"#174a67"}}> {props.texto}:  </a>
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

//<CuadroTexto texto="Nº Jugadores" label="numJugadores" nombre="numJugadores"  valor={body.numJugadores} funcion={handleChange} /> 
  return (
    <div className="App">
      <div className = "App-header" > 
      <div className="App-titulo"  style= {{top: "7%"}}> Modo Clasico
        <div className="App-Quesitos" style= {{left: "36%"}}> </div> </div>
        <div className="App-Cuadrado">
            <div style={{marginTop:"10px"}}>
            <a  style= {{ color: "#174a67", fontSize: "60px", fontStyle: "italic" }}>
                Creación de Sala de modo Clásico:   
            </a>
            <div style={{marginTop:"0px", top:"10%", color: "#174a67"}}>
                    <a> ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯</a>
            </div>
            </div>
            <form className="App-CuadrosTexto" style={{marginTop:"2%"}}>
            <div className="App-CuadrosTextoIzq" > 
                <CuadroTexto texto="Nombre de la sala" label="salaNombre" nombre="salaNombre" valor={body.salaNombre} funcion={handleChange} />
            <div style={{marginTop:"7%"}}>
                <CuadroTexto  texto="Tiempo de respuesta" type="number" label="time" nombre="time"  valor={body.time} funcion={handleChange} />
            </div>
 
           </div>

            <div className="App-CuadrosTextoDer" style={{paddingLeft: "2px"}} > 

            <label for="dog-names">Choose a dog name:</label>
            <select name="dog-names" id="dog-names">
                <option value="rigatoni">Rigatoni</option>
                <option value="dave">Dave</option>
                <option value="pumpernickel">Pumpernickel</option>
                <option value="reeses">Reeses</option>
            </select>
                
            <div style={{marginTop:"7%"}}>            
                <CuadroTexto texto="*  Contraseña" label="password" nombre="password" valor={body.password} funcion={handleChange} />
            </div>
            </div>
          </form>

          <div style={{marginTop:"14%", marginBottom:"3%", textAlign:"center"}}>
          <font color="red" >{errores}</font>
          </div>

          <div>
          <div style={{color:"black"}}> <a >Los elementos con asterisco (*) son opcionales</a></div>
          
          <div style={{marginTop:"2%"}}>
                <button
                    className="App-botonCancelar"
                    style= {{top: "80%", left: "44%", marginRight:"8%"}}
                    onClick={() => onSubmit()}
                    >
                Cancelar
                </button>
                
                <button
                    marginLeft= "10%"
                    className="App-botonConfirmar"
                    style= {{top: "80%", left: "44%" ,marginLeft:"8%"}}
                    onClick={() => onSubmit()}
                >
                Confirmar
                </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ModoClasico;