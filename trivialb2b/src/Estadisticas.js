import React, { useState, useEffect, useRef} from "react";
import './Estilos/App.css';
import { useNavigate } from 'react-router-dom';
import { useSession, setSession } from 'react-session';
import Atras from "./Imagenes/Atras.png";
import Cookies from 'universal-cookie';

let URL = "";

  const Estadisticas = () => {
    const cookies= new Cookies();
    const token = cookies.get('token');
    const usuario_est = cookies.get('estadisticas');
    const pagina = cookies.get('estadisticas_pagina');
    const usuario = cookies.get('tokenUsuario');
    const navigate = useNavigate();
    const flechaAtras = async () => {
      navigate(process.env.PUBLIC_URL + pagina);
    };

    const [geo, setGeo] = useState({total:"", bien:"", mal:"", porcentaje:""});
    const [ayl, setAyl] = useState({total:"", bien:"", mal:"", porcentaje:""});
    const [his, setHis] = useState({total:"", bien:"", mal:"", porcentaje:""});
    const [ent, setEnt] = useState({total:"", bien:"", mal:"", porcentaje:""});
    const [cie, setCie] = useState({total:"", bien:"", mal:"", porcentaje:""});
    const [dep, setDep] = useState({total:"", bien:"", mal:"", porcentaje:""});
    const [est, setEst] = useState({quesitos_totales:"", total_preguntas:"", total_respuestas_correctas: "",total_respuestas_incorrectas: "", porcentaje_respuestas: ""});
    const [partidas, setPartidas] = useState({total:"", victorias:"", derrotas:"", porcentaje:""});

    useEffect(() => {
      if (usuario == usuario_est){
        URL = "http://51.142.118.71:8000/api/usuarios/estadisticas-yo/";
        fetch(URL, {
          method: "POST",
          headers: { "Authorization": "Token " + token, "Content-Type": "application/json" },
        })
          .then((response) => response.json())
          .then((data) => {
          if (data.OK == "True") {
            setGeo({
              total: data.geografia.total,
              bien: data.geografia.bien,
              mal: data.geografia.mal,
              porcentaje: data.geografia.porcentaje,
            })
            setAyl({
              total: data.arte_y_literatura.total,
              bien: data.arte_y_literatura.bien,
              mal: data.arte_y_literatura.mal,
              porcentaje: data.arte_y_literatura.porcentaje,
            })
            setHis({
              total: data.historia.total,
              bien: data.historia.bien,
              mal: data.historia.mal,
              porcentaje: data.historia.porcentaje,
            })
            setEnt({
              total: data.entretenimiento.total,
              bien: data.entretenimiento.bien,
              mal: data.entretenimiento.mal,
              porcentaje: data.entretenimiento.porcentaje,
            })
            setCie({
              total: data.ciencias.total,
              bien: data.ciencias.bien,
              mal: data.ciencias.mal,
              porcentaje: data.ciencias.porcentaje,
            })
            setDep({
              total: data.deportes.total,
              bien: data.deportes.bien,
              mal: data.deportes.mal,
              porcentaje: data.deportes.porcentaje,
            })
            setEst({
              quesitos_totales: data.quesitos_totales,
              total_preguntas: data.total_preguntas,
              total_respuestas_correctas: data.total_respuestas_correctas,
              total_respuestas_incorrectas: data.total_respuestas_incorrectas,
              porcentaje_respuestas: data.porcentaje_respuestas
            })
            setPartidas({
              total: data.total_partidas,
              victorias: data.total_partidas_ganadas,
              derrotas: data.total_partidas_perdidas,
              porcentaje: data.porcentaje_partidas,
            })
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
      }
      else {
        URL = "http://51.142.118.71:8000/api/usuarios/estadisticas-usuario/";
        fetch(URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({"username": usuario_est}),
        })
          .then((response) => response.json())
          .then((data) => {
          if (data.OK == "True") {
            setGeo({
              total: data.geografia.total,
              bien: data.geografia.bien,
              mal: data.geografia.mal,
              porcentaje: data.geografia.porcentaje,
            })
            setAyl({
              total: data.arte_y_literatura.total,
              bien: data.arte_y_literatura.bien,
              mal: data.arte_y_literatura.mal,
              porcentaje: data.arte_y_literatura.porcentaje,
            })
            setHis({
              total: data.historia.total,
              bien: data.historia.bien,
              mal: data.historia.mal,
              porcentaje: data.historia.porcentaje,
            })
            setEnt({
              total: data.entretenimiento.total,
              bien: data.entretenimiento.bien,
              mal: data.entretenimiento.mal,
              porcentaje: data.entretenimiento.porcentaje,
            })
            setCie({
              total: data.ciencias.total,
              bien: data.ciencias.bien,
              mal: data.ciencias.mal,
              porcentaje: data.ciencias.porcentaje,
            })
            setDep({
              total: data.deportes.total,
              bien: data.deportes.bien,
              mal: data.deportes.mal,
              porcentaje: data.deportes.porcentaje,
            })
            setEst({
              quesitos_totales: data.quesitos_totales,
              total_preguntas: data.total_preguntas,
              total_respuestas_correctas: data.total_respuestas_correctas,
              total_respuestas_incorrectas: data.total_respuestas_incorrectas,
              porcentaje_respuestas: data.porcentaje_respuestas
            })
            setPartidas({
              total: data.total_partidas,
              victorias: data.total_partidas_ganadasl,
              derrotas: data.total_partidas_perdidas,
              porcentaje: data.porcentaje_partidas,
            })
          }
            
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
      }
    },[]);

    function Tema(props) {
      return (    
      <div className="App-CuadradoNegro" style={{ width: "45%", height: "25%", position: "absolute", top: props.top, left: props.left, border: "2px solid white"}}>  
        <div className="App-CuadradoNegro" style={{ width: "99%", height: "25%", position: "absolute", top: "-1.5%", left: "0%", borderRadius: "100px 100px 0px 0px", border: "2px solid white", backgroundColor:props.color, textAlign:"center"}}>
          <a  style= {{ color: "white", fontSize: "30px", fontStyle: "italic"}}> {props.tema} </a>
        </div>
        <a  style= {{ color: "white", fontSize: "20px", fontStyle: "italic" ,position: "absolute", top: "30%", left: "10%"}}> Respuestas <font color="green">acertadas</font>: {props.aciertos} </a>

        <a  style= {{ color: "white", fontSize: "20px", fontStyle: "italic" ,position: "absolute", top: "50%", left: "10%"}}> Respuestas <font color="red">falladas</font>: {props.fallos} </a>
        <br></br>
        <a  style= {{ color: "white", fontSize: "20px", fontStyle: "italic" ,position: "absolute", top: "70%", left: "15%"}}> Porcentajes de acierto: {props.porcentaje}% </a>
      </div>
      );
    }
  
    return (
      <div className="App">
        <div className="App-CuadradoNegro" style={{ width: "850px", height: "600px", position: "absolute", top: "25%", left: "5%", border: "2px solid white"}}>
          <Tema top="5%" left="2%" tema="Geografia" color="blue" aciertos={geo.bien} fallos={geo.mal} porcentaje={geo.porcentaje}/>
          <Tema top="5%" left="52%" tema="Ciencia y naturaleza" color="green" aciertos={cie.bien} fallos={cie.mal} porcentaje={cie.porcentaje}/>
          <Tema top="35%" left="2%" tema="Historia" color="#a0a856" aciertos={his.bien} fallos={his.mal} porcentaje={his.porcentaje}/>
          <Tema top="35%" left="52%" tema="Entrtenimiento" color="rgb(226, 4, 255)" aciertos={ent.bien} fallos={ent.mal} porcentaje={ent.porcentaje}/>
          <Tema top="65%" left="2%" tema="Deporte" color="rgb(236, 134, 1)" aciertos={dep.bien} fallos={dep.mal} porcentaje={dep.porcentaje}/>
          <Tema top="65%" left="52%" tema="Arte y Literatura" color="Red" aciertos={ayl.bien} fallos={ayl.mal} porcentaje={ayl.porcentaje}/>
        </div>

        <div className="App-CuadradoNegro" style={{ width: "840px", height: "600px", position: "absolute", top: "25%", left: "51%", background: "none"}}>

            <div className="App-CuadradoNegro" style={{ width: "50%", height: "100%", position: "absolute", top: "-0.3%", left: "-0.1%", borderRadius: "50px 50px 50px 50px", border: "2px solid white", textAlign:"center"}}>
                <div style={{marginTop:"10%"}}>
                  <a  style= {{ color: "white", fontSize: "30px", fontStyle: "italic"}}> Total de preguntas <br></br>{est.total_preguntas} </a>
                </div>
              <div className="App-CuadradoNegro" style={{ width: "200px", height: "200px", position: "absolute", top: "30%", left: "25%", borderRadius: "50%", border: "2px solid white", backgroundColor:"gray", zIndex:"1"}}>
                <a  style= {{ color: "white", fontSize: "30px", fontStyle: "italic" , position: "absolute", top: "25%", left: "25%"}}> Aciertos <br></br>{est.porcentaje_respuestas}% </a>
              </div>
              <div className="App-CuadradoNegro" style={{ width: "50%", height: "50%", position: "absolute", top: "50%", left: "-0.2%", borderRadius: "0px 0px 0px 50px", border: "2px solid white", backgroundColor:"green"}}>
                <a  style= {{ color: "white", fontSize: "30px", fontStyle: "italic", position: "absolute", top: "30%", left: "-5%"}}> Total de respuestas correctas <br></br>{est.total_respuestas_correctas} </a>
              </div>
              <div className="App-CuadradoNegro" style={{ width: "50%", height: "50%", position: "absolute", top: "50%", left: "50%", borderRadius: "0px 0px 50px 0px", border: "2px solid white", backgroundColor:"red"}}>
                <a  style= {{ color: "white", fontSize: "30px", fontStyle: "italic", position: "absolute", top: "30%", left: "5%"}}> Total de respuestas incorrectas <br></br>{est.total_respuestas_incorrectas} </a>
              </div>
            </div>

              <div className="App-CuadradoNegro" style={{ width: "50%", height: "100%", position: "absolute", top: "-0.3%", left: "50%", borderRadius: "50px 50px 50px 50px", border: "2px solid white", textAlign:"center"}}>
                  <div style={{marginTop:"10%"}}>
                    <a  style= {{ color: "white", fontSize: "30px", fontStyle: "italic"}}> Total de partidas jugadas <br></br>{partidas.total} </a>
                  </div>    
                <div className="App-CuadradoNegro" style={{ width: "200px", height: "200px", position: "absolute", top: "30%", left: "25%", borderRadius: "50%", border: "2px solid white", backgroundColor:"gray", zIndex:"1"}}>
                  <a  style= {{ color: "white", fontSize: "30px", fontStyle: "italic" , position: "absolute", top: "25%", left: "25%"}}> Victorias <br></br>{partidas.porcentaje}% </a>
                </div>
                <div className="App-CuadradoNegro" style={{ width: "50%", height: "50%", position: "absolute", top: "50%", left: "-0.2%", borderRadius: "0px 0px 0px 50px", border: "2px solid white", backgroundColor:"green"}}>
                  <a  style= {{ color: "white", fontSize: "30px", fontStyle: "italic", position: "absolute", top: "30%", left: "22%"}}> Total de <br></br> victorias <br></br>{partidas.victorias} </a>
                </div>
                <div className="App-CuadradoNegro" style={{ width: "50%", height: "50%", position: "absolute", top: "50%", left: "50%", borderRadius: "0px 0px 50px 0px", border: "2px solid white", backgroundColor:"red"}}>
                  <a  style= {{ color: "white", fontSize: "30px", fontStyle: "italic", position: "absolute", top: "30%", left: "5%"}}> Total de derrotas <br></br>{partidas.derrotas} </a>
                </div>
              </div>

        </div>
        <img src={Atras} style={{width:"150px", height:"150px", top:"5%", left:"5%", cursor: "pointer", position: "absolute"}} onClick={() => flechaAtras()}/>
        <div className = "App-header" > 
            <div className="App-titulo" style= {{top: "7%"}} > Estadisticas
                <div className="App-Quesitos" style= {{left: "35%"}}> </div> 
            </div>
        </div>

        
      </div>
    );
  };
  

export default Estadisticas;