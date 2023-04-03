import React, { useState } from "react";
import './Estilos/App.css';
import { useNavigate } from 'react-router-dom';
import { useSession, setSession } from 'react-session';

import Cristiano from'./Imagenes/Cristiano.jpg';
import Tablero1 from'./Imagenes/Tablero1.png';

import Esquina_azul from './Imagenes/Esquina_azul.png';
import Esquina_amarilla from './Imagenes/Esquina_amarilla.png';
import Esquina_naranja from './Imagenes/Esquina_naranja.png';
import Esquina_roja from './Imagenes/Esquina_roja.png';
import Esquina_verde from './Imagenes/Esquina_verde.png';
import Esquina_rosa from './Imagenes/Esquina_rosa.png';

import Ficha_azul from './Imagenes/Ficha_azul.png';
import Ficha_amarilla from './Imagenes/Ficha_amarilla.png';
import Ficha_naranja from './Imagenes/Ficha_naranja.png';
import Ficha_roja from './Imagenes/Ficha_roja.png';
import Ficha_verde from './Imagenes/Ficha_verde.png';
import Ficha_rosa from './Imagenes/Ficha_rosa.png';

import Queso_azul from './Imagenes/Queso_azul.png';
import Queso_amarillo from './Imagenes/Queso_amarillo.png';
import Queso_naranja from './Imagenes/Queso_naranja.png';
import Queso_rojo from './Imagenes/Queso_rojo.png';
import Queso_verde from './Imagenes/Queso_verde.png';
import Queso_rosa from './Imagenes/Queso_rosa.png';

import B2B from './Imagenes/Logo.png';
import Quesitos from './Imagenes/CrearPartida.png';

//const URL = "https://6e01-146-158-156-138.eu.ngrok.io/api/usuarios/login/";
const URL = "http://51.142.118.71:8000/api/usuarios/login/";


const Tablero = () => {
  const [body, setBody] = useState({ username: "", password: "" });
  const [errores, setErorres] = useState("");
  const [show, setShow] = useState(true);
  const [show1, setShow1] = useState(true);

  const vectorJugadores = [{nombre:"Acher", queso:Queso_azul}, {nombre:"Carlos", queso:Queso_rojo}, {nombre:"Simon", queso:Queso_verde}, {nombre:"Hector", queso:Queso_naranja}, {nombre:"Roberto", queso:Queso_amarillo}, {nombre:"Diego", queso:Queso_rosa}];

  const navigate = useNavigate();
  const handleChange = (e) => {
    setBody({
      ...body,
      [e.target.name]: e.target.value,
    });
  };

  function jugadores() {
    const i = 6;
    if (i==6) {
        return vectorJugadores.map((elemento, indice) => (
            <div style={{ width: "94%", height: "92%", position: "absolute", zIndex: "3", top:"4%", left:"3%", border:"1px solid black"}}>  
                <div className='App-EsJugador' style={{top: `${(indice % 3) * 30}%`, left:`${(indice % 2) * 80}%`}}>
                    <div>
                        <img src={elemento.queso} className="App-imagenQuesito"/>
                        <a style={{color:"white", fontSize:"30px"}}>{elemento.nombre} </a>
                        <br></br>
                    </div>
                    <div >
                        <img src={Cristiano} className="App-imagenJugador" style={{ width: "30%", height: "50%", position: "absolute", top:"20%", left:"20%"}} /><br></br>
                        <img src={Quesitos} className="App-imagenJugador" style={{ width: "35%", height: "50%", position: "absolute", top:"20%", left:"60%", backgroundColor:"none"}}/><br></br>
                    </div>
                </div>
            </div>
        ));
    }
  }  

  function Linea(props) {
    return(
        <div style={{position:"absolute", height: props.height, width: props.width, top: props.top, left: props.left , zIndex: "1", transform: props.transform}}>
            <button style={{ backgroundColor: props.c1 , height: "100%", width: props.width1}}>  </button>
            <button style={{ backgroundColor: props.c2, height: "100%", width:"15%"}}>  </button>
            <button style={{ backgroundColor: props.c3, height: "100%", width:"15%"}}>  </button>
            <button style={{ backgroundColor: props.c4, height: "100%", width:"15%"}}>  </button>
            <button style={{ backgroundColor: props.c5, height: "100%", width:"15%"}}>  </button>
            <button style={{ backgroundColor: props.c6, height: "100%", width:"15%"}}>  </button>
        </div>
    )
  }

  return (
    
    <div className="App">
      <header className="App-headerJuego" style={{zIndex: "1"}}>        
            <div style={{ position: "absolute", zIndex: "2", height:"700px", width:"700px", top:"10%", left:"30.2%"}}>

                <Linea height="10%" width="41%" top="45%" left="2%" c1="white" c2="yellow" c3="pink" c4="orange" c5="blue" c6="green" width1="25%" transform="0"/>

                <Linea height="10%" width="41%" top="19.7%" left="16.6%" c1="white" c2="pink" c3="green" c4="yellow" c5="orange" c6="red" width1="25%" transform="rotate(+60deg)"/> 

                <Linea height="10%" width="41%" top="19.7%" left="45.6%" c1="white" c2="green" c3="red" c4="pink" c5="yellow" c6="blue" width1="25%" transform="rotate(+120deg)"/> 

                <Linea height="10%" width="41%" top="45%" left="60%" c1="white" c2="red" c3="blue" c4="green" c5="pink" c6="orange" width1="25%" transform="scaleX(-1)"/>  

                <Linea height="10%" width="41%" top="70%" left="45.6%" c1="white" c2="blue" c3="orange" c4="red" c5="green" c6="yellow" width1="25%" transform="rotate(-120deg)"/> 

                <Linea height="10%" width="41%" top="70%" left="16.6%" c1="white" c2="orange" c3="yellow" c4="blue" c5="red" c6="pink" width1="25%" transform="rotate(-60deg)"/> 
                    
                <Linea height="10.5%" width="37%" top="24%" left="-2%" c1="yellow" c2="white" c3="orange" c4="green" c5="white" c6="pink" width1="15%" transform="rotate(-60deg)"/>  
                
                <Linea height="10.5%" width="37%" top="3.5%" left="33.5%" c1="pink" c2="white" c3="yellow" c4="red" c5="white" c6="green" width1="15%" transform=""/>  
                
                <Linea height="10.5%" width="37%" top="24%" left="68.5%" c1="green" c2="white" c3="pink" c4="blue" c5="white" c6="red" width1="15%" transform="rotate(60deg)"/>  
                
                <Linea height="10.5%" width="37%" top="65.5%" left="68.5%" c1="red" c2="white" c3="green" c4="orange" c5="white" c6="blue" width1="15%" transform="rotate(120deg)"/>  
                
                <Linea height="10.5%" width="37%" top="85.5%" left="33%" c1="blue" c2="white" c3="red" c4="yellow" c5="white" c6="orange" width1="15%" transform="rotate(180deg)"/>  
                
                <Linea height="10.5%" width="37%" top="65.5%" left="-2%" c1="orange" c2="white" c3="blue" c4="pink" c5="white" c6="yellow" width1="15%" transform="rotate(-120deg)"/>  
            
                <img style={{ position:"absolute", left:"4.9%", height:"41%", width:"50%", top:"-9.2%", zIndex: "2"}} src={Esquina_azul}/>
                <img style={{ position:"absolute", transform: "rotate(+62deg)", left:"49%", height:"41%", width:"50%", top:"-8.89%", zIndex: "2"}} src={Esquina_naranja}/>
                <img style={{ position:"absolute", transform: "rotate(+122deg)", left:"71.2%", height:"41%", width:"50%", top:"30%", zIndex: "2"}} src={Esquina_amarilla}/>
                <img style={{ position:"absolute", transform: "rotate(-179deg)", left:"48.9%", height:"41%", width:"50%", top:"67.8%", zIndex: "2"}} src={Esquina_rosa}/>
                <img style={{ position:"absolute", transform: "rotate(241deg)", left:"4%", height:"41%", width:"50%", top:"67.8%", zIndex: "2"}} src={Esquina_verde}/>
                <img style={{ position:"absolute", transform: "rotate(302deg)", left:"-17.7%", height:"41%", width:"50%", top:"29%", zIndex: "2"}} src={Esquina_roja}/>
                
                <img style={{ position:"absolute", left:"57%", height:"3%", width:"3%", top:"49%", zIndex: "3"}} src={Ficha_amarilla}/>
                <img style={{ position:"absolute", left:"43%", height:"3%", width:"3%", top:"49%", zIndex: "3"}} src={Ficha_roja}/>
                <img style={{ position:"absolute", left:"46%", height:"3%", width:"3%", top:"43%", zIndex: "3"}} src={Ficha_azul}/>
                <img style={{ position:"absolute", left:"54%", height:"3%", width:"3%", top:"54%", zIndex: "3"}} src={Ficha_rosa}/>
                <img style={{ position:"absolute", left:"46%", height:"3%", width:"3%", top:"54%", zIndex: "3"}} src={Ficha_verde}/>
                <img style={{ position:"absolute", left:"54%", height:"3%", width:"3%", top:"43%", zIndex: "3"}} src={Ficha_naranja}/>

                <div  style={{width:"17%", height:"20%", left:"42.8%", top:"39.6%", position:"absolute", border:"2px solid black", backgroundColor:"white", zIndex: "0"}}>
                    <img src={B2B} style={{width:"70%",marginTop:"24%"}}/>
                </div>
            </div>
            
            {jugadores()}

            <button className="App-boton" style= {{top: "88%", left: "30%", position:"absolute"}} onClick={() => { setShow(!show)}}>
                Pausar Partida
            </button>
            <button className="App-boton" style= {{top: "88%", left: "53%", position:"absolute"}} onClick={() => { setShow1(!show1)}}>
                Abandonar Partida
            </button>

            {show ? (
            <div/>
            ) : (
                <div/>
            )}

            {show1 ? (
            <div/>
            ) : (
            <div/>
            )}

        </header>
    </div> 
  );
};

export default Tablero;