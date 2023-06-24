import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

interface interfEditora  {
  id: number;
  nome: string;
  endereco: string;
  cidade: string;
  uf: string;
  telefone:string;
}

export default function Create() {
  const [nome, setName] = useState('');
  const [endereco, setEndereco] = useState('');
  const [cidade, setCidade] = useState('');
  const [uf, setUf] = useState('');
  const [telefone, setTelefone] = useState('')

  const [editoras, setEditoras] = useState<Array<interfEditora>>([]);

  const router = useRouter();

  useEffect(() => {
    getEditoras();
  }, []);

  const getEditoras = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/editoras');
      setEditoras(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      await axios.post('http://127.0.0.1:8000/api/editoras', {
        nome,
        endereco,
        cidade,
        uf,
        telefone,
      });
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: any) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/editoras/${id}`);
      getEditoras();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Lista de Editoras</h2>
      <ul>
        {editoras.map((editora) => (
          <li key={editora.id}>
            {editora.nome} - {editora.endereco} - {editora.cidade} - {editora.uf} - {editora.telefone}
            <button onClick={() => handleDelete(editora.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
