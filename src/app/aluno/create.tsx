import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Create() {
  const [nome, setNome] = useState('');
  const [ra, setRa] = useState('');
  const [endereco, setEndereco] = useState('');
  const [cidade, setCidade] = useState('');
  const [uf, setUf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [curso, setCurso] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      await axios.post('http://127.0.0.1:8000/api/alunos', {
        nome,
        ra,
        endereco,
        cidade,
        uf,
        telefone,
        curso

      });
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Cadastrar Aluno</h1>
      <form onSubmit={handleSubmit}>

      <label htmlFor="ra">RA:</label>
        <input type="text" id="ra" value={ra}
          onChange={event => setRa(event.target.value)}
        />

        <label htmlFor="name">Nome:</label>
        <input type="text" id="name" value={nome}
          onChange={event => setNome(event.target.value)}
        />

        <label htmlFor="endereco">Endereço:</label>
        <input type="text" id="endereco" value={endereco}
          onChange={event => setEndereco(event.target.value)}
        />

        <label htmlFor="cidade">Cidade:</label>
        <input type="text" id="cidade" value={cidade}
          onChange={event => setCidade(event.target.value)}
        />

        <label htmlFor="uf">Uf:</label>
        <input type="text" id="uf" value={uf}
         onChange={event => setUf(event.target.value)}
        />

        <label htmlFor="telefone">Telefone:</label>
        <input type="number" id="telefone" value={telefone}
         onChange={event => setTelefone(event.target.value)}
        />

        <label htmlFor="curso">Curso:</label>
        <input type="text" id="curso" value={curso}
          onChange={event => setCurso(event.target.value)}
        />

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}


