import React, { useState, useEffect, useRef } from "react";
import './Estilos/App.css';
import { useNavigate } from 'react-router-dom';
import Cristiano from'./Imagenes/Usuario.png';
import Moneda from'./Imagenes/Moneda.png';
import Atras from "./Imagenes/Atras.png";
import Candado from "./Imagenes/Candado2.png";

//const URL = "https://6e01-146-158-156-138.eu.ngrok.io/api/usuarios/login/";
const URL = "https://51.142.118.71:8000/api/usuarios/login/";


const Tienda = () => {

  const navigate = useNavigate();

  const flechaAtras = async (event) => {
    navigate(process.env.PUBLIC_URL+ '/MenuJuego');
  };

  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show12, setShow12] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);

  const [monedas, setMonedas] = useState(15);

  const [tableroSeleccionado, setTableroSeleccionado] = useState({nombre:"", imagen:"", valor:""})

  const tableros = [{nombre:"Tablero1", imagen:Cristiano, valor:15, estado:"seleccionado", comprado:true},{nombre:"Tablero2", imagen:Cristiano, valor:12, estado:"adquirido",comprado:true},{nombre:"Tablero3", imagen:Cristiano, valor:20, estado:"", comprado:false},{nombre:"Tablero4", imagen:Cristiano, valor:1, estado:"", comprado:false},{nombre:"Tablero5", imagen:Cristiano, valor:20, estado:"", comprado:false},{nombre:"Tablero6", imagen:Cristiano, valor:30, estado:"", comprado:false}];

  const fichas = [{nombre:"Ficha1", imagen:Cristiano, valor:15, estado:"seleccionado", comprado:true},{nombre:"Ficha2", imagen:Cristiano, valor:12, estado:"adquirido",comprado:true},{nombre:"Ficha3", imagen:Cristiano, valor:20, estado:"", comprado:true},{nombre:"Ficha4", imagen:Cristiano, valor:1, estado:"", comprado:false},{nombre:"Ficha5", imagen:Cristiano, valor:20, estado:"", comprado:false},{nombre:"Ficha6", imagen:Cristiano, valor:30, estado:"", comprado:false}];


  const [visibleItems, setVisibleItems] = useState(6);
  const containerRef = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
        setVisibleItems(visibleItems + 6);
      }
    };
    containerRef.current.addEventListener('scroll', handleScroll);
    return () => {
      containerRef.current.removeEventListener('scroll', handleScroll);
    };
  }, [visibleItems])
  

  const seleccionar = (e) => {
    
    if (e.estado == "") {
      setShow1(true);
      setShow12(false);
      setShow4(false);
      if (monedas > e.valor) {
        setShow2(false);
        setShow3(true);
      }
      else {
        setShow2(true);
        setShow3(false);
      }
    }
    else if (e.estado == "adquirido") {
      setShow1(true);
      setShow12(false);
      setShow2(false);
      setShow3(false);
      setShow4(true);
    }
    else{
      setShow1(false);
      setShow12(true);
      setShow2(false);
      setShow3(false);
      setShow4(false);
    }
    setTableroSeleccionado({
      ...tableroSeleccionado,
      nombre: e.nombre,
      imagen: e.imagen,
      valor: e.valor,
    });
  };

  function Tablero() {
    return (
      <div className="horizontal-list" ref={containerRef}>
      {tableros.slice(0, visibleItems).map((item) => (
        <div key={item.nombre} className="horizontal-list__item" onClick={() => seleccionar(item)}>
          <div style={{border: "2px solid white", height:"97.9%"}} >
            <div style={{ height:"20%", width:"100%", alignItems:"center", marginTop:"2%"}}>
              <a style={{color:"white", fontSize:"20px"}}>
                {item.nombre}
              </a>
            </div>
            {item.comprado ? (
            <img src={item.imagen} className="App-imagenJugador"  style= {{ width:"100px", height:"100px", position:"relative", top:"5%", backgroundColor:"white"}}/>
            ) : (
              <div style={{position:"relative", top:"5%", left:"1%"}}>
                <img src={item.imagen} className="App-imagenJugador"  style= {{ width:"100px", height:"100px", position:"absolute", top:"10%", left:"34%", backgroundColor:"white"}}/>
                <img src={Candado} className="App-imagenJugador"  style= {{width:"50px", height:"50px", position:"relative", top:"37%", left:"33%"}}/>
              </div>
            )} 
          </div>
          
        </div>
      ))}
      </div>
    )
  }
  
  function Ficha() {
    return (
      <div className="horizontal-list" ref={containerRef}>
      {fichas.slice(0, visibleItems).map((item) => (
        <div key={item.nombre} className="horizontal-list__item" onClick={() => seleccionar(item)}>
          <div style={{border: "2px solid white", height:"97.9%"}} >
            <div style={{ height:"20%", width:"100%", alignItems:"center", marginTop:"2%"}}>
              <a style={{color:"white", fontSize:"20px"}}>
                {item.nombre}
              </a>
            </div>
            {item.comprado ? (
            <img src={item.imagen} className="App-imagenJugador"  style= {{ width:"100px", height:"100px", position:"relative", top:"5%", backgroundColor:"white"}}/>
            ) : (
              <div style={{position:"relative", top:"5%", left:"1%"}}>
                <img src={item.imagen} className="App-imagenJugador"  style= {{ width:"100px", height:"100px", position:"absolute", top:"10%", left:"34%", backgroundColor:"white"}}/>
                <img src={Candado} className="App-imagenJugador"  style= {{width:"50px", height:"50px", position:"relative", top:"37%", left:"33%"}}/>
              </div>
            )} 
          </div>
        </div>
      ))}
      </div>
    )
  }

  return (
    <div className="App">
      <div className = "App-header" > 
          <div className="App-titulo" style= {{top: "7%"}} > Tienda
              <div className="App-Quesitos" style= {{left: "30%"}}> </div> 
          </div>
      </div>


      <div className="App-CuadradoNegro"  style= {{width:"65%", height:"30%", top: "26%", left: "7%", position:"absolute", border: "2px solid white", borderRadius: "50px 50px 0px 0px"}}>
        <div className="App-CuadradoNegro"  style= {{width:"100%", height:"30%", top: "0%", left: "-0.2%", position:"relative", border: "2px solid white", borderRadius: "50px 50px 0px 0px"}}>
          <div style={{marginTop:"1%"}}>
            <a style={{color:"white",fontSize:"40px"}}>
                  Tablero
            </a>
          </div>
        </div>

        <Tablero/>

      </div>

      <div className="App-CuadradoNegro"  style= {{width:"65%", height:"30%", top: "60%", left: "7%", position:"absolute", border: "2px solid white", borderRadius: "50px 50px 0px 0px"}}>
        <div className="App-CuadradoNegro"  style= {{width:"100%", height:"30%", top: "0%", left: "-0.2%", position:"relative", border: "2px solid white", borderRadius: "50px 50px 0px 0px"}}>
          <div style={{marginTop:"1%"}}>
            <a style={{color:"white",fontSize:"40px"}}>
                  Fichas
            </a>
          </div>
        </div>

        <Ficha/>
      </div>
      <div style={{position:"absolute", top:"15%", left:"79%"}}>
      <a style={{color:"white",fontSize:"40px", fontStyle: "italic"}}>Monedas: {monedas}</a>
      </div>
      <img src={Moneda} className="App-imagenJugador"  style= {{ width:"300px", height:"300px", position:"absolute", top:"20%", left:"77%"}}/>


      {show1 ? ( 
        <div style={{position:"absolute", top:"50%", left:"75%",  width:"20%", height:"20%", position:"absolute"}}>
          <a style={{color:"white",fontSize:"40px", fontStyle: "italic"}}>{tableroSeleccionado.nombre} cuesta: {tableroSeleccionado.valor} monedas</a>
        </div>
      ) : (
        <div/>
      )}
      {show12 ? ( 
        <div style={{position:"absolute", top:"50%", left:"75%",  width:"20%", height:"20%", position:"absolute"}}>
          <a style={{color:"white",fontSize:"40px", fontStyle: "italic"}}>{tableroSeleccionado.nombre} seleccionado</a>
        </div>
      ) : (
        <div/>
      )}
      {show2 ? ( 
        <div style={{position:"absolute", top:"65%", left:"75%",  width:"20%", height:"20%", position:"absolute"}}>
          <a style={{color:"red",fontSize:"40px", fontStyle: "italic"}}> Monedas Insuficientes</a>
        </div>
      ) : (
        <div/>
      )}

      {show3 ? ( 
        <button className="App-botonConfirmar" style= {{position:"absolute", top:"65%", left:"80%", position:"absolute"}}  > Comprar </button>
      ) : (
        <div/>
      )}

      {show4 ? ( 
        <button className="App-boton" style= {{position:"absolute", top:"65%", left:"79%", position:"absolute"}}  > Seleccionar </button>
      ) : (
        <div/>
      )}
      <img src={Atras} style={{width:"150px", height:"150px", top:"5%", left:"5%", cursor: "pointer", position: "absolute"}} onClick={() => flechaAtras()}/>
    </div>
  );
};

export default Tienda;