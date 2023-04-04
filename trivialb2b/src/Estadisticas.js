import React, { useState, useEffect, useRef} from "react";
import './Estilos/App.css';
import { useNavigate } from 'react-router-dom';
import { useSession, setSession } from 'react-session';

//const URL = "https://6e01-146-158-156-138.eu.ngrok.io/api/usuarios/login/";
const URL = "http://51.142.118.71:8000/api/usuarios/login/";



const Estadisticas = () => {
  const data = [
    { id: 1, title: 'Elemento 1', image: 'https://via.placeholder.com/150' },
    { id: 2, title: 'Elemento 2', image: 'https://via.placeholder.com/150' },
    { id: 3, title: 'Elemento 3', image: 'https://via.placeholder.com/150' },
    { id: 4, title: 'Elemento 4', image: 'https://via.placeholder.com/150' },    { id: 1, title: 'Elemento 1', image: 'https://via.placeholder.com/150' },
    { id: 2, title: 'Elemento 2', image: 'https://via.placeholder.com/150' },
    { id: 3, title: 'Elemento 3', image: 'https://via.placeholder.com/150' },
    { id: 4, title: 'Elemento 4', image: 'https://via.placeholder.com/150' },    { id: 1, title: 'Elemento 1', image: 'https://via.placeholder.com/150' },
    { id: 2, title: 'Elemento 2', image: 'https://via.placeholder.com/150' },
    { id: 3, title: 'Elemento 3', image: 'https://via.placeholder.com/150' },
    { id: 4, title: 'Elemento 4', image: 'https://via.placeholder.com/150' }]
  const [visibleItems, setVisibleItems] = useState(4);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
        setVisibleItems(visibleItems + 4);
      }
    };
    containerRef.current.addEventListener('scroll', handleScroll);
    return () => {
      containerRef.current.removeEventListener('scroll', handleScroll);
    };
  }, [visibleItems])

  return (
    <div className="horizontal-list" ref={containerRef}>
      {data.slice(0, visibleItems).map((item) => (
        <div key={item.id} className="horizontal-list__item">
          <img src={item.image} alt={item.title} />
          <h2>{item.title}</h2>
        </div>
      ))}
    </div>
  );
};

export default Estadisticas;