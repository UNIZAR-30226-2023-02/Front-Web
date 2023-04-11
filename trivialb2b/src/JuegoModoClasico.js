import React, { useState } from "react";
import './Estilos/App.css';
import { useNavigate } from 'react-router-dom';
import { useSession, setSession } from 'react-session';
import Cristiano from'./Imagenes/Cristiano.jpg';
import Tablero1 from'./Imagenes/Tablero1.png';

//const URL = "https://6e01-146-158-156-138.eu.ngrok.io/api/usuarios/login/";
//const URL = "http://51.142.118.71:8000/api/usuarios/login/";


const JuegoModoClasico = () => {
  const [body, setBody] = useState({ username: "", password: "" });
  const [errores, setErorres] = useState("");
  const [show, setShow] = useState(true);

  const vectorJugadores = ["Acher", "Miguel", "Pablo", "Luis"];

  const navigate = useNavigate();
  const handleChange = (e) => {
    setBody({
      ...body,
      [e.target.name]: e.target.value,
    });
  };

  function jugadores() {
    const i = 4;
    if (i==6) {
        return vectorJugadores.map((elemento, indice) => (
            <div style={{ width: "94%", height: "92%", position: "absolute", zIndex: "3", top:"4%", left:"3%", border:"1px solid black"}}>  
                <div className='App-EsJugador' style={{top: `${(indice % 3) * 30}%`, left:`${(indice % 2) * 80}%`}}>
                    <div>
                        <img src={Cristiano} className="App-imagenQuesito"/>
                        <a style={{color:"white", fontSize:"30px"}}>{elemento} </a>
                        <br></br>
                    </div>
                    <img src={Cristiano} className="App-imagenJugador"/><br></br>
                </div>
            </div>
        ));
    }
    else if (i==4) {
        return vectorJugadores.map((elemento, indice) => (
            <div style={{ width: "94%", height: "92%", position: "absolute", zIndex: "3", top:"4%", left:"3%", border:"1px solid black"}}>  
                <div className='App-EsJugador' style={{top: `${indice * 15}%`, left:`${(indice % 2) * 80}%`}}>
                    <div>
                        <img src={Cristiano} className="App-imagenQuesito"/>
                        <a style={{color:"white", fontSize:"30px"}}>{elemento} </a>
                        <br></br>
                    </div>
                    <img src={Cristiano} className="App-imagenJugador"/><br></br>
                </div>
            </div>
        ));
    }

}   

  return (
    
    <div className="App">
      <header className="App-headerJuego" style={{zIndex: "1"}}>        
            <div style={{ position: "absolute", zIndex: "2", height:"95%", width:"50%", top:"0"}}>
              <img src={Tablero1} style={{height:"100%", width:"100%"}}/> 
            </div> 
            {jugadores()}
        </header>
    </div> 
  );
};

export default JuegoModoClasico;