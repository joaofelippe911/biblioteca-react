import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

interface interfAluno  {
  id: number;
  ra: number
  nome: string;
  endereco: string;
  cidade: string;
  uf: string;
  telefone: string;
  curso: string
}

export default function Delete() {;
  const [ra, setRa] = useState('')  
  const [nome, setName] = useState('');
  const [endereco, setEndereco] = useState('');
  const [cidade, setCidade] = useState('');
  const [uf, setUf] = useState('');
  const [telefone, setTelefone] = useState('')
  const [Curso, setCurso] = useState('')

  const [alunos, setAlunos] = useState<Array<interfAluno>>([]);

  const router = useRouter();

  useEffect(() => {
    getAlunos();
  }, []);

  const getAlunos = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/editoras');
      setAlunos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      await axios.post('http://127.0.0.1:8000/api/alunos', {
        ra,
        nome,
        endereco,
        cidade,
        uf,
        telefone,
        Curso
      });
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: any) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/alunos/${id}`);
      getAlunos();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Lista de Alunos</h2>
      <ul>
        {alunos.map((aluno) => (
          <li key={aluno.id}>
            {aluno.ra} - {aluno.nome} - {aluno.endereco} - {aluno.cidade} - {aluno.uf} - {aluno.telefone} - {aluno.curso}
            <button onClick={() => handleDelete(aluno.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
