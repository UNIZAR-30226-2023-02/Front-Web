import React, { useState, useEffect } from "react";
import './Estilos/App.css';
import { useNavigate } from 'react-router-dom';
import Atras from './Imagenes/Atras.png';
import { sessionStorage } from 'web-storage';

//const URL = "http://b64b-146-158-156-138.eu.ngrok.io/api/usuarios/datos/";
const URL = "http://51.142.118.71:8000/api/usuarios/datos/";

function CuadroTexto(props) {
  return (
    <div>
      <a> {props.texto}:  </a>
      <input className="App-textoNegro"
      label={props.label}
      name={props.nombre}
      value={props.valor}
      onChange={props.funcion}
      />
    </div>
  )
}

const Perfil = () => {
  const [body, setBody] = useState({ username: "", fecha_nac: "", correo: "", telefono: ""});
  const navigate = useNavigate();
  const [show, setShow] = useState(true);
  const [show2, setShow2] = useState(true);


  if (typeof sessionStorage !== "undefined") {
    const token = sessionStorage.getItem('usuario');
    console.log(token);
  } else {
    console.log('sessionStorage no está definido');
  }


    fetch(URL, {
      method: "POST",
      headers: { "Authorization": "Token " + "0aafbbce536ffaa31f7c7875c931301d73c7240a" },
    })
      .then((response) => response.json())
      .then((data) => {console.log(data)
        /*body.username= data.username;
        body.fecha_nac=data.fecha_nac;
        body.correo= data.correo;
        body.telefono=data.telefono;*/
    })

  const handleChange = (e) => {
    setBody({
      ...body,
      [e.target.name]: e.target.value,
    });
  };

  const handleChange2 = (e) => {
  };

  const flechaAtras = async (event) => {
      navigate(process.env.PUBLIC_URL+ '/MenuJuego');
  };

  const continuar = async (event) => {
    navigate(process.env.PUBLIC_URL+ '/Perfil');
  };

  /*const Confirmar = () => {
    console.log(body);;

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
        }
      })
      .catch((error) => console.error(error));
      navigate(process.env.PUBLIC_URL + '/PerfilConfirmacion');
  };*/

  function VisualizarDatos() {
    return (
      <form className="App-Input" style={{left: "4%", top:"50%", height:"30%", width: "92%", position: "absolute"}}>
        <div className="App-CuadrosTextoIzq" > 
          <div style={{marginLeft:"7%"}}>
            <CuadroTexto texto="Nombre Usuario" valor="Acher" funcion={handleChange2}  />
          </div>
          <CuadroTexto texto="Fecha de nacimiento" valor="01-02-2002"   funcion={handleChange2}  /> 
        </div>
        <div className="App-CuadrosTextoDer" > 
          <CuadroTexto texto="Correo electronico" valor="pepe@unizar.es"  funcion={handleChange2}  />
          <div style={{marginLeft:"7%"}}>
            <CuadroTexto texto="Teléfono móvil" valor="605828074" funcion={handleChange2}   />
          </div>
        </div>
        <img src={Atras} style={{width:"170px", height:"170px", top:"83%", left:"1.1%", cursor: "pointer", position: "absolute"}} onClick={() => flechaAtras()}/>
      </form>
    )
  }

  function CambiarDatos() {
    return (
      <div>
        <form className="App-Input" style={{left: "4%", top:"50%", height:"30%", width: "92%", position: "absolute"}}>
          <div className="App-CuadrosTextoIzq" > 
            <div style={{marginLeft:"7%"}}>
              <CuadroTexto texto="Nombre Usuario" label="username" nombre="username" valor={body.username} funcion={handleChange} />
            </div>
            <CuadroTexto texto="Fecha de nacimiento" label="fecha_nac" nombre="fecha_nac" valor={body.fecha_nac} funcion={handleChange} /> 
          </div>
          <div className="App-CuadrosTextoDer"> 
            
              <CuadroTexto texto="Correo electronico" type="email" label="correo" nombre="correo" valor={body.correo} funcion={handleChange} />
            <div style={{marginLeft:"7%"}}>
              <CuadroTexto texto="Teléfono móvil" type="number" label="telefono" nombre="telefono" valor={body.telefono} funcion={handleChange} />
            </div>
          </div>
        </form>
        <button
          className="App-botonCancelar"
          style= {{top: "80%", left:"37%", position:"absolute"}}
          onClick={() => setShow(!show) }
          >
          Cancelar
        </button>
        <button
          
          className="App-botonConfirmar"
          style= {{top: "80%", left:"53%", position:"absolute", marginLeft: "10%"}}
          onClick={() => { setShow2(!show2)}}>
          Confirmar
        </button>
        <img src={Atras} style={{width:"170px", height:"170px", top:"75%", left:"5%", cursor: "pointer", position: "absolute"}} onClick={() => flechaAtras()}/>
      </div>
    )
  }

  function ConfirmacionDatos() {
    return (
      <div>
        <form className="App-Input" style={{left: "4%", top:"50%", height:"30%", width: "92%", position: "absolute", filter: 'blur(5px)'}}>
          <div className="App-CuadrosTextoIzq" > 
            <div style={{marginLeft:"7%"}}>
              <CuadroTexto texto="Nombre Usuario" label="username" nombre="username" valor={body.username} />
            </div>
            <CuadroTexto texto="Fecha de nacimiento" label="fecha_nac" nombre="fecha_nac" valor={body.fecha_nac} /> 
          </div>
          <div className="App-CuadrosTextoDer"> 
            
              <CuadroTexto texto="Correo electronico" type="email" label="correo" nombre="correo" valor={body.correo} />
            <div style={{marginLeft: "7%"}}>
              <CuadroTexto texto="Teléfono móvil" type="number" label="telefono" nombre="telefono" valor={body.telefono} />
            </div>
          </div>
        </form>
        <button
          className="App-botonCancelar" 
          style= {{top: "80%", left:"37%", position:"absolute" , filter: 'blur(5px)', pointerEvents:"none"}}
          onClick={() => setShow(!show) }
          >
          Cancelar
        </button>
        <button
          marginLeft= "10%"
          className="App-botonConfirmar"
          style= {{top: "80%", left:"53%", position:"absolute" , filter: 'blur(5px)', pointerEvents:"none"}}
          onClick={() => { setShow2(!show2) }}>
          Confirmar
        </button>
        <div className="App-CuadradoNegro" style={{ width: "1000px", height: "600px", position: "absolute", zIndex: "1", top: "24%", left: "25%"}}>
          <div style={{marginTop: "10%"}}>                
            <a style={{color:"white", fontSize:"50px"}}>Se han cambiado los datos personales </a>
            <br></br>
            <a style={{color:"green", fontSize:"50px"}}> correctamente</a>
            <div> <button className="App-boton" style= {{marginTop:"130px", left: "44%"}} onClick={() => {setShow(!show); setShow2(!show2)}} > Continuar </button></div>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="App">
      <div className = "App-header" > 
        <div className="App-titulo" style= {{top: "7%"}} > Perfil
          <div className="App-Quesitos" style= {{left: "20%"}}/> 
        </div>
        <div className="App-iconoRegistro"> </div>
        
        {show ? (
          <VisualizarDatos/>
          ) : (
              <div>
                {show2 ? (
                <CambiarDatos/>
                ) : (
                <ConfirmacionDatos/>
                )}
              </div>
          )}
            { show && 
            <div style={{marginTop: "2%"}}>
              <button className="App-boton" style= {{top: "80%", left: "43%", position:"absolute"}} onClick={() => { setShow(!show)}} >
                Cambiar datos
              </button>
            </div>
            }
        </div>
    </div>
  );
};

export default Perfil;
