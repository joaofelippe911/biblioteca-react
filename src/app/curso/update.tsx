import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function UpdateCurso() {
  const [nome, setNome] = useState('');
  const [coordenador, setCoordenador] = useState('');
  const [duracao, setDuracao] = useState('');
  const router = useRouter();

  useEffect(() => {
    const { id } = router.query;
    if (id) {
      getCurso(id as string);
    }
  }, [router.query]);

  const getCurso = async (id: string) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/cursos/${id}`);
      const curso = response.data;
      setNome(curso.nome);
      setCoordenador(curso.coordenador);
      setDuracao(curso.duracao.toString());
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { id } = router.query;

    try {
      await axios.put(`http://127.0.0.1:8000/api/cursos/${id}`, {
        nome,
        coordenador,
        duracao: parseInt(duracao),
      });
      router.push('/curso');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Atualizar Curso</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nome">Nome:</label>
        <input
          type="text"
          id="nome"
          value={nome}
          onChange={(event) => setNome(event.target.value)}
        />

        <label htmlFor="coordenador">Coordenador:</label>
        <input
          type="text"
          id="coordenador"
          value={coordenador}
          onChange={(event) => setCoordenador(event.target.value)}
        />

        <label htmlFor="duracao">Duração:</label>
        <input
          type="text"
          id="duracao"
          value={duracao}
          onChange={(event) => setDuracao(event.target.value)}
        />

        <button type="submit">Atualizar</button>
      </form>
    </div>
  );
}
