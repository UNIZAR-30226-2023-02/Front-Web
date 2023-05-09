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
import Cookies from 'universal-cookie';

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
  const [show4, setShow4] = useState(false);
  let [jugadorActual, setJugadorActual] = useState(0);
  let [casillaSeleccionada, setCasillaSeleccionada] = useState("");
  let [vectorJugadorTurno, setVectorJugadorTurno] = useState("vector1");
  let [indiceJugadorTurno, setIndiceJugadorTurno] = useState(0);
  let [tablero, setTablero] = useState("");
  let [r1, setR1] = useState("");
  let [r2, setR2] = useState("");
  let [r3, setR3] = useState("");
  let [r4, setR4] = useState("");
  let [rc, setRc] = useState("");
  let [quesito, setQuesito] = useState("");
  let [enunciado, setEnunciado] = useState("");
  let [pregunta, setPregunta] = useState("");
  let [tiempoPregunta, setTiempoPregunta] = useState(0);
  let [tiempoElegirCasilla, setTiempoElegirCasilla] = useState(0)
  let [tematicaPregunta, setTematicaPregunta] = useState("")
  let [casillas, setCasillas] = useState("")
  let [esCorrecta, setesCorrecta] = useState(0)
  let [colorTematica, setColorTematica] = useState("")
  let [varAux, setVarAux] = useState("") 
  

  const [vectorJugadores, setVectorJugadores ]  = useState([]);

  const cookies= new Cookies();
  const numJugadores = cookies.get('n_jugadores');
  let usuario = cookies.get('tokenUsuario');
  const contraseña = cookies.get('password_sala');
  const websocket = cookies.get('WebSocketTablero');

  let errorPartida = "";
  let type, subtype, mensage_chat = "";
  let valor_dado, casilla_elegida = 0;
  let casillas_nuevas = [];
  let msgIni = 0;

  let [contestada, setContestada] = useState(false)

  let [colorPregunta, setColorPregunta] = useState("white", "white", "white", "white")
  let aux2 = ["white", "white", "white", "white"]
  
  let [jugadorPrueba, setJugadorPrueba] = useState([{ nombre:"", posicion:"", quesitos:[], turno:"", ficha:"", tablero:"", activo:"" }])
  
  //Mensaje a rellenar para el backend
  const [msg, setMsg] = useState({OK:"",jugador:"", type:"", subtype: "", valor_dado: "", casilla_elegida: "", casillas_nuevas: [], enunciado: "", r1: "", r2: "", r3: "", r4: "", rc: "", quesito: "", esCorrecta: "", mensage_chat: "", error: ""});
  //Sobra (modificrlo con los datos que nos pasa el backend)
  const vectorPregunta = [{nombre:"Pregunta", texto:"¿Que año estamos?"}, {nombre:"Respuesta1", texto:"2001", respuesta:false}, {nombre:"Respuesta2", texto:"2011", respuesta:false}, {nombre:"Respuesta3", texto:"2021", respuesta:false}, {nombre:"Respuesta4", texto:"2022", respuesta:true}];

  // Vector Jugadores
  let [vector1, setV1] = useState([{ nombre:"", posicion:"", quesitos:[], turno:"", ficha:"", tablero:"", activo:"" }])
  let [vector2, setV2] = useState([{ nombre:"", posicion:"", quesitos:[], turno:"", ficha:"", tablero:"", activo:"" }])

  const posv1 = [{top:"5%", left:"22%"},{top:"29%", left:"22%"},{top:"45%", left:"22%"}]
  const posv2 = [{top:"5%", left:"70%"},{top:"29%", left:"70%"},{top:"57%", left:"70%"}]

  let [vparp, setVprap] = useState (
    "", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "", 
    "", "", "", "", "", "", "", "", 
    "", "", "", "", "", "", "", "", 
    "", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "", 
    "", "", "", "", "", "", "", "", 
    "", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "",
  );  

  let aux = [
    "", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "", 
    "", "", "", "", "", "", "", "", 
    "", "", "", "", "", "", "", "", 
    "", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "", 
    "", "", "", "", "", "", "", "", 
    "", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "",
  ];

  const amarillo = [
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
  const rojo = [
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

  const posiciones1 = [amarillo, rojo, azul]
  const posiciones2 = [rosa, verde, naranja]

  /* --- SOCKET --- */
  const chatSocketRef = useRef(null);
  
  useEffect(() => {
    chatSocketRef.current = new WebSocket("ws://51.142.118.71:8000" + websocket + "?username=" + usuario + "&password=" + contraseña);
    chatSocketRef.current.onmessage = function(event) {
      const data = JSON.parse(event.data);
      try {
        console.log("Mensaje del Backend:")
        console.log(data)
        if (msgIni==0) {


          tiempoPregunta = data.tiempo_pregunta;
          tiempoElegirCasilla = data.tiempo_elegir_casilla;
          errorPartida = data.error;
          msgIni=1
          //if (numJugadores==2) {
          let jugadores = data.jugadores
          let indice = 0
          //let jugadorVector
          jugadores.forEach(element => {
            if (indice < (jugadores.length/2)) {
              // let [vector1, setV1] = useState([{ nombre:"", posicion:"", quesitos:[], turno:"", ficha:"", tablero:"", activo:"" }])
              vector1[indice].nombre = element.jugador
              vector1[indice].activo = element.activo
              vector1[indice].ficha = element.ficha
              vector1[indice].turno = element.turno
              vector1[indice].posicion = element.posicion       
              vector1[indice].quesitos = element.quesitos  
              vector1[indice].tablero = element.tablero     
              if (vector1[indice].nombre == usuario) {
                tablero = vector1[indice].tablero 
                jugadorActual = vector1[indice].turno
              }
            }
            else {
              if (indice == (jugadores.length/2)){
                indice=0
              }
              vector2[indice].nombre = element.jugador
              vector2[indice].activo = element.activo
              vector2[indice].ficha = element.ficha
              vector2[indice].turno = element.turno
              vector2[indice].posicion = element.posicion       
              vector2[indice].quesitos = element.quesitos  
              vector2[indice].tablero = element.tablero     
              if (vector2[indice].nombre == usuario) {
                tablero = vector2[indice].tablero 
                jugadorActual = vector2[indice].turno
              }
            }
            indice = indice+1;
          });
          setV1(vector1)
          setV2(vector2)
          setJugadorActual(jugadorActual)
          setTablero(tablero)
          console.log(jugadorActual)
          console.log(vector1)
          console.log(vector2)
          //Actualizamos la persona que tiene el turno y en que vector está
          for (let i = 0; i < vector1.length; i++) {
            if (vector1[i].turno == "1"){
              let ind = i
              let vec = "vector1"
              setIndiceJugadorTurno(ind)
              setVectorJugadorTurno(vec)
            }
          }
          for (let i = 0; i < vector2.length; i++) {
            if (vector2[i].turno == "1"){
              let ind = i
              let vec = "vector2"
              setIndiceJugadorTurno(ind)
              setVectorJugadorTurno(vec)
            }
          }

          //Logica del mensaje inicial
          setShow4(!show4)
          setShow4(!show4)
          console.log(indiceJugadorTurno)
          console.log(vectorJugadorTurno)
        }
        else {
          if (data.jugador == usuario){
            console.log("cambiaJugadorActual a 1")
            setJugadorActual(1)
          }
          else {
            console.log("cambiaJugadorActual a 0")
            setJugadorActual(0)
          }
          //Actualizamos la persona que tiene el turno y en que vector está
          for (let i = 0; i < vector1.length; i++) {
            console.log(vector1[i].nombre + " " + data.jugador)
            if (vector1[i].nombre == data.jugador){
              console.log(vector1[i].nombre)
              setIndiceJugadorTurno(i)
              setVectorJugadorTurno("vector1")
            }
          }
          for (let i = 0; i < vector2.length; i++) {
            if (vector2[i].nombre == data.jugador){
              console.log(vector2[i].nombre)
              setIndiceJugadorTurno(i)
              setVectorJugadorTurno("vector2")
            }
          }
          setShow4(!show4)
          setShow4(!show4)
          console.log(indiceJugadorTurno)
          console.log(vectorJugadorTurno)
          //Logica mensaje general
          console.log(data.type)
          console.log(data.subtype)
          switch(data.type) {
            case "Respuesta":
              switch(data.subtype) {
                case "Dado_casillas":
                  valor_dado = data.valor_dado
                  aux.forEach(element => {
                    element = ""
                  });
                  setCasillas(aux)
                  casillas = data.casillas_nuevas.split(",");
                  casillas.forEach(element => {
                    aux[element] = "parpadea"
                  });
                  setVprap(aux)
                  pulsarDado()
                  setIsRunning(false) 
                  setShow4(!show4)
                  setShow4(!show4)
                  break

                case "Pregunta":               
                  enunciado = data.enunciado
                  r1 = data.r1
                  r2 = data.r2
                  r3 = data.r3
                  r4 = data.r4
                  rc = data.rc
                  quesito = data.quesito
                  tematicaPregunta = data.tematica
                  fun_colorTematica(tematicaPregunta)
                  setTematicaPregunta(tematicaPregunta)
                  setR1(r1)
                  setR2(r2)
                  setR3(r3)
                  setR4(r4)
                  setRc(rc)
                  setEnunciado(enunciado)
                  setQuesito(quesito)
                  vaciarRespuestas()
                  setShow4(!show4)
                  setShow4(!show4)

                  //Mostrar la pregunta a todos
                  setShow(true)
                  break
              }
              break
            case "Accion":
              switch(data.subtype) {
                case "Dados":
                  //vaciarRespuestas()
                  vaciarCasillas()
                  setShow4(!show4)
                  setShow4(!show4)
                  break
              }
              break
            case "Fin":
              break

            case "Chat":
              break
            
            case "Peticion":
              switch(data.subtype) {
                case "Tirar_dado":
                  break
                case "Movimiento_casilla":
                  if (vectorJugadorTurno == "vector1"){
                    vector1[indiceJugadorTurno].posicion = data.casilla_elegida
                  }
                  else {
                    vector2[indiceJugadorTurno].posicion = data.casilla_elegida
                  }
                  setV1(vector1)
                  setV2(vector2)
                  setShow4(!show4)
                  setShow4(!show4)
                  break
              }
            break  
            case "Actualizacion":
              console.log("Entramos a actualizar")
              //Comprbamos si el jugador al que le tocaba ha respondido bien y ha ganado un quesito
              if(data.quesito == true && data.esCorrecta == "true"){
                console.log("Entramos en temática: " + tematicaPregunta)
                switch(data.tematica) {
                  case "Ciencia":
                    varAux = QuesoVerde
                  break
                  case "Arte":
                    varAux = QuesoRojo
                  break
                  case "Deportes":
                    varAux = QuesoNaranja
                  break
                  case "Entretenimiento":
                    varAux = QuesoRosa
                  break
                  case "Geografia":
                    varAux = QuesoAzul
                  break
                  case "Historia":
                    varAux = QuesoAmarillo
                  break
                }
                //miramos a quen le toca el turno y actualizamos los vector
                setVarAux(varAux)
                console.log(indiceJugadorTurno + " " + vectorJugadorTurno)
                if (vectorJugadorTurno == "vector1"){
                  vector1[indiceJugadorTurno].quesitos.push(varAux)
                }
                else {
                  vector2[indiceJugadorTurno].quesitos.push(varAux)
                }
                setV1(vector1)
                setV2(vector2)
                console.log(vector1)
                console.log(vector2)
              }

              if (data.esCorrecta == "true"){
                aux2[data.r1-1] = "green"
              }
              else {
                aux2[data.r1-1] = "red"
              }
              console.log(aux2)
              setColorPregunta(aux2)
              setShow(!show)
              setShow(!show)
              console.log(colorPregunta)
              vaciarCasillas()
              setShow3(true)
              setShow4(!show4)
              setShow4(!show4)
              break
          } 
        }
        console.log("Sale del autómata")
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

  const enviarMensaje = () => {
    console.log("Enviar mensaje al backend ")
    console.log(JSON.stringify({
      OK:"true",
      jugador:usuario,
      type:type,
      subtype: subtype,
      valor_dado: valor_dado,
      casilla_elegida: casilla_elegida,
      casillas_nuevas: casillas_nuevas,
      enunciado: enunciado,
      tematica: tematicaPregunta,
      r1: r1,
      r2: r2,
      r3: r3,
      r4: r4,
      rc: rc,
      quesito: quesito,
      esCorrecta: esCorrecta,
      mensage_chat: mensage_chat,
      error: errorPartida
    }))
    chatSocketRef.current.send(
      JSON.stringify({
        OK:"true",
        jugador:usuario,
        type:type,
        subtype: subtype,
        valor_dado: valor_dado,
        casilla_elegida: casilla_elegida,
        casillas_nuevas: casillas_nuevas,
        enunciado: enunciado,
        tematica: tematicaPregunta,
        r1: r1,
        r2: r2,
        r3: r3,
        r4: r4,
        rc: rc,
        quesito: quesito,
        esCorrecta: esCorrecta,
        mensage_chat: mensage_chat,
        error: errorPartida
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
        transition: `transform ${time}s` 
      });
      console.log("Valor del dado en la función del Dado: " + valor_dado)
      switch(valor_dado) {
        case "1":
          setCubeStyle({
            ...cubeStyle,
            transform: 'translateY(400px) rotateX(3600deg) rotateY(3600deg) rotateZ(3600deg)'
          });
          break;
        case "2":
          setCubeStyle({
            ...cubeStyle,
            transform: 'translateY(400px) rotateX(4410deg) rotateY(3600deg) rotateZ(3600deg)'
          });
          break;
        case "3":
          setCubeStyle({
            ...cubeStyle,
            transform: 'translateY(400px) rotateX(3600deg) rotateY(4410deg) rotateZ(3600deg)'
          });
          break;
        case "4":
          setCubeStyle({
            ...cubeStyle,
            transform: 'translateY(400px) rotateX(3600deg) rotateY(2430deg) rotateZ(3600deg)'
          });
          break;
        case "5":
          setCubeStyle({
            ...cubeStyle,
            transform: 'translateY(400px) rotateX(2430deg) rotateY(3600deg) rotateZ(3600deg)'
          });
          break;
        case "6":
          setCubeStyle({
            ...cubeStyle,
            transform: 'translateY(400px) rotateX(3600deg) rotateY(1980deg) rotateZ(3600deg)'
          });
          break;
      };
    }, time * 100);
  }

  //Función que se ejecuta cuando se selecciona la casilla
  function vaciarCasillas() {
    for (let i = 0; i < aux.length; i++) {
      aux[i] = "";
    }
    setVprap(aux)
  }

    //Función que se ejecuta cuando se selecciona la casilla
  function vaciarRespuestas() {
    console.log(colorPregunta)
    console.log(aux2)
    for (let i = 0; i < 4; i++) {
      aux2[i] = "white";
    }
    setColorPregunta(aux2)
    console.log(colorPregunta)
    console.log(aux2)
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

  /* --- LANZAR DADO --- */
  function PosicionElementos() {
    if (vectorJugadorTurno == "vector1"){
      console.log(indiceJugadorTurno + " " + vectorJugadorTurno)
      return (
        <div style={{ position:"absolute", top:posv1[indiceJugadorTurno].top, left:posv1[indiceJugadorTurno].left, height:"26.5%", width:"9%"}}> {/*Nos falta añadir los porcentajes de top y left*/ } 
            <div style={{position:"absolute", left:"19%", top:"5%"}}>
                {RelojJugada()}
            </div >
            <div style={{position:"absolute", left:"26%",top:"-100%", cursor:"pointer", zIndex:"5"}} onClick={() => {
              console.log(jugadorActual)
              if (jugadorActual==1){
                //Peticion para que nos envien el dado y las casillas
                type = "Peticion"
                subtype = "Tirar_dado"
                console.log("Envio Tirar_dado")
                enviarMensaje()
              } else {
                console.log("Esperando a que pulse el dado el jugador que le toca")
              }
            }}>
                <Dado/>
            </div>
        </div>
      )
    }
    else {
      console.log(indiceJugadorTurno + " " + vectorJugadorTurno)
      return (
        <div style={{ position:"absolute", top:posv2[indiceJugadorTurno].top, left:posv2[indiceJugadorTurno].left, height:"26.5%", width:"9%"}}> {/*Nos falta añadir los porcentajes de top y left*/ } 
            <div style={{position:"absolute", left:"19%", top:"5%"}}>
                {RelojJugada()}
            </div >
            <div style={{position:"absolute", left:"26%",top:"-100%", cursor:"pointer", zIndex:"5"}} onClick={() => {
              console.log(jugadorActual)
              if (jugadorActual==1){
                //Peticion para que nos envien el dado y las casillas
                type = "Peticion"
                subtype = "Tirar_dado"
                console.log("Envio Tirar_dado")
                enviarMensaje()
              } else {
                console.log("Esperando a que pulse el dado el jugador que le toca")
              }
            }}>
                <Dado/>
            </div>
        </div>
      )
    }
  }

  function moverFicha(props) {
    if (vectorJugadorTurno == "vector1"){
      vector1[indiceJugadorTurno].posicion = props
    }
    else {
      vector2[indiceJugadorTurno].posicion = props
    }
    
    type = "Peticion"
    subtype = "Movimiento_casilla"
    casilla_elegida = props
    console.log("Envio Mover casilla" + casillaSeleccionada + " " + props)
    enviarMensaje()
  }

  function quesitos(props) {
    return props.map((elemento, indice) => (
      <img src={elemento} className="App-imagenJugador" style={{ width: "25%", height: "50%", position: "absolute", top:"25%", left:"40%", backgroundColor:"none"}}/>
    ));
  }      
  
  /* --- JUGADORES IZQUIERDA --- */
  function jugadores1() {
    return vector1.map((props, indice) => (
      <div style={{ width: "94%", height: "92%", position: "absolute", zIndex: "0", top:`4%`, left:"3%"}}>  
        <div className='App-EsJugador' style={{top: `${(indice % 3) * 30}%`, left:"0%", width: "30%", height: "30%"}} >
            <div style={{marginTop: "2%"}}>
                <img src={props.ficha} className="App-imagenQuesito" style={{marginRight:"2%"}}/>
                    <a style={{color:"white", fontSize:"30px"}}>{props.nombre} </a>
                <br></br>
            </div>
            <div style={{marginTop:"3%"}}>
                <img src={Cristiano} className="App-imagenJugador" style={{width: "25%", height: "55%", position: "absolute", top:"25%", left:"5%", backgroundColor:"white"}} /><br></br>
                <img src={QuesitosGeneral} className="App-imagenJugador" style={{ width: "25%", height: "50%", position: "absolute", top:"25%", left:"40%", backgroundColor:"none"}}/>
                {/*<img src={props.rojo} className="App-imagenJugador" style={{ width: "25%", height: "50%", position: "absolute", top:"25%", left:"40%", backgroundColor:"none"}}/>
                <img src={props.azul} className="App-imagenJugador" style={{ width: "25%", height: "50%", position: "absolute", top:"25%", left:"40%", backgroundColor:"none"}}/>
                <img src={props.verde} className="App-imagenJugador" style={{ width: "25%", height: "50%", position: "absolute", top:"25%", left:"40%", backgroundColor:"none"}}/>
                <img src={props.amarillo} className="App-imagenJugador" style={{ width: "25%", height: "50%", position: "absolute", top:"25%", left:"40%", backgroundColor:"none"}}/>
                <img src={props.rosa} className="App-imagenJugador" style={{ width: "25%", height: "50%", position: "absolute", top:"25%", left:"40%", backgroundColor:"none"}}/>
                <img src={props.naranja} className="App-imagenJugador" style={{ width: "25%", height: "50%", position: "absolute", top:"25%", left:"40%", backgroundColor:"none"}}/>*/
                quesitos(props.quesitos)
                }
                <br></br>
            </div>
        </div>
      </div>
    ));    
  }  

  /* --- JUGADORES DERECHA --- */
  function jugadores2() {
    return vector2.map((props, indice) => (
        <div style={{ width: "94%", height: "92%", position: "absolute", zIndex: "0", top:"4%", left:"3%"}}>  
            <div className='App-EsJugador' style={{top: `${(indice % 3) * 30}%`, left:"70%", width: "30%", height: "30%"}} >
              <div style={{marginTop: "2%"}}>
                  <img src={props.ficha} className="App-imagenQuesito" style={{marginRight:"2%"}}/>
                      <a style={{color:"white", fontSize:"30px"}}>{props.nombre} </a>
                  <br></br>
              </div>
              <div style={{marginTop:"3%"}}>
                <img src={Cristiano} className="App-imagenJugador" style={{width: "25%", height: "55%", position: "absolute", top:"25%", left:"72%", backgroundColor:"white"}} /><br></br>
                <img src={QuesitosGeneral} className="App-imagenJugador" style={{ width: "25%", height: "50%", position: "absolute", top:"25%", left:"40%", backgroundColor:"none"}}/>
                {/*<img src={props.rojo} className="App-imagenJugador" style={{ width: "25%", height: "50%", position: "absolute", top:"25%", left:"40%", backgroundColor:"none"}}/>
                <img src={props.azul} className="App-imagenJugador" style={{ width: "25%", height: "50%", position: "absolute", top:"25%", left:"40%", backgroundColor:"none"}}/>
                <img src={props.verde} className="App-imagenJugador" style={{ width: "25%", height: "50%", position: "absolute", top:"25%", left:"40%", backgroundColor:"none"}}/>
                <img src={props.amarillo} className="App-imagenJugador" style={{ width: "25%", height: "50%", position: "absolute", top:"25%", left:"40%", backgroundColor:"none"}}/>
                <img src={props.rosa} className="App-imagenJugador" style={{ width: "25%", height: "50%", position: "absolute", top:"25%", left:"40%", backgroundColor:"none"}}/>
                <img src={props.naranja} className="App-imagenJugador" style={{ width: "25%", height: "50%", position: "absolute", top:"25%", left:"40%", backgroundColor:"none"}}/>*/
                quesitos(props.quesitos)
                }
                <br></br>
              </div>
            </div>
        </div>
    ));
  } 

  function fichas1() {
    return vector1.map((props, indice) => (
      <img style={{ position:"absolute", left:posiciones1[indice][props.posicion].l, top:posiciones1[indice][props.posicion].t, height:"3%", width:"3%", zIndex: "5"}} src={props.ficha}/>
  ));
  }

  function fichas2() {
    return vector2.map((props, indice) => (
      <img style={{ position:"absolute", left:posiciones2[indice][props.posicion].l, top:posiciones2[indice][props.posicion].t, height:"3%", width:"3%", zIndex: "5"}} src={props.ficha}/>
  ));
  }

  /* --- TABLERO --- */
  function Linea(props) {
    return(
        <div style={{position:"absolute", height: props.height, width: props.width, top: props.top, left: props.left , transform: props.transform, cursor:"pointer"}}>
            <button className={vparp[props.v6]} style={{ backgroundColor: props.c1, height: "100%", width: props.width1, zIndez:"9", cursor:"pointer"}} onClick={() => { if (jugadorActual==1 && (vparp[props.v6] == "parpadea")){ vaciarCasillas(); setCasillaSeleccionada(props.v6); moverFicha(props.v6) }}}>  </button>
            <button className={vparp[props.v5]} style={{ backgroundColor: props.c2, height: "100%", width:"15%", zIndez:"9", cursor:"pointer"}} onClick={() => { if (jugadorActual==1 && (vparp[props.v5] == "parpadea")){ vaciarCasillas(); setCasillaSeleccionada(props.v5); moverFicha(props.v5) }}}>  </button>
            <button className={vparp[props.v4]} style={{ backgroundColor: props.c3, height: "100%", width:"15%", zIndez:"9", cursor:"pointer"}} onClick={() => { if (jugadorActual==1 && (vparp[props.v4] == "parpadea")){ vaciarCasillas(); setCasillaSeleccionada(props.v4); moverFicha(props.v4) }}}>  </button>
            <button className={vparp[props.v3]} style={{ backgroundColor: props.c4, height: "100%", width:"15%", zIndez:"9", cursor:"pointer"}} onClick={() => { if (jugadorActual==1 && (vparp[props.v3] == "parpadea")){ vaciarCasillas(); setCasillaSeleccionada(props.v3); moverFicha(props.v3) }}}>  </button>
            <button className={vparp[props.v2]} style={{ backgroundColor: props.c5, height: "100%", width:"15%", zIndez:"9", cursor:"pointer"}} onClick={() => { if (jugadorActual==1 && (vparp[props.v2] == "parpadea")){ vaciarCasillas(); setCasillaSeleccionada(props.v2); moverFicha(props.v2) }}}>  </button>
            <button className={vparp[props.v1]} style={{ backgroundColor: props.c6, height: "100%", width:"15%", zIndez:"9", cursor:"pointer"}} onClick={() => { if (jugadorActual==1 && (vparp[props.v1] == "parpadea")){ vaciarCasillas(); setCasillaSeleccionada(props.v1); moverFicha(props.v1) }}}>  </button>
        </div>
    );
  }

  //Verificación de la respuesta
  function esCorrectaRespuesta(num) {
    let a = num + 1
    console.log(a)
    console.log(rc)
    if (a == rc) {
      colorPregunta[num] = "green"
      esCorrecta = "true"
    }
    else {
      colorPregunta[num] = "red"
      esCorrecta = "false"

    }
    setesCorrecta(esCorrecta)
    if(quesito == true && esCorrecta == "true"){
      switch(tematicaPregunta) {
        case "Ciencia":
          varAux = QuesoVerde
        break
        case "Arte":
          varAux = QuesoRojo
        break
        case "Deportes":
          varAux = QuesoNaranja
        break
        case "Entretenimiento":
          varAux = QuesoRosa
        break
        case "Geografia":
          varAux = QuesoAzul
        break
        case "Historia":
          varAux = QuesoAmarillo
        break
      }
      setVarAux(varAux)
      if (vectorJugadorTurno == "vector1"){
        vector1[indiceJugadorTurno].quesitos.push(varAux)
      }
      else {
        vector2[indiceJugadorTurno].quesitos.push(varAux)
      }
    }
    setV1(vector1)
    setV2(vector2)
    setContestada(true)
    console.log(colorPregunta)
    setColorPregunta(colorPregunta)
    console.log(colorPregunta)
    setesCorrecta(esCorrecta)
    setShow3(true)
    //Enviamos el mensaje "Actualización"
    enunciado = ""
    r1 = num + 1
    r2 = ""
    r3 = ""
    r4 = ""
    rc = ""
    type = "Actualizacion"
    enviarMensaje()
    r1 = ""
  }

  function fun_colorTematica(tematicaPregunta){
    switch(tematicaPregunta){
      case "Ciencia":
        setColorTematica("green")
      break
      case "Arte":
        setColorTematica("red")
      break
      case "Deportes":
        setColorTematica("orange")
      break
      case "Entretenimiento":
        setColorTematica("pink")
      break
      case "Geografia":
        setColorTematica("blue")
      break
      case "Historia":
        setColorTematica("yellow")
      break
      

    }
  }

  /* --- PREGUNTA --- */
  function Respuesta(props) {
      return (
      <div  style= {{width:props.width, height:props.height, top: props.top, left: props.left, position:"absolute", border: "3px solid black", borderRadius:props.border, backgroundColor:props.color, cursor:"pointer"}} onClick={() => {if (jugadorActual==1 && !contestada){esCorrectaRespuesta(props.num)}}}>
          <div style={{marginTop:props.marginTop}}>
              <a style={{fontSize:props.size}}>
                  {props.letra} {props.respuesta}
              </a>
          </div>
      </div>
      );
  }

  /* --- MENSAJE POR PANTALLA --- */
  function mensajePantalla(props) {
    if (vectorJugadorTurno == "vector1"){
      return (
        <div style={{position:"absolute", top:"82%", left: "45%", color:"white", fontSize:"30px"}}><a> Es el turno de {vector1[indiceJugadorTurno].nombre}</a></div>
      );
    }
    else {
      return (
        <div style={{position:"absolute", top:"82%", left: "45%", color:"white", fontSize:"30px"}}><a> Es el turno de {vector2[indiceJugadorTurno].nombre}</a></div>
      );
    }
  }

  return (
    <div className="App">
      <header className="App-headerJuego" style={{zIndex: "1"}}> 
        {show4 ? (
          <div>
              <div style={{ position: "absolute", zIndex: "2", height:"700px", width:"714px", top:"2%", left:"31%",borderRadius:"5%", backgroundColor:"white"}} ><img src={URL + "/static/images/objetos/10.png"} style={{width:"100%",marginTop:"0%"} }/>
              </div>       
              <div style={{ position: "absolute", zIndex: "3", height:"700px", width:"700px", top:"9%", left:"30%"}}>
                  {/* --- TABLERO --- */}  
                  <Linea height="10.5%" width="37%" top="75.5%" left="35%" c1="blue" c2="white" c3="red" c4="yellow" c5="white" c6="orange" width1="15%" transform="rotate(180deg)" v1={1} v2={2} v3={3} v4={4} v5={5} v6={6}/> 
                  <Linea height="10.5%" width="37%" top="55.5%" left="70.5%" c1="red" c2="white" c3="green" c4="orange" c5="white" c6="blue" width1="15%" transform="rotate(120deg)" v1={8} v2={9} v3={10} v4={11} v5={12} v6={13}/>  
                  <Linea height="10.5%" width="37%" top="14%" left="70.5%" c1="green" c2="white" c3="pink" c4="blue" c5="white" c6="red" width1="15%" transform="rotate(60deg)" v1={15} v2={16} v3={17} v4={18} v5={19} v6={20}/> 
                  <Linea height="10.5%" width="37%" top="-6.5%" left="35.5%" c1="pink" c2="white" c3="yellow" c4="red" c5="white" c6="green" width1="15%" transform="" v1={22} v2={23} v3={24} v4={25} v5={26} v6={27}/>  
                  <Linea height="10.5%" width="37%" top="14%" left="0%" c1="yellow" c2="white" c3="orange" c4="green" c5="white" c6="pink" width1="15%" transform="rotate(-60deg)" v1={29} v2={30} v3={31} v4={32} v5={32} v6={33}/>
                  <Linea height="10.5%" width="37%" top="55.5%" left="0%" c1="orange" c2="white" c3="blue" c4="pink" c5="white" c6="yellow" width1="15%" transform="rotate(-120deg)" v1={36} v2={37} v3={38} v4={39} v5={40} v6={41}/> 
                  
                  
                  <Linea height="10%" width="41%" top="60%" left="18.6%" c1="white" c2="orange" c3="yellow" c4="blue" c5="red" c6="pink" width1="25%" transform="rotate(-60deg)" v1={46} v2={45} v3={44} v4={43} v5={42} v6=""/> 
                  <Linea height="10%" width="41%" top="60%" left="47.6%" c1="white" c2="blue" c3="orange" c4="red" c5="green" c6="yellow" width1="25%" transform="rotate(-120deg)" v1={51} v2={50} v3={49} v4={48} v5={47} v6=""/> 
                  <Linea height="10%" width="41%" top="35%" left="62%" c1="white" c2="red" c3="blue" c4="green" c5="pink" c6="orange" width1="25%" transform="scaleX(-1)" v1={56} v2={55} v3={54} v4={53} v5={52} v6=""/> 
                  <Linea height="10%" width="41%" top="9.7%" left="47.6%" c1="white" c2="green" c3="red" c4="pink" c5="yellow" c6="blue" width1="25%" transform="rotate(+120deg)" v1={61} v2={60} v3={59} v4={58} v5={57} v6="" /> 
                  <Linea height="10%" width="41%" top="9.7%" left="18.6%" c1="white" c2="pink" c3="green" c4="yellow" c5="orange" c6="red" width1="25%" transform="rotate(+60deg)" v1={66} v2={65} v3={64} v4={63} v5={62} v6=""/> 
                  <Linea height="10%" width="41%" top="35%" left="4%" c1="white" c2="yellow" c3="pink" c4="orange" c5="blue" c6="green" width1="25%" transform="0" v1={71} v2={70} v3={69} v4={68} v5={67} v6=""/>
                  
                   
                  
                  <img className={vparp[28]} style={{ position:"absolute", transform: "rotate(-2deg)", left:"20.9%", height:"15%", width:"19%", top:"-6%", zIndex: "3", border:"", cursor:"pointer"}} src={Esquina_azul} onClick={() => { if (jugadorActual==1 && (vparp[28] == "parpadea")){ vaciarCasillas(); setCasillaSeleccionada(28); moverFicha(28) }}}/>
                  <img className={vparp[21]} style={{ position:"absolute", transform: "rotate(+59.5deg)", left:"66%", height:"15%", width:"19%", top:"-6.9%", zIndex: "3", border:"", cursor:"pointer"}} src={Esquina_naranja} onClick={() => { if (jugadorActual==1 && (vparp[21] == "parpadea")){ vaciarCasillas(); setCasillaSeleccionada(21); moverFicha(21) }}}/>
                  <img className={vparp[14]} style={{ position:"absolute", transform: "rotate(+118deg)", left:"89.8%", height:"14%", width:"18%", top:"32%", zIndex: "3", border:"", cursor:"pointer"}} src={Esquina_amarilla} onClick={() => { if (jugadorActual==1 && (vparp[14] == "parpadea")){ vaciarCasillas(); setCasillaSeleccionada(14); moverFicha(14) }}}/>
                  <img className={vparp[7]} style={{ position:"absolute", transform: "rotate(-182deg)", left:"68.3%", height:"14%", width:"18%", top:"71.5%", zIndex: "3", border:"", cursor:"pointer"}} src={Esquina_rosa} onClick={() => { if (jugadorActual==1 && (vparp[7] == "parpadea")){ vaciarCasillas(); setCasillaSeleccionada(7); moverFicha(7) }}}/>
                  <img className={vparp[0]} style={{ position:"absolute", transform: "rotate(237deg)", left:"23%", height:"14%", width:"18%", top:"72.6%", zIndex: "3", border:"", cursor:"pointer"}} src={Esquina_verde} onClick={() => { if (jugadorActual==1 && (vparp[0] == "parpadea")){ vaciarCasillas(); setCasillaSeleccionada(0); moverFicha(0) }}}/>
                  <img className={vparp[35]} style={{ position:"absolute", transform: "rotate(297deg)", left:"-1%", height:"14%", width:"18%", top:"34%", zIndex: "3", border:"", cursor:"pointer"}} src={Esquina_roja} onClick={() => { if (jugadorActual==1 && (vparp[35] == "parpadea")){ vaciarCasillas(); setCasillaSeleccionada(35); moverFicha(35) }}}/>

                  <div className={vparp[72]} style={{width:"17%", height:"20%", left:"44%", top:"29%", position:"absolute", zIndex: "0" }} onClick={() => { if (jugadorActual==1 && (vparp[72] == "parpadea")){ vaciarCasillas(); setCasillaSeleccionada(72); moverFicha(72) }}}>
                      <img src={B2B} style={{width:"110%",marginTop:"0%"} }/>
                  </div>

                  {/* --- FICHAS --- m */} 
                  {fichas1()}
                  {fichas2()}
                  
                  {/*
                  <img style={{ position:"absolute", left:amarillo[vector1[0].posicion].l, top:amarillo[vector1[0].posicion].t, height:"3%", width:"3%", zIndex: "3"}} src={vector1[0].ficha}/>
                  <img style={{ position:"absolute", left:rojo    [vector1[1].posicion].l, top:rojo    [vector1[0].posicion].t, height:"3%", width:"3%", zIndex: "3"}} src={vector1[1].ficha}/> 
                  <img style={{ position:"absolute", left:azul    [vector1[2].posicion].l, top:azul    [vector1[0].posicion].t, height:"3%", width:"3%", zIndex: "3"}} src={vector1[2].ficha}/>
                  <img style={{ position:"absolute", left:rosa    [vector2[0].posicion].l, top:rosa    [vector1[0].posicion].t, height:"3%", width:"3%", zIndex: "3"}} src={vector2[0].ficha}/>
                  <img style={{ position:"absolute", left:verde   [vector2[1].posicion].l, top:verde   [vector1[0].posicion].t, height:"3%", width:"3%", zIndex: "3"}} src={vector2[1].ficha}/>
                  <img style={{ position:"absolute", left:naranja [vector2[2].posicion].l, top:naranja [vector1[0].posicion].t, height:"3%", width:"3%", zIndex: "3"}} src={vector2[2].ficha}/>
                  */}
                    
              </div>

              <PosicionElementos/>
              {jugadores1()}
              {jugadores2()}
              
              {mensajePantalla()}

              <button className="App-boton" style= {{top: "87%", left: "30%", position:"absolute", zIndex:"6"}} onClick={() => {setShow1(!show1)}}>
                  Pausar Partida
              </button>
              <button className="App-boton" style= {{top: "87%", left: "53%", position:"absolute", zIndex:"6"}} onClick={() => {setShow2(!show2)}}>
                  Abandonar Partida
              </button>
              <img style={{ position:"absolute", left:"93%", height:"80px", width:"110px", top:"1%", zIndex: "4", cursor:"pointer"}} src={ChatImg}onClick={() => { setShow3(true)}}/>

              {/* --- PREGUNTA --- */}  
              {show ? (
              <div className="App-CuadradoBlanco"  style= {{width:"70%", height:"70%", top: "10%", left: "15%", position:"absolute", zIndex:"6", backgroundColor: "rgba(0, 0, 0, 0)", border:"none"}}>
                  <Respuesta width="100%" height="12%" left="-0.2%" top="-0.5%" size="50px" respuesta={tematicaPregunta} border= "40px 40px 0px 0px" marginTop="0%" color={colorTematica}/>
                  <Respuesta width="100%" height="12%" left="-0.2%" top="12%" size="30px" respuesta={enunciado} border= "0px 0px 0px 0px" marginTop="1.2%" color={colorTematica} res=""/>
                  <Respuesta width="70%" height="19%" left="-0.2%" top="24%" letra="A)" size="30px" respuesta={r1} border= "0px 0px 0px 0px" marginTop="4%" color={colorPregunta[0]} num={0}/>
                  <Respuesta width="70%" height="19%" left="-0.2%" top="43%" letra="B)" size="30px" respuesta={r2} border= "0px 0px 0px 0px" marginTop="4%" color={colorPregunta[1]} num={1}/>
                  <Respuesta width="70%" height="19%" left="-0.2%" top="62%" letra="C)" size="30px" respuesta={r3} border= "0px 0px 0px 0px" marginTop="4%" color={colorPregunta[2]} num={2}/>
                  <Respuesta width="70%" height="19%" left="-0.2%" top="81%"letra="D)" size="30px" respuesta={r4} border= "0px 0px 0px 0px" marginTop="4%" color={colorPregunta[3]} num={3}/>

                  <div  style= {{width:"30%", height:"76%", top: "24%", left: "70%", position:"absolute",  border: "3px solid black", backgroundColor:colorTematica}} >
                      <br></br><br></br><br></br>
                          <a style={{fontSize:"30px"}}> 
                          Tiempo para responder
                      </a>
                      <div style={{top: "40%", left: "32%", position:"absolute", colorText:"white"}}>
                          {RelojRespuesta()}
                      </div>
                      {show3 ? (
                      <button className="App-boton" style= {{top: "80%", left: "43%", position:"absolute", zIndex:"6"}} onClick={() => {setShow(false); setShow3(false); setContestada(false);vaciarRespuestas()}}>
                          Cerrar Pregunta
                      </button>
                      ) : (
                          <div/>
                      )}
                  </div>
              </div>
              ) : (
                <div style= {{zIndex:"0", }}/>
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
                <div style= {{zIndex:"0", }}/>
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
                  <button className="App-botonCancelar" style= {{width:"20%", height:"15%", top: "70%", left: "25%", position:"absolute", fontSize:"30px"}} onClick={() => { setShow2(!show2)}}>
                      No
                  </button>
                  <button className="App-botonConfirmar" style= {{width:"20%", height:"15%", top: "70%", left: "55%", position:"absolute", fontSize:"30px"}} onClick={() => {navigate(process.env.PUBLIC_URL+ '/MenuJuego');}}>
                      Si
                  </button>
              </div>
              ) : (
              <div style= {{zIndex:"0", }}/>
              )}
          </div >
              ) : (
                <div style= {{zIndex:"0", }}/>
            )}
        </header>
    </div> 
  );
};
export default Tablero;