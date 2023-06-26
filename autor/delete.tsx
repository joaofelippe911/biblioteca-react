import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

interface interfAutor  {
  id: number;
  nome: string;
  endereco: string;
  cidade: string;
  uf: string;
  telefone:string;
}

export default function Delete() {
  const [nome, setName] = useState('');
  const [endereco, setEndereco] = useState('');
  const [cidade, setCidade] = useState('');
  const [uf, setUf] = useState('');
  const [telefone, setTelefone] = useState('')

  const [autor, setAutor] = useState<Array<interfAutor>>([]);

  const router = useRouter();

  useEffect(() => {
    getAutor();
  }, []);

  const getAutor = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/autor');
      setAutor(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      await axios.post('http://127.0.0.1:8000/api/autor', {
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
      await axios.delete(`http://127.0.0.1:8000/api/autor/${id}`);
      getAutor();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Lista de Autores</h2>
      <ul>
        {autor.map((autor) => (
          <li key={autor.id}>
            {autor.nome} - {autor.endereco} - {autor.cidade} - {autor.uf} - {autor.telefone}
            <button onClick={()=> handleDelete(autor.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
