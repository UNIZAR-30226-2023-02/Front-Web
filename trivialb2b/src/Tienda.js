import React, { useState, useEffect, useRef } from "react";
import './Estilos/App.css';
import { useNavigate } from 'react-router-dom';
import Cristiano from'./Imagenes/Cristiano.jpg';
import Moneda from'./Imagenes/Moneda.png';
import InfiniteScroll from 'react-infinite-scroll-component'

//const URL = "https://6e01-146-158-156-138.eu.ngrok.io/api/usuarios/login/";
const URL = "https://51.142.118.71:8000/api/usuarios/login/";


const Tienda = () => {

  const [show1, setShow1] = useState(true);
  const [show2, setShow2] = useState(true);
  const [show3, setShow3] = useState(true);
  const [show4, setShow4] = useState(true);

  const [monedas, setMonedas] = useState(15);

  const [tableroSeleccionado, setTableroSeleccionado] = useState({nombre:"", imagen:"", valor:""})

  const tableros = [{nombre:"Tablero1", imagen:Cristiano, valor:15},{nombre:"Tablero2", imagen:Cristiano, valor:12},{nombre:"Tablero3", imagen:Cristiano, valor:10},{nombre:"Tablero4", imagen:Cristiano, valor:1},{nombre:"Tablero5", imagen:Cristiano, valor:20},{nombre:"Tablero6", imagen:Cristiano, valor:30}];

  const fichas = [{nombre:"Ficha1", imagen:Cristiano},{nombre:"Ficha2", imagen:Cristiano},{nombre:"Ficha3", imagen:Cristiano},{nombre:"Ficha4", imagen:Cristiano},{nombre:"Ficha5", imagen:Cristiano},{nombre:"Ficha6", imagen:Cristiano}];

  const [visibleItems, setVisibleItems] = useState(4);
  const containerRef = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
        setVisibleItems(visibleItems + 4);
      }
    };
    containerRef.current.addEventListener('scroll', handleScroll);
    return () => {
      containerRef.current.removeEventListener('scroll', handleScroll);
    };
  }, [visibleItems])
  

  const seleccionar = (e) => {
    if (tableroSeleccionado.nombre !== e.nombre) {
      setShow1(!show1);
      if (monedas >= e.valor) {
        setShow2(!show2);
      }
      else {
        setShow3(!show3);
      }
    }
    else {
      
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
            <img src={item.imagen} className="App-imagenJugador"  style= {{ width:"100px", height:"100px", position:"relative", top:"5%"}}/>
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
        <div key={item.nombre} className="horizontal-list__item">
          <div style={{border: "2px solid white", height:"97.9%"}} >
            <div style={{ height:"20%", width:"100%", alignItems:"center", marginTop:"2%"}}>
              <a style={{color:"white", fontSize:"20px"}}>
                {item.nombre}
              </a>
            </div>
            <img src={item.imagen} className="App-imagenJugador"  style= {{ width:"100px", height:"100px", position:"relative", top:"5%"}}/>
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
      <div style={{position:"absolute", top:"15%", left:"80%"}}>
      <a style={{color:"white",fontSize:"40px", fontStyle: "italic"}}>Monedas: {monedas}</a>
      </div>
      <img src={Moneda} className="App-imagenJugador"  style= {{ width:"300px", height:"300px", position:"absolute", top:"20%", left:"78%"}}/>


      {show1 ? ( 
        <div>

        </div>
      ) : (
        <div style={{position:"absolute", top:"50%", left:"75%",  width:"20%", height:"20%", position:"absolute"}}>
          <a style={{color:"white",fontSize:"40px", fontStyle: "italic"}}>El tablero {tableroSeleccionado.nombre} cuesta: {tableroSeleccionado.valor} monedas</a>
        </div>
      )}

      {show2 ? ( 
        <div>

        </div>
      ) : (
        <div style={{position:"absolute", top:"65%", left:"75%",  width:"20%", height:"20%", position:"absolute"}}>
          <a style={{color:"red",fontSize:"40px", fontStyle: "italic"}}> Monedas Insuficientes</a>
        </div>
      )}

      {show3 ? ( 
       <div/>
      ) : (
        <button className="App-boton" style= {{position:"absolute", top:"75%", left:"80%", position:"absolute"}}  > Comprar </button>
      )}

      {show4 ? ( 
        <div/>
      ) : (
        <button className="App-boton" style= {{position:"absolute", top:"75%", left:"80%", position:"absolute"}}  > Seleccionar </button>
      )}

    </div>
  );
};

export default Tienda;