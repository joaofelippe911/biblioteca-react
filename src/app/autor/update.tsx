import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function UpdateAutor() {
    const [nome, setNome] = useState('');
    const [endereco, setEndereco] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf, setUf] = useState('');
    const [telefone, setTelefone] = useState('');
  const router = useRouter();

  useEffect(() => {
    const { id } = router.query;
    if (id) {
      getAutor(id as string);
    }
  }, [router.query]);

  const getAutor = async (id: string) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/autor/${id}`);
      const autor = response.data;
      setNome(autor.nome);
      setEndereco(autor.endereco);
      setCidade(autor.cidade);
      setUf(autor.uf);
      setTelefone(autor.telefone.toString())
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { id } = router.query;

    try {
      await axios.put(`http://127.0.0.1:8000/api/autor/${id}`, {
        nome,
        endereco,
        cidade,
        uf,
        telefone: parseInt(telefone),
      });
      router.push('/autor');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Atualizar Autor</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nome">Nome:</label>
        <input
          type="text"
          id="nome"
          value={nome}
          onChange={(event) => setNome(event.target.value)}
        />

        <label htmlFor="endereco">Endereço:</label>
        <input
          type="text"
          id="endereco"
          value={endereco}
          onChange={(event) => setEndereco(event.target.value)}
        />


        <label htmlFor="cidade">Cidade:</label>
        <input
          type="text"
          id="cidade"
          value={cidade}
          onChange={(event) => setCidade(event.target.value)}
        />

        <label htmlFor="uf">Uf:</label>
        <input
          type="text"
          id="uf"
          value={uf}
          onChange={(event) => setUf(event.target.value)}
        />

        <label htmlFor="telefone">Telefone:</label>
        <input
          type="number"
          id="telefone"
          value={telefone}
          onChange={(event) => setTelefone(event.target.value)}
        />

        <button type="submit">Atualizar</button>
      </form>
    </div>
  );
}
