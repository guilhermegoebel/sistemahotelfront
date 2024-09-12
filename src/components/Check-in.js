import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import './Check-in.css';
import {useParams} from "react-router-dom";
import api from "../services/api";

const CheckIn = () => {

    const parametros = useParams(); //pegar o id
    const [reserva, setReserva] = useState();


    const consultarApi = () => {
        api.get(`api/reserva/${parametros.id}`).then(value => {
            setReserva(value.data)
        })
    }
    const handleCheckin = () => {
        api.put(`api/reserva/checkin/${parametros.id}`).then(value => {
            consultarApi()
            alert('Checkin')
        }).catch(reason => alert('erro'))
    }
    const handleCheckout = () => {
        api.put(`api/reserva/checkout/${parametros.id}`).then(value => {
            consultarApi()
            alert('Checkin')
        }).catch(reason => alert('erro'))
    }

    useEffect(() => {
        consultarApi()
    }, []);

  return (
    <div className="container mt-4">
      <h1>Check-in</h1>
      <div className="reserva-detalhes">
        <p><strong>Nome do Hóspede:</strong> {reserva?.nome}</p>
        <p><strong>CPF:</strong> {reserva?.cpf}</p>
        <p><strong>Email:</strong> {reserva?.email}</p>
        <p><strong>Data de Check-in:</strong> {reserva?.data_checkin}</p>
        <p><strong>Data de Check-out:</strong> {reserva?.data_checkout}</p>
        <p><strong>Quarto:</strong> {reserva?.numero_quartos}</p>
        {/*<p><strong>Detalhes Relevantes:</strong> {reserva.detalhesRelevantes}</p>*/}
      </div>
        <a href={'/reservas'}>
            <Button variant="primary">Voltar</Button>
        </a>

        {
            !reserva?.checkin_confirmado && <Button variant="success" onClick={handleCheckin} className="ml-2">Confirmar Check-in</Button>
        }
        {
            (reserva?.checkin_confirmado && !reserva?.checkout_confirmado) && <Button variant="success" onClick={handleCheckout} className="ml-2">Confirmar Check-out</Button>
        }


    </div>
  );
};

export default CheckIn;
