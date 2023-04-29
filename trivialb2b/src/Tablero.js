import React, { useState, useEffect, useRef } from "react";
import './Estilos/App.css';
import './Estilos/Estilo.css';
import { useNavigate } from 'react-router-dom';
import { useSession, setSession } from 'react-session';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
//npm install react-countdown-circle-timer

import Cristiano from'./Imagenes/Usuario.png';
import Esquina_azul from './Imagenes/Esquina_azul.png';
import Esquina_amarilla from './Imagenes/Esquina_amarilla.png';
import Esquina_naranja from './Imagenes/Esquina_naranja.png';
import Esquina_roja from './Imagenes/Esquina_roja.png';
import Esquina_verde from './Imagenes/Esquina_verde.png';
import Esquina_rosa from './Imagenes/Esquina_rosa.png';

import Ficha_azul from './Imagenes/Ficha_azul.png';
import Ficha_amarilla from './Imagenes/Ficha_amarilla.png';
import Ficha_naranja from './Imagenes/Ficha_naranja.png';
import Ficha_roja from './Imagenes/Ficha_roja.png';
import Ficha_verde from './Imagenes/Ficha_verde.png';
import Ficha_rosa from './Imagenes/Ficha_rosa.png';

import Queso_azul from './Imagenes/Queso_azul.png';
import Queso_amarillo from './Imagenes/Queso_amarillo.png';
import Queso_naranja from './Imagenes/Queso_naranja.png';
import Queso_rojo from './Imagenes/Queso_rojo.png';
import Queso_verde from './Imagenes/Queso_verde.png';
import Queso_rosa from './Imagenes/Queso_rosa.png';

import QuesoAzul from './Imagenes/QuesitoAzul.png';
import QuesoAmarillo from './Imagenes/QuesitoAmarillo.png';
import QuesoNaranja from './Imagenes/QuesitoNaranja.png';
import QuesoRojo from './Imagenes/QuesitoRojo.png';
import QuesoVerde from './Imagenes/QuesitoVerde.png';
import QuesoRosa from './Imagenes/QuesitoRosa.png';
import QuesitosGeneral from './Imagenes/QuesitosGeneral.png';
import Transparente from './Imagenes/Transparente.png';

import Cruz from './Imagenes/Cruz.png';
import ChatImg from './Imagenes/Chat.png';
import B2B from './Imagenes/Logo.png';
import Quesitos from './Imagenes/CrearPartida.png';

//const URL = "https://6e01-146-158-156-138.eu.ngrok.io/api/usuarios/login/";
const URL = "http://51.142.118.71:8000";
//const URL = "http://85be-146-158-156-138.ngrok-free.app/";




const Tablero = () => {

  /* --- VARIABLES Y CONSTANTES --- */
  const navigate = useNavigate();
  const [body, setBody] = useState();
  const [errores, setErorres] = useState("");
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  
  //Mensaje a rellenar para el backend
  const [msg, setMsg] = useState({OK:"",jugador:"", type:"", subtype: "", valor_dado: "", casilla_elegida: "", casillas_nuevas: "", enunciado: "", r1: "", r2: "", r3: "", r4: "", rc: "", quesito: "", esCorrecta: "", mensage_chat: "", error: ""});

  //Sobra (modificrlo con los datos que nos pasa el backend)
  const vectorPregunta = [{nombre:"Pregunta", texto:"¿Que año estamos?"}, {nombre:"Respuesta1", texto:"2001", respuesta:false}, {nombre:"Respuesta2", texto:"2011", respuesta:false}, {nombre:"Respuesta3", texto:"2021", respuesta:false}, {nombre:"Respuesta4", texto:"2022", respuesta:true}];

  // Vector Jugadores
  const [vector1, setV1] = useState([
    {nombre:"Jugador1", queso:Queso_azul, rojo:Transparente, amarillo:Transparente, azul:Transparente, rosa:Transparente, verde:Transparente, naranja:Transparente}, 
    {nombre:"Jugador2", queso:Queso_rojo, rojo:Transparente, amarillo:Transparente, azul:Transparente, rosa:Transparente, verde:Transparente, naranja:Transparente}, 
    {nombre:"Jugador3", queso:Queso_verde, rojo:Transparente, amarillo:Transparente, azul:Transparente, rosa:Transparente, verde:Transparente, naranja:Transparente},
    {nombre:"Jugador4", queso:Queso_naranja, rojo:Transparente, amarillo:Transparente, azul:Transparente, rosa:Transparente, verde:Transparente, naranja:Transparente}, 
    {nombre:"Jugador5", queso:Queso_amarillo, rojo:Transparente, amarillo:Transparente, azul:Transparente, rosa:Transparente, verde:Transparente, naranja:Transparente}, 
    {nombre:"Jugador6", queso:Queso_rosa, rojo:Transparente, amarillo:Transparente, azul:Transparente, rosa:Transparente, verde:Transparente, naranja:Transparente}
  ]);
  const vector2 = [{nombre:"", queso:Queso_azul}, {nombre:"", queso:Queso_rojo}, {nombre:"", queso:Queso_verde},{nombre:"", queso:Queso_naranja}, {nombre:"", queso:Queso_amarillo}, {nombre:"", queso:Queso_rosa}];

  const amarilla = [
      {l:"29%", t:"73.5%"},   {l:"37.9%", t:"76%"}, {l:"42.3%", t:"76%"},   {l:"48%", t:"76%"},   {l:"53.5%", t:"76%"}, {l:"59%", t:"76%"},     {l:"64.5%", t:"76%"}, 
      {l:"71.5%", t:"75%"},   {l:"77%", t:"69%"},   {l:"79.5%", t:"65.5%"}, {l:"82%", t:"61%"},   {l:"85%", t:"56.5%"}, {l:"88%", t:"51.5%"},   {l:"90.5%", t:"47%"},
      {l:"93%", t:"35.5%"},   {l:"93%", t:"31.5%"}, {l:"89.5%", t:"28%"},   {l:"87%", t:"23%"},   {l:"84%", t:"18%"},   {l:"81.5%", t:"13.5%"}, {l:"78.5%", t:"9%"},
      {l:"75%", t:"4%"},      {l:"64.5%", t:"1%"},  {l:"59.5%", t:"1%"},    {l:"54%", t:"1%"},    {l:"48.5%", t:"1%"},  {l:"43%", t:"1%"},      {l:"37.5%", t:"1%"},
      {l:"28.5%", t:"5%"},    {l:"25%", t:"9%"},    {l:"23%", t:"13.5%"},   {l:"20.5%", t:"18%"}, {l:"17.5%", t:"23%"}, {l:"14.5%", t:"27.5%"}, {l:"12%", t:"32%"},
      {l:"11.5%", t:"41.5%"}, {l:"13.5%", t:"47%"}, {l:"16.5%", t:"51.5%"}, {l:"19%", t:"56.5%"}, {l:"22%", t:"61%"},   {l:"25%", t:"66%"},     {l:"28%", t:"70%"},

      {l:"32.5%", t:"67.5%"}, {l:"35.5%", t:"62.5%"}, {l:"38.5%", t:"56.5%"}, {l:"41%", t:"51%"},     {l:"44.5%", t:"46%"},
      {l:"66.5%", t:"70%"},   {l:"63%", t:"65%"},     {l:"60.5%", t:"60.3%"}, {l:"57.9%", t:"54.5%"}, {l:"54.5%", t:"49.5%"},
      {l:"87%", t:"41.5%"},   {l:"81%", t:"41.5%"},   {l:"74.5%", t:"41.5%"}, {l:"68.5%", t:"41.5%"}, {l:"62.5%", t:"41.5%"},
      {l:"72.5%", t:"10%"},   {l:"69.5%", t:"15.5%"}, {l:"66.5%", t:"21%"},   {l:"63.5%", t:"26%"},   {l:"60.5%", t:"31%"},
      {l:"37.5%", t:"7%"},    {l:"41%", t:"12%"},     {l:"44%", t:"17.5%"},   {l:"47%", t:"22.5%"},   {l:"49.5%", t:"28%"},
      {l:"15%", t:"41.5%"},   {l:"21%", t:"41.5%"},   {l:"27%", t:"41.5%"},   {l:"33%", t:"41.5%"},   {l:"39.5%", t:"41.5%"}, {l:"59%", t:"39%"}
  ];
  const roja = [
      {l:"34%", t:"76%"},  {l:"39.6%", t:"76%"}, {l:"45%", t:"76%"},     {l:"50.5%", t:"76%"},   {l:"56%", t:"76%"},     {l:"61.5%", t:"76%"}, {l:"67%", t:"76%"},
      {l:"76%", t:"73%"},  {l:"79%", t:"68%"},   {l:"81.5%", t:"64.5%"}, {l:"84%", t:"59.5%"},   {l:"87%", t:"54.5%"},   {l:"90%", t:"50%"},   {l:"92%", t:"45.5%"},
      {l:"93%", t:"42%"},  {l:"90.5%", t:"31%"}, {l:"87.5%", t:"26%"},   {l:"85%", t:"21.5%"},   {l:"82%", t:"16.5%"},   {l:"79.5%", t:"12%"}, {l:"77%", t:"7.5%"},
      {l:"70%", t:"2%"},   {l:"67%", t:"1%"},    {l:"62%", t:"1%"},      {l:"56.5%", t:"1%"},    {l:"51%", t:"1%"},      {l:"45.5%", t:"1%"},  {l:"40%", t:"1%"},
      {l:"34%", t:"1.5%"}, {l:"27%", t:"8%"},    {l:"25%", t:"12%"},     {l:"22.5%", t:"16.5%"}, {l:"19.5%", t:"21.5%"}, {l:"16.7%", t:"26%"}, {l:"14%", t:"31%"},
      {l:"11%", t:"36%"},  {l:"11%", t:"46.5%"}, {l:"14.5%", t:"50%"},   {l:"17%", t:"55%"},     {l:"20%", t:"59.5%"},   {l:"23%", t:"64.5%"}, {l:"26%", t:"68.5%"},

      {l:"30.5%", t:"69.5%"}, {l:"33.5%", t:"64%"},   {l:"36.5%", t:"59%"},   {l:"39.5%", t:"53.5%"}, {l:"42.5%", t:"48%"},
      {l:"68%", t:"72.5%"},   {l:"65%", t:"67.5%"},   {l:"62.5%", t:"62%"},   {l:"59.5%", t:"56.5%"}, {l:"56.5%", t:"51%"},
      {l:"89.5%", t:"41.5%"}, {l:"83.5%", t:"41.5%"}, {l:"77%", t:"41.5%"},   {l:"71%", t:"41.5%"},   {l:"65%", t:"41.5%"},
      {l:"74%", t:"8.5%"},    {l:"71%", t:"13.5%"},   {l:"67.5%", t:"18.5%"}, {l:"64.5%", t:"23.5%"}, {l:"61.5%", t:"29%"},
      {l:"36%", t:"4.5%"},    {l:"39%", t:"10%"},     {l:"42%", t:"15.5%"},   {l:"45%", t:"20.5%"},   {l:"47.5%", t:"26.5%"},
      {l:"17.5%", t:"41.5%"}, {l:"23.5%", t:"41.5%"}, {l:"29.5%", t:"41.5%"}, {l:"35.5%", t:"41.5%"}, {l:"42%", t:"41.5%"}, {l:"45%", t:"39%"}
  ];
  const azul = [
      {l:"26%", t:"75%"},    {l:"37.9%", t:"79%"},   {l:"42.3%", t:"79%"},   {l:"48%", t:"79%"},   {l:"53.5%", t:"79%"},   {l:"59%", t:"79%"},   {l:"64.5%", t:"7879%"},
      {l:"71%", t:"78.5%"},  {l:"80%", t:"71%"},     {l:"82%", t:"67.5%"},   {l:"85%", t:"62.5%"}, {l:"87.5%", t:"58%"},   {l:"90.5%", t:"53%"}, {l:"93%", t:"48%"},
      {l:"96%", t:"44%"},    {l:"95.5%", t:"30.5%"}, {l:"92%", t:"26%"},     {l:"90%", t:"21.5%"}, {l:"87%", t:"16.5%"},   {l:"84%", t:"12%"},   {l:"81.5%", t:"7.5%"},
      {l:"78%", t:"3%"},     {l:"64.5%", t:"-2.5%"}, {l:"59.5%", t:"-2.5%"}, {l:"54%", t:"-2.5%"}, {l:"48.5%", t:"-2.5%"}, {l:"43%", t:"-2.5%"}, {l:"37.5%", t:"-2.5%"},
      {l:"25.5%", t:"3.5%"}, {l:"22%", t:"7%"},      {l:"20%", t:"12%"},     {l:"18%", t:"17%"},   {l:"15%", t:"21.5%"},   {l:"12%", t:"26%"},   {l:"9%", t:"30%"},
      {l:"8.5%", t:"43%"},   {l:"10.5%", t:"49%"},   {l:"14%", t:"53%"},     {l:"16%", t:"58%"},   {l:"19%", t:"62.5%"},   {l:"22%", t:"67.5%"}, {l:"25.5%", t:"71%"},

      {l:"35%", t:"69%"},    {l:"38%", t:"64%"},   {l:"41%", t:"58%"},     {l:"43.5%", t:"52.5%"}, {l:"47%", t:"47.5%"},
      {l:"69%", t:"69%"},    {l:"65.6%", t:"64%"}, {l:"63.5%", t:"58.5%"}, {l:"60%", t:"53%"},     {l:"57%", t:"48%"},
      {l:"87%", t:"38.5%"},  {l:"81%", t:"38.5%"}, {l:"74.5%", t:"38.5%"}, {l:"68.5%", t:"38.5%"}, {l:"62.5%", t:"38.5%"},
      {l:"69.5%", t:"8.5%"}, {l:"66.5%", t:"14%"}, {l:"63.5%", t:"19.5%"}, {l:"60.5%", t:"24.5%"}, {l:"57.5%", t:"29.5%"},
      {l:"35%", t:"8.5%"},   {l:"38%", t:"13.5%"}, {l:"41%", t:"19%"},     {l:"44%", t:"24%"},     {l:"47%", t:"29.5%"},
      {l:"15%", t:"38.5%"},  {l:"21%", t:"38.5%"}, {l:"27%", t:"38.5%"},   {l:"33%", t:"38.5%"},   {l:"39.5%", t:"38.5%"}, {l:"48%", t:"33%"}
  ];
  const rosa = [
      {l:"34%", t:"79%"},     {l:"39.6%", t:"79%"},  {l:"45%", t:"79%"},   {l:"50.5%", t:"79%"},   {l:"56%", t:"79%"},   {l:"61.5%", t:"79%"},   {l:"67%", t:"79%"},
      {l:"78.5%", t:"74.5%"}, {l:"82%", t:"70%"},    {l:"84%", t:"66%"},   {l:"87%", t:"61%"},     {l:"89%", t:"56%"},   {l:"92.5%", t:"51.5%"}, {l:"95%", t:"47%"},
      {l:"96%", t:"34%"},     {l:"93.5%", t:"29%"},  {l:"90%", t:"24.5%"}, {l:"87.5%", t:"20%"},   {l:"85%", t:"15%"},   {l:"82%", t:"10%"},     {l:"79.5%", t:"6%"},
      {l:"70%", t:"-1.5%"},   {l:"67%", t:"-2.5%"},  {l:"62%", t:"-2.5%"}, {l:"56.5%", t:"-2.5%"}, {l:"51%", t:"-2.5%"}, {l:"45.5%", t:"-2.5%"}, {l:"40%", t:"-2.5%"},
      {l:"34%", t:"-2%"},     {l:"24.5%", t:"6%"},   {l:"22.5%", t:"10%"}, {l:"20%", t:"15%"},     {l:"17%", t:"20%"},   {l:"14%", t:"24.5%"},   {l:"11%", t:"29.5%"},
      {l:"8%", t:"34%"},      {l:"8.5%", t:"47.5%"}, {l:"12%", t:"51.5%"}, {l:"14%", t:"59.5%"},   {l:"17%", t:"61%"},   {l:"20%", t:"66%"},     {l:"23%", t:"70.5%"},

      {l:"33%", t:"71%"},     {l:"35.5%", t:"65.5%"}, {l:"39%", t:"60%"},     {l:"42%", t:"55%"},     {l:"45%", t:"49.5%"},
      {l:"71%", t:"71%"},     {l:"67.5%", t:"66%"},   {l:"65%", t:"60.5%"},   {l:"62%", t:"55%"},     {l:"59%", t:"49.5%"},
      {l:"89.5%", t:"38.5%"}, {l:"83.5%", t:"38.5%"}, {l:"77%", t:"38.5%"},   {l:"71%", t:"38.5%"},   {l:"65%", t:"38.5%"},
      {l:"71%", t:"7%"},      {l:"68.5%", t:"12%"},   {l:"64.5%", t:"17%"},   {l:"61.5%", t:"22%"},   {l:"58.5%", t:"27.5%"},
      {l:"34%", t:"6%"},      {l:"36%", t:"11.5%"},   {l:"39%", t:"17%"},     {l:"42%", t:"22%"},     {l:"45%", t:"28%"},
      {l:"17.5%", t:"38.5%"}, {l:"23.5%", t:"38.5%"}, {l:"29.5%", t:"38.5%"}, {l:"35.5%", t:"38.5%"}, {l:"42%", t:"38.5%"}, {l:"56%", t:"44%"}
  ];
  const verde = [
      {l:"24%", t:"78%"},  {l:"37.9%", t:"82%"},  {l:"42.3%", t:"82%"},   {l:"48%", t:"82%"},     {l:"53.5%", t:"82%"}, {l:"59%", t:"82%"},    {l:"64.5%", t:"82%"},
      {l:"71%", t:"82%"},  {l:"83%", t:"73%"},    {l:"85%", t:"69%"},     {l:"88%", t:"64%"},     {l:"90%", t:"59%"},   {l:"93%", t:"54.5%"},  {l:"96%", t:"50%"},
      {l:"99%", t:"46%"},  {l:"98%", t:"29%"},    {l:"95%", t:"24.5%"},   {l:"92.5%", t:"20%"},   {l:"89.5%", t:"15%"}, {l:"87%", t:"10%"},    {l:"84.5%", t:"5.5%"},
      {l:"81%", t:"1.5%"}, {l:"64.5%", t:"-6%"},  {l:"59.5%", t:"-6%"},   {l:"54%", t:"-6%"},     {l:"48.5%", t:"-6%"}, {l:"43%", t:"-6%"},    {l:"37.5%", t:"-6%"},
      {l:"23%", t:"1.5%"}, {l:"19.5%", t:"5.5%"}, {l:"17.5%", t:"10%"},   {l:"15%", t:"15%"},     {l:"12%", t:"20%"},   {l:"9.5%", t:"24.5%"}, {l:"6.5%", t:"28.5%"},
      {l:"5%", t:"45%"},   {l:"8%", t:"50%"},     {l:"11.5%", t:"54.5%"}, {l:"13.5%", t:"59.5%"}, {l:"16.5%", t:"64%"}, {l:"19.5%", t:"69%"},  {l:"22%", t:"72.5%"},

      {l:"38%", t:"70.5%"},   {l:"41%", t:"65.5%"},   {l:"44%", t:"60%"},     {l:"46%", t:"54%"},     {l:"50%", t:"49%"},
      {l:"71.5%", t:"67.5%"}, {l:"68.5%", t:"62.5%"}, {l:"66%", t:"57%"},     {l:"62.5%", t:"51.5%"}, {l:"59.5%", t:"46.5%"},
      {l:"87%", t:"35.5%"},   {l:"81%", t:"35.5%"},   {l:"74.5%", t:"35.5%"}, {l:"68.5%", t:"35.5%"}, {l:"62.5%", t:"35.5%"},
      {l:"66.5%", t:"7%"},    {l:"63.5%", t:"12.5%"}, {l:"60.5%", t:"18%"},   {l:"57.5%", t:"23%"},   {l:"54.5%", t:"28%"},
      {l:"32.5%", t:"10%"},   {l:"35%", t:"15%"},     {l:"39%", t:"20.5%"},   {l:"41%", t:"25.5%"},   {l:"44%", t:"31%"},  
      {l:"15%", t:"35.5%"},   {l:"21%", t:"35.5%"},   {l:"27%", t:"35.5%"},   {l:"33%", t:"35.5%"},   {l:"39.5%", t:"35.5%"}, {l:"48%", t:"44%"}
  ];
  const naranja = [
      {l:"34%", t:"82%"},   {l:"39.6%", t:"82%"}, {l:"45%", t:"82%"},    {l:"50.5%", t:"82%"}, {l:"56%", t:"82%"},     {l:"61.5%", t:"82%"},   {l:"67%", t:"82%"},
      {l:"81%", t:"76%"},   {l:"85%", t:"72%"},   {l:"87%", t:"67%"},    {l:"90%", t:"62.5%"}, {l:"92%", t:"57.5%"},   {l:"95%", t:"53%"},     {l:"98%", t:"49%"},
      {l:"99%", t:"32.5%"}, {l:"96%", t:"27.5%"}, {l:"93%", t:"23%"},    {l:"90.5%", t:"18%"}, {l:"87.5%", t:"13.5%"}, {l:"85%", t:"8.5%"},    {l:"82.5%", t:"4.5%"},
      {l:"70%", t:"-5%"},   {l:"67%", t:"-6%"},   {l:"62%", t:"-6%"},    {l:"56.5%", t:"-6%"}, {l:"51%", t:"-6%"},     {l:"45.5%", t:"-6%"},   {l:"40%", t:"-6%"},
      {l:"34%", t:"-5.5%"}, {l:"21%", t:"4%"},    {l:"19.5%", t:"8.5%"}, {l:"17.5%", t:"14%"}, {l:"14%", t:"18.5%"},   {l:"11.5%", t:"23%"},   {l:"8%", t:"27.5%"},
      {l:"5%", t:"32%"},    {l:"6%", t:"48.5%"},  {l:"9%", t:"53.5%"},   {l:"11.5%", t:"58%"}, {l:"14.5%", t:"62.5%"}, {l:"17.5%", t:"67.5%"}, {l:"20%", t:"72%"},

      {l:"36%", t:"72.5%"},   {l:"38.5%", t:"67%"},   {l:"41.5%", t:"61.5%"}, {l:"45%", t:"57%"},     {l:"48%", t:"51.5%"},
      {l:"73.5%", t:"69.5%"}, {l:"70.5%", t:"64.5%"}, {l:"67.5%", t:"59%"},   {l:"64.5%", t:"53.5%"}, {l:"61.5%", t:"48%"},
      {l:"89.5%", t:"35.5%"}, {l:"83.5%", t:"35.5%"}, {l:"77%", t:"35.5%"},   {l:"71%", t:"35.5%"},   {l:"65%", t:"35.5%"},
      {l:"68%", t:"5.5%"},    {l:"65.5%", t:"10.5%"}, {l:"62%", t:"15.5%"},   {l:"59%", t:"20.5%"},   {l:"56%", t:"26%"},
      {l:"31.5%", t:"7.5%"},  {l:"33%", t:"13%"},     {l:"36.5%", t:"18.5%"}, {l:"39.5%", t:"23.5%"}, {l:"42.5%", t:"29%"},
      {l:"17.5%", t:"35.5%"}, {l:"23.5%", t:"35.5%"}, {l:"29.5%", t:"35.5%"}, {l:"35.5%", t:"35.5%"}, {l:"42%", t:"35.5%"}, {l:"56%", t:"33%"} 
  ];


  /* --- SOCKET --- */
  const chatSocketRef = useRef(null);

  useEffect(() => {
    chatSocketRef.current = new WebSocket(
      `ws://localhost:8000/ws/partida/1/`
    );

    chatSocketRef.current.onmessage = function(event) {
      const data = JSON.parse(event.data);
      try {
        console.log("Mensaje del Backend:");
        console.log(data)
        vector2[0].nombre = data.jugador1
        setV1(vector2)
        console.log(vector1)
      } catch (err) {
        console.log(err);
      }
    };
    chatSocketRef.current.onerror = function(event) {
      console.error('Game socket error:', event);
    };
    
    chatSocketRef.current.onclose = function(event) {
      console.error('Game socket closed unexpectedly');
    }

    return () => {
      chatSocketRef.current.close();
    };
  },[]);

  const enviarMensaje = (valor) => {
    chatSocketRef.current(
      JSON.stringify({
        OK:"",
        jugador:"",
        type:"",
        subtype: "",
        valor_dado: "",
        casilla_elegida: "",
        casillas_nuevas: "",
        enunciado: "",
        r1: "",
        r2: "",
        r3: "",
        r4: "",
        rc: "",
        quesito: "",
        esCorrecta: "",
        mensage_chat: "",
        error: ""
      })
    );
  }


  /* --- DADO --- */
  const [cubeStyle, setCubeStyle] = useState({
    transform: 'translateY(400px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)'
  });
  const time = 4;

  const pulsarDado = () => {
    setCubeStyle({
      ...cubeStyle,
      transition: '',
      transform: 'translateY(400px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)'
    });

    setTimeout(() => {
      setCubeStyle({
        ...cubeStyle,
        transition: `transform ${time}s` });

      const randomValue = Math.floor((Math.random() * 6) + 1);
      console.log(`randomValue: ${randomValue}`);

      switch(randomValue) {
        case 1:
          setCubeStyle({
            ...cubeStyle,
            transform: 'translateY(400px) rotateX(3600deg) rotateY(3600deg) rotateZ(3600deg)'
          });
          break;
        case 2:
          setCubeStyle({
            ...cubeStyle,
            transform: 'translateY(400px) rotateX(4410deg) rotateY(3600deg) rotateZ(3600deg)'
          });
          break;
        case 3:
          setCubeStyle({
            ...cubeStyle,
            transform: 'translateY(400px) rotateX(3600deg) rotateY(4410deg) rotateZ(3600deg)'
          });
          break;
        case 4:
          setCubeStyle({
            ...cubeStyle,
            transform: 'translateY(400px) rotateX(3600deg) rotateY(2430deg) rotateZ(3600deg)'
          });
          break;
        case 5:
          setCubeStyle({
            ...cubeStyle,
            transform: 'translateY(400px) rotateX(2430deg) rotateY(3600deg) rotateZ(3600deg)'
          });
          break;
        case 6:
          setCubeStyle({
            ...cubeStyle,
            transform: 'translateY(400px) rotateX(3600deg) rotateY(1980deg) rotateZ(3600deg)'
          });
          break;
      };
      
    }, time * 10);
  }

  function Dado() {
    return (
    <div className="container">
        <div className="cube"   style={{transform:cubeStyle.transform ,transition:cubeStyle.transition}}>
            <div className="cube-face front">
                <div className="inside">
                    <span className="dot"></span>
                </div>
            </div>
            <div className="cube-face back">
                <div className="inside">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                </div>
            </div>
            <div className="cube-face left">
                <div className="inside">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                </div>
            </div>
            <div className="cube-face right">
                <div className="inside">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                </div>
            </div>
            <div className="cube-face top">
                <div className="inside">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                </div>
            </div>
            <div className="cube-face bottom">
                <div className="inside">
                    <span className="dot"></span>
                    <span className="dot"></span>
                </div>
            </div>
        </div>
    </div>
    )
  }


  /* --- RELOJ ---*/
  const [isRunning, setIsRunning] = useState(true);
  const RelojJugada = () => {
      return (    
      <div>
          <CountdownCircleTimer
              isPlaying={isRunning}
              duration={7}
              colors={['#004777', '#F7B801', '#A30000', '#A30000']}
              colorsTime={[7, 5, 2, 0]}
              size={100}
  
              onComplete={() => {console.log("La cuenta regresiva ha finalizado");
                                // Detiene el reloj
          }}
          >
              {({ remainingTime }) => remainingTime}
          </CountdownCircleTimer>
      </div>
      );
  };

  const RelojRespuesta = () => {
      return (    
      <div>
          <CountdownCircleTimer
              isPlaying={isRunning}
              duration={7}
              colors={['#004777', '#F7B801', '#A30000', '#A30000']}
              colorsTime={[7, 5, 2, 0]}
              size={100}
  
              onComplete={() => {console.log("La cuenta regresiva ha finalizado");
                                // Detiene el reloj
          }}
          >
              {({ remainingTime }) => remainingTime}
          </CountdownCircleTimer>
      </div>
      );
  };

  const RelojPausa = () => {
      return (    
      <div>
          <CountdownCircleTimer
              isPlaying={isRunning}
              duration={7}
              colors={['#004777', '#F7B801', '#A30000', '#A30000']}
              colorsTime={[7, 5, 2, 0]}
              size={100}
  
              onComplete={() => {console.log("La cuenta regresiva ha finalizado");
                                // Detiene el reloj
          }}
          >
              {({ remainingTime }) => remainingTime}
          </CountdownCircleTimer>
      </div>
      );
  };

  /* --- CHAT ---*//*
  const roomCHat= "pepe3";
  const [chatLog2, setChatLog2] = useState('');
  const [messageInput2, setMessageInput2] = useState('');
  const chatLogRef2 = useRef(null);
  const chatSocketRef2 = useRef(null);*/
  
  /*useEffect(() => {
    chatSocketRef2.current = new WebSocket(
      `ws://51.142.118.71:3000/ws/chat/${roomCHat}/`
    );

    chatSocketRef2.current.onmessage = function(event) {
      const data = JSON.parse(event.data);
      setChatLog2(prevChatLog => prevChatLog + data.message + '\n');
    };

    chatSocketRef2.current.onerror = function(event) {
      console.error('Chat socket error:', event);
    };
    

    chatSocketRef2.current.onclose = function(event) {
      console.error('Chat socket closed unexpectedly');
    };*/
/*
    return () => {
      chatSocketRef2.current.close();
    };
  }, [roomCHat]);*/
/*
  function handleMessageInputChange(event) {
    setMessageInput2(event.target.value);
  }

  function handleChatMessageSubmit() {
    const message = messageInput2.trim();
    if (message) {
      chatSocketRef.current.send(JSON.stringify({ message }));
      setMessageInput2('');
    }
  }
  function handleKeyPress(event) {
      if (event.key === 'Enter') {
        handleChatMessageSubmit();
      }
  }

  function Chat() {
    return (      
    <div style={{position:"absolute", top:"0%", left:"75%", width:"24.8%", height:"100%", zIndex:"5", backgroundColor:"white",borderRadius:"0px 0px 0px 30px"}}>
        <a style={{color:"black", fontSize:"30px"}}> CHAT </a>
        <img style={{ position:"absolute", left:"3%", height:"30px", width:"30px", top:"1%", zIndex: "5", cursor:"pointer"}} src={Cruz}onClick={() => { setShow3(false)}}/>
        <textarea
        style={{position:"absolute", top:"5%", left:"0%", width:"99%", height:"90%"}}
        ref={chatLogRef}
        id="chat-log"
        cols="100"
        rows="20"
        value={chatLog2}
        readOnly
        />
        <input
        id="chat-message-input"
        type="text"
        size="100"
        value={messageInput2}
        onChange={handleMessageInputChange}
        onKeyPress={handleKeyPress}
        style={{position:"absolute", top:"90.2%", left:"0%", width:"99%", height:"9%", border:" 2px solid black", borderRadius:"0px 0px 0px 30px", fontSize:"30px"}}
        />
        <button id="chat-message-submit" onClick={handleChatMessageSubmit} className="App-botonSinS" style={{position:"absolute", top:"90.4%", left:"75%", fontSize:"30px", width:"25%", height:"9.3%", borderRadius:"0px 0px 0px 0px"}}>
        Enviar
        </button>
    </div>
    );
  }*/


  /* --- TURNO --- */
  //Jugador1[5,22], Jugador2[33, 22], Jugador3[60.5, 22], Jugador4[5, 69], Jugador5[33, 69], Jugador6[60.5, 69]
  function PosicionElementos () {
    return (
        <div style={{ position:"absolute", top:"5%", left:"22%", height:"26.5%", width:"9%"}}>
            <div style={{position:"absolute", left:"19%", top:"5%"}}>
                {RelojJugada()}
            </div >
            <div style={{position:"absolute", left:"26%",top:"-100%", cursor:"pointer", zIndex:"5"}} onClick={() => pulsarDado() &&  setIsRunning(false)}>
                <Dado/>
            </div>
        </div>
    )
  }
  
  /* --- JUGADORES IZQUIERDA --- */
  function Jugadores1(props) {
    return(
      <div style={{ width: "94%", height: "92%", position: "absolute", zIndex: "3", top:"4%", left:"3%"}}>  
        <div className='App-EsJugador' style={{top: props.top, left:"0%", width: "30%", height: "30%"}} >
            <div style={{marginTop: "2%"}}>
                <img src={props.imagen} className="App-imagenQuesito" style={{marginRight:"2%"}}/>
                    <a style={{color:"white", fontSize:"30px"}}>{props.nombre} </a>
                <br></br>
            </div>
            <div style={{marginTop:"3%"}}>
                <img src={Cristiano} className="App-imagenJugador" style={{width: "25%", height: "55%", position: "absolute", top:"25%", left:"5%", backgroundColor:"white"}} /><br></br>
                <img src={QuesitosGeneral} className="App-imagenJugador" style={{ width: "25%", height: "50%", position: "absolute", top:"25%", left:"40%", backgroundColor:"none"}}/>
                <img src={props.rojo} className="App-imagenJugador" style={{ width: "25%", height: "50%", position: "absolute", top:"25%", left:"40%", backgroundColor:"none"}}/>
                <img src={props.azul} className="App-imagenJugador" style={{ width: "25%", height: "50%", position: "absolute", top:"25%", left:"40%", backgroundColor:"none"}}/>
                <img src={props.verde} className="App-imagenJugador" style={{ width: "25%", height: "50%", position: "absolute", top:"25%", left:"40%", backgroundColor:"none"}}/>
                <img src={props.amarillo} className="App-imagenJugador" style={{ width: "25%", height: "50%", position: "absolute", top:"25%", left:"40%", backgroundColor:"none"}}/>
                <img src={props.rosa} className="App-imagenJugador" style={{ width: "25%", height: "50%", position: "absolute", top:"25%", left:"40%", backgroundColor:"none"}}/>
                <img src={props.naranja} className="App-imagenJugador" style={{ width: "25%", height: "50%", position: "absolute", top:"25%", left:"40%", backgroundColor:"none"}}/>
                <br></br>
            </div>
        </div>
      </div>
    );    
  }  

  /* --- JUGADORES DERECHA --- */
  function Jugadores2(props) {
    return (
        <div style={{ width: "94%", height: "92%", position: "absolute", zIndex: "3", top:"4%", left:"3%"}}>  
            <div className='App-EsJugador' style={{top: props.top, left:"70%", width: "30%", height: "30%"}} >
                <div style={{marginTop: "2%"}}>
                    <img src={props.imagen} className="App-imagenQuesito" style={{marginRight:"2%"}}/>
                        <a style={{color:"white", fontSize:"30px"}}>{props.nombre} </a>
                    <br></br>
                </div>
                <div style={{marginTop:"3%"}}>
                    <img src={Cristiano} className="App-imagenJugador" style={{width: "25%", height: "55%", position: "absolute", top:"25%", left:"70%", backgroundColor:"white"}} />
                    <img src={QuesitosGeneral} className="App-imagenJugador" style={{ width: "25%", height: "50%", position: "absolute", top:"25%", left:"35%", backgroundColor:"none"}}/>
                    <br></br>
                </div>
            </div>
        </div>
    )
  } 

  /* --- TABLERO --- */
  function Linea(props) {
    return(
        <div style={{position:"absolute", height: props.height, width: props.width, top: props.top, left: props.left , zIndex: "1", transform: props.transform}}>
            <button className="" style={{ backgroundColor: props.c1, height: "100%", width: props.width1}} onClick={() => {setShow(true)}}>  </button>
            <button className="" style={{ backgroundColor: props.c2, height: "100%", width:"15%", cursor:"pointer"}} onClick={() => {setShow(true)}}>  </button>
            <button className="" style={{ backgroundColor: props.c3, height: "100%", width:"15%", cursor:"pointer"}} onClick={() => {setShow(true)}}>  </button>
            <button className="" style={{ backgroundColor: props.c4, height: "100%", width:"15%", cursor:"pointer"}} onClick={() => {setShow(true)}}>  </button>
            <button className="" style={{ backgroundColor: props.c5, height: "100%", width:"15%", cursor:"pointer"}} onClick={() => {setShow(true)}}>  </button>
            <button className="" style={{ backgroundColor: props.c6, height: "100%", width:"15%", cursor:"pointer"}} onClick={() => {setShow(true)}}>  </button>
        </div>
    );
    }


  /* --- PREGUNTA --- */
  function Respuesta(props) {
      return (
      <div  style= {{width:props.width, height:props.height, top: props.top, left: props.left, position:"absolute", border: "3px solid black", borderRadius:props.border, backgroundColor:props.color}}>
          <div style={{marginTop:props.marginTop}}>
              <a style={{fontSize:props.size}}>
                  {props.letra} {props.respuesta}
              </a>
          </div>
      </div>
      );
  }
    

  return (
    
    <div className="App">
      <header className="App-headerJuego" style={{zIndex: "1"}}> 
            <div style={{ position: "absolute", zIndex: "2", height:"700px", width:"714px", top:"2%", left:"31%",borderRadius:"5%", backgroundColor:"white"}} ><img src={URL + "/static/images/objetos/10.png"} style={{width:"100%",marginTop:"0%"} }/>
            </div>       
            <div style={{ position: "absolute", zIndex: "2", height:"700px", width:"700px", top:"9%", left:"30%"}} src={URL + "/static/images/objetos/10.png"}>
                {/* --- TABLERO --- */}  
                <Linea height="10%" width="41%" top="35%" left="4%" c1="white" c2="yellow" c3="pink" c4="orange" c5="blue" c6="green" width1="25%" transform="0"/>
                <Linea height="10%" width="41%" top="9.7%" left="18.6%" c1="white" c2="pink" c3="green" c4="yellow" c5="orange" c6="red" width1="25%" transform="rotate(+60deg)"/> 
                <Linea height="10%" width="41%" top="9.7%" left="47.6%" c1="white" c2="green" c3="red" c4="pink" c5="yellow" c6="blue" width1="25%" transform="rotate(+120deg)"/> 
                <Linea height="10%" width="41%" top="35%" left="62%" c1="white" c2="red" c3="blue" c4="green" c5="pink" c6="orange" width1="25%" transform="scaleX(-1)"/>  
                <Linea height="10%" width="41%" top="60%" left="47.6%" c1="white" c2="blue" c3="orange" c4="red" c5="green" c6="yellow" width1="25%" transform="rotate(-120deg)"/> 
                <Linea height="10%" width="41%" top="60%" left="18.6%" c1="white" c2="orange" c3="yellow" c4="blue" c5="red" c6="pink" width1="25%" transform="rotate(-60deg)"/> 
                <Linea height="10.5%" width="37%" top="14%" left="0%" c1="yellow" c2="white" c3="orange" c4="green" c5="white" c6="pink" width1="15%" transform="rotate(-60deg)"/>  
                <Linea height="10.5%" width="37%" top="-6.5%" left="35.5%" c1="pink" c2="white" c3="yellow" c4="red" c5="white" c6="green" width1="15%" transform=""/>  
                <Linea height="10.5%" width="37%" top="14%" left="70.5%" c1="green" c2="white" c3="pink" c4="blue" c5="white" c6="red" width1="15%" transform="rotate(60deg)"/>  
                <Linea height="10.5%" width="37%" top="55.5%" left="70.5%" c1="red" c2="white" c3="green" c4="orange" c5="white" c6="blue" width1="15%" transform="rotate(120deg)"/>  
                <Linea height="10.5%" width="37%" top="75.5%" left="35%" c1="blue" c2="white" c3="red" c4="yellow" c5="white" c6="orange" width1="15%" transform="rotate(180deg)"/>  
                <Linea height="10.5%" width="37%" top="55.5%" left="0%" c1="orange" c2="white" c3="blue" c4="pink" c5="white" c6="yellow" width1="15%" transform="rotate(-120deg)"/>  
                
                <img style={{ position:"absolute", transform: "rotate(-2deg)", left:"4.9%", height:"41%", width:"53%", top:"-19.2%", zIndex: "2"}} src={Esquina_azul}/>
                <img style={{ position:"absolute", transform: "rotate(+62deg)", left:"51%", height:"41%", width:"50%", top:"-18.89%", zIndex: "2"}} src={Esquina_naranja}/>
                <img style={{ position:"absolute", transform: "rotate(+122deg)", left:"73.2%", height:"41%", width:"50%", top:"20%", zIndex: "2"}} src={Esquina_amarilla}/>
                <img style={{ position:"absolute", transform: "rotate(-179deg)", left:"50.9%", height:"41%", width:"50%", top:"57.8%", zIndex: "2"}} src={Esquina_rosa}/>
                <img style={{ position:"absolute", transform: "rotate(241deg)", left:"6%", height:"41%", width:"50%", top:"57.8%", zIndex: "2"}} src={Esquina_verde}/>
                <img style={{ position:"absolute", transform: "rotate(302deg)", left:"-15.7%", height:"41%", width:"50%", top:"19%", zIndex: "2"}} src={Esquina_roja}/>
                
                <div  style={{width:"17%", height:"20%", left:"44%", top:"29%", position:"absolute", zIndex: "0"}}>
                    <img src={B2B} style={{width:"110%",marginTop:"0%"} }/>
                </div>

                {/* --- FICHAS --- */}  

                <img style={{ position:"absolute", left:amarilla[1].l, top:amarilla[1].t, height:"3%", width:"3%", zIndex: "3"}} src={Ficha_amarilla}/>
                <img style={{ position:"absolute", left:roja    [1].l, top:roja    [1].t, height:"3%", width:"3%", zIndex: "3"}} src={Ficha_roja}/> 
                <img style={{ position:"absolute", left:azul    [1].l, top:azul    [1].t, height:"3%", width:"3%", zIndex: "3"}} src={Ficha_azul}/>
                <img style={{ position:"absolute", left:rosa    [1].l, top:rosa    [1].t, height:"3%", width:"3%", zIndex: "3"}} src={Ficha_rosa}/>
                <img style={{ position:"absolute", left:verde   [1].l, top:verde   [1].t, height:"3%", width:"3%", zIndex: "3"}} src={Ficha_verde}/>
                <img style={{ position:"absolute", left:naranja [1].l, top:naranja [1].t, height:"3%", width:"3%", zIndex: "3"}} src={Ficha_naranja}/>
                
            </div>

            <PosicionElementos/>
            <Jugadores1 top="0%" imagen={vector1[0].queso} nombre={vector1[0].nombre} rojo={vector1[0].rojo} azul={vector1[0].azul} amarillo={vector1[0].amarillo} rosa={vector1[0].rosa} verde={vector1[0].verde} naranja={vector1[0].naranja}/>
            <Jugadores1 top="30%" imagen={vector1[1].queso} nombre={vector1[1].nombre} rojo={vector1[1].rojo} azul={vector1[1].azul} amarillo={vector1[1].amarillo} rosa={vector1[1].rosa} verde={vector1[1].verde} naranja={vector1[1].naranja}/>
            <Jugadores1 top="60%" imagen={vector1[2].queso} nombre={vector1[2].nombre} rojo={vector1[2].rojo} azul={vector1[2].azul} amarillo={vector1[2].amarillo} rosa={vector1[2].rosa} verde={vector1[2].verde} naranja={vector1[2].naranja}/>
            <Jugadores2 top="0%" imagen={vector1[3].queso} nombre={vector1[3].nombre} rojo={vector1[3].rojo} azul={vector1[3].azul} amarillo={vector1[3].amarillo} rosa={vector1[3].rosa} verde={vector1[3].verde} naranja={vector1[3].naranja}/>
            <Jugadores2 top="30%" imagen={vector1[4].queso} nombre={vector1[4].nombre} rojo={vector1[4].rojo} azul={vector1[4].azul} amarillo={vector1[4].amarillo} rosa={vector1[4].rosa} verde={vector1[4].verde} naranja={vector1[4].naranja}/>
            <Jugadores2 top="60%" imagen={vector1[5].queso} nombre={vector1[5].nombre} rojo={vector1[5].rojo} azul={vector1[5].azul} amarillo={vector1[5].amarillo} rosa={vector1[5].rosa} verde={vector1[5].verde} naranja={vector1[5].naranja}/>
            

            <button className="App-boton" style= {{top: "87%", left: "30%", position:"absolute", zIndex:"6"}} onClick={() => {setShow1(!show1)}}>
                Pausar Partida
            </button>
            <button className="App-boton" style= {{top: "87%", left: "53%", position:"absolute", zIndex:"6"}} onClick={() => {setShow2(!show2)}}>
                Abandonar Partida
            </button>
            <img style={{ position:"absolute", left:"93%", height:"80px", width:"110px", top:"1%", zIndex: "4", cursor:"pointer"}} src={ChatImg}onClick={() => { setShow3(true)}}/>

            {/* --- PREGUNTA --- */}  
            {show ? (
            <div className="App-CuadradoBlanco"  style= {{width:"70%", height:"70%", top: "10%", left: "15%", position:"absolute", borderRadius: "40px 40px 0px 0px", zIndex:"6", borderRadius:"50%"}}>
                <Respuesta width="100%" height="12%" left="-0.2%" top="-0.5%" size="50px"respuesta="Entretenimiento" border= "40px 40px 0px 0px" marginTop="0%" color="orange"/>
                <Respuesta width="100%" height="12%" left="-0.2%" top="12%" size="30px" respuesta={body} border= "0px 0px 0px 0px" marginTop="1.2%" color="orange"/>
                <Respuesta width="70%" height="19%" left="-0.2%" top="24%" letra="A)" size="30px" respuesta={vector1[0].nombre} border= "0px 0px 0px 0px" marginTop="4%" color="white"/>
                <Respuesta width="70%" height="19%" left="-0.2%" top="43%" letra="B)" size="30px" respuesta={vector1[2].nombre} border= "0px 0px 0px 0px" marginTop="4%" color="white"/>
                <Respuesta width="70%" height="19%" left="-0.2%" top="62%" letra="C)" size="30px" respuesta={vector2[0].nombre} border= "0px 0px 0px 0px" marginTop="4%" color="white"/>
                <Respuesta width="70%" height="19%" left="-0.2%" top="81%"letra="D)" size="30px" respuesta={vector2[2].nombre} border= "0px 0px 0px 0px"marginTop="4%" color="white"/>

                <div  style= {{width:"30%", height:"76%", top: "24%", left: "70%", position:"absolute",  border: "3px solid black", backgroundColor:"orange"}} >
                    <br></br><br></br><br></br>
                        <a style={{fontSize:"30px"}}>
                        Tiempo para responder
                    </a>
                    <div style={{top: "40%", left: "32%", position:"absolute", colorText:"white"}}>
                        {RelojRespuesta()}
                    </div>
                </div>
            </div>
            ) : (
                <div/>
            )}

            {/* --- PAUSAR --- */}  
            {show1 ? (
            <div className="App-CuadradoNegro"  style= {{width:"40%", height:"55%", top: "20%", left: "30%", position:"absolute", zIndex:"6"}}>
                <br></br>
                <br></br>
                <a style={{color:"white",fontSize:"40px"}}>
                    Partida Pausada
                </a>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <a style={{color:"white",fontSize:"25px"}}>
                Pulsa el botón para reanudar la partida, antes de que se acabe le tiempo, si no abandonarás la partida.
                </a>
                <div style= {{top: "50%", left: "44%", position:"absolute"}}>
                    {RelojPausa()}
                </div>
                <button className="App-boton" style= {{top: "80%", left: "33%", position:"absolute", fontSize:"30px"}} onClick={() => { setShow1(!show1)}}>
                    Reanudar Partida
                </button>
            </div>
            ) : (
            <div/>
            )}

            {/* --- ABANDONAR --- */}  
            {show2 ? (
            <div className="App-CuadradoNegro"  style= {{width:"35%", height:"40%", top: "25%", left: "32.5%", position:"absolute", zIndex:"6", backgroundColor: "#000000"}}>
                <br></br>
                <br></br>
                <br></br>
                <a style={{color:"white",fontSize:"30px"}}>
                ¿Estas seguro de que quieres abandonar la partida?
                </a>
                <button className="App-botonCancelar" style= {{width:"20%", height:"15%",top: "70%", left: "25%", position:"absolute", fontSize:"30px"}} onClick={() => { setShow2(!show2)}}>
                    No
                </button>
                <button className="App-botonConfirmar" style= {{width:"20%", height:"15%",top: "70%", left: "55%", position:"absolute", fontSize:"30px"}} onClick={() => { setShow(!show)}}>
                    Si
                </button>
            </div>
            ) : (
            <div/>
            )}

            {show3 ? (
              <div/>
            ) : (
            <div/>
            )}

        </header>
    </div> 
  );
};
export default Tablero;