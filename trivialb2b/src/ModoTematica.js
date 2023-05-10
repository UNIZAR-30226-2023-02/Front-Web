import React, { useState } from "react";
import './Estilos/App.css';
import { useNavigate } from 'react-router-dom';
import Cruz from './Imagenes/Cruz.png';
import InfiniteScroll from 'react-infinite-scroll-component'


//const URL = "https://6e01-146-158-156-138.eu.ngrok.io/api/usuarios/login/";
const URL = "http://51.142.118.71:8000/api/usuarios/login/";



const ModoTematica = () => {
  const [show, setShow] = useState(true)
  const [mes, setMes] = useState({username: "", mensaje: "" })
  const [body, setBody] = useState([{ username: "Vini", mensaje: "Soy malisimooooo asdfkj asdkfj asdkfjas asdjhf asdf huasd fiuhas dfhas dfiuhas dfkhjasdiu fhsakdufh uasipu dfh sdfakjbfas " },{ username: "Vini", mensaje: "Soy malisimo" },{ username: "Vini", mensaje: "Soy malisimo" }]);

  const handleChange = (e) => {
    setMes({
      [e.target.id]: e.target.value,
    });
      //mes.username =  "vini",
      //body.push(mes)
  };

  function enviarMensaje () {
    mes.username =  "vini"
    console.log(mes)
    console.log(body)
    body.push(mes)
    setBody(body)
    console.log(body)
    mes.mensaje = ""
    setShow(false)  
    setShow(true)  
  }

  function mensage_chat() {
    return body.map((msg) => (
      <div style={{position: "relative",background:"lightblue",height:"min-content",width:"97%",wordWrap: "break-word", marginTop:"10px", marginLeft:"5px",borderRadius:"30px 30px 30px 30px", textAlign:""}}>
        <a style={{color:"black", fontSize:"18px", marginLeft:"20px", fontWeight:"bold"}} >{msg.username}:</a> <a style={{color:"black", fontSize:"15px"}} >{msg.mensaje}</a>
      </div>
    ));
  }
  return (
    <div className="App">
      <div className = "App-header" > 
        <div className="App-titulo"  style= {{top: "7%"}}> ModoTematica
          <div className="App-Quesitos"> </div> 
        </div>
        {show ? (
          <div style={{position:"absolute", top:"0%", left:"75.2%", width:"24.8%", height:"100%", zIndex:"5", backgroundColor:"rgb(62, 108, 133)",borderRadius:"0px 0px 0px 30px"}}>
          <a style={{color:"black", fontSize:"30px"}}> CHAT {body.length}</a>
          <img style={{ position:"absolute", left:"3%", height:"30px", width:"30px", top:"1%", zIndex: "5", cursor:"pointer"}} src={Cruz}/>
          <InfiniteScroll
            
            dataLength={body.length}
            pageStart={0}
            loadMore={mensage_chat}
            hasMore={true || false}
            useWindow={false}
            style={{position:"absolute", width: "83%", height: "80%", top:"7%", left:"10%", backgroundColor:"rgb(200, 230, 247)", border:"1px solid black", borderRadius:"30px 30px 30px 30px"}}
          >
            {mensage_chat()}            
          </InfiniteScroll>
          <input
          type="text"
          size="100"
          name="mensaje"
          id="mensaje"
          onChange={handleChange}
          style={{position:"absolute", top:"90.2%", left:"0%", width:"98%", height:"9%", border:" 2px solid black", borderRadius:"0px 0px 0px 30px", fontSize:"30px", font:"black", backgroundColor:"rgb(200, 230, 247)"}}
          />
          <button id="chat-message-submit"  className="App-botonSinS" style={{position:"absolute", top:"90.4%", left:"75.1%", fontSize:"30px", width:"25%", height:"9.3%", borderRadius:"0px 0px 0px 0px", backgroundColor:"#3f3f3f",color:"white"}} onClick={enviarMensaje}>
          Enviar
          </button>
        </div>
        ) : (
          <div/>
        )}
        
      </div>
    </div>
  );
};

export default ModoTematica;
