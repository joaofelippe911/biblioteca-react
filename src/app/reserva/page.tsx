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

const ReservaPage = () => {
  const [reservas, setReservas] = useState<interReserva[]>([]);
  const [loading, setLoading] = useState(true);
  const [newReserva, setNewReserva] = useState<interReserva>({
    id: 0,
    aluno: '',
    livro: '',
    dataInicio: '',
    dataFim: '',
    observacao: '',
  });
  const [editReserva, setEditReserva] = useState<interReserva | null>(null);

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

  const createReserva = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/api/reservas', newReserva);
      fetchReservas();
      setNewReserva({
        id: 0,
        aluno: '',
        livro: '',
        dataInicio: '',
        dataFim: '',
        observacao: '',
      });
    } catch (error) {
      console.error('Erro ao criar a reserva:', error);
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

  const handleEdit = (reserva: interReserva) => {
    setEditReserva(reserva);
  };

  const handleCancelEdit = () => {
    setEditReserva(null);
  };

  const handleUpdate = async (reserva: interReserva) => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/reservas/${reserva.id}`, reserva);
      fetchReservas();
      setEditReserva(null);
    } catch (error) {
      console.error('Erro ao atualizar a reserva:', error);
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
                {editReserva === reserva ? (
                  <>
                    <button onClick={() => handleUpdate(reserva)}>Salvar</button>
                    <button onClick={handleCancelEdit}>Cancelar</button>
                  </>
                ) : (
                  <button onClick={() => handleEdit(reserva)}>Editar</button>
                )}
                <button onClick={() => deleteReserva(reserva.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Criar Reserva</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="aluno">Aluno:</label>
        <input
          type="text"
          id="aluno"
          value={newReserva.aluno}
          onChange={(e) => setNewReserva({ ...newReserva, aluno: e.target.value })}
        />

        <label htmlFor="livro">Livro:</label>
        <input
          type="text"
          id="livro"
          value={newReserva.livro}
          onChange={(e) => setNewReserva({ ...newReserva, livro: e.target.value })}
        />

        <label htmlFor="dataInicio">Data de Início:</label>
        <input
          type="text"
          id="dataInicio"
          value={newReserva.dataInicio}
          onChange={(e) => setNewReserva({ ...newReserva, dataInicio: e.target.value })}
        />

        <label htmlFor="dataFim">Data de Fim:</label>
        <input
          type="text"
          id="dataFim"
          value={newReserva.dataFim}
          onChange={(e) => setNewReserva({ ...newReserva, dataFim: e.target.value })}
        />

        <label htmlFor="observacao">Observação:</label>
        <input
          type="text"
          id="observacao"
          value={newReserva.observacao}
          onChange={(e) => setNewReserva({ ...newReserva, observacao: e.target.value })}
        />

        <button onClick={createReserva}>Criar</button>
      </form>
    </div>
  );
};

export default ReservaPage;
