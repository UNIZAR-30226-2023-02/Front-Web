import './Estilos/App.css';
import { useNavigate } from 'react-router-dom';

const MenuPrincipal = () => {

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
          <button className="App-boton" style= {{ marginBottom:"5%", marginTop:"5%" }} type="submit" onClick={() => IniciarSesion()}>
            Inicio Sesión
          </button>
          <button className="App-boton" type="submit"  onClick={() => Registrarse()}>
            Registrarse
          </button>
      </header>
    </div>
  );
};

export default MenuPrincipal;



