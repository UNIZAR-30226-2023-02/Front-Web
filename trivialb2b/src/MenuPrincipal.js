import './Estilos/App.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

function Boton (props) {
  return (
    <button className="App-boton" style= {{ marginBottom:props.style1, marginTop:props.style2 }} type="submit" onClick={props.function}>
      {props.texto}
    </button>
  )
}

const MenuPrincipal = () => {
  const cookies= new Cookies();
  const usuario = cookies.get('tokenUsuario');
  const navigate = useNavigate();

  const IniciarSesion = async (event) => {
      navigate(process.env.PUBLIC_URL + '/InicioSesion');
  };
  const Registrarse = async (event) => {
    navigate(process.env.PUBLIC_URL + '/Registrarse');
  };
  const IniciarSesion_Admin = async (event) => {
    navigate(process.env.PUBLIC_URL + '/InicioSesion_admin');
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="App-titulo" style={{ top: "16%" }} > Trivial B2B  
          <div className="App-Quesitos"/> 
        </div>
        <button className="App-boton" style= {{position:"absolute", top:"40%", left:"auto" }} type="submit" onClick={IniciarSesion}>
          Inicio Sesión
        </button>
        <button className="App-boton" style= {{position:"absolute", top:"55%", left:"auto" }} type="submit" onClick={Registrarse}>
          Registrarse
        </button>
        <button className="App-boton" style= {{position:"absolute", top:"70%", left:"auto" }} onClick={IniciarSesion_Admin}>
          Inicio Sesión {"(Admin)"}
        </button>
      </header>
    </div>
  );
};

export default MenuPrincipal;



