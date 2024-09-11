import React, { useState } from 'react';
import Reservas from './components/Reservas.js';
import CheckIn from './components/Check-in.js';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/reservas" element={ <Reservas />} />
          <Route path="/checkin/:id" element={ <CheckIn />} />

          <Route path="*" element={<Navigate to="/reservas" replace />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
