import axios from 'axios';
import { useEffect, useState } from 'react';
import ReservaUpdate from './update';
import ReservaDelete from './delete';
import ReservaCreate from './create';

const ReservaPage = () => {
  // const [Reservas, setReservas] = useState([]);

  // useEffect(() => {
  //   const fetchReservas = async () => {
  //     try {
  //       const response = await axios.get('http://127.0.0.1:8000/api/Reservas');
  //       // setReservas(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchReservas();
  // }, []);

  return (
    <div>
      {/* <h1>Reservas</h1>

      <h2>Lista de Reservas</h2>
      <ul>
        {Reservas.map((Reserva: any) => (
          <li key={Reserva.id}>
            Título: {Reserva.titulo} | Autor: {Reserva.autor}
          </li>
        ))}
      </ul>

      <h2>Criar Reserva</h2>
      <ReservaCreate />

      <h2>Atualizar Reserva</h2>
      {Reservas.map((Reserva: any) => (
        <div key={Reserva.id}>
          <ReservaUpdate Reserva={Reserva} />
        </div>
      ))}

      <h2>Excluir Reserva</h2>
      {Reservas.map((Reserva: any) => (
        <div key={Reserva.id}>
          <ReservaDelete Reserva={Reserva} />
        </div>
      ))} */}
    </div>
  );
};

export default ReservaPage;