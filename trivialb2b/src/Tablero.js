import React, { useState, useEffect, useRef } from "react";
import './Estilos/App.css';
import './Estilos/Estilo.css';
import { useNavigate } from 'react-router-dom';
import { useSession, setSession } from 'react-session';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
//npm install react-countdown-circle-timer

import Cristiano from'./Imagenes/Cristiano.jpg';
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

import Cruz from './Imagenes/Cruz.png';
import ChatImg from './Imagenes/Chat.png';
import B2B from './Imagenes/Logo.png';
import Quesitos from './Imagenes/CrearPartida.png';

//const URL = "https://6e01-146-158-156-138.eu.ngrok.io/api/usuarios/login/";
const URL = "http://51.142.118.71:8000/";
//const URL = "http://85be-146-158-156-138.ngrok-free.app/";




const Tablero = () => {
    const navigate = useNavigate();
  const [body, setBody] = useState({ username: "", password: "" });
  const [errores, setErorres] = useState("");
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);

  const [cubeStyle, setCubeStyle] = useState({
    transform: 'translateY(400px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)'
  });
  const time = 4;


  const f1 = () => {
    setCubeStyle({
      ...cubeStyle,
      transition: '',
      transform: 'translateY(400px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)'
    });

    setTimeout(() => {
      setCubeStyle({
        ...cubeStyle,
        transition: `transform ${time}s` });

      const randomValue = Math.floor((Math.random() * 6) + 1);
      console.log(`randomValue: ${randomValue}`);

      switch(randomValue) {
        case 1:
          setCubeStyle({
            ...cubeStyle,
            transform: 'translateY(400px) rotateX(3600deg) rotateY(3600deg) rotateZ(3600deg)'
          });
          break;
        case 2:
          setCubeStyle({
            ...cubeStyle,
            transform: 'translateY(400px) rotateX(4410deg) rotateY(3600deg) rotateZ(3600deg)'
          });
          break;
        case 3:
          setCubeStyle({
            ...cubeStyle,
            transform: 'translateY(400px) rotateX(3600deg) rotateY(4410deg) rotateZ(3600deg)'
          });
          break;
        case 4:
          setCubeStyle({
            ...cubeStyle,
            transform: 'translateY(400px) rotateX(3600deg) rotateY(2430deg) rotateZ(3600deg)'
          });
          break;
        case 5:
          setCubeStyle({
            ...cubeStyle,
            transform: 'translateY(400px) rotateX(2430deg) rotateY(3600deg) rotateZ(3600deg)'
          });
          break;
        case 6:
          setCubeStyle({
            ...cubeStyle,
            transform: 'translateY(400px) rotateX(3600deg) rotateY(1980deg) rotateZ(3600deg)'
          });
          break;
      };
    }, time * 10);
  }

  const vectorJugadores = [{nombre:"Jugador1", queso:Queso_azul, turno:true}, {nombre:"Jugador2", queso:Queso_rojo, turno:false}, {nombre:"Jugador3", queso:Queso_verde, turno:false}, {nombre:"Jugador4", queso:Queso_naranja, turno:false}, {nombre:"Jugador5", queso:Queso_amarillo, turno:false}, {nombre:"Jugador6", queso:Queso_rosa, turno:false}];
  /**const vectorJugadores4 = [{nombre:"Jugador1", queso:Queso_azul}, {nombre:"Jugador2", queso:Queso_rojo}, {nombre:"Jugador3", queso:Queso_verde}, {nombre:"Jugador4", queso:Queso_verde}];
  const vectorJugadores2 = [{nombre:"Jugador1", queso:Queso_azul}, {nombre:"Jugador2", queso:Queso_verde}];*/


  const vectorPregunta = [{nombre:"Pregunta", texto:"¿Que año estamos?"}, {nombre:"Respuesta1", texto:"2001", respuesta:false}, {nombre:"Respuesta2", texto:"2011", respuesta:false}, {nombre:"Respuesta3", texto:"2021", respuesta:false}, {nombre:"Respuesta4", texto:"2022", respuesta:true}];

  

  const vector1 = [];
  const vector2 = [];

  const numJugadores = vectorJugadores.length;
  

    for( let j=0; j < numJugadores; j++) {
        if(j < (numJugadores/2)) {
            vector1[j]=vectorJugadores[j];
        }
        else {
            vector2[j]=vectorJugadores[j];
            
        }
    }
    const [isRunning, setIsRunning] = useState(true);
    
    const RelojJugada = () => {
        return (    
        <div>
            <CountdownCircleTimer
                isPlaying={isRunning}
                duration={7}
                colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                colorsTime={[7, 5, 2, 0]}
                size={100}
    
                onComplete={() => {console.log("La cuenta regresiva ha finalizado");
                                 // Detiene el reloj
            }}
            >
                {({ remainingTime }) => remainingTime}
            </CountdownCircleTimer>
        </div>
        );
    };

    const RelojRespuesta = () => {
        return (    
        <div>
            <CountdownCircleTimer
                isPlaying={isRunning}
                duration={7}
                colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                colorsTime={[7, 5, 2, 0]}
                size={100}
    
                onComplete={() => {console.log("La cuenta regresiva ha finalizado");
                                 // Detiene el reloj
            }}
            >
                {({ remainingTime }) => remainingTime}
            </CountdownCircleTimer>
        </div>
        );
    };

    const RelojPausa = () => {
        return (    
        <div>
            <CountdownCircleTimer
                isPlaying={isRunning}
                duration={7}
                colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                colorsTime={[7, 5, 2, 0]}
                size={100}
    
                onComplete={() => {console.log("La cuenta regresiva ha finalizado");
                                 // Detiene el reloj
            }}
            >
                {({ remainingTime }) => remainingTime}
            </CountdownCircleTimer>
        </div>
        );
    };


    const roomName= "pepe3";
    const [chatLog, setChatLog] = useState('');
    const [messageInput, setMessageInput] = useState('');
    const chatLogRef = useRef(null);
    const chatSocketRef = useRef(null);
    
    useEffect(() => {
      chatSocketRef.current = new WebSocket(
        `ws://51.142.118.71:3000/ws/chat/${roomName}/`
      );
  
      chatSocketRef.current.onmessage = function(event) {
        const data = JSON.parse(event.data);
        setChatLog(prevChatLog => prevChatLog + data.message + '\n');
      };

      chatSocketRef.current.onerror = function(event) {
        console.error('Chat socket error:', event);
      };
      
  
      chatSocketRef.current.onclose = function(event) {
        console.error('Chat socket closed unexpectedly');
      };
  
      return () => {
        chatSocketRef.current.close();
      };
    }, [roomName]);
    
  
    function handleMessageInputChange(event) {
      setMessageInput(event.target.value);
    }
  
    function handleChatMessageSubmit() {
      const message = messageInput.trim();
      if (message) {
        chatSocketRef.current.send(JSON.stringify({ message }));
        setMessageInput('');
      }
    }
    function handleKeyPress(event) {
        if (event.key === 'Enter') {
          handleChatMessageSubmit();
        }
    }


  function Chat() {
    return (      
    <div style={{position:"absolute", top:"0%", left:"75%", width:"24.8%", height:"100%", zIndex:"5", backgroundColor:"white",borderRadius:"0px 0px 0px 30px"}}>
        <a style={{color:"black", fontSize:"30px"}}> CHAT </a>
        <img style={{ position:"absolute", left:"3%", height:"30px", width:"30px", top:"1%", zIndex: "5", cursor:"pointer"}} src={Cruz}onClick={() => { setShow3(false)}}/>
        <textarea
        style={{position:"absolute", top:"5%", left:"0%", width:"99%", height:"90%"}}
        ref={chatLogRef}
        id="chat-log"
        cols="100"
        rows="20"
        value={chatLog}
        readOnly
        />
        <input
        id="chat-message-input"
        type="text"
        size="100"
        value={messageInput}
        onChange={handleMessageInputChange}
        onKeyPress={handleKeyPress}
        style={{position:"absolute", top:"90.2%", left:"0%", width:"99%", height:"9%", border:" 2px solid black", borderRadius:"0px 0px 0px 30px", fontSize:"30px"}}
        />
        <button id="chat-message-submit" onClick={handleChatMessageSubmit} className="App-botonSinS" style={{position:"absolute", top:"90.4%", left:"75%", fontSize:"30px", width:"25%", height:"9.3%", borderRadius:"0px 0px 0px 0px"}}>
        Enviar
        </button>
    </div>
  );
  }

    function Dado() {
        return (
        <div className="container">
            <div className="cube"   style={{transform:cubeStyle.transform ,transition:cubeStyle.transition}}>
                <div className="cube-face front">
                    <div className="inside">
                        <span className="dot"></span>
                    </div>
                </div>
                <div className="cube-face back">
                    <div className="inside">
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </div>
                </div>
                <div className="cube-face left">
                    <div className="inside">
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </div>
                </div>
                <div className="cube-face right">
                    <div className="inside">
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </div>
                </div>
                <div className="cube-face top">
                    <div className="inside">
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </div>
                </div>
                <div className="cube-face bottom">
                    <div className="inside">
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </div>
                </div>
            </div>
        </div>

        )
    }

    //Jugador1[5,22], Jugador2[33, 22], Jugador3[60.5, 22], Jugador4[5, 69], Jugador5[33, 69], Jugador6[60.5, 69]
  function posicionElementos () {
    return (
        <div style={{ position:"absolute", top:"5%", left:"22%", height:"26.5%", width:"9%"}}>
            <div style={{position:"absolute", left:"19%", top:"5%"}}>
                {RelojJugada()}
            </div >
            <div style={{position:"absolute", left:"26%",top:"-100%", cursor:"pointer", zIndex:"5"}} onClick={() => f1() &&  setIsRunning(false)}>
                <Dado/>
            </div>
        </div>
    )
  }
  

  function jugadores1() {
    return vector1.map((elemento, indice) => ( 
        <div style={{ width: "94%", height: "92%", position: "absolute", zIndex: "3", top:"4%", left:"3%"}} key={indice}>  
            <div className='App-EsJugador' style={{top: `${(indice % 3) * 30}%`, left:"0%", width: "30%", height: "30%"}} >
                <div style={{marginTop: "2%"}}>
                    <img src={elemento.queso} className="App-imagenQuesito" style={{marginRight:"2%"}}/>
                        <a style={{color:"white", fontSize:"30px"}}>{elemento.nombre} </a>
                    <br></br>
                </div>
                <div style={{marginTop:"3%"}}>
                    <img src={Cristiano} className="App-imagenJugador" style={{width: "25%", height: "60%", position: "absolute", top:"25%", left:"5%"}} /><br></br>
                    <img src={Quesitos} className="App-imagenJugador" style={{ width: "25%", height: "50%", position: "absolute", top:"25%", left:"40%", backgroundColor:"none"}}/><br></br>
                </div>
            </div>
        </div>
    ));
  }  

  function jugadores2() {
    return vector2.map((elemento, indice) => ( 
        <div style={{ width: "94%", height: "92%", position: "absolute", zIndex: "3", top:"4%", left:"3%"}} key={indice}>  
            <div className='App-EsJugador' style={{top: `${(indice % 3) * 30}%`, left:"70%", width: "30%", height: "30%"}} >
                <div style={{marginTop: "2%"}}>
                    <img src={elemento.queso} className="App-imagenQuesito" style={{marginRight:"2%"}}/>
                        <a style={{color:"white", fontSize:"30px"}}>{elemento.nombre} </a>
                    <br></br>
                </div>
                <div style={{marginTop:"3%"}}>
                    <img src={Cristiano} className="App-imagenJugador" style={{width: "25%", height: "60%", position: "absolute", top:"25%", left:"70%"}} /><br></br>
                    <img src={Quesitos} className="App-imagenJugador" style={{ width: "25%", height: "50%", position: "absolute", top:"25%", left:"35%", backgroundColor:"none"}}/><br></br>
                </div>
            </div>
        </div>
    ));
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
    );
    }


    function Respuesta(props) {
        return (
        <div  style= {{width:props.width, height:props.height, top: props.top, left: props.left, position:"absolute", border: "3px solid black", borderRadius:props.border, backgroundColor:props.color}}>
            <div style={{marginTop:props.marginTop}}>
                <a style={{fontSize:props.size}}>
                    {props.letra} {props.respuesta}
                </a>
            </div>
        </div>
        );
    }
    

  return (
    
    <div className="App">
      <header className="App-headerJuego" style={{zIndex: "1"}}>        
            <div style={{ position: "absolute", zIndex: "2", height:"700px", width:"700px", top:"10%", left:"30.2%"}}>

                <Linea height="10%" width="41%" top="35%" left="4%" c1="white" c2="yellow" c3="pink" c4="orange" c5="blue" c6="green" width1="25%" transform="0"/>
                <Linea height="10%" width="41%" top="9.7%" left="18.6%" c1="white" c2="pink" c3="green" c4="yellow" c5="orange" c6="red" width1="25%" transform="rotate(+60deg)"/> 
                <Linea height="10%" width="41%" top="9.7%" left="47.6%" c1="white" c2="green" c3="red" c4="pink" c5="yellow" c6="blue" width1="25%" transform="rotate(+120deg)"/> 
                <Linea height="10%" width="41%" top="35%" left="62%" c1="white" c2="red" c3="blue" c4="green" c5="pink" c6="orange" width1="25%" transform="scaleX(-1)"/>  
                <Linea height="10%" width="41%" top="60%" left="47.6%" c1="white" c2="blue" c3="orange" c4="red" c5="green" c6="yellow" width1="25%" transform="rotate(-120deg)"/> 
                <Linea height="10%" width="41%" top="60%" left="18.6%" c1="white" c2="orange" c3="yellow" c4="blue" c5="red" c6="pink" width1="25%" transform="rotate(-60deg)"/> 
                <Linea height="10.5%" width="37%" top="14%" left="0%" c1="yellow" c2="white" c3="orange" c4="green" c5="white" c6="pink" width1="15%" transform="rotate(-60deg)"/>  
                <Linea height="10.5%" width="37%" top="-6.5%" left="35.5%" c1="pink" c2="white" c3="yellow" c4="red" c5="white" c6="green" width1="15%" transform=""/>  
                <Linea height="10.5%" width="37%" top="14%" left="70.5%" c1="green" c2="white" c3="pink" c4="blue" c5="white" c6="red" width1="15%" transform="rotate(60deg)"/>  
                <Linea height="10.5%" width="37%" top="55.5%" left="70.5%" c1="red" c2="white" c3="green" c4="orange" c5="white" c6="blue" width1="15%" transform="rotate(120deg)"/>  
                <Linea height="10.5%" width="37%" top="75.5%" left="35%" c1="blue" c2="white" c3="red" c4="yellow" c5="white" c6="orange" width1="15%" transform="rotate(180deg)"/>  
                <Linea height="10.5%" width="37%" top="55.5%" left="0%" c1="orange" c2="white" c3="blue" c4="pink" c5="white" c6="yellow" width1="15%" transform="rotate(-120deg)"/>  
            
                <img style={{ position:"absolute", transform: "rotate(-2deg)", left:"4.9%", height:"41%", width:"53%", top:"-19.2%", zIndex: "2"}} src={Esquina_azul}/>
                <img style={{ position:"absolute", transform: "rotate(+62deg)", left:"51%", height:"41%", width:"50%", top:"-18.89%", zIndex: "2"}} src={Esquina_naranja}/>
                <img style={{ position:"absolute", transform: "rotate(+122deg)", left:"73.2%", height:"41%", width:"50%", top:"20%", zIndex: "2"}} src={Esquina_amarilla}/>
                <img style={{ position:"absolute", transform: "rotate(-179deg)", left:"50.9%", height:"41%", width:"50%", top:"57.8%", zIndex: "2"}} src={Esquina_rosa}/>
                <img style={{ position:"absolute", transform: "rotate(241deg)", left:"6%", height:"41%", width:"50%", top:"57.8%", zIndex: "2"}} src={Esquina_verde}/>
                <img style={{ position:"absolute", transform: "rotate(302deg)", left:"-15.7%", height:"41%", width:"50%", top:"19%", zIndex: "2"}} src={Esquina_roja}/>
                
                <img style={{ position:"absolute", left:"59%", height:"3%", width:"3%", top:"38%", zIndex: "3"}} src={Ficha_amarilla}/>
                <img style={{ position:"absolute", left:"45%", height:"3%", width:"3%", top:"38%", zIndex: "3"}} src={Ficha_roja}/>
                <img style={{ position:"absolute", left:"48%", height:"3%", width:"3%", top:"33%", zIndex: "3"}} src={Ficha_azul}/>
                <img style={{ position:"absolute", left:"56%", height:"3%", width:"3%", top:"44%", zIndex: "3"}} src={Ficha_rosa}/>
                <img style={{ position:"absolute", left:"48%", height:"3%", width:"3%", top:"44%", zIndex: "3"}} src={Ficha_verde}/>
                <img style={{ position:"absolute", left:"56%", height:"3%", width:"3%", top:"33%", zIndex: "3"}} src={Ficha_naranja}/>

                <div  style={{width:"17%", height:"20%", left:"44.8%", top:"29.6%", position:"absolute", border:"2px solid black", backgroundColor:"white", zIndex: "0"}}>
                    <img src={B2B} style={{width:"70%",marginTop:"24%"}}/>
                </div>
            </div>
            {posicionElementos()}
            {jugadores1()}
            {jugadores2()}
            <button className="App-boton" style= {{top: "87%", left: "30%", position:"absolute", zIndex:"6"}} onClick={() => { setShow1(!show1)}}>
                Pausar Partida
            </button>
            <button className="App-boton" style= {{top: "87%", left: "53%", position:"absolute", zIndex:"6"}} onClick={() => { setShow2(!show2)}}>
                Abandonar Partida
            </button>
            <img style={{ position:"absolute", left:"93%", height:"80px", width:"110px", top:"1%", zIndex: "4", cursor:"pointer"}} src={ChatImg}onClick={() => { setShow3(true)}}/>
            {show ? (
            <div className="App-CuadradoBlanco"  style= {{width:"70%", height:"70%", top: "10%", left: "15%", position:"absolute", borderRadius: "40px 40px 0px 0px", zIndex:"6", borderRadius:"50%"}}>
                <Respuesta width="100%" height="12%" left="-0.2%" top="-0.5%" size="50px"respuesta="Entretenimiento" border= "40px 40px 0px 0px" marginTop="0%" color="orange"/>
                <Respuesta width="100%" height="12%" left="-0.2%" top="12%" size="30px" respuesta={vectorPregunta[0].texto} border= "0px 0px 0px 0px" marginTop="1.2%" color="orange"/>
                <Respuesta width="70%" height="19%" left="-0.2%" top="24%" letra="A)" size="30px" respuesta={vectorPregunta[1].texto} border= "0px 0px 0px 0px" marginTop="4%" color="white"/>
                <Respuesta width="70%" height="19%" left="-0.2%" top="43%" letra="B)" size="30px" respuesta={vectorPregunta[2].texto} border= "0px 0px 0px 0px" marginTop="4%" color="white"/>
                <Respuesta width="70%" height="19%" left="-0.2%" top="62%" letra="C)" size="30px" respuesta={vectorPregunta[3].texto} border= "0px 0px 0px 0px" marginTop="4%" color="white"/>
                <Respuesta width="70%" height="19%" left="-0.2%" top="81%"letra="D)" size="30px" respuesta={vectorPregunta[4].texto} border= "0px 0px 0px 0px"marginTop="4%" color="white"/>

                <div  style= {{width:"30%", height:"76%", top: "24%", left: "70%", position:"absolute",  border: "3px solid black", backgroundColor:"orange"}}>
                    <br></br><br></br><br></br>
                        <a style={{fontSize:"30px"}}>
                        Tiempo para responder
                    </a>
                    <div style={{top: "40%", left: "32%", position:"absolute", colorText:"white"}}>
                        {RelojRespuesta()}
                    </div>
                </div>
            </div>
            ) : (
                
                <div/>
            )}

            {show1 ? (
            <div className="App-CuadradoNegro"  style= {{width:"40%", height:"55%", top: "20%", left: "30%", position:"absolute", zIndex:"6"}}>
                <br></br>
                <br></br>
                <a style={{color:"white",fontSize:"40px"}}>
                    Partida Pausada
                </a>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <a style={{color:"white",fontSize:"25px"}}>
                Pulsa el botón para reanudar la partida, antes de que se acabe le tiempo, si no abandonarás la partida.
                </a>
                <div style= {{top: "50%", left: "44%", position:"absolute"}}>
                    {RelojPausa()}
                </div>
                <button className="App-boton" style= {{top: "80%", left: "33%", position:"absolute", fontSize:"30px"}} onClick={() => { setShow1(!show1)}}>
                    Reanudar Partida
                </button>
            </div>
            ) : (
            <div/>
            )}

            {show2 ? (
            <div className="App-CuadradoNegro"  style= {{width:"35%", height:"40%", top: "25%", left: "32.5%", position:"absolute", zIndex:"6", backgroundColor: "#000000"}}>
                <br></br>
                <br></br>
                <br></br>
                <a style={{color:"white",fontSize:"30px"}}>
                ¿Estas seguro de que quieres abandonar la partida?
                </a>
                <button className="App-botonCancelar" style= {{width:"20%", height:"15%",top: "70%", left: "25%", position:"absolute", fontSize:"30px"}} onClick={() => { setShow2(!show2)}}>
                    No
                </button>
                <button className="App-botonConfirmar" style= {{width:"20%", height:"15%",top: "70%", left: "55%", position:"absolute", fontSize:"30px"}} onClick={() => { setShow(!show)}}>
                    Si
                </button>
            </div>
            ) : (
            <div/>
            )}

            {show3 ? (
            <Chat/>
            ) : (
            <div/>
            )}

        </header>
    </div> 
  );
};
export default Tablero;