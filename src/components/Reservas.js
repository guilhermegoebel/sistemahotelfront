import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import CheckIn from './Check-in';
import './Reservas.css';
import reservasData from './reservasData.json';

const Reservas = ({ onCheckOut }) => {
  const [reservas, setReservas] = useState(reservasData);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [editarReserva, setEditarReserva] = useState(null);
  const [novoHospede, setNovoHospede] = useState({
    nome: '',
    email: '',
    telefone: '',
    cpf: '',
    dataCheckin: '',
    dataCheckout: '',
    numeroCrianca: '',
    numeroAdulto: '',
    numeroQuarto: '',
  });
  const [reservaAtual, setReservaAtual] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovoHospede({
      ...novoHospede,
      [name]: value,
    });
  };

  const formatarData = (data) => {
    if (!data) return '';
    const partes = data.split('-');
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
  };

  const isFormValid = () => {
    return (
      novoHospede.nome &&
      novoHospede.email &&
      novoHospede.telefone &&
      novoHospede.cpf &&
      novoHospede.dataCheckin &&
      novoHospede.dataCheckout &&
      novoHospede.numeroCrianca &&
      novoHospede.numeroAdulto &&
      novoHospede.numeroQuarto
    );
  };

  const handleAddReserva = () => {
    if (!isFormValid()) {
      alert('Preencha todos os campos antes de adicionar a reserva.');
      return;
    }

    const novaReserva = {
      ...novoHospede,
      id: reservas.length + 1,
      checkInRealizado: false,
    };

    setReservas([...reservas, novaReserva]);
    setNovoHospede({
      nome: '',
      email: '',
      telefone: '',
      cpf: '',
      dataCheckin: '',
      dataCheckout: '',
      numeroCrianca: '',
      numeroAdulto: '',
      numeroQuarto: '',
    });
    setMostrarFormulario(false);
  };

  const handleEditClick = (reserva) => {
    setEditarReserva(reserva);
    setNovoHospede(reserva);
    setMostrarFormulario(true);
  };

  const handleSaveEdit = () => {
    if (!isFormValid()) {
      alert('Preencha todos os campos antes de salvar.');
      return;
    }

    setReservas(reservas.map(reserva =>
      reserva.id === editarReserva.id ? { ...novoHospede, id: reserva.id } : reserva
    ));
    setNovoHospede({
      nome: '',
      email: '',
      telefone: '',
      cpf: '',
      dataCheckin: '',
      dataCheckout: '',
      numeroCrianca: '',
      numeroAdulto: '',
      numeroQuarto: '',
    });
    setEditarReserva(null);
    setMostrarFormulario(false);
  };

  const handleCheckIn = (reserva) => {
    setReservaAtual(reserva);
  };

  const handleConfirmCheckIn = (reserva) => {
    setReservas(reservas.map(r =>
      r.id === reserva.id ? { ...r, checkInRealizado: true } : r
    ));
    setReservaAtual(null);
  };

  const handleCheckOut = (reserva) => {
    setReservas(reservas.filter(r => r.id !== reserva.id));
    onCheckOut(reserva); // Chama a função para adicionar ao check-out
  };

  const reservasOrdenadas = [...reservas].sort((a, b) => b.checkInRealizado - a.checkInRealizado);

  const handleCpfCnpjChange = (event) => {
    let data = event.target.value.replace(/\D/g, "");
    if (data.length > 11) {
      let cnpj = `${data.substr(0, 2)}.${data.substr(2,3)}.${data.substr(5,3)}/`;
      if (data.length > 12)
        cnpj += `${data.substr(8, 4)}-${data.substr(12, 2)}`;
      else
        cnpj += data.substr(8);
      data = cnpj;
    } else {
      let cpf = "";
      let parts = Math.ceil(data.length / 3);
      for (let i = 0; i < parts; i++) {
        if (i === 3) {
          cpf += `-${data.substr(i * 3)}`;
          break;
        }
        cpf += `${i !== 0 ? "." : ""}${data.substr(i * 3, 3)}`;
      }
      data = cpf;
    }
    setNovoHospede((values)=>( {...values, cpf: data}));
  };

  console.log(novoHospede)

  return (
    <div className="container mt-4">
      <h1>Lista de Reservas</h1>

      {reservaAtual && (
        <CheckIn
          reserva={reservaAtual}
          onVoltar={() => setReservaAtual(null)}
          onConfirmCheckIn={handleConfirmCheckIn}
        />
      )}

      <Button variant="primary" onClick={() => setMostrarFormulario(!mostrarFormulario)}>
        {mostrarFormulario ? 'Fechar Formulário' : 'Adicionar Reserva'}
      </Button>

      {mostrarFormulario && (
        <Form className="mb-4 mt-4">
          <Form.Group>
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              name="nome"
              value={novoHospede.nome}
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
            <Form.Label>Telefone</Form.Label>
            <Form.Control
              type="text"
              name="telefone"
              value={novoHospede.telefone}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>CPF ou CNPJ</Form.Label>
            <Form.Control
              type="text"
              name="cpf"
              value={novoHospede.cpf}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Data de Check-in</Form.Label>
            <Form.Control
              type="date"
              name="dataCheckin"
              value={novoHospede.dataCheckin}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Data de Check-out</Form.Label>
            <Form.Control
              type="date"
              name="dataCheckout"
              value={novoHospede.dataCheckout}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Número de Crianças</Form.Label>
            <Form.Control
              type="number"
              name="numeroCriancas"
              value={novoHospede.numeroCrianca}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Número de Adultos</Form.Label>
            <Form.Control
              type="number"
              name="numeroAdultos"
              value={novoHospede.numeroAdulto}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Número de Quartos</Form.Label>
            <Form.Control
              type="number"
              name="numeroQuartos"
              value={novoHospede.numeroQuarto}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Button variant="primary" onClick={editarReserva ? handleSaveEdit : handleAddReserva}>
            {editarReserva ? 'Salvar Alterações' : 'Adicionar Reserva'}
          </Button>
        </Form>
      )}

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
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {reservasOrdenadas.map((reserva) => (
            <tr key={reserva.id}>
              <td>{reserva.id}</td>
              <td>{reserva.nome}</td>
              <td>{reserva.email}</td>
              <td>{reserva.telefone}</td>
              <td>{reserva.cpf}</td>
              <td>{formatarData(reserva.dataCheckin)}</td>
              <td>{formatarData(reserva.dataCheckout)}</td>
              <td>{reserva.numeroCrianca}</td>
              <td>{reserva.numeroAdulto}</td>
              <td>{reserva.numeroQuarto}</td>
              <td>
                {!reserva.checkInRealizado && (
                  <Button
                    variant="success"
                    onClick={() => handleCheckIn(reserva)}
                    className="me-2"
                  >
                    Check-in
                  </Button>
                )}
                <Button
                  variant="warning"
                  onClick={() => handleEditClick(reserva)}
                  className="me-2"
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleCheckOut(reserva)}
                >
                  Check-out
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Reservas;
