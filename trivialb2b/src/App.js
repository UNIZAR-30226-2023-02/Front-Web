import './Estilos/App.css';
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import './Estilos/App.css';
import MenuPrincipal from './MenuPrincipal';
import InicioSesion from './InicioSesion';
import Registrarse from './Registrarse';
import MenuJuego from './MenuJuego';
import CrearPartida from './CrearPartida';
import BuscarPartida from './BuscarPartida';
import Amigos from './Amigos';
import Tienda from './Tienda';

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path= '/' Component={MenuPrincipal} />
      <Route path= '/InicioSesion' Component={InicioSesion} />      
      <Route path= '/Registrarse' Component={Registrarse} />    
      <Route path= '/MenuJuego' Component={MenuJuego} /> 
      <Route path= '/CrearPartida' Component={CrearPartida} /> 
      <Route path= '/BuscarPartida' Component={BuscarPartida} /> 
      <Route path= '/Amigos' Component={Amigos} /> 
      <Route path= '/Tienda' Component={Tienda} /> 
    </Routes>
    </BrowserRouter>
  );
};

export default App;




