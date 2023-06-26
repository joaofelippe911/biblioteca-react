import axios from 'axios';
import { useEffect, useState } from 'react';
import LivroUpdate from './update';
import LivroDelete from './delete';
import LivroCreate from './create';

const LivroPage = () => {
  // const [livros, setLivros] = useState([]);

  // useEffect(() => {
  //   const fetchLivros = async () => {
  //     try {
  //       const response = await axios.get('http://127.0.0.1:8000/api/livros');
  //       // setLivros(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchLivros();
  // }, []);

  return (
    <div>
      {/* <h1>Livros</h1>

      <h2>Lista de Livros</h2>
      <ul>
        {livros.map((livro: any) => (
          <li key={livro.id}>
            Título: {livro.titulo} | Autor: {livro.autor}
          </li>
        ))}
      </ul>

      <h2>Criar Livro</h2>
      <LivroCreate />

      <h2>Atualizar Livro</h2>
      {livros.map((livro: any) => (
        <div key={livro.id}>
          <LivroUpdate livro={livro} />
        </div>
      ))}

      <h2>Excluir Livro</h2>
      {livros.map((livro: any) => (
        <div key={livro.id}>
          <LivroDelete livro={livro} />
        </div>
      ))} */}
    </div>
  );
};

export default LivroPage;