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
import B2B from './Imagenes/Logo.png';
import Hexagon from 'react-hexagon';
import Quesitos from './Imagenes/CrearPartida.png';

//const URL = "https://6e01-146-158-156-138.eu.ngrok.io/api/usuarios/login/";
const URL = "http://51.142.118.71:8000/api/usuarios/login/";


const Tablero = () => {
  const [body, setBody] = useState({ username: "", password: "" });
  const [errores, setErorres] = useState("");
  const [show, setShow] = useState(true);

  const vectorJugadores = ["Acher", "Miguel", "pablo", "Luis", "Roberta", "Diegini"];

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
                        <img src={Cristiano} className="App-imagenQuesito"/>
                        <a style={{color:"white", fontSize:"30px"}}>{elemento} </a>
                        <br></br>
                    </div>
                    <div>
                        <img src={Cristiano} className="App-imagenJugador"/><br></br>
                        <img src={Quesitos} className="App-imagenJugador"/><br></br>
                    </div>
                </div>
            </div>
        ));
    }
}  

  function Linea1() {
    return(
        <div style={{position: "absolute", height: "10%", width:"41%", top:"45%", left:"2%"}}>
            <button style={{ backgroundColor:"white" , height: "100%", width:"25%"}}>  </button>
            <button style={{ backgroundColor:"yellow", height: "100%", width:"15%"}}>  </button>
            <button style={{ backgroundColor:"pink" , height: "100%", width:"15%"}}>  </button>
            <button style={{ backgroundColor:"orange", height: "100%", width:"15%"}}>  </button>
            <button style={{ backgroundColor:"blue", height: "100%", width:"15%"}}>  </button>
            <button style={{ backgroundColor:"green", height: "100%", width:"15%"}}>  </button>
        </div>
    )
  }

  function Linea2() {
    return(
        <div style={{position:"absolute", height:"100%", width:"100%"}}>
            <button style={{ backgroundColor:"white" , height: "100%", width:"25%"}}>  </button>
            <button style={{ backgroundColor:"pink" , height: "100%", width:"15%"}}>  </button>
            <button style={{ backgroundColor:"green", height: "100%", width:"15%"}}>  </button>
            <button style={{ backgroundColor:"yellow", height: "100%", width:"15%"}}>  </button>
            <button style={{ backgroundColor:"orange", height: "100%", width:"15%"}}>  </button>
            <button style={{ backgroundColor:"red", height: "100%", width:"15%"}}>  </button>
        </div>
    )
  }
  
  function Linea3() {
    return(
        <div style={{position:"absolute", height:"100%", width:"100%"}}>
            <button style={{ backgroundColor:"white" , height: "100%", width:"25%"}}>  </button>
            <button style={{ backgroundColor:"green" , height: "100%", width:"15%"}}>  </button>
            <button style={{ backgroundColor:"red", height: "100%", width:"15%"}}>  </button>
            <button style={{ backgroundColor:"pink", height: "100%", width:"15%"}}>  </button>
            <button style={{ backgroundColor:"yellow", height: "100%", width:"15%"}}>  </button>
            <button style={{ backgroundColor:"blue", height: "100%", width:"15%"}}>  </button>
        </div>
    )
  }

  function Linea4() {
    return(
        <div style={{position:"absolute", height:"100%", width:"100%"}}>
            <button style={{ backgroundColor:"white" , height: "100%", width:"25%"}}>  </button>
            <button style={{ backgroundColor:"red" , height: "100%", width:"15%"}}>  </button>
            <button style={{ backgroundColor:"blue", height: "100%", width:"15%"}}>  </button>
            <button style={{ backgroundColor:"green", height: "100%", width:"15%"}}>  </button>
            <button style={{ backgroundColor:"pink", height: "100%", width:"15%"}}>  </button>
            <button style={{ backgroundColor:"orange", height: "100%", width:"15%"}}>  </button>
        </div>
    )
  }

  function Linea5() {
    return(
        <div style={{position:"absolute", height:"100%", width:"100%"}}>
            <button style={{ backgroundColor:"white" , height: "100%", width:"25%"}}>  </button>
            <button style={{ backgroundColor:"blue" , height: "100%", width:"15%"}}>  </button>
            <button style={{ backgroundColor:"orange", height: "100%", width:"15%"}}>  </button>
            <button style={{ backgroundColor:"red", height: "100%", width:"15%"}}>  </button>
            <button style={{ backgroundColor:"green", height: "100%", width:"15%"}}>  </button>
            <button style={{ backgroundColor:"yellow", height: "100%", width:"15%"}}>  </button>
        </div>
    )
  }
  
  function Linea6() {
    return(
        <div style={{position:"absolute", height:"100%", width:"100%"}}>
            <button style={{ backgroundColor:"white" , height: "100%", width:"25%"}}>  </button>
            <button style={{ backgroundColor:"orange" , height: "100%", width:"15%"}}>  </button>
            <button style={{ backgroundColor:"yellow", height: "100%", width:"15%"}}>  </button>
            <button style={{ backgroundColor:"blue", height: "100%", width:"15%"}}>  </button>
            <button style={{ backgroundColor:"red", height: "100%", width:"15%"}}>  </button>
            <button style={{ backgroundColor:"pink", height: "100%", width:"15%"}}>  </button>
        </div>
    )
  }

  function Linea7() {
    return(
        <div style={{position:"absolute", height:"100%", width:"100%"}}>
            <button style={{ backgroundColor:"yellow" , height: "100%", width:"15%"}}>  </button>
            <button style={{ backgroundColor:"white", height: "100%", width:"15%"}}>  </button>
            <button style={{ backgroundColor:"orange", height: "100%", width:"15%"}}>  </button>
            <button style={{ backgroundColor:"green", height: "100%", width:"15%"}}>  </button>
            <button style={{ backgroundColor:"white", height: "100%", width:"15%"}}>  </button>
            <button style={{ backgroundColor:"pink", height: "100%", width:"15%"}}>  </button>
        </div>
    )
  }

  function Linea8() {
    return(
        <div style={{position:"absolute", height:"100%", width:"100%"}}>
            <button style={{ backgroundColor:"pink" , height: "100%", width:"15%"}}>  </button>
            <button style={{ backgroundColor:"white", height: "100%", width:"15%"}}>  </button>
            <button style={{ backgroundColor:"yellow", height: "100%", width:"15%"}}>  </button>
            <button style={{ backgroundColor:"red", height: "100%", width:"15%"}}>  </button>
            <button style={{ backgroundColor:"white", height: "100%", width:"15%"}}>  </button>
            <button style={{ backgroundColor:"green", height: "100%", width:"15%"}}>  </button>
        </div>
    )
  }

  function Linea9() {
    return(
        <div style={{position:"absolute", height:"100%", width:"100%"}}>
            <button style={{ backgroundColor:"green" , height: "100%", width:"15%"}}>  </button>
            <button style={{ backgroundColor:"white", height: "100%", width:"15%"}}>  </button>
            <button style={{ backgroundColor:"pink", height: "100%", width:"15%"}}>  </button>
            <button style={{ backgroundColor:"blue", height: "100%", width:"15%"}}>  </button>
            <button style={{ backgroundColor:"white", height: "100%", width:"15%"}}>  </button>
            <button style={{ backgroundColor:"red", height: "100%", width:"15%"}}>  </button>
        </div>
    )
  }

  function Linea10() {
    return(
        <div style={{position:"absolute", height:"100%", width:"100%"}}>
            <button style={{ backgroundColor:"red" , height: "100%", width:"15%"}}>  </button>
            <button style={{ backgroundColor:"white", height: "100%", width:"15%"}}>  </button>
            <button style={{ backgroundColor:"green", height: "100%", width:"15%"}}>  </button>
            <button style={{ backgroundColor:"orange", height: "100%", width:"15%"}}>  </button>
            <button style={{ backgroundColor:"white", height: "100%", width:"15%"}}>  </button>
            <button style={{ backgroundColor:"blue", height: "100%", width:"15%"}}>  </button>
        </div>
    )
  }

  function Linea11() {
    return(
        <div style={{position:"absolute", height:"100%", width:"100%"}}>
            <button style={{ backgroundColor:"blue" , height: "100%", width:"15%"}}>  </button>
            <button style={{ backgroundColor:"white", height: "100%", width:"15%"}}>  </button>
            <button style={{ backgroundColor:"red", height: "100%", width:"15%"}}>  </button>
            <button style={{ backgroundColor:"yellow", height: "100%", width:"15%"}}>  </button>
            <button style={{ backgroundColor:"white", height: "100%", width:"15%"}}>  </button>
            <button style={{ backgroundColor:"orange", height: "100%", width:"15%"}}>  </button>
        </div>
    )
  }

  function Linea12() {
    return(
        <div style={{position:"absolute", height:"100%", width:"100%"}}>
            <button style={{ backgroundColor:"orange" , height: "100%", width:"15%"}}>  </button>
            <button style={{ backgroundColor:"white", height: "100%", width:"15%"}}>  </button>
            <button style={{ backgroundColor:"blue", height: "100%", width:"15%"}}>  </button>
            <button style={{ backgroundColor:"pink", height: "100%", width:"15%"}}>  </button>
            <button style={{ backgroundColor:"white", height: "100%", width:"15%"}}>  </button>
            <button style={{ backgroundColor:"yellow", height: "100%", width:"15%"}}>  </button>
        </div>
    )
  }

  return (
    
    <div className="App">
      <header className="App-headerJuego" style={{zIndex: "1"}}>        
            <div style={{ position: "absolute", zIndex: "2", height:"74%", width:"39%", top:"10%", left:"30.2%"}}>
                <Linea1> </Linea1>
                <div style={{ position:"absolute", left:"16.6%", transform: "rotate(+60deg)", height:"10%", width:"41%", top:"19.7%", zIndex: "1"}}>
                    <Linea2/>
                </div>
                <div style={{ position:"absolute", left:"45.6%", transform: "rotate(+120deg)", height:"10%", width:"41%", top:"19.7%", zIndex: "1"}}>
                    <Linea3/>
                </div>
                <div style={{ position:"absolute", left:"60%", transform: " scaleX(-1)", height:"10%", width:"41%", top:"45%", zIndex: "1"}}>
                    <Linea4/>
                </div>
                <div style={{ position:"absolute", left:"45.6%", transform: "rotate(-120deg)",  height:"10%", width:"41%", top:"70%", zIndex: "1"}}>
                    <Linea5/>
                </div>
                <div style={{ position:"absolute", left:"16.6%", transform: "rotate(-60deg)", height:"10%", width:"41%", top:"70%", zIndex: "1"}}>
                    <Linea6/>
                </div>
                <div style={{ position:"absolute", transform: "rotate(-60deg)", height:"10.5%", width:"37%", left:"-2%", top:"24%", zIndex: "1"}}>
                    <Linea7/>
                </div>
                <div style={{ position:"absolute", left:"33.5%", height:"10.5%", width:"37%", top:"3.5%", zIndex: "1"}}>
                    <Linea8/>
                </div>
                <div style={{ position:"absolute", transform: "rotate(60deg)", left:"68.5%", height:"10.5%", width:"37%", top:"24%", zIndex: "1"}}>
                    <Linea9/>
                </div>
                <div style={{ position:"absolute", transform: "rotate(120deg)", left:"68.5%", height:"10.5%", width:"37%", top:"65.5%", zIndex: "1"}}>
                    <Linea10/>
                </div>
                <div style={{ position:"absolute", transform: "rotate(180deg)", height:"10.5%", width:"37%", left:"33%", top:"85.5%", zIndex: "1"}}>
                    <Linea11/>
                </div>
                <div style={{ position:"absolute", transform: "rotate(-120deg)", height:"10.5%", width:"37%", left:"-2%", top:"65.5%", zIndex: "1"}}>
                    <Linea12/>
                </div>
                
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

        </header>
    </div> 
  );
};

export default Tablero;