import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

interface interAluno {
  id: number;
  nome: string;
  ra: string;
  endereco: string;
  cidade: string;
  uf: string;
  telefone: string;
  curso: string;
}

export default function Update() {
  const [aluno, setAluno] = useState<interAluno>({
    id: 0,
    nome: '',
    ra: '',
    endereco: '',
    cidade: '',
    uf: '',
    telefone: '',
    curso: ''
  });
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    fetchAluno();
  }, []);

  const fetchAluno = async () => {
    try {
      const response = await axios.get<interAluno>(`http://127.0.0.1:8000/api/alunos/${id}`);
      setAluno(response.data);
    } catch (error) {
      console.error('Erro ao obter aluno:', error);
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      await axios.put(`http://127.0.0.1:8000/api/alunos/${id}`, aluno);
      router.push('/');
    } catch (error) {
      console.error('Erro ao atualizar aluno:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAluno({ ...aluno, [e.target.id]: e.target.value });
  };

  return (
    <div>
      <h1>Editar Aluno</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="ra">RA:</label>
        <input type="text" id="ra" value={aluno.ra} onChange={handleChange} />

        <label htmlFor="name">Nome:</label>
        <input type="text" id="nome" value={aluno.nome} onChange={handleChange} />

        <label htmlFor="endereco">Endereço:</label>
        <input type="text" id="endereco" value={aluno.endereco} onChange={handleChange} />

        <label htmlFor="cidade">Cidade:</label>
        <input type="text" id="cidade" value={aluno.cidade} onChange={handleChange} />

        <label htmlFor="uf">UF:</label>
        <input type="text" id="uf" value={aluno.uf} onChange={handleChange} />

        <label htmlFor="telefone">Telefone:</label>
        <input type="text" id="telefone" value={aluno.telefone} onChange={handleChange} />

        <label htmlFor="curso">Curso:</label>
        <input type="text" id="curso" value={aluno.curso} onChange={handleChange} />

        <button type="submit">Atualizar</button>
      </form>
    </div>
  );
}
