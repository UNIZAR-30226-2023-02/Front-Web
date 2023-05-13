import React, { useState, useEffect, useRef} from "react";
import './Estilos/App.css';
import { useNavigate } from 'react-router-dom';
import { useSession, setSession } from 'react-session';
import Atras from "./Imagenes/Atras.png";
import Cookies from 'universal-cookie';

//const URL = "https://6e01-146-158-156-138.eu.ngrok.io/api/usuarios/login/";
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

    useEffect(() => {
      if (usuario == usuario_est){
        URL = "http://51.142.118.71:8000/api/usuarios/estadisticas-yo/";
        fetch(URL, {
          method: "POST",
          headers: { "Authorization": "Token " + token, "Content-Type": "application/json" },
        })
          .then((response) => response.json())
          .then((data) => {console.log(data)
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
          .then((data) => {console.log(data)
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


        <div className="App-CuadradoNegro" style={{ width: "850px", height: "600px", position: "absolute", top: "25%", left: "50%", border: "2px solid white"}}>

          <div className="App-CuadradoNegro" style={{ width: "100%", height: "50%", position: "absolute", top: "-0.3%", left: "-0.2%", borderRadius: "50px 50px 0px 0px", border: "2px solid white", textAlign:"center"}}>
            <a  style= {{ color: "white", fontSize: "50px", fontStyle: "italic"}}> Total de preguntas <br></br>{est.total_preguntas} </a>
          </div>
          <div className="App-CuadradoNegro" style={{ width: "260px", height: "260px", position: "absolute", top: "27%", left: "35%", borderRadius: "50%", border: "2px solid white", backgroundColor:"gray", zIndex:"1"}}>
            <a  style= {{ color: "white", fontSize: "50px", fontStyle: "italic" , position: "absolute", top: "25%", left: "17%"}}> Aciertos <br></br>{est.porcentaje_respuestas}% </a>
          </div>
          <div className="App-CuadradoNegro" style={{ width: "50%", height: "50%", position: "absolute", top: "50%", left: "-0.2%", borderRadius: "0px 0px 0px 50px", border: "2px solid white", backgroundColor:"green"}}>
            <a  style= {{ color: "white", fontSize: "40px", fontStyle: "italic", position: "absolute", top: "30%", left: "-5%"}}> Total de respuestas correctas <br></br>{est.total_respuestas_correctas} </a>
          </div>
          <div className="App-CuadradoNegro" style={{ width: "50%", height: "50%", position: "absolute", top: "50%", left: "50%", borderRadius: "0px 0px 50px 0px", border: "2px solid white", backgroundColor:"red"}}>
          <a  style= {{ color: "white", fontSize: "40px", fontStyle: "italic", position: "absolute", top: "30%", left: "15%"}}> Total de respuestas incorrectas <br></br>{est.total_respuestas_incorrectas} </a>
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