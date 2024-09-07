import React, { useState } from 'react';
import Reservas from './components/Reservas.js';
import CheckIn from './components/Check-in.js';
import CheckOut from './components/Check-out.js';

function App() {
  const [reservaSelecionada, setReservaSelecionada] = useState(null);
  const [estadiasConcluidas, setEstadiasConcluidas] = useState([]);

  const handleCheckIn = (reserva) => {
    setReservaSelecionada(reserva);
  };

  const handleVoltar = () => {
    setReservaSelecionada(null);
  };

  const handleCheckOut = (reserva) => {
    setEstadiasConcluidas([...estadiasConcluidas, reserva]);
    alert("Adicionado a estadias concluídas");
  };

  return (
    <div className="App">
      {reservaSelecionada ? (
        <CheckIn reserva={reservaSelecionada} onVoltar={handleVoltar} />
      ) : (
        <>
          <Reservas onCheckIn={handleCheckIn} onCheckOut={handleCheckOut} />
          <CheckOut estadiasConcluidas={estadiasConcluidas} />
        </>
      )}
    </div>
  );
}

export default App;
