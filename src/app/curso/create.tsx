import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Create() {
  const [name, setName] = useState('');
  const [coordenador, setCoordenador] = useState('');
  const [duracao, setDuracao] = useState('');
  const router = useRouter();

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

  return (
    <div>
      <h1>Cadastrar Curso</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nome:</label>
        <input type="text" id="name" value={name}
          onChange={event => setName(event.target.value)}
        />

        <label htmlFor="coordenador">:</label>
        <input type="text" id="coordenador" value={coordenador}
          onChange={event => setCoordenador(event.target.value)}
        />

        <label htmlFor="duracao">:</label>
        <input type="text" id="duracao" value={duracao}
          onChange={event => setDuracao(event.target.value)}
        />

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}


