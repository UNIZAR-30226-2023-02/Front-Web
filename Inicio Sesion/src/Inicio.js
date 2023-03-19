import { useState } from 'react';

const Inicio = () => {
  const [vista, setVista] = useState('inicio');

  function cambiarVista(nuevaVista) {
    setVista(nuevaVista);
  }

  return (
    <div>
      {vista === 'inicio' && (
        <div>
          <h1>Inicio</h1>
          <button onClick={() => cambiarVista('acerca-de')}>
            Ir a Acerca de
          </button>
        </div>
      )}

      {vista === 'acerca-de' && (
        <div>
          <h1>Acerca de</h1>
          <button onClick={() => cambiarVista('inicio')}>
            Ir a Inicio
          </button>
        </div>
      )}
    </div>
  );
}

export default Inicio;