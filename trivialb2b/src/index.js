import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './Estilos/index.css';
import App from './App';
import Registrarse from './Registrarse';
import InicioSesion from './InicioSesion';
import InicioSesion2 from './InicioSesion2';
import DatosRegistro from './DatosRegistro';
import reportWebVitals from './reportWebVitals';
import MenuJuego from './MenuJuego';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>
    <DatosRegistro />
  </React.StrictMode>

  //Para renderear un elementos: div,
  //Para renderear un contenedor: <Contenedor />
  //<Padre />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
