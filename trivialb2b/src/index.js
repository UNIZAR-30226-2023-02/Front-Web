import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './Estilos/index.css';
import App from './App';
import Registrarse from './Registrarse';
import InicioSesion from './InicioSesion';
import MenuJuego from './MenuJuego';
import BuscarPartida from './BuscarPartida';
import Amigos from './Amigos';
import Tienda from './Tienda';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  //<React.StrictMode>
    <App />
  //</React.StrictMode>

  //Para renderear un elementos: div,
  //Para renderear un contenedor: <Contenedor />
  //<Padre />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
