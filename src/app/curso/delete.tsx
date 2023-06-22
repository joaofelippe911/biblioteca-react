import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

interface interfCurso  {
  id: number;
  nome: string;
  coordenador: string;
  duracao: number;
}

export default function Create() {
  const [name, setName] = useState('');
  const [coordenador, setCoordenador] = useState('');
  const [duracao, setDuracao] = useState('');
  const [cursos, setCursos] = useState<Array<interfCurso>>([]);

  const router = useRouter();

  useEffect(() => {
    getCursos();
  }, []);

  const getCursos = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/cursos');
      setCursos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      await axios.post('http://127.0.0.1:8000/api/cursos', {
        name,
        coordenador,
        duracao,
      });
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: any) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/cursos/${id}`);
      getCursos();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Lista de Cursos</h2>
      <ul>
        {cursos.map((curso) => (
          <li key={curso.id}>
            {curso.nome} - {curso.coordenador} - {curso.duracao}
            <button onClick={() => handleDelete(curso.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
