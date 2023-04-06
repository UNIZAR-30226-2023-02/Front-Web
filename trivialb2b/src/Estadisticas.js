import React, { useState, useEffect, useRef} from "react";
import './Estilos/App.css';
import { useNavigate } from 'react-router-dom';
import { useSession, setSession } from 'react-session';

//const URL = "https://6e01-146-158-156-138.eu.ngrok.io/api/usuarios/login/";
const URL = "http://51.142.118.71:8000/api/usuarios/login/";

  const Estadisticas = () => {
    const roomName= "pepe3";
    const [chatLog, setChatLog] = useState('');
    const [messageInput, setMessageInput] = useState('');
    const chatLogRef = useRef(null);
    const chatSocketRef = useRef(null);
  
    useEffect(() => {
      chatSocketRef.current = new WebSocket(
        `ws://b64b-146-158-156-138.eu.ngrok.io/ws/chat/${roomName}/`
      );
  
      chatSocketRef.current.onmessage = function(event) {
        const data = JSON.parse(event.data);
        setChatLog(prevChatLog => prevChatLog + data.message + '\n');
      };

      chatSocketRef.current.onerror = function(event) {
        console.error('Chat socket error:', event);
      };
      
  
      chatSocketRef.current.onclose = function(event) {
        console.error('Chat socket closed unexpectedly');
      };
  
      return () => {
        chatSocketRef.current.close();
      };
    }, [roomName]);
  
    useEffect(() => {
      chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
    }, [chatLog]);
  
    function handleMessageInputChange(event) {
      setMessageInput(event.target.value);
    }
  
    function handleChatMessageSubmit() {
      const message = messageInput.trim();
      if (message) {
        chatSocketRef.current.send(JSON.stringify({ message }));
        setMessageInput('');
      }
    }
  
    function handleKeyPress(event) {
      if (event.key === 'Enter') {
        handleChatMessageSubmit();
      }
    }
  
    return (
      <div style={{position:"absolute", top:"0%", left:"70%", width:"29.6%", height:"100%"}}>
        <textarea
          style={{position:"absolute", top:"0%", left:"0%", width:"100%", height:"90%"}}
          ref={chatLogRef}
          id="chat-log"
          cols="100"
          rows="20"
          value={chatLog}
          readOnly
        />
        <input
          id="chat-message-input"
          type="text"
          size="100"
          value={messageInput}
          onChange={handleMessageInputChange}
          onKeyPress={handleKeyPress}
          style={{position:"absolute", top:"90%", left:"0%", width:"100%", height:"9%", border:" 2px solid black", borderRadius:"0px 0px 30px 30px"}}
        />
        <button id="chat-message-submit" onClick={handleChatMessageSubmit} className="App-botonSinS" style={{position:"absolute", top:"90.2%", left:"76%", fontSize:"30px", width:"25%", height:"9.3%", borderRadius:"50px 0px 30px 50px"}}>
          Enviar
        </button>
      </div>
    );
  };
  

export default Estadisticas;