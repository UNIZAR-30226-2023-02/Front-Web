import React, { useState } from "react";
import './Estilos/App.css';
import { useNavigate } from 'react-router-dom';
import { useSession, setSession } from 'react-session';

//const URL = "https://6e01-146-158-156-138.eu.ngrok.io/api/usuarios/login/";
const URL = "http://51.142.118.71:8000/api/usuarios/login/";


const Estadisticas = () => {
  const [body, setBody] = useState({ username: "", password: "" });
  const [errores, setErorres] = useState("");

  const navigate = useNavigate();
  const handleChange = (e) => {
    setBody({
      ...body,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = () => {
    //console.log(body);
    navigate(process.env.PUBLIC_URL+'/MenuJuego');
    fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      //.then((data) => console.log(data))
      .then((data) => {console.log(data)
        if ((body.username=="") && (body.password=="")) {
          setErorres("Vacio")
        }
        if (data.OK == "True"){
          setErorres("");
          const usuario = { nombre: body.username, contraseña: body.password};
          setSession({usuario});
          navigate(process.env.PUBLIC_URL+'/MenuPrincipal');
        }
        else {
          if (data.error_username !== "") {
            setErorres("Error name");
          }
          else if (data.error_password !== ""){
            setErorres("Error password");
          }
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="App">
      <div className = "App-header" > 
      <div className="App-titulo" > Estadisticas
        <div className="App-Quesitos"> </div> 
        </div>
        </div>
    </div>
  );
};

export default Estadisticas;