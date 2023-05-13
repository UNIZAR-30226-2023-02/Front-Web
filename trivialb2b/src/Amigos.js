import React, { useState, useEffect } from "react";
import './Estilos/App.css';
import { useNavigate } from 'react-router-dom';
import Buscar from'./Imagenes/BuscarPartida.png';
import Candado from'./Imagenes/Candado.png';
import Atras from "./Imagenes/Atras.png";
import Añadir from "./Imagenes/DatosUsuario.png";
import Cristiano from'./Imagenes/Usuario.png';
import InfiniteScroll from 'react-infinite-scroll-component'
import Cookies from 'universal-cookie';
import EliminarAmigo from './Imagenes/EliminarAmigo.png';

//const URL = "https://6e01-146-158-156-138.eu.ngrok.io/api/usuarios/login/";
const URL1 = "http://51.142.118.71:8000/api/usuarios/datos-yo/";
const URL2 = "http://51.142.118.71:8000/api/usuarios/add/amigo/";
const URL3 = "http://51.142.118.71:8000/api/usuarios/datos-usuario/";
const URL4 = "http://51.142.118.71:8000/api/usuarios/delete/amigo/";
const URL5 = "http://51.142.118.71:8000/api/usuarios/listar-peticiones-amigos/";
const URL6 = "http://51.142.118.71:8000/api/usuarios/aceptar/amigo/";
const URL7 = "http://51.142.118.71:8000/api/usuarios/rechazar/amigo/";



const Amigos = () => {

  const [nuevoA, setNuevoA] = useState("");
  const [eliminarA, setEliminarA] = useState("");

  const [amigo, setAmigo] = useState({nombre: "", correo: "", telefono: "", fechaNac:"", imagen:""});
  const [errores, setErroes] = useState();
  const [amigos, setAmigos] = useState([]);

  let [soli, setSoli] = useState("");
  const [solicitudes, setSolicitudes] = useState([]);

  const [show, setShow] = useState(true);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);


  const cookies= new Cookies();
  const token = cookies.get('token');
  

  useEffect(() => {
    fetch(URL1, {
      method: "POST",
      headers: { "Authorization": "Token " + token, "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {console.log(data)
        if (data.OK == "True"){
          amigos.length = 0
          data.amigos.forEach(element => {
            amigos.push(element);
          });
          setAmigos(amigos);
          setShow(false)
        }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  },[]);

  function listar_sol () {
    fetch(URL5, {
      method: "POST",
      headers: { "Authorization": "Token " + token, "Content-Type": "application/json" },
    })
      .then((response) => response.json()) 
      .then((data) => {console.log(data)
        if (data.OK == "True"){
          solicitudes.length = 0
          data.amigos_pendientes.forEach(element => {
            solicitudes.push(element);
          });
          setSolicitudes(solicitudes);
          console.log(solicitudes)
          setShow4(true)
        }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  }

  const navigate = useNavigate();
  
  const nombreAñadir = (e) => {
    setNuevoA(e.target.value)
  };
  const nombreEliminar = (e) => {
    setEliminarA(e.target.value)
  };

  const flechaAtras = async (event) => {
    navigate(process.env.PUBLIC_URL+ '/MenuJuego');
  };
  function estadisticas (props) {
    cookies.set('estadisticas', props, {path: '/'})
    cookies.set('estadisticas_pagina', "/Amigos", {path: '/'})
    navigate(process.env.PUBLIC_URL+ '/Estadisticas');
  };

  function add () {
    fetch(URL2, {
      method: "POST",
      headers: { "Authorization": "Token " + token, "Content-Type": "application/json" },
      body: JSON.stringify({"amigo": nuevoA}),
    })
      .then((response) => response.json())
      .then((data) => {console.log(data)
        if (data.OK == "True"){
          window.location.reload(true);
        }
        else {
          setErroes(data.error)
        }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  };

  function aceptar (a) {
    soli=a
    setSoli(a)
    fetch(URL6, {
      method: "POST",
      headers: { "Authorization": "Token " + token, "Content-Type": "application/json" },
      body: JSON.stringify({"amigo": soli}),
    })
      .then((response) => response.json())
      .then((data) => {console.log(data)
        if (data.OK == "True"){
          window.location.reload(true);
        }
        else {
          setErroes(data.error)
        }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  };

  function rechazar (a) {
    soli=a
    setSoli(a)
    fetch(URL7, {
      method: "POST",
      headers: { "Authorization": "Token " + token, "Content-Type": "application/json" },
      body: JSON.stringify({"amigo": soli}),
    })
      .then((response) => response.json())
      .then((data) => {console.log(data)
        if (data.OK == "True"){
          window.location.reload(true);
        }
        else {
          setErroes(data.error)
        }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  };

  function eliminarAmigo () {
    console.log(eliminarA)
    fetch(URL4, {
      method: "POST",
      headers: { "Authorization": "Token " + token, "Content-Type": "application/json" },
      body: JSON.stringify({"amigo": eliminarA}),
    })
      .then((response) => response.json())
      .then((data) => {console.log(data)
        if (data.OK == "True"){
          window.location.reload(true);
        }
        else {
          setErroes(data.error)
        }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  };

  function mostrarDatosUsuario(usuario) {
    fetch(URL3, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({"username": usuario}),
    })
      .then((response) => response.json())
      .then((data) => {console.log(data)
        if (data.OK == "True"){
          setShow3(true)
          setAmigo({ 
            nombre: usuario,
            correo: data.correo,
            telefono: data.telefono,
            fechaNac: data.fecha_nac
          });
        }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  };


  function f_amigos() {
    return amigos.map((amigo, elemento) => (
      <div key={elemento} className="App-CuadradoBlanco" style={{ width: "90%", height: "40%", position: "relative", left: "0%",cursor: "pointer", border: "0px black"}}  onClick={() => { if (show4 == false) {setShow3(true); setShow2(false); mostrarDatosUsuario(amigo)}}}>
        <a  style= {{ color: "black", fontSize: "30px", fontStyle: "italic", position: "absolute", top: "15%", left: "25%"}} >
          {amigo}
        </a>
        <img src={Cristiano} style= {{width:"auto", height:"70%",position: "absolute", top: "15%", left: "0%"}}/>
        <a  style= {{ color: "black", fontSize: "40px", fontStyle: "italic", position: "absolute", top: "70%", left: "0%"}}>
          ________________________________________
        </a>
      </div>
    ));
  }


  
  function f_solicitudes() {
    return solicitudes.map((solicitud, elemento) => (
      <div key={elemento} className="App-CuadradoBlanco" style={{ width: "90%", height: "40%", position: "relative", left: "0%", border: "0px black"}}  onClick={() => {}}>
        <a  style= {{ color: "black", fontSize: "30px", fontStyle: "italic", position: "absolute", top: "35%", left: "20%"}} >
          {solicitud}
        </a>
        <img src={Cristiano} style= {{width:"auto", height:"70%",position: "absolute", top: "15%", left: "0%"}}/>
        <a  style= {{ color: "black", fontSize: "40px", fontStyle: "italic", position: "absolute", top: "70%", left: "0%"}}>
          ________________________________________________________
        </a>
        <button className="App-botonConfirmar" style= {{fontSize:"32px", top: "33%", left: "55%", position:"absolute"}} onClick={() =>{setErroes("");  aceptar(solicitud)}} >
          Aceptar
        </button>
        <button className="App-botonCancelar" style= {{fontSize:"32px", top: "33%", left: "78%", position:"absolute"}} onClick={() =>{setErroes("");  rechazar(solicitud)}} >
          Rechazar
        </button>
      </div>
    ));
  }
  
  return (
    <div className="App">
          {show ? (
            <div className="App-CuadradoAmarillo" style={{ width: "90%", height: "65%", position: "absolute", top: "25%", left: "5%"}}>
              <div className="App-CuadradoBlanco" style={{ width: "50%", height: "90%", position: "absolute", top: "5%", left: "2%", borderRadius: "50px 0px 0px 50px"}}>
              <InfiniteScroll
                dataLength={amigos.length}
                pageStart={0}
                loadMore={f_amigos}
                hasMore={true || false}
                useWindow={false}
                style={{position:"absolute", width: "95%", height: "99.7%", top:"0.1%", left:"5%"}}
              >
                {f_amigos()}
              </InfiniteScroll>
              </div>
              <img src={Añadir} style={{width:"10%", height:"30%", left:"60%", top:"10%", zIndex: "1", cursor: "pointer", position:"absolute"}} onClick={() =>{setShow1(true);}}/>
              <button className="App-boton" style= {{fontSize:"32px", top: "45%", left: "57%", position:"absolute"}} onClick={() =>{setShow1(true);}} >
                Añadir Amigo
              </button>
              <img src={EliminarAmigo} style={{width:"10%", height:"30%", left:"81%", top:"10%", zIndex: "1", cursor: "pointer", position:"absolute"}} onClick={() =>{setShow2(true);}}/>
              <button className="App-boton" style= {{fontSize:"32px", top: "45%", left: "78%", position:"absolute"}} onClick={() =>{ if (show4 == false) {setShow2(true)}}}>
                Eliminar Amigo 
              </button>
              <button className="App-botonAzul" style= {{fontSize:"32px", top: "73%", left: "65%", position:"absolute"}} onClick={() =>{listar_sol()}}>
                Solicitudes de amistad
              </button>
            </div>
          ) : (
            <div className="App-CuadradoAmarillo" style={{ width: "90%", height: "65%", position: "absolute", top: "25%", left: "5%"}}>
              <div className="App-CuadradoBlanco" style={{ width: "50%", height: "90%", position: "absolute", top: "5%", left: "2%", borderRadius: "50px 0px 0px 50px"}}>
              <InfiniteScroll
                dataLength={amigos.length}
                pageStart={0}
                loadMore={f_amigos}
                hasMore={true || false}
                useWindow={false}
                style={{position:"absolute", width: "95%", height: "99.7%", top:"0.1%", left:"5%"}}
              >
                {f_amigos()}
              </InfiniteScroll>
              </div>
              <img src={Añadir} style={{width:"10%", height:"30%", left:"60%", top:"10%", zIndex: "1", cursor: "pointer", position:"absolute"}} onClick={() =>{setShow1(true);}}/>
              <button className="App-boton" style= {{fontSize:"32px", top: "45%", left: "57%", position:"absolute"}} onClick={() =>{setShow1(true);}} >
                Añadir Amigo
              </button>
              <img src={EliminarAmigo} style={{width:"10%", height:"30%", left:"81%", top:"10%", zIndex: "1", cursor: "pointer", position:"absolute"}} onClick={() =>{setShow2(true);}}/>
              <button className="App-boton" style= {{fontSize:"32px", top: "45%", left: "78%", position:"absolute"}} onClick={() =>{ if (show4 == false) {setShow2(true)}}}>
                Eliminar Amigo 
              </button>
              <button className="App-botonAzul" style= {{fontSize:"32px", top: "73%", left: "65%", position:"absolute"}} onClick={() =>{listar_sol()}}>
                Solicitudes de amistad
              </button>
            </div>
          )}


          {show1 ? (
            <div className="App-CuadradoNegro" style={{ width: "45%", height: "60%", position: "absolute", top: "25%", left: "27%", zIndex:"3", borderRadius: "50px 50px 50px 50px"}}>
              <div className="App-CuadradoNegro" style={{ width: "100%", height: "15%", position: "absolute", top: "0%", left: "0%", zIndex:"3",  borderRadius: "50px 50px 50px 50px"}}>
                <div style={{marginTop:"2%"}}>
                  <a style={{color:"white", fontSize:"50px"}}> Añadir Amigo </a>
                </div>
                <div style={{marginTop:"2%", color: "white"}}>
                    <a> ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯</a>
                </div>
              </div>
              <a style={{position: "absolute", top: "30%", left: "6%", color:"white", fontSize:"30px", textAlign:"left"}}> Escribe a continuacion el nombre del amigo que quieres añadir: </a>
              <a style={{position: "absolute", top: "55%", left: "6%",color:"white", fontSize:"30px"}}> Nombre: </a>
              <input className="App-textoNegro"
                type="nombre"
                label="nombre"
                name="nombre"
                onChange={nombreAñadir}
                style={{position: "absolute", top: "53%", left: "23%"}}
              />
              <div style={{textAlign:"center", position: "absolute", top: "67%", left: "20%"}}>
                <a style={{color:"red", fontSize:"30px"}}> {errores} </a>
              </div>
              <button className="App-botonCancelar" style= {{ top: "78%", left: "25%", position:"absolute"}} onClick={() =>{setShow1(false); setErroes("")}}>
                Cancelar
              </button>
              <button className="App-botonConfirmar" style= {{ top: "78%", left: "55%", position:"absolute"}} onClick={() => {add()}}>
                Confirmar
              </button>

            </div>
          ) : (
            <div/>
          )}

          

          {show2 ? (
          <div className="App-CuadradoNegro" style={{ width: "45%", height: "60%", position: "absolute", top: "25%", left: "27%", zIndex:"3", borderRadius: "50px 50px 50px 50px"}}>
            <div className="App-CuadradoNegro" style={{ width: "100%", height: "15%", position: "absolute", top: "0%", left: "0%", borderRadius: "50px 50px 50px 50px"}}>
              <div style={{marginTop:"2%"}}>
                <a style={{color:"white", fontSize:"50px"}}> Eliminar Amigo </a>
              </div>
              <div style={{marginTop:"2%", color: "white"}}>
                  <a> ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯</a>
              </div>
            </div>
            <a style={{position: "absolute", top: "30%", left: "6%", color:"white", fontSize:"30px", textAlign:"left"}}> Escriba a continuacion el nombre del amigo que quieres eliminar: </a>
            <a style={{position: "absolute", top: "55%", left: "6%",color:"white", fontSize:"30px"}}> Nombre: </a>
            <input className="App-textoNegro"
              type="nombre"
              label="nombre"
              name="nombre"
              onChange={nombreEliminar}
              style={{position: "absolute", top: "53%", left: "23%"}}
            />
            <div style={{textAlign:"center", position: "absolute", top: "67%", left: "18%"}}>
              <a style={{color:"red", fontSize:"30px"}}> {errores} </a>
            </div>
            <button className="App-botonCancelar" style= {{ top: "78%", left: "25%", position:"absolute"}} onClick={() =>{setShow2(false);setErroes("")}}>
              Cancelar
            </button>
            <button className="App-botonConfirmar" style= {{ top: "78%", left: "55%", position:"absolute"}} onClick={() => {eliminarAmigo()}}>
              Confirmar
            </button>

          </div>
          ) : (
            <div/>
          )}
          {show3 ? (

          <div className="App-CuadradoNegro" style={{ width: "60%", height: "60%", position: "absolute", top: "20%", left: "20%", borderRadius: "50px 50px 50px 50px", zIndex:"5"}}>
            <div className="App-CuadradoNegro" style={{ width: "100%", height: "15%", position: "absolute", top: "0%", left: "0%", zIndex:"5", borderRadius: "50px 50px 50px 50px"}}>
              <div style={{marginTop:"2%"}}>
                <a style={{color:"white", fontSize:"50px"}}> Datos Usuario </a>
              </div>
              <div style={{marginTop:"2%", color: "white"}}>
                  <a> ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯</a>
              </div>
            </div>
            <a style={{position: "absolute", top: "35%", left: "6%", color:"white", fontSize:"30px", textAlign:"left", zIndex:"6"}}> Nombre: {amigo.nombre} </a>
            <a style={{position: "absolute", top: "35%", left: "53%", color:"white", fontSize:"30px", textAlign:"left", zIndex:"6"}}> Correo: {amigo.correo} </a>
            <a style={{position: "absolute", top: "60%", left: "53%", color:"white", fontSize:"30px", textAlign:"left", zIndex:"6"}}> Telefono: {amigo.telefono} </a>
            <a style={{position: "absolute", top: "60%", left: "6%", color:"white", fontSize:"30px", textAlign:"left", zIndex:"6"}}> Fecha de nacimiento: {amigo.fechaNac} </a>

            <button className="App-botonCancelar" style= {{ top: "78%", left: "44%", position:"absolute"}}  onClick={() =>{setShow3(false)}}>
              Salir
            </button>
            <button className="App-boton" style= {{top: "80%", left: "75%", position:"absolute", fontSize:"30px"}}  onClick={() =>{estadisticas(amigo.nombre)}}>
              Estadisticas
            </button>

          </div>

          ) : (

            <div/>

          )}

          {show4 ? (

          <div className="App-CuadradoNegro" style={{ width: "60%", height: "63.8%", position: "absolute", top: "26%", left: "20%", borderRadius: "50px 50px 50px 50px", zIndex:"5"}}>
            <div style={{position: "absolute", top: "2%", left: "40%"}}>
              <a style={{color:"white", fontSize:"50px"}}> Solicitudes </a>
            </div>
            <div style={{position: "absolute", top: "15%", left: "5%", color: "white"}}>
            </div>
            <button className="App-botonCancelar" style= {{ top: "2.5%", left: "85%", position:"absolute"}}  onClick={() =>{setErroes("");setShow4(false)}}>
              Salir
            </button>
            <div className="App-CuadradoBlanco" style={{ width: "90%", height: "70%", position: "absolute", top: "17%", left: "5%", borderRadius: "50px 0px 0px 50px"}}>
              <InfiniteScroll
                dataLength={solicitudes.length}
                pageStart={0}
                loadMore={f_solicitudes}
                hasMore={true || false}
                useWindow={false}
                style={{position:"absolute", width: "95%", height: "99.7%", top:"0.1%", left:"5%"}}
              >
                {f_solicitudes()}
              </InfiniteScroll>
              </div>
              <div style={{position: "absolute", top: "90%", left: "33%"}}>
                <a style={{color:"red", fontSize:"30px"}}> {errores} </a>
              </div>
          </div>

          ) : (

            <div/>

          )}

        <img src={Atras} style={{width:"150px", height:"150px", top:"5%", left:"5%", cursor: "pointer", position: "absolute"}} onClick={() => flechaAtras()}/>
        <div className = "App-header" > 
            <div className="App-titulo" style= {{top: "7%"}} > Amigos
                <div className="App-Quesitos" style= {{left: "32%"}}> </div> 
            </div>
        </div>

        
    </div>
  );
};

export default Amigos;