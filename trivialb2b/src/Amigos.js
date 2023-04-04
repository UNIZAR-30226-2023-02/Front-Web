import React, { useState } from "react";
import './Estilos/App.css';
import { useNavigate } from 'react-router-dom';
import Buscar from'./Imagenes/BuscarPartida.png';
import Candado from'./Imagenes/Candado.png';
import Atras from "./Imagenes/Atras.png";
import Añadir from "./Imagenes/DatosUsuario.png";
import Cristiano from'./Imagenes/Vinicius.png';
import InfiniteScroll from 'react-infinite-scroll-component'


//const URL = "https://6e01-146-158-156-138.eu.ngrok.io/api/usuarios/login/";
const URL = "http://51.142.118.71:8000/api/usuarios/login/";



const Amigos = () => {
    
  const [nuevoA, setNuevoA] = useState("");
  const [eliminarA, setEliminaA] = useState("");
  const [amigo, setAmigo] = useState({ nombre: "", correo: "", telefono: "", fechaNac: "", imagen: ""});

  const [amigo1, setAmigo1] = useState({ nombre: "Roberto", correo: "@gmail.com", telefono: "111111111", fechaNac: "", imagen: Cristiano});
  const [amigo2, setAmigo2] = useState({ nombre: "Acher", correo: "@gmail.com", telefono: "22222222", fechaNac: "", imagen: Cristiano});
  const [amigo3, setAmigo3] = useState({ nombre: "Diego", correo: "@gmail.com", telefono: "333333333", fechaNac: "", imagen: Cristiano});
  const [amigo4, setAmigo4] = useState({ nombre: "Héctor", correo: "@gmail.com", telefono: "44444444", fechaNac: "", imagen: Cristiano});
  const [amigo5, setAmigo5] = useState({ nombre: "Simón", correo: "@gmail.com", telefono: "555555555", fechaNac: "", imagen: Cristiano});
  const [amigo6, setAmigo6] = useState({ nombre: "Carlos", correo: "@gmail.com", telefono: "666666666", fechaNac: "", imagen: Cristiano});
  const [amigo7, setAmigo7] = useState({ nombre: "Javier", correo: "@gmail.com", telefono: "777777777", fechaNac: "", imagen: Cristiano});

  const vecAmigos = [amigo1,amigo2,amigo3,amigo4,amigo5,amigo6,amigo7];

  const [show, setShow] = useState(true);
  const [show1, setShow1] = useState(true);

  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setAmigo({
      ...amigo,
      ["nombre"]: e.nombre,
      ["tiempo"]: e.tiempo,
      ["numJugadores"]: e.numJugadores,
      ["password"]: e.password,
      ["creador"]: e.creador,
      ["modo"]: e.modo,
    })
  };
  const onNombreA = (e) => {
    setNuevoA(e.target.value)
  };
  const onNombreE = (e) => {
    setEliminaA(e.target.value)
  };
  const confirmar = async (event) => {
    setShow(true)
  };
  const cancelar = async (event) => {
    setShow(true)
  };
  const eliminar = async (event) => {
    navigate(process.env.PUBLIC_URL + '/MenuJuego');
  };  
  const flechaAtras = async (event) => {
    navigate(process.env.PUBLIC_URL+ '/MenuJuego');
  };

  function f_amigos() {

    return vecAmigos.map((elemento) => (
      <div className="App-CuadradoBlanco" style={{ width: "90%", height: "40%", position: "relative", left: "0%",cursor: "pointer", border: "0px black"}}onClick={() => {handleChange(elemento);setShow(!show);}}>
        <a  style= {{ color: "black", fontSize: "30px", fontStyle: "italic" ,position: "absolute", top: "15%", left: "25%"}}>
          {elemento.nombre}
        </a>
        <img src={Cristiano} style= {{width:"auto", height:"70%",position: "absolute", top: "15%", left: "0%"}}/>
        <a  style= {{ color: "black", fontSize: "40px", fontStyle: "italic" ,position: "absolute", top: "70%", left: "0%"}}>
          ________________________________________
        </a>
      </div>
    ));
  }
  return (
    <div className="App">


      {show ? (
        <div className="App-CuadradoAmarillo" style={{ width: "1500px", height: "500px", position: "absolute", top: "25%", left: "10%"}}>

          <div className="App-CuadradoBlanco" style={{ width: "50%", height: "88%", position: "absolute", top: "5%", left: "2%", borderRadius: "50px 0px 0px 50px"}}>
          <InfiniteScroll
            dataLength={vecAmigos.length}
            pageStart={0}
            loadMore={f_amigos}
            hasMore={true || false}
            loader={<div className="loader" key={0}>Loading ...</div>}
            useWindow={false}
            style={{position:"absolute", width: "95%", height: "99.7%", top:"0.1%", left:"5%"}}
          >
            {f_amigos()}
          </InfiniteScroll>
          </div>

          <img src={Añadir} style={{width:"10%", height:"30%", left:"60%", top:"20%", zIndex: "1", cursor: "pointer", position:"absolute"}} onClick={() =>{setShow(false);setShow1(true);}}/>
          <button className="App-boton" style= {{fontSize:"32px", top: "60%", left: "57%", position:"absolute"}}onClick={() =>{setShow(false);setShow1(true);}}>
            Añadir Amigo
          </button>

          <img src={Añadir} style={{width:"10%", height:"30%", left:"81%", top:"20%", zIndex: "1", cursor: "pointer", position:"absolute"}} onClick={() =>{setShow(false);setShow1(false);}}/>
          <button className="App-boton" style= {{fontSize:"32px", top: "60%", left: "78%", position:"absolute"}} onClick={() =>{setShow(false);setShow1(false);}}>
            Eliminar Amigo
          </button>

        </div>

        ) : (
        <div>
          <div className="App-CuadradoAmarillo" style={{ width: "1500px", height: "500px", position: "absolute", top: "25%", left: "10%", filter: 'blur(5px)'}}>

            <div className="App-CuadradoBlanco" style={{ width: "50%", height: "88%", position: "absolute", top: "5%", left: "2%", borderRadius: "50px 0px 0px 50px"}}>
            <InfiniteScroll
              dataLength={vecAmigos.length}
              pageStart={0}
              loadMore={f_amigos}
              hasMore={true || false}
              loader={<div className="loader" key={0}>Loading ...</div>}
              useWindow={false}
              style={{position:"absolute", width: "95%", height: "99.7%", top:"0.1%", left:"5%"}}
            >
              {f_amigos()}
            </InfiniteScroll>
            </div>

            <img src={Añadir} style={{width:"10%", height:"30%", left:"60%", top:"20%", zIndex: "1", cursor: "pointer", position:"absolute"}} onClick={() =>{setShow(false);setShow1(true);}}/>
            <button className="App-boton" style= {{fontSize:"32px", top: "60%", left: "57%", position:"absolute"}}>
              Añadir Amigo
            </button>

            <img src={Añadir} style={{width:"10%", height:"30%", left:"81%", top:"20%", zIndex: "1", cursor: "pointer", position:"absolute"}} onClick={() =>{setShow(false);setShow1(false);}}/>
            <button className="App-boton" style= {{fontSize:"32px", top: "60%", left: "78%", position:"absolute"}} >
              Eliminar Amigo
            </button>

          </div>
          {show1 ? (
            <div className="App-CuadradoNegro" style={{ width: "45%", height: "60%", position: "absolute", top: "25%", left: "27%", borderRadius: "50px 50px 50px 50px"}}>
              <div className="App-CuadradoNegro" style={{ width: "100%", height: "15%", position: "absolute", top: "0%", left: "0%", borderRadius: "50px 50px 50px 50px"}}>
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
                onChange={onNombreA}
                style={{position: "absolute", top: "53%", left: "23%"}}
              />
              <button className="App-botonCancelar" style= {{ top: "78%", left: "25%", position:"absolute"}} onClick={cancelar}>
                Cancelar
              </button>
              <button className="App-botonConfirmar" style= {{ top: "78%", left: "55%", position:"absolute"}} onClick={confirmar}>
                Confirmar
              </button>

            </div>
          ) : (
          <div className="App-CuadradoNegro" style={{ width: "45%", height: "60%", position: "absolute", top: "25%", left: "27%", borderRadius: "50px 50px 50px 50px"}}>
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
              onChange={onNombreE}
              style={{position: "absolute", top: "53%", left: "23%"}}
            />
            <a style={{position: "absolute", top: "67%", left: "35%",color:"red", fontSize:"30px"}}> No existe este amigo </a>
            <button className="App-botonCancelar" style= {{ top: "78%", left: "25%", position:"absolute"}} onClick={cancelar}>
              Cancelar
            </button>
            <button className="App-botonConfirmar" style= {{ top: "78%", left: "55%", position:"absolute"}} onClick={confirmar}>
              Confirmar
            </button>

          </div>
           )}

          {show1 ? (

          <div className="App-CuadradoNegro" style={{ width: "45%", height: "60%", position: "absolute", top: "25%", left: "27%", borderRadius: "50px 50px 50px 50px"}}>
            <div className="App-CuadradoNegro" style={{ width: "100%", height: "15%", position: "absolute", top: "0%", left: "0%", borderRadius: "50px 50px 50px 50px"}}>
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
              onChange={onNombreA}
              style={{position: "absolute", top: "53%", left: "23%"}}
            />
            <button className="App-botonCancelar" style= {{ top: "78%", left: "25%", position:"absolute"}} onClick={cancelar}>
              Cancelar
            </button>
            <button className="App-botonConfirmar" style= {{ top: "78%", left: "55%", position:"absolute"}} onClick={confirmar}>
              Confirmar
            </button>

          </div>

          ) : (

            <div/>

          )}

        </div>

        )}
        <img src={Atras} style={{width:"150px", height:"150px", top:"80%", left:"5%", cursor: "pointer", position: "absolute"}} onClick={() => flechaAtras()}/>
        <div className = "App-header" > 
            <div className="App-titulo" style= {{top: "7%"}} > Amigos
                <div className="App-Quesitos" style= {{left: "32%"}}> </div> 
            </div>
        </div>

        
    </div>
  );
};

export default Amigos;