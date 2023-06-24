import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

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

const AlunoPage = () => {
  const [alunos, setAlunos] = useState<interAluno[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlunos();
  }, []);

  const fetchAlunos = async () => {
    try {
      const response = await axios.get<interAluno[]>('http://127.0.0.1:8000/api/alunos');
      setAlunos(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao obter os alunos:', error);
      setLoading(false);
    }
  };

  const deleteAluno = async (id: number) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/alunos/${id}`);
      fetchAlunos();
    } catch (error) {
      console.error('Erro ao excluir o aluno:', error);
    }
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h1>Alunos</h1>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>RA</th>
            <th>Endereço</th>
            <th>Cidade</th>
            <th>UF</th>
            <th>Telefone</th>
            <th>Curso</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map((aluno) => (
            <tr key={aluno.id}>
              <td>{aluno.id}</td>
              <td>{aluno.nome}</td>
              <td>{aluno.ra}</td>
              <td>{aluno.endereco}</td>
              <td>{aluno.cidade}</td>
              <td>{aluno.uf}</td>
              <td>{aluno.telefone}</td>
              <td>{aluno.curso}</td>
              <td>
                <Link href={`/alunos/${aluno.id}/edit`}>
                  <a>Editar</a>
                </Link>
                <button onClick={() => deleteAluno(aluno.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Link href="/alunos/create">
        <a>Cadastrar Aluno</a>
      </Link>
    </div>
  );
};

export default AlunoPage;
