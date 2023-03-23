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

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path= '/' Component={MenuPrincipal} />
      <Route path= '/InicioSesion' Component={InicioSesion} />      
      <Route path= '/Registrarse' Component={Registrarse} />    
    </Routes>
    </BrowserRouter>
  );
};

export default App;




