import React, { useState } from "react";
import './Estilos/App.css';
import { useNavigate } from 'react-router-dom';
import Clasico from'./Imagenes/Clasico.png';
import Equipos from'./Imagenes/Equipos.png';
import Tematica from'./Imagenes/Tematica.png';
import Perfil from'./Imagenes/Perfil.png';
import Logo from './Imagenes/Logo.png';

//const URL = "https://6e01-146-158-156-138.eu.ngrok.io/api/usuarios/login/";
const URL = "https://51.142.118.71:8000/api/usuarios/login/";

function CeldaDesplegable(props) {
  return (
    <button className='App-CeldaDesplegable' >
        <a style={{color:"white", fontSize:"30px"}}>{props.texto} </a>
        <br></br>
        <a style={{color:"white", fontSize:"20px"}}>____________________________________________</a>
    </button>
  )
}

const CrearPartida = () => {

  const navigate = useNavigate();
  const [show, setShow] = useState(true);

  const onSubmit1 = async (event) => {
    navigate(process.env.PUBLIC_URL + '/ModoClasico');
  };
  const onSubmit2 = async (event) => {
    navigate(process.env.PUBLIC_URL + '/ModoEquipos');
  };
  const onSubmit3 = async (event) => {
    navigate(process.env.PUBLIC_URL + '/ModoTematica');
  };
  const onSubmit4 = async (event) => {
    navigate(process.env.PUBLIC_URL + '/CerrarSesion');
  };

  
  return (
    <div className="App">
      <header className = "App-header" > 
      <div className="App-titulo" style= {{top: "7%"}} > CrearPartida 
        <div className="App-Quesitos"/> 
        </div>
        <button
            className='App-IconoPerfil'
            type="button"             
            onClick={() => {
              setShow(!show);
            }}>
            {show ? '' : ''}
            <img src={Perfil} style={{width:"100%", height:"100%"}} /> 
          </button> 

          {show ? (
          <div className="App-Imagenes">   
              <div className="App-ImagenBoton" style={{marginRight: "100px"}}> 
                  <img src={Clasico} style={{width:"50%", height:"50%", paddingBottom:"10%"}} /> 
                  <button className="App-boton" type="submit" onClick={() => onSubmit1()} > Modo Clasico </button>
              </div>  
              <div className="App-ImagenBoton" style={{marginRight: "100px"}}> 
                  <img src={Equipos} style={{width:"50%", height:"50%", paddingBottom:"10%"}} /> 
                  <button className="App-boton" type="submit" onClick={() => onSubmit2()}> Modo Equipos </button>
              </div>  
              <div className="App-ImagenBoton"> 
                  <img src={Tematica} style={{width:"50%", height:"50%", paddingBottom:"10%"}} /> 
                  <button className="App-boton" style={{width:"350px"}} type="submit" onClick={() => onSubmit3()}> Modo Tematica </button>
              </div>   
          </div>
          ) : (
            <div>
              <div className="App-Imagenes">   
                <div className="App-ImagenBoton" style={{marginRight: "100px"}}> 
                    <img src={Clasico} style={{width:"50%", height:"50%", paddingBottom:"10%"}} /> 
                    <button className="App-boton" type="submit" onClick={() => onSubmit1()} > Modo Clasico </button>
                </div>  
                <div className="App-ImagenBoton" style={{marginRight: "100px"}}> 
                    <img src={Equipos} style={{width:"50%", height:"50%", paddingBottom:"10%"}} /> 
                    <button className="App-boton" type="submit" onClick={() => onSubmit2()}> Modo Equipos </button>
                </div>  
                <div className="App-ImagenBoton"> 
                    <img src={Tematica} style={{width:"50%", height:"50%", paddingBottom:"10%"}} /> 
                    <button className="App-boton" style={{width:"350px"}} type="submit" onClick={() => onSubmit3()}> Modo Tematica </button>
                </div> 
              </div>
              <div className="App-Desplegable">
                <div>
                <img src={Perfil} style={{width:"100px", height:"100px", left:"10%", marginTop:"20px", marginRight:"400px", marginLeft:"20px", marginBottom:"150px", cursor: "pointer"}} onClick={() => setShow(!show)}/>
                <img src={Logo} style={{width:"100px", height:"100px", marginTop:"20px", marginLeft:"20px", marginBottom:"150px"}} />  
                </div>
                <CeldaDesplegable texto="Perfil" />
                <CeldaDesplegable texto="Historial" />
                <CeldaDesplegable texto="Contacto" />
                <CeldaDesplegable texto="Redes Sociales" />
                <CeldaDesplegable texto="Estadísticas" />
                <button className="App-boton" style={{marginLeft:"170px", marginTop:"100px", width:"300px"}} type="submit" onClick={() => onSubmit4()}> Cerrar Sesion</button>
              </div>
            </div>
          )}
      </header>
    </div>
  );
};

export default CrearPartida;
