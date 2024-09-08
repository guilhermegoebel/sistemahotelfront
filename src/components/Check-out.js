import React from 'react';
import Table from 'react-bootstrap/Table';

const CheckOut = ({ estadiasConcluidas }) => {
  return (
    <div className="container mt-4">
      <h1>Check-out Concluído</h1>
      <Table striped bordered hover className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>CPF ou CNPJ</th>
            <th>Data de Check-in</th>
            <th>Data de Check-out</th>
            <th>Número de Crianças</th>
            <th>Número de Adultos</th>
            <th>Número de Quartos</th>
          </tr>
        </thead>
        <tbody>
          {estadiasConcluidas.map((reserva) => (
            <tr key={reserva.id}>
              <td>{reserva.id}</td>
              <td>{reserva.nome}</td>
              <td>{reserva.email}</td>
              <td>{reserva.telefone}</td>
              <td>{reserva.cpf}</td>
              <td>{reserva.dataCheckin}</td>
              <td>{reserva.dataCheckout}</td>
              <td>{reserva.numeroCrianca}</td>
              <td>{reserva.numeroAdulto}</td>
              <td>{reserva.numeroQuarto}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CheckOut;
