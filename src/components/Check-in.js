import React from 'react';
import Button from 'react-bootstrap/Button';
import './Check-in.css';

const CheckIn = ({ reserva, onVoltar, onConfirmCheckIn }) => {
  return (
    <div className="container mt-4">
      <h1>Check-in</h1>
      <div className="reserva-detalhes">
        <p><strong>Nome do Hóspede:</strong> {reserva.nome}</p>
        <p><strong>Email:</strong> {reserva.email}</p>
        <p><strong>Telefone:</strong> {reserva.telefone}</p>
        <p><strong>CPF ou CNPJ:</strong> {reserva.cpf}</p>
        <p><strong>Data de Check-in:</strong> {reserva.dataCheckin}</p>
        <p><strong>Data de Check-out:</strong> {reserva.dataCheckout}</p>
        <p><strong>Número de crianças:</strong> {reserva.numeroCrianca}</p>
        <p><strong>Número de adultos:</strong> {reserva.numeroAdulto}</p>
        <p><strong>Número de quartos:</strong> {reserva.numeroQuarto}</p>        
      </div>
      <Button variant="primary" onClick={onVoltar}>Voltar</Button>
      <Button
        variant="success"
        className="ml-2"
        onClick={() => onConfirmCheckIn(reserva)}
      >
        Confirmar Check-in
      </Button>
    </div>
  );
};

export default CheckIn;