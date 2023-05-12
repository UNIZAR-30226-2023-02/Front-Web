import React, { useState, useEffect, useRef } from "react";
import './Estilos/App.css';
import { useNavigate } from 'react-router-dom';
import Cristiano from'./Imagenes/Usuario.png';
import Moneda from'./Imagenes/Moneda.png';
import Atras from "./Imagenes/Atras.png";
import Candado from "./Imagenes/Candado2.png";
import Cookies from 'universal-cookie';

//const URL = "https://6e01-146-158-156-138.eu.ngrok.io/api/usuarios/login/";
const URL1 = "http://51.142.118.71:8000/api/tienda/objetos/";
const URL2 = "http://51.142.118.71:8000/api/tienda/comprar/";
const URL3 = "http://51.142.118.71:8000/api/tienda/usar/";
const URL4 = "http://51.142.118.71:8000/api/usuarios/datos-yo/";

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

  const [fichas, setFichas] = useState([]);
  const [tableros, setTableros] = useState([]);

  const [monedas, setMonedas] = useState();
  
  const [itemSeleccionado, setItemSeleccionado] = useState({nombre:"", imagen:"", valor:""})
  
  //const tableros = [{nombre:"Tablero1", imagen:Cristiano, valor:15, estado:"seleccionado", comprado:true},{nombre:"Tablero2", imagen:Cristiano, valor:12, estado:"adquirido",comprado:true},{nombre:"Tablero3", imagen:Cristiano, valor:20, estado:"", comprado:false},{nombre:"Tablero4", imagen:Cristiano, valor:1, estado:"", comprado:false},{nombre:"Tablero5", imagen:Cristiano, valor:20, estado:"", comprado:false},{nombre:"Tablero6", imagen:Cristiano, valor:30, estado:"", comprado:false}];
  //const fichas = [{nombre:"Ficha1", imagen:Cristiano, valor:15, estado:"seleccionado", comprado:true},{nombre:"Ficha2", imagen:Cristiano, valor:12, estado:"adquirido",comprado:true},{nombre:"Ficha3", imagen:Cristiano, valor:20, estado:"", comprado:true},{nombre:"Ficha4", imagen:Cristiano, valor:1, estado:"", comprado:false},{nombre:"Ficha5", imagen:Cristiano, valor:20, estado:"", comprado:false},{nombre:"Ficha6", imagen:Cristiano, valor:30, estado:"", comprado:false}];


  const cookies= new Cookies();
  const token = cookies.get('token');

  useEffect(() => {
    fetch(URL4, {
      method: "POST",
      headers: { "Authorization": "Token " + token, "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {console.log(data)
      setMonedas(data.monedas)
    })
    .catch((error) => {
      console.error("Error fetching monedas data:", error);
    });

    fetch(URL1, {
      method: "POST",
      headers: { "Authorization": "Token " + token, "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {console.log(data)
      data.fichas.forEach(element => {
        fichas.push(element);
      });
      setFichas(fichas);
      data.tableros.forEach(element => {
        tableros.push(element);
      });
      setTableros(tableros);
      setShow(true)
    })
    .catch((error) => {
      console.error("Error fetching objetos data:", error);
    });
  },[]);

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
      //containerRef.current.removeEventListener('scroll', handleScroll);
    };
  }, [visibleItems])
  

  const seleccionar = (e) => {
    if (e.adquirido == 0) {
      setShow1(true);
      setShow12(false);
      setShow4(false);
      if (monedas > e.coste) {
        setShow2(false);
        setShow3(true);
      }
      else {
        setShow2(true);
        setShow3(false);
      }
    }
    else{
      if (e.enUso == 0) {
      setShow1(true);
      setShow12(false);
      setShow2(false);
      setShow3(false);
      setShow4(true);
      }
      else {
        setShow1(false);
        setShow12(true);
        setShow2(false);
        setShow3(false);
        setShow4(false);
      }
    }
    setItemSeleccionado({
      ...itemSeleccionado,
      nombre: e.id,
      imagen: e.imagen,
      valor: e.coste,
    });
  };
  
  function comprar() {
    fetch(URL2, {
      method: "POST",
      headers: { "Authorization": "Token " + token, "Content-Type": "application/json" },
      body: JSON.stringify({"objeto_id": itemSeleccionado.nombre}),
    })
      .then((response) => response.json())
      .then((data) => {console.log(data)
        if (data.OK == "True"){
          window.location.reload(true);
        }
    })
    .catch((error) => {
      console.error("Error fetching comprar data:", error);
    });
  };

  function usar() {
    console.log({"objeto_id": itemSeleccionado.nombre})
    fetch(URL3, {
      method: "POST",
      headers: { "Authorization": "Token " + token, "Content-Type": "application/json" },
      body: JSON.stringify({"objeto_id": itemSeleccionado.nombre}),
    })
      .then((response) => response.json())
      .then((data) => {console.log(data)
        if (data.OK == "True"){
          window.location.reload(true);
        }
    })
    .catch((error) => {
      console.error("Error fetching usar data:", error);
    });
  };

  function Tablero() {
    return (
      <div className="horizontal-list" ref={containerRef}>
      {tableros.slice(0, visibleItems).map((item) => (
        <div key={item.id} className="horizontal-list__item" onClick={() => seleccionar(item)}>
          <div style={{border: "2px solid white", height:"97.9%"}} >
            <div style={{ height:"20%", width:"100%", alignItems:"center", marginTop:"2%"}}>
              <a style={{color:"white", fontSize:"20px"}}>
                {item.id}
              </a>
            </div>
            {item.adquirido ? (
            <img src={'http://51.142.118.71:8000'+ item.imagen} className="App-imagenJugador"  style= {{ width:"100px", height:"100px", position:"relative", top:"5%", backgroundColor:"white"}}/>
            ) : (
              <div style={{position:"relative", top:"5%", left:"1%"}}>
                <img src={'http://51.142.118.71:8000'+ item.imagen} className="App-imagenJugador"  style= {{ width:"100px", height:"100px", position:"absolute", top:"10%", left:"34%", backgroundColor:"white"}}/>
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
        <div key={item.id} className="horizontal-list__item" onClick={() => seleccionar(item)}>
          <div style={{border: "2px solid white", height:"97.9%"}} >
            <div style={{ height:"20%", width:"100%", alignItems:"center", marginTop:"2%"}}>
              <a style={{color:"white", fontSize:"20px"}}>
                {item.id}
              </a>
            </div>
            {item.adquirido ? (
            <img src={'http://51.142.118.71:8000' + item.imagen} className="App-imagenJugador"  style= {{ width:"100px", height:"100px", position:"relative", top:"5%", backgroundColor:"white"}}/>
            ) : (
              <div style={{position:"relative", top:"5%", left:"1%"}}>
                <img src={'http://51.142.118.71:8000'+ item.imagen} className="App-imagenJugador"  style= {{ width:"100px", height:"100px", position:"absolute", top:"10%", left:"34%", backgroundColor:"white"}}/>
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

      {show ? ( 
         Tablero()  
      ) : ( 
         Tablero()  )
      }


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
          <a style={{color:"white",fontSize:"40px", fontStyle: "italic"}}>{itemSeleccionado.nombre} cuesta: {itemSeleccionado.valor} monedas</a>
        </div>
      ) : (
        <div/>
      )}
      {show12 ? ( 
        <div style={{position:"absolute", top:"50%", left:"75%",  width:"20%", height:"20%", position:"absolute"}}>
          <a style={{color:"white",fontSize:"40px", fontStyle: "italic"}}>{itemSeleccionado.nombre} seleccionado</a>
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
        <button className="App-botonConfirmar" style= {{position:"absolute", top:"65%", left:"80%", position:"absolute"}} onClick={() => comprar()} > Comprar </button>
      ) : (
        <div/>
      )}

      {show4 ? ( 
        <button className="App-boton" style= {{position:"absolute", top:"65%", left:"79%", position:"absolute"}} onClick={() => usar(itemSeleccionado)}  > Seleccionar </button>
      ) : (
        <div/>
      )}
      <img src={Atras} style={{width:"150px", height:"150px", top:"5%", left:"5%", cursor: "pointer", position: "absolute"}} onClick={() => flechaAtras()}/>
    </div>
  );
};

export default Tienda;