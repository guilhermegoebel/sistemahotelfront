import React, { useState } from 'react';
import Reservas from './components/Reservas.js';
import CheckIn from './components/Check-in.js';

function App() {
  const [reservaSelecionada, setReservaSelecionada] = useState(null);

  const handleCheckIn = (reserva) => {
    setReservaSelecionada(reserva);
  };

  const handleVoltar = () => {
    setReservaSelecionada(null);
  };

  return (
    <div className="App">
      {reservaSelecionada ? (
        <CheckIn reserva={reservaSelecionada} onVoltar={handleVoltar} />
      ) : (
        <Reservas onCheckIn={handleCheckIn} />
      )}
    </div>
  );
}

export default App;
