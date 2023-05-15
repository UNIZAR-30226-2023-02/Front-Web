import React from "react";
import './Estilos/App.css';
import { Link, useNavigate } from 'react-router-dom';
import Instagram from'./Imagenes/Instagram.png';
import Facebook from'./Imagenes/Facebook.png';
import Twitter from'./Imagenes/Twitter.png';

const URL = "http://51.142.118.71:8000/api/usuarios/login/";

function Imagen (props) {
  return (
    <div style={{ marginRight: props.marg, width:"200px", height:"200px" }}>
      <Link to={props.url} target="_blank">
        <img src={props.img} style={{ width:"100%", height:"100%", cursor: "pointer" }} />
      </Link>
      <a style={{ color: "white", fontSize:"20px", textAlign:"center" }}>{props.texto}</a>
    </div>
  )
}

const RedesSociales = () => {
  
  const navigate = useNavigate();
  const continuar = async (event) => {
    navigate(process.env.PUBLIC_URL+ '/MenuJuego');
  };
  
  return (
    <div className="App">
      <div className="App-CuadradoNegro" style={{ width: "1200px", height: "600px", position: "absolute", zIndex: "1", top: "25%", left: "19%"}}>
        <div style={{marginTop: "3%"}}>                
          <a style={{color:"white", fontSize:"50px"}}> Redes Sociales </a>
          <div style={{marginTop:"30px", color: "white"}}>
            <a> ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯</a>
          </div>
          <div style={{ display:"flex", marginTop:"50px", marginLeft: "80px" }}>
            <Imagen texto="Instagram" marg="20%" url="https://www.instagram.com/trivialb2b/" img={Instagram}/>
            <Imagen texto="Facebook" marg="20%" url="https://www.facebook.com/profile.php?id=100089906757742" img={Facebook}/>
            <Imagen texto="Twitter" marg="0%" url="https://twitter.com/TrivialB2B" img={Twitter}/>
          </div>
          <button className="App-boton" style= {{top:"82%", left: "45%", position:"absolute"}} onClick={() => continuar() } > Volver </button>
        </div>
      </div>
      <div className = "App-header" style={{ filter: 'blur(5px)'}} > 
          <div className="App-titulo" style= {{top: "7%"}} > RedesSociales
              <div className="App-Quesitos" style= {{left: "40%"}}> </div> 
          </div>
      </div>
    </div>
  );
};

export default RedesSociales;