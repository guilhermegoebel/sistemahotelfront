import React from 'react';
import Table from 'react-bootstrap/Table';

const CheckOut = ({ estadiasConcluidas }) => {
  return (
    <div className="container mt-4">
      <h1>Check-out</h1>

      <Table striped bordered hover className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome do Hóspede</th>
            <th>Data de Check-in</th>
            <th>Data de Check-out</th>
            <th>Quarto</th>
            <th>Detalhes Relevantes</th>
          </tr>
        </thead>
        <tbody>
          {estadiasConcluidas.map((reserva) => (
            <tr key={reserva.id}>
              <td>{reserva.id}</td>
              <td>{reserva.nomeHospede}</td>
              <td>{formatarData(reserva.checkIn)}</td>
              <td>{formatarData(reserva.checkOut)}</td>
              <td>{reserva.quarto}</td>
              <td>{reserva.detalhesRelevantes}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

const formatarData = (data) => {
  const partes = data.split('-');
  return `${partes[2]}/${partes[1]}/${partes[0]}`;
};

export default CheckOut;
