import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Reservas.css';

const Reservas = ({ onCheckIn }) => {
  const [reservas, setReservas] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const [novoHospede, setNovoHospede] = useState({
    nomeHospede: '',
    cpf: '',
    email: '',
    checkIn: '',
    checkOut: '',
    quarto: '',
    detalhesRelevantes: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovoHospede({
      ...novoHospede,
      [name]: value,
    });
  };

  const isFormValid = () => {
    return (
      novoHospede.nomeHospede !== '' &&
      novoHospede.cpf !== '' &&
      novoHospede.email !== '' &&
      novoHospede.checkIn !== '' &&
      novoHospede.checkOut !== '' &&
      novoHospede.quarto !== '' &&
      novoHospede.detalhesRelevantes !== ''
    );
  };

  const isDuplicateHospede = () => {
    return reservas.some(
      (reserva) => reserva.nomeHospede.toLowerCase() === novoHospede.nomeHospede.toLowerCase()
    );
  };

  const handleAddReserva = () => {
    if (!isFormValid()) {
      alert('Preencha todos os campos antes de adicionar a reserva.');
      return;
    }

    if (isDuplicateHospede()) {
      alert('Este hóspede já existe. Por favor, use um nome diferente.');
      return;
    }

    const novaReserva = {
      ...novoHospede,
      id: reservas.length + 1,
    };

    setReservas([...reservas, novaReserva]);
    setNovoHospede({ nomeHospede: '', cpf: '', email: '', checkIn: '', checkOut: '', quarto: '', detalhesRelevantes: '' });
    setMostrarFormulario(false);
  };

  // Função para formatar a data
  const formatarData = (data) => {
    const partes = data.split('-');
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
  };

  return (
    <div className="container mt-4">
      <h1>Lista de Reservas</h1>

      <Button variant="primary" onClick={() => setMostrarFormulario(!mostrarFormulario)}>
        {mostrarFormulario ? 'Fechar Formulário' : 'Adicionar Reserva'}
      </Button>

      {mostrarFormulario && (
        <Form className="mb-4 mt-4">
          <Form.Group>
            <Form.Label>Nome do Hóspede</Form.Label>
            <Form.Control
              type="text"
              name="nomeHospede"
              value={novoHospede.nomeHospede}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>CPF</Form.Label>
            <Form.Control
              type="text"
              name="cpf"
              value={novoHospede.cpf}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={novoHospede.email}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Data de Check-in</Form.Label>
            <Form.Control
              type="date"
              name="checkIn"
              value={novoHospede.checkIn}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Data de Check-out</Form.Label>
            <Form.Control
              type="date"
              name="checkOut"
              value={novoHospede.checkOut}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Quarto</Form.Label>
            <Form.Control
              type="text"
              name="quarto"
              value={novoHospede.quarto}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Detalhes Relevantes</Form.Label>
            <Form.Control
              as="textarea"
              name="detalhesRelevantes"
              value={novoHospede.detalhesRelevantes}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Button variant="primary" onClick={handleAddReserva}>
            Adicionar Reserva
          </Button>
        </Form>
      )}

      <Table striped bordered hover className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome do Hóspede</th>
            <th>Data de Check-in</th>
            <th>Data de Check-out</th>
            <th>Quarto</th>
            <th>Detalhes Relevantes</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {reservas.map((reserva) => (
            <tr key={reserva.id}>
              <td>{reserva.id}</td>
              <td>{reserva.nomeHospede}</td>
              <td>{formatarData(reserva.checkIn)}</td>
              <td>{formatarData(reserva.checkOut)}</td>
              <td>{reserva.quarto}</td>
              <td>{reserva.detalhesRelevantes}</td>
              <td>
                <div className="btn-group">
                  <Button variant="success" onClick={() => onCheckIn(reserva)} className="btn">Check-in</Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Reservas;
