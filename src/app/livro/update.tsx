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

const LivroUpdate = ({ livro }: { livro: interLivro }) => {
  const [livroData, setLivroData] = useState<interLivro>(livro);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLivroData((prevLivro) => ({
      ...prevLivro,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.put(`http://127.0.0.1:8000/api/livros/${livro.titulo}`, livroData);
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="titulo">Título:</label>
        <input
          type="text"
          id="titulo"
          name="titulo"
          value={livroData.titulo}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="subtitulo">Subtítulo:</label>
        <input
          type="text"
          id="subtitulo"
          name="subtitulo"
          value={livroData.subtitulo}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="isbn">ISBN:</label>
        <input
          type="text"
          id="isbn"
          name="isbn"
          value={livroData.isbn}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="autor">Autor:</label>
        <input
          type="text"
          id="autor"
          name="autor"
          value={livroData.autor}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="editora">Editora:</label>
        <input
          type="text"
          id="editora"
          name="editora"
          value={livroData.editora}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="local">Local:</label>
        <input
          type="text"
          id="local"
          name="local"
          value={livroData.local}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="ano">Ano:</label>
        <input
          type="number"
          id="ano"
          name="ano"
          value={livroData.ano}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Atualizar Livro</button>
    </form>
  );
};

export default LivroUpdate;