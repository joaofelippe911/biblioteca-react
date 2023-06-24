import { useState, useEffect } from 'react';
import axios from 'axios';

interface interReserva {
  id: number;
  aluno: string;
  livro: string;
  dataInicio: string;
  dataFim: string;
  observacao: string;
}

const Reservas = () => {
  const [reservas, setReservas] = useState<interReserva[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReservas();
  }, []);

  const fetchReservas = async () => {
    try {
      const response = await axios.get<interReserva[]>('http://127.0.0.1:8000/api/reservas');
      setReservas(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao obter as reservas:', error);
      setLoading(false);
    }
  };

  const deleteReserva = async (id: number) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/reservas/${id}`);
      fetchReservas();
    } catch (error) {
      console.error('Erro ao excluir a reserva:', error);
    }
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h1>Reservas</h1>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Aluno</th>
            <th>Livro</th>
            <th>Data de Início</th>
            <th>Data de Fim</th>
            <th>Observação</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {reservas.map((reserva) => (
            <tr key={reserva.id}>
              <td>{reserva.id}</td>
              <td>{reserva.aluno}</td>
              <td>{reserva.livro}</td>
              <td>{reserva.dataInicio}</td>
              <td>{reserva.dataFim}</td>
              <td>{reserva.observacao}</td>
              <td>
                <button onClick={() => deleteReserva(reserva.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reservas;
