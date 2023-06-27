import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

interface interAutor {
  id: number;
  nome: string;
  endereco: string;
  cidade: string;
  uf: string;
  telefone: string;

}

export default function Update() {
  const [autor, setAutor] = useState<interAutor>({
    id: 0,
    nome: '',
    endereco: '',
    cidade: '',
    uf: '',
    telefone: '',
   
  });
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    fetchAutor();
  }, []);

  const fetchAutor = async () => {
    try {
      const response = await axios.get<interAutor>(`http://127.0.0.1:8000/api/autores/${id}`);
      setAutor(response.data);
    } catch (error) {
      console.error('Erro ao obter autor:', error);
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      await axios.put(`http://127.0.0.1:8000/api/autores/${id}`, autor);
      router.push('/');
    } catch (error) {
      console.error('Erro ao atualizar aluno:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAutor({ ...autor, [e.target.id]: e.target.value });
  };

  return (
    <div>
      <h1>Editar Aluno</h1>
      <form onSubmit={handleSubmit}>
       
        <label htmlFor="name">Nome:</label>
        <input type="text" id="nome" value={autor.nome} onChange={handleChange} />

        <label htmlFor="endereco">Endereço:</label>
        <input type="text" id="endereco" value={autor.endereco} onChange={handleChange} />

        <label htmlFor="cidade">Cidade:</label>
        <input type="text" id="cidade" value={autor.cidade} onChange={handleChange} />

        <label htmlFor="uf">UF:</label>
        <input type="text" id="uf" value={autor.uf} onChange={handleChange} />

        <label htmlFor="telefone">Telefone:</label>
        <input type="text" id="telefone" value={autor.telefone} onChange={handleChange} />


        <button type="submit">Atualizar</button>
      </form>
    </div>
  );
}
