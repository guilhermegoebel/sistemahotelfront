import React, { useState } from 'react';
import Reservas from './components/Reservas';
import CheckOut from './components/Check-out';
import CheckIn from './components/Check-in';

function App() {
  const [reservaSelecionada, setReservaSelecionada] = useState(null);
  const [estadiasConcluidas, setEstadiasConcluidas] = useState([]);

  const handleCheckOut = (reserva) => {
    setEstadiasConcluidas([...estadiasConcluidas, reserva]);
    alert("Reserva movida para check-out concluído.");
  };

  return (
    <div className="App">
      {reservaSelecionada ? (
        <CheckIn reserva={reservaSelecionada} onVoltar={() => setReservaSelecionada(null)} />
      ) : (
        <>
          <Reservas onCheckOut={handleCheckOut} />
          <CheckOut estadiasConcluidas={estadiasConcluidas} />
        </>
      )}
    </div>
  );
}

export default App;
