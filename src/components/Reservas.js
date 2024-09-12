import React, {useEffect, useState} from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Reservas.css';
import api from "../services/api";

const Reservas = () => {
  const [reservas, setReservas] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);


  const [novoHospede, setNovoHospede] = useState({
    nome: '',
    email: '',
    telefone: '',
    cpf: '',
    data_checkin: '',
    data_checkout: '',
    numero_criancas: '',
    numero_adultos: '',
    numero_quartos: '',
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


  const handleAddReserva = () => {
    if (!isFormValid()) {
      alert('Preencha todos os campos antes de adicionar a reserva.');
      return;
    }
    api.post('api/reserva' ,novoHospede).then(value => alert('Salvo')).catch(reason => alert('erro'))

    setMostrarFormulario(false);
    setNovoHospede({
      nome: '',
      email: '',
      telefone: '',
      cpf: '',
      data_checkin: '',
      data_checkout: '',
      numero_criancas: '',
      numero_adultos: '',
      numero_quartos: '',
      detalhesRelevantes: '',
    })
  };

  // Função para formatar a data
  const formatarData = (data) => {
    const partes = data.split('-');
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
  };


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

  const consultarApi = () => {
    api.get('api/reserva').then(value => {
      setReservas(value.data)
    })
  }

  useEffect(() => {
    consultarApi()
  }, []);

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
              name="nome"
              value={novoHospede.nome}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>CPF/CNPJ</Form.Label>
            <Form.Control
              type="text"
              name="cpf"
              value={novoHospede.cpf}
              onChange={handleCpfCnpjChange}
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
            <Form.Label>Data de Check-in</Form.Label>
            <Form.Control
              type="date"
              name="data_checkin"
              value={novoHospede.data_checkin}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Data de Check-out</Form.Label>
            <Form.Control
              type="date"
              name="data_checkout"
              value={novoHospede.data_checkout}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Número crianças</Form.Label>
            <Form.Control
              type="number"
              name="numero_criancas"
              value={novoHospede.numero_criancas}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Número adultos</Form.Label>
            <Form.Control
              type="number"
              name="numero_adultos"
              value={novoHospede.numero_adultos}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Quarto</Form.Label>
            <Form.Control
              type="number"
              name="numero_quartos"
              value={novoHospede.numero_quartos}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          {/*<Form.Group>*/}
          {/*  <Form.Label>Detalhes Relevantes</Form.Label>*/}
          {/*  <Form.Control*/}
          {/*    as="textarea"*/}
          {/*    name="detalhesRelevantes"*/}
          {/*    value={novoHospede.detalhesRelevantes}*/}
          {/*    onChange={handleInputChange}*/}
          {/*    required*/}
          {/*  />*/}
          {/*</Form.Group>*/}

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
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {reservas.map((reserva) => (
            <tr key={reserva.id_reserva}>
              <td>{reserva.id_reserva}</td>
              <td>{reserva.nome}</td>
              <td>{formatarData(reserva.data_checkin)}</td>
              <td>{formatarData(reserva.data_checkout)}</td>
              <td>{reserva.numero_quartos}</td>
              <td>
                <div className="btn-group">

                  {
                      !reserva?.checkin_confirmado &&
                      <a href={`/checkin/${reserva.id_reserva}`}>
                        <Button variant="success" className="btn">Check-in</Button>
                      </a>
                  }
                  {
                      (reserva?.checkin_confirmado && !reserva?.checkout_confirmado) &&
                      <a href={`/checkout/${reserva.id_reserva}`}>
                        <Button variant="success" className="btn">Check-out</Button>
                      </a>
                  }


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
