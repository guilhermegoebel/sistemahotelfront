import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Reservas.css';

const Reservas = () => {
  const [reservas, setReservas] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false); // Controla exibição do formulário

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
    setMostrarFormulario(false); // Ocultar o formulário após adicionar a reserva
  };

  const handleEdit = (id) => {
    alert(`Editar reserva com ID: ${id}`);
  };

  const handleDelete = (id) => {
    setReservas(reservas.filter((reserva) => reserva.id !== id));
  };

  const handleCheckIn = (id) => {
    alert(`Check-in para a reserva com ID: ${id}`);
  };

  const handleCheckOut = (id) => {
    alert(`Check-out para a reserva com ID: ${id}`);
  };

  const handleView = (id) => {
    alert(`Visualizar detalhes da reserva com ID: ${id}`);
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
          <Form.Group controlId="formNomeHospede" className="mb-2">
            <Form.Label>Nome do Hóspede</Form.Label>
            <Form.Control
              type="text"
              name="nomeHospede"
              value={novoHospede.nomeHospede}
              onChange={handleInputChange}
              placeholder="Nome do Hóspede"
            />
          </Form.Group>

          <Form.Group controlId="formCpf" className="mb-2">
            <Form.Label>CPF</Form.Label>
            <Form.Control
              type="text"
              name="cpf"
              value={novoHospede.cpf}
              onChange={handleInputChange}
              placeholder="CPF"
            />
          </Form.Group>

          <Form.Group controlId="formEmail" className="mb-2">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={novoHospede.email}
              onChange={handleInputChange}
              placeholder="Email"
            />
          </Form.Group>

          <Form.Group controlId="formCheckIn" className="mb-2">
            <Form.Label>Data de Check-in</Form.Label>
            <Form.Control
              type="date"
              name="checkIn"
              value={novoHospede.checkIn}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formCheckOut" className="mb-2">
            <Form.Label>Data de Check-out</Form.Label>
            <Form.Control
              type="date"
              name="checkOut"
              value={novoHospede.checkOut}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formQuarto" className="mb-2">
            <Form.Label>Quarto</Form.Label>
            <Form.Control
              type="text"
              name="quarto"
              value={novoHospede.quarto}
              onChange={handleInputChange}
              placeholder="Número do Quarto"
            />
          </Form.Group>

          <Form.Group controlId="formDetalhesRelevantes" className="mb-2">
            <Form.Label>Detalhes Relevantes</Form.Label>
            <Form.Control
              type="text"
              name="detalhesRelevantes"
              value={novoHospede.detalhesRelevantes}
              onChange={handleInputChange}
              placeholder="Ex: Preferência de andar, vista do quarto, etc."
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
              <td>{formatarData(reserva.checkIn)}</td> {/* Formatar data */}
              <td>{formatarData(reserva.checkOut)}</td> {/* Formatar data */}
              <td>{reserva.quarto}</td>
              <td>{reserva.detalhesRelevantes}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(reserva.id)} className="btn">Editar</Button>
                <Button variant="danger" onClick={() => handleDelete(reserva.id)} className="btn">Excluir</Button>
                <Button variant="success" onClick={() => handleCheckIn(reserva.id)} className="btn">Check-in</Button>
                <Button variant="info" onClick={() => handleCheckOut(reserva.id)} className="btn">Check-out</Button>
                <Button variant="primary" onClick={() => handleView(reserva.id)} className="btn">Visualizar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Reservas;
