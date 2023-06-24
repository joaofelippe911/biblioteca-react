import { useState } from 'react';
import axios from 'axios';

const Reservas = () => {
  const [formData, setFormData] = useState({
    aluno: '',
    livro: '',
    dataInicio: '',
    dataFim: '',
    observacao: '',
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      await axios.post('http://127.0.0.1:8000/api/reservas', formData); // Rota para criar uma reserva na API Laravel
      // Limpar o formulário após a criação bem-sucedida
      setFormData({
        aluno: '',
        livro: '',
        dataInicio: '',
        dataFim: '',
        observacao: '',
      });
      alert('Reserva criada com sucesso!');
    } catch (error) {
      console.error('Erro ao criar reserva:', error);
      alert('Erro ao criar reserva. Por favor, tente novamente.');
    }
  };

  return (
    <div>
      <h1>Criar Reserva</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="aluno">Aluno:</label>
          <input type="text" id="aluno" name="aluno" value={formData.aluno} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="livro">Livro:</label>
          <input type="text" id="livro" name="livro" value={formData.livro} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="dataInicio">Data de Início:</label>
          <input type="date" id="dataInicio" name="dataInicio" value={formData.dataInicio} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="dataFim">Data de Fim:</label>
          <input type="date" id="dataFim" name="dataFim" value={formData.dataFim} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="observacao">Observação:</label>
          <textarea id="observacao" name="observacao" value={formData.observacao} onChange={handleChange} required />
        </div>
        <button type="submit">Criar Reserva</button>
      </form>
    </div>
  );
};

export default Reservas;
