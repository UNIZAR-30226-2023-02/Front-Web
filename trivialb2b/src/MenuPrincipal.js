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
  console.log(usuario)
  const navigate = useNavigate();

  const IniciarSesion = async (event) => {
      navigate(process.env.PUBLIC_URL + '/InicioSesion');
  };
  const Registrarse = async (event) => {
    navigate(process.env.PUBLIC_URL + '/Registrarse');
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="App-titulo" style={{ top: "20%" }} > Trivial B2B  
          <div className="App-Quesitos"/> 
        </div>
        <Boton texto="Inicio Sesión" style1="5%" style2="5%" function={IniciarSesion}/>
        <Boton texto="Registrarse" style1="0%" style2="0%" function={Registrarse}/>
      </header>
    </div>
  );
};

export default MenuPrincipal;



