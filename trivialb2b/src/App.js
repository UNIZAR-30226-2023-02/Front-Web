import './Estilos/App.css';
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import './Estilos/App.css';
import MenuPrincipal from './MenuPrincipal';
import MenuAdmin from './MenuAdmin';
import InicioSesion from './InicioSesion';
import InicioSesion_admin from './InicioSesion_admin';
import Registrarse from './Registrarse';
import MenuJuego from './MenuJuego';
import CrearPartida from './CrearPartida';
import BuscarPartida from './BuscarPartida';
import Amigos from './Amigos';
import Tienda from './Tienda';
import ModoClasico from './ModoClasico';
import ModoEquipos from './ModoEquipos';
import ModoTematica from './ModoTematica';
import Perfil from './Perfil';
import Contacto from './Contacto';
import Estadisticas from './Estadisticas';
import CerrarSesion from './CerrarSesion';
import RedesSociales from './RedesSociales';
import DarDeBaja from './DarDeBaja';
import EsperandoJugadores from './EsperandoJugadores';
import Tablero from './Tablero';
import TableroTematica from './TableroTematica';


const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path= '/' Component={MenuPrincipal }/>    
      <Route path= '/MenuAdmin' Component={MenuAdmin}/>    
      <Route path= '/InicioSesion' Component={InicioSesion} />     
      <Route path= '/InicioSesion_admin' Component={InicioSesion_admin} />     
      <Route path= '/Registrarse' Component={Registrarse} />    
      <Route path= '/MenuJuego' Component={MenuJuego} /> 
      <Route path= '/CrearPartida' Component={CrearPartida} /> 
      <Route path= '/BuscarPartida' Component={BuscarPartida} /> 
      <Route path= '/Amigos' Component={Amigos} /> 
      <Route path= '/Tienda' Component={Tienda} /> 
      <Route path= '/ModoClasico' Component={ModoClasico} /> 
      <Route path= '/ModoEquipos' Component={ModoEquipos} /> 
      <Route path= '/ModoTematica' Component={ModoTematica} /> 
      <Route path= '/Perfil' Component={Perfil} /> 
      <Route path= '/Contacto' Component={Contacto} /> 
      <Route path= '/RedesSociales' Component={RedesSociales} /> 
      <Route path= '/Estadisticas' Component={Estadisticas} /> 
      <Route path= '/CerrarSesion' Component={CerrarSesion} /> 
      <Route path= '/DarDeBaja' Component={DarDeBaja} /> 
      <Route path= '/EsperandoJugadores' Component={EsperandoJugadores} /> 
      <Route path= '/Tablero' Component={Tablero} />
      <Route path= '/TableroTematica' Component={TableroTematica} />
    </Routes>
    </BrowserRouter>
  );
};

export default App;




