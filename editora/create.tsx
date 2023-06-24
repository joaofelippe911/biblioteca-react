import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Create() {
  const [name, setName] = useState('');
  const [endereco, setEndereco] = useState('');
  const [cidade, setCidade] = useState('');
  const [uf, setUf] = useState('');
  const [telefone, setTelefone] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      await axios.post('http://127.0.0.1:8000/api/editoras', {
        name,
        endereco,
        cidade,
        uf,
        telefone

      });
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Cadastrar Editora</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nome:</label>
        <input type="text" id="name" value={name}
          onChange={event => setName(event.target.value)}
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

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}


