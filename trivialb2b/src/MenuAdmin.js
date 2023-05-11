import React, { useState, useEffect } from "react";
import './Estilos/App.css';
import { useNavigate } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component'
import Cookies from 'universal-cookie';
import CrearPartida from "./Imagenes/CrearPartida.png";

const URL1 = "http://51.142.118.71:8000/api/admin/preguntas/lista/";
const URL2 = "http://51.142.118.71:8000/api/admin/preguntas/add/";
const URL3 = "http://51.142.118.71:8000/api/admin/preguntas/info/";
const URL4 = "http://51.142.118.71:8000/api/admin/preguntas/delete/";

function Cuadro(props) {
  return (
    <div>
      <a style={{position: "absolute", top: "22%", left: "7%", color:"white", fontSize:"27px"}}> {props.text}  </a>
      <input className="App-textoNegro"
        label={props.label}
        name={props.name}
        value={props.value}
        onChange={props.funcion}
        style={{ width: "70%", height: "9%", position: "absolute", top: "20%", left: "17%", fontSize:"20px", borderRadius: "10px 10px 10px 10px"}}
      />
    </div>
  )
}


const MenuAdmin = () => {

  const [nuevaP, setNuevaP] = useState({enunciado: "", r1: "", r2: "", r3:"", r4:"",rc:"",categoria:""});

  const [pregunta, setPregunta] = useState({id:"", enunciado: "", r1: "", r2: "", r3:"", r4:"",rc:"",categoria:""});
  const [errores, setErroes] = useState();
  const [listadoPregunta, setListadoPregunta] = useState([]);

  const [showRecarga, setShowRecarga] = useState(true);
  const [showCerrarSesion, setShowCerrarSesion] = useState(false);
  const [showEliminar, setShowEliminar] = useState(false);
  const [showEditar, setShowEditar] = useState(false);
  const [showAñadir, setShowAñadir] = useState(false);
  const [showPregunta, setShowPregunta] = useState(false);


  const cookies= new Cookies();
  const token = cookies.get('token');

  const navigate = useNavigate();

  const cerrarSesion = async () => {
    navigate(process.env.PUBLIC_URL+ '/');
  };


  const handleChange = (e) => {
    setPregunta({
      ...pregunta,
      [e.target.name]: e.target.value,
    });
  };
  const handleChange2 = (e) => {
    setNuevaP({
      ...nuevaP,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    fetch(URL1, {
      method: "POST",
      headers: { "Authorization": "Token " + token, "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {console.log(data)
        if (data.OK == "True"){
          data.preguntas.forEach(element => {
            listadoPregunta.push(element);
          });
          setListadoPregunta(listadoPregunta);
          setShowRecarga(!showRecarga);
        }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  },[]);


  function añadirPregunta () {
    fetch(URL2, {
      method: "POST",
      headers: { "Authorization": "Token " + token, "Content-Type": "application/json" },
      body: JSON.stringify(nuevaP),
    })
      .then((response) => response.json())
      .then((data) => {console.log(data)
        if (data.OK == "True"){
          setShowAñadir(false)
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

  function eliminarPregunta () {
    fetch(URL4, {
      method: "POST",
      headers: { "Authorization": "Token " + token, "Content-Type": "application/json" },
      body: JSON.stringify({"id": pregunta.id}),
    })
      .then((response) => response.json())
      .then((data) => {console.log(data)
        if (data.OK == "True"){
          setShowEliminar(false)
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

  function editarPregunta () {
    fetch(URL4, {
      method: "POST",
      headers: { "Authorization": "Token " + token, "Content-Type": "application/json" },
      body: JSON.stringify(pregunta),
    })
      .then((response) => response.json())
      .then((data) => {console.log(data)
        if (data.Ok == "True"){
          setShowEditar(false)
        }
        else {
          setErroes(data.error)
        }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  };

  function mostrarDatosPregunta(usuario) {
    fetch(URL3, {
      method: "POST",
      headers: {"Authorization": "Token " + token, "Content-Type": "application/json"},
      body: JSON.stringify({"id": usuario}),
    })
      .then((response) => response.json())
      .then((data) => {console.log(data)
        if (data.OK == "True"){
          setShowPregunta(true)
          setPregunta({ 
            id: usuario,
            enunciado: data.enunciado,
            r1: data.r1,
            r2: data.r1,
            r3: data.r3,
            r4: data.r4,
            rc: data.rc,
            categoria: data.categoria,
          });
          console.log(pregunta)
        }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  };

  
   function f_preguntas() {
      return listadoPregunta.map((pregunta, elemento) => (
        <div key={elemento} className="App-CuadradoBlanco" style={{ width: "90%", height: "30%", position: "relative", left: "0%",cursor: "pointer", border: "0px black"}}  onClick={() => {setShowPregunta(true); mostrarDatosPregunta(pregunta.id)}}>
          <a  style= {{ color: "black", fontSize: "25px", fontStyle: "italic", position: "absolute", top: "15%", left: "5%", textAlign:"left"}} >
            {pregunta.enunciado}
          </a>
          <a  style= {{ color: "black", fontSize: "40px", fontStyle: "italic", position: "absolute", top: "50%", left: "0%"}}>
            ________________________________________________________
          </a>
        </div>
      ));
    }
  
  return (
    <div className="App">
        <div>
        {showRecarga ? (
          <div className="App-CuadradoAmarillo" style={{ width: "1500px", height: "600px", position: "absolute", top: "25%", left: "10%"}}>
            <div className="App-CuadradoBlanco" style={{ width: "70%", height: "88%", position: "absolute", top: "5%", left: "2%", borderRadius: "50px 0px 0px 50px"}}>
            <InfiniteScroll
              dataLength={listadoPregunta.length}
              pageStart={0}
              loadMore={f_preguntas}
              hasMore={true || false}
              useWindow={false}
              style={{position:"absolute", width: "95%", height: "99.7%", top:"0.1%", left:"5%"}}
            >
              {f_preguntas()}
            </InfiniteScroll>
            </div>
            <img src={CrearPartida} style={{width:"12%", height:"30%", left:"80%", top:"25%", zIndex: "1", cursor: "pointer", position:"absolute"}} onClick={() =>{setShowAñadir(true);}}/>
            <button className="App-boton" style= {{fontSize:"32px", top: "63%", left: "77%", position:"absolute"}} onClick={() =>{setShowAñadir(true);}} >
              Añadir Pregunta
            </button>
          </div>
          ) : (
          <div className="App-CuadradoAmarillo" style={{ width: "1500px", height: "600px", position: "absolute", top: "25%", left: "10%"}}>
            <div className="App-CuadradoBlanco" style={{ width: "70%", height: "88%", position: "absolute", top: "5%", left: "2%", borderRadius: "50px 0px 0px 50px"}}>
            <InfiniteScroll
              dataLength={listadoPregunta.length}
              pageStart={0}
              loadMore={f_preguntas}
              hasMore={true || false}
              useWindow={false}
              style={{position:"absolute", width: "95%", height: "99.7%", top:"0.1%", left:"5%"}}
            >
              {f_preguntas()}
            </InfiniteScroll>
            </div>
            <img src={CrearPartida} style={{width:"12%", height:"30%", left:"80%", top:"25%", zIndex: "1", cursor: "pointer", position:"absolute"}} onClick={() =>{setShowAñadir(true);}}/>
            <button className="App-boton" style= {{fontSize:"32px", top: "63%", left: "77%", position:"absolute"}} onClick={() =>{setShowAñadir(true);}} >
              Añadir Pregunta
            </button>
          </div>
        )}

          {showEditar ? (
            <div className="App-CuadradoNegro" style={{ width: "80%", height: "68%", position: "absolute", top: "25%", left: "10%", borderRadius: "50px 50px 50px 50px", zIndex:"2"}}>
            <div className="App-CuadradoNegro" style={{ width: "100%", height: "15%", position: "absolute", top: "0%", left: "0%", zIndex:"5", borderRadius: "50px 50px 50px 50px"}}>
              <div style={{marginTop:"2%"}}>
                <a style={{color:"white", fontSize:"50px"}}> Editar Pregunta </a>
              </div>
              <div style={{marginTop:"2%", color: "white"}}>
                  <a> ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯</a>
              </div>
            </div>
            <div  style={{ width: "100%", height: "55%", position: "absolute", top: "20%", left: "0%"}}>
              <Cuadro text="Enunciado:" funcion={handleChange} value={pregunta.enunciado} label="enunciado" name="enunciado"/>
              <a style={{position: "absolute", top: "42%", left: "7%", color:"white", fontSize:"27px"}}> Respuesta 1:  </a>
              <input className="App-textoNegro"
                label="enunciado"
                name="enunciado"
                value={pregunta.r1}
                onChange={handleChange}
                style={{ width: "27%", height: "8%", position: "absolute", top: "40%", left: "17%", fontSize:"20px", borderRadius: "10px 10px 10px 10px"}}
              />
              <a style={{position: "absolute", top: "42%", left: "50%", color:"white", fontSize:"27px"}}> Respuesta 2:  </a>
              <input className="App-textoNegro"
                label="r2"
                name="r2"
                value={pregunta.r2}
                onChange={handleChange}
                style={{ width: "27%", height: "8%", position: "absolute", top: "40%", left: "60%", fontSize:"20px", borderRadius: "10px 10px 10px 10px"}}
              />
              <a style={{position: "absolute", top: "62%", left: "7%", color:"white", fontSize:"27px"}}> Respuesta 1:  </a>
              <input className="App-textoNegro"
                label="r3"
                name="r3"
                value={pregunta.r3}
                onChange={handleChange}
                style={{ width: "27%", height: "8%", position: "absolute", top: "60%", left: "17%", fontSize:"20px", borderRadius: "10px 10px 10px 10px"}}
              />
              <a style={{position: "absolute", top: "62%", left: "50%", color:"white", fontSize:"27px"}}> Respuesta 2:  </a>
              <input className="App-textoNegro"
                label="r4"
                name="r4"
                value={pregunta.r4}
                onChange={handleChange}
                style={{ width: "27%", height: "8%", position: "absolute", top: "60%", left: "60%", fontSize:"20px", borderRadius: "10px 10px 10px 10px"}}
              />
              <a style={{position: "absolute", top: "82%", left: "7%", color:"white", fontSize:"27px"}}> Respuesta correcta:  </a>
              <select name="rc" id="rc" className="App-textoNegro" value={pregunta.rc} style={{width:"24%", height: "15%", position: "absolute", top: "80%", left: "23%" , borderRadius: "10px 10px 10px 10px",fontSize:"30px"}} 
                onChange={(event) => setPregunta({
                  ...pregunta,
                  [event.target.name]: event.target.value
                })}>
                  <option value="r1">Respuesta 1</option>
                  <option value="r2">Respuesta 2</option>
                  <option value="r3">Respuesta 3</option>
                  <option value="r4">Respuesta 4</option>
              </select> 
              <a style={{position: "absolute", top: "82%", left: "50%", color:"white", fontSize:"27px"}}> Categoria:  </a>
              <select name="categoria" id="categoria" className="App-textoNegro" value={pregunta.categoria} style={{width:"30%", height: "15%", position: "absolute", top: "80%", left: "60%" , borderRadius: "10px 10px 10px 10px",fontSize:"30px"}}
                onChange={(event) => setPregunta({
                  ...pregunta,
                  [event.target.name]: event.target.value
                })}>
                  <option value="Historia">Historia</option>
                  <option value="Geografia">Geografia</option>
                  <option value="Deportes">Deportes</option>
                  <option value="Arte">Arte</option>
                  <option value="Entretenimiento">Entretenimiento</option>
                  <option value="Ciencia">Ciencia</option>
              </select> 
            </div>
            <div style={{textAlign:"center", position: "absolute", top: "74%", left: "47%"}}>
              <a style={{color:"red", fontSize:"30px"}}> {errores} </a>
            </div>
            <button className="App-botonCancelar" style= {{ top: "84%", left: "32%", position:"absolute"}} onClick={() =>{ setShowPregunta(true); setShowEditar(false); setErroes("")} }>
              Cancelar
            </button>
            <button className="App-botonConfirmar" style= {{ top: "84%", left: "55%", position:"absolute"}} onClick={() => { editarPregunta()} }>
              Editar
            </button>

          </div>
          ) : (
            <div/>
          )}

          

          {showEliminar ? (
            <div className="App-CuadradoNegro" style={{ width: "45%", height: "50%", position: "absolute", top: "25%", left: "27%", zIndex:"3", borderRadius: "50px 50px 50px 50px", zIndex:"3"}}>
              <div style={{marginTop:"10%"}}>
                <a style={{color:"white", fontSize:"40px"}}> ¿Estás seguro de que quieres eliminar esta pregunta? </a>
              </div>
              <div style={{textAlign:"center", position: "absolute", top: "67%", left: "20%"}}>
                <a style={{color:"red", fontSize:"30px"}}> {errores} </a>
              </div>
              <button className="App-botonCancelar" style= {{ top: "70%", left: "25%", position:"absolute"}} onClick={() =>{setShowEliminar(false);setErroes("")}}>
                Cancelar
              </button>
              <button className="App-botonConfirmar" style= {{ top: "70%", left: "55%", position:"absolute"}} onClick={() => {eliminarPregunta()}}>
                Confirmar
              </button>
            </div>
          ) : (
            <div/>
          )}



          {showPregunta ? (

          <div className="App-CuadradoNegro" style={{ width: "80%", height: "68%", position: "absolute", top: "25%", left: "10%", borderRadius: "50px 50px 50px 50px", zIndex:"2"}}>
            <div className="App-CuadradoNegro" style={{ width: "100%", height: "15%", position: "absolute", top: "0%", left: "0%", zIndex:"5", borderRadius: "50px 50px 50px 50px"}}>
              <div style={{marginTop:"2%"}}>
                <a style={{color:"white", fontSize:"50px"}}> Datos Pregunta </a>
              </div>
              <div style={{marginTop:"2%", color: "white"}}>
                  <a> ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯</a>
              </div>
            </div>
            <div  style={{ width: "100%", height: "55%", position: "absolute", top: "20%", left: "0%"}}>
              <a style={{position: "absolute", top: "22%", left: "7%", color:"white", fontSize:"27px"}}> Enunciado:  </a>
              <input className="App-textoNegro"
                label="enunciado"
                name="enunciado"
                value={pregunta.enunciado}
                style={{ width: "70%", height: "9%", position: "absolute", top: "20%", left: "17%", fontSize:"20px", borderRadius: "10px 10px 10px 10px"}}
              />
              <a style={{position: "absolute", top: "42%", left: "7%", color:"white", fontSize:"27px"}}> Respuesta 1:  </a>
              <input className="App-textoNegro"
                label="enunciado"
                name="enunciado"
                value={pregunta.r1}
                style={{ width: "27%", height: "8%", position: "absolute", top: "40%", left: "17%", fontSize:"20px", borderRadius: "10px 10px 10px 10px"}}
              />
              <a style={{position: "absolute", top: "42%", left: "50%", color:"white", fontSize:"27px"}}> Respuesta 2:  </a>
              <input className="App-textoNegro"
                label="enunciado"
                name="enunciado"
                value={pregunta.r2}
                style={{ width: "27%", height: "8%", position: "absolute", top: "40%", left: "60%", fontSize:"20px", borderRadius: "10px 10px 10px 10px"}}
              />
              <a style={{position: "absolute", top: "62%", left: "7%", color:"white", fontSize:"27px"}}> Respuesta 1:  </a>
              <input className="App-textoNegro"
                label="enunciado"
                name="enunciado"
                value={pregunta.r3}
                style={{ width: "27%", height: "8%", position: "absolute", top: "60%", left: "17%", fontSize:"20px", borderRadius: "10px 10px 10px 10px"}}
              />
              <a style={{position: "absolute", top: "62%", left: "50%", color:"white", fontSize:"27px"}}> Respuesta 2:  </a>
              <input className="App-textoNegro"
                label="enunciado"
                name="enunciado"
                value={pregunta.r4}
                style={{ width: "27%", height: "8%", position: "absolute", top: "60%", left: "60%", fontSize:"20px", borderRadius: "10px 10px 10px 10px"}}
              />
              <a style={{position: "absolute", top: "82%", left: "7%", color:"white", fontSize:"27px"}}> Respuesta correcta:  </a>
              <input className="App-textoNegro"
                label="enunciado"
                name="enunciado"
                value={pregunta.rc}
                style={{ width: "21%", height: "8%", position: "absolute", top: "80%", left: "23%" , fontSize:"20px", borderRadius: "10px 10px 10px 10px"}}/> 
              <a style={{position: "absolute", top: "82%", left: "50%", color:"white", fontSize:"27px"}}> Categoria:  </a>
              <input className="App-textoNegro"
                label="enunciado"
                name="enunciado"
                value={pregunta.categoria}
                style={{ width: "27%", height: "8%", position: "absolute", top: "80%", left: "60%" , fontSize:"20px", borderRadius: "10px 10px 10px 10px"}}/> 
            </div>
            <div style={{textAlign:"center", position: "absolute", top: "74%", left: "47%"}}>
              <a style={{color:"red", fontSize:"30px"}}> {errores} </a>
            </div>
            <button className="App-boton" style= {{ top: "84%", left: "42%", position:"absolute"}} onClick={() =>{setShowPregunta(false);setErroes("")}}>
              Cancelar
            </button>
            <button className="App-botonCancelar" style= {{ top: "84%", left: "20%", position:"absolute"}} onClick={() =>{setShowEliminar(true);setErroes("")}}>
              Eliminar
            </button>
            <button className="App-botonConfirmar" style= {{ top: "84%", left: "65%", position:"absolute"}} onClick={() => {setShowEditar(true);setShowPregunta(false);setErroes("")}}>
              Editar
            </button>

          </div>

          ) : (

            <div/>

          )}


          {showAñadir ? (

          <div className="App-CuadradoNegro" style={{ width: "80%", height: "68%", position: "absolute", top: "25%", left: "10%", borderRadius: "50px 50px 50px 50px", zIndex:"2"}}>
            <div className="App-CuadradoNegro" style={{ width: "100%", height: "15%", position: "absolute", top: "0%", left: "0%", zIndex:"5", borderRadius: "50px 50px 50px 50px"}}>
              <div style={{marginTop:"2%"}}>
                <a style={{color:"white", fontSize:"50px"}}> Añadir Pregunta </a>
              </div>
              <div style={{marginTop:"2%", color: "white"}}>
                  <a> ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯</a>
              </div>
            </div>
            <div  style={{ width: "100%", height: "55%", position: "absolute", top: "20%", left: "0%"}}>
              <a style={{position: "absolute", top: "22%", left: "7%", color:"white", fontSize:"27px"}}> Enunciado:  </a>
              <input className="App-textoNegro"
                label="enunciado"
                name="enunciado"
                value={nuevaP.enunciado}
                onChange={handleChange2}
                style={{ width: "70%", height: "9%", position: "absolute", top: "20%", left: "17%", fontSize:"20px", borderRadius: "10px 10px 10px 10px"}}
              />
              <a style={{position: "absolute", top: "42%", left: "7%", color:"white", fontSize:"27px"}}> Respuesta 1:  </a>
              <input className="App-textoNegro"
                label="enunciado"
                name="enunciado"
                value={nuevaP.r1}
                onChange={handleChange2}
                style={{ width: "27%", height: "8%", position: "absolute", top: "40%", left: "17%", fontSize:"20px", borderRadius: "10px 10px 10px 10px"}}
              />
              <a style={{position: "absolute", top: "42%", left: "50%", color:"white", fontSize:"27px"}}> Respuesta 2:  </a>
              <input className="App-textoNegro"
                label="enunciado"
                name="enunciado"
                value={nuevaP.r2}
                onChange={handleChange2}
                style={{ width: "27%", height: "8%", position: "absolute", top: "40%", left: "60%", fontSize:"20px", borderRadius: "10px 10px 10px 10px"}}
              />
              <a style={{position: "absolute", top: "62%", left: "7%", color:"white", fontSize:"27px"}}> Respuesta 1:  </a>
              <input className="App-textoNegro"
                label="enunciado"
                name="enunciado"
                value={nuevaP.r3}
                onChange={handleChange2}
                style={{ width: "27%", height: "8%", position: "absolute", top: "60%", left: "17%", fontSize:"20px", borderRadius: "10px 10px 10px 10px"}}
              />
              <a style={{position: "absolute", top: "62%", left: "50%", color:"white", fontSize:"27px"}}> Respuesta 2:  </a>
              <input className="App-textoNegro"
                label="enunciado"
                name="enunciado"
                value={nuevaP.r4}
                onChange={handleChange2}
                style={{ width: "27%", height: "8%", position: "absolute", top: "60%", left: "60%", fontSize:"20px", borderRadius: "10px 10px 10px 10px"}}
              />
            <a style={{position: "absolute", top: "82%", left: "7%", color:"white", fontSize:"27px"}}> Respuesta correcta:  </a>
              <select name="rc" id="rc" className="App-textoNegro" value={pregunta.rc} style={{width:"24%", height: "15%", position: "absolute", top: "80%", left: "23%" , borderRadius: "10px 10px 10px 10px",fontSize:"30px"}} 
                onChange={(event) => setNuevaP({
                  ...nuevaP,
                  [event.target.numeroJugadores]: event.target.value
                })}>
                  <option value="r1">Respuesta 1</option>
                  <option value="r2">Respuesta 2</option>
                  <option value="r3">Respuesta 3</option>
                  <option value="r4">Respuesta 4</option>
              </select> 
              <a style={{position: "absolute", top: "82%", left: "50%", color:"white", fontSize:"27px"}}> Categoria:  </a>
              <select name="categoria" id="categoria" className="App-textoNegro" value={pregunta.categoria} style={{width:"30%", height: "15%", position: "absolute", top: "80%", left: "60%" , borderRadius: "10px 10px 10px 10px",fontSize:"30px"}}
                onChange={(event) => setNuevaP({
                  ...nuevaP,
                  [event.target.numeroJugadores]: event.target.value
                })}>
                  <option value="Historia">Historia</option>
                  <option value="Geografia">Geografia</option>
                  <option value="Deportes">Deportes</option>
                  <option value="Arte">Arte</option>
                  <option value="Entretenimiento">Entretenimiento</option>
                  <option value="Ciencia">Ciencia</option>
              </select> 
            </div>
            <div style={{textAlign:"center", position: "absolute", top: "74%", left: "47%"}}>
              <a style={{color:"red", fontSize:"30px"}}> {errores} </a>
            </div>
            <button className="App-botonCancelar" style= {{ top: "84%", left: "32%", position:"absolute"}} onClick={() =>{ setShowAñadir(false); setErroes("")} }>
              Cancelar
            </button>
            <button className="App-botonConfirmar" style= {{ top: "84%", left: "55%", position:"absolute"}} onClick={() => { añadirPregunta()} }>
              Editar
            </button>

          </div>

          ) : (

            <div/>

          )}


          {showCerrarSesion ? (
            <div className="App-CuadradoNegro" style={{ width: "45%", height: "50%", position: "absolute", top: "25%", left: "27%", zIndex:"3", borderRadius: "50px 50px 50px 50px", zIndex:"3"}}>
              <div style={{marginTop:"10%"}}>
                <a style={{color:"white", fontSize:"40px"}}> ¿Estás seguro de que quieres cerrar sesion? </a>
              </div>
              <div style={{textAlign:"center", position: "absolute", top: "67%", left: "20%"}}>
                <a style={{color:"red", fontSize:"30px"}}> {errores} </a>
              </div>
              <button className="App-botonCancelar" style= {{ top: "70%", left: "25%", position:"absolute"}} onClick={() =>{setShowCerrarSesion(false);setErroes("")}}>
                Cancelar
              </button>
              <button className="App-botonConfirmar" style= {{ top: "70%", left: "55%", position:"absolute"}} onClick={() => {cerrarSesion()}}>
                Confirmar
              </button>
            </div>
          ) : (
            <div/>
          )}
          <button className="App-boton" style= {{fontSize:"32px",  top: "8%", left: "80%", position:"absolute"}} onClick={() => { setShowCerrarSesion(true); setShowEditar(false); setShowAñadir(false); setShowEliminar(false); setShowPregunta(false) }} >
            Cerrar Sesion
          </button>
        </div>
        <div className = "App-header" > 
            <div className="App-titulo" style= {{top: "7%"}} > Admin
                <div className="App-Quesitos" style= {{left: "32%"}}> </div> 
            </div>
        </div>

        
    </div>
  )
};

export default MenuAdmin;
