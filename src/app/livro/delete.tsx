import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

interface interLivro {
  titulo: string;
  subtitulo: string;
  isbn: string;
  autor: string;
  editora: string;
  local: string;
  ano: number;
}

const LivroDelete = ({ livro }: { livro: interLivro }) => {
  const [titulo, setTitulo] = useState <interLivro>(livro);
  const router = useRouter();

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLivroData((prevLivro) => ({
      ...prevLivro,
      [name]: value,
    }));
  };

  const handleDelete = async () => {
    try {
      await axios.delete<interLivro>(`http://127.0.0.1:8000/api/livros/${titulo}`);
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <label htmlFor="delete-titulo">Título do livro a ser excluído:</label>
      <input type="text" id="delete-titulo" value={titulo.titulo} onChange={handleChange} />
      <button type="button" onClick={handleDelete}>Excluir Livro</button>
    </div>
  );
};

export default LivroDelete;

function setLivroData(arg0: (prevLivro: any) => any) {
  throw new Error('Function not implemented.');
}
