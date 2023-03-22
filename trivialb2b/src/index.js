import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './Estilos/index.css';
import App from './App';
import InicioSesion from './InicioSesion';
import reportWebVitals from './reportWebVitals';

/*
 * TUTORIAL DE ELEMENTOS
//Creando un elemento con React.createElement
var p = React.createElement('p', {className: 'style-parrafo'}, 'Prueba de react JS');
//Contenedor 'div'
var container = React.createElement('div', {className: 'container'}, p);
//Sintaxis 'div'
var div = (
  <div className='container'>
    <p className='style-parrafo'> Prueba de react JS</p>
  </div>
);

//Los componentes personalizados deben de estar en mayúsculas
function Hola(props) {
  return <p> Prueba de react </p>
}
function Contenedor() {
  return <Hola></Hola>
}

//Manejar propiedades o props
function HolaProps(props) {
  return <p> {props.titulo} </p>
}
//Sacar por pantalla más de un elemento con <>
function HolaProps2(props) {
  return (
    <>
    <p> {props.titulo + ' 1'} </p>
    <p> {props.titulo + ' ' + (1+props.indice)} </p>
    </>
  )
}
function Contenedor1() {
  return <HolaProps2 titulo = "Prueba de React con props" indice={10} />
}


//Operador Spread
function Elemento1 (props) {
  return (
    <div className='container'>
      <p className='style-parrafo'> {"Titulo: " + props.titulo} </p>
      <p className='style-parrafo'> {"Capitulo: " + props.capitulo} </p>
    </div>
  )
}
function Componente() {
  const props = {
    titulo: "Curso react JS", capitulo:"Introducción JSX"
  }
  return <Elemento1 {...props}/>
}
*/

/* Tutorial Componentes
//Componentes funcionales
function Padre(props) {
  return(
    <div>
      <h1> {"Componente Padre"} </h1>
      <div className='componentes'>
        <div className='componente'>
          <h2> {"Hijo 1"} </h2>
          <p>{"Contador"}</p>
          <p>{"1"}</p>
        </div>
        <div className='componente'>
          <h2> {"Hijo 2"} </h2>
          <p>{"Contador"}</p>
          <p>{"1"}</p>
        </div>
      </div>
    </div>
  )
}

//Extracción y división de componentes funcionales, con clases
class Hijo1 extends React.Component {
  render() {
    return (
      <div className='componente'>
        <h2> {"Hijo 1"} </h2>
        <p>{"Contador"}</p>
        <p>{"1"}</p>
      </div>
    )
  }
}

function Hijo2 (props) {
  return (
    <div className='componente'>
      <h2> {"Hijo 2"} </h2>
      <p>{"Contador"}</p>
      <p>{"1"}</p>
  </div>
  )
}

//Composición de componentes de uno o varios subcomponenetes
//Componentes funcionales
function Padre2(props) {
  return(
    <div>
      <h1> {"Componente Padre"} </h1>
      <div className='componentes'>
        <Hijo1 />
        <Hijo2 />
      </div>
    </div>
  )
}

//Uso de this en class y de props en function
//Extracción y división de componentes funcionales, con clases
class Hijo1This extends React.Component {
  render() {
    return (
      <div className='componente'>
        <h2> {this.props.titulo} </h2>
        <p>{this.props.subtitulo}</p>
        <p>{this.props.cuenta}</p>
      </div>
    )
  }
}
function Hijo2This (props) {
  return (
    <div className='componente'>
      <h2> {props.titulo} </h2>
      <p>{props.subtitulo}</p>
      <p>{props.cuenta}</p>
  </div>
  )
}

//Composición de componentes de uno o varios subcomponenetes
//Componentes funcionales
function Padre3(props) {
  //Manera 1
  const propiedades = {
    titulo:"Hijo2",
    subtitulo: "Contador",
    cuenta: 1
  };
  return(
    <div>
      <h1> {"Componente Padre"} </h1>
      <div className='componentes'>
        <Hijo1This          
          titulo = "Hijo 1"
          subtitulo= "Contador"
          cuenta = {1}
          />
        <Hijo2This {...propiedades}/>
      </div>
    </div>
  )
}
*/
/*
function Padre(props) {
  return(
    <div>
      <h1> {"Componente Padre"} </h1>
      <div className='componentes'>
        <Hijo1 />
        <Hijo2 />
      </div>
    </div>
  )
}

//Hook useState
function Hijo2 (props) {
  
  return (
    <div className='componente'>
      <h2> {props.titulo} </h2>
      <p>{props.subtitulo}</p>
      <p>{props.cuenta}</p>
  </div>
  )
}


//Manejo de State
class Hijo1 extends React.Component {

  //Primera manera con el constructor
  constructor(props){
    super(props);

    //DECLARACIÖN DE ESTADO
    this.state={
      titulo:"Hijo 1",
      subtitulo: "Contador",
      cuenta:1
    }
  }

  //Método de clase, NI HEREDA EL THIS DE LA CLASE
  disminuir() {
    //this.state.cuenta--;
    //this.forceUpdate(); NO RECOMENDABLE
    //Reomendable usar setState
    if (this.state.cuenta <= 0) {
      this.setState({
        ...this.state,
        cuenta:0
      });
    } else {
      this.setState({
        ...this.state,
        cuenta:this.state.cuenta - 1
      });
    }
    console.log(this.state)
  }

  render() {
    return (
      <div className='componente'>
        <h2> {this.state.titulo} </h2>
        <p>{this.state.subtitulo}</p>
        <p>{this.state.cuenta}</p>
        <div className='controles'>
          <span className='control'
            onClick={this.disminuir().bind(this)}> - </span>
          <span className='control'
            onClick={()=>{
              this.state.cuenta++;
            }}> + </span>
        </div>
        <p>{this.state.cuenta}</p>
      </div>      
    );
  }
}

*/


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>
    <InicioSesion />
  </React.StrictMode>

  //Para renderear un elementos: div,
  //Para renderear un contenedor: <Contenedor />
  //<Padre />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
