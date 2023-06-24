import { useState } from 'react';


interface interfCurso  {
    id: number;
    nome: string;
    coordenador: string;
    duracao: number;
  }

const LivrosPage = () => {
  const [livros, setLivros] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');

  const handleTituloChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitulo(e.target.value);
  };

  const handleAutorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAutor(e.target.value);
  };

  const handleAddLivro = () => {
    const novoLivro = {
      id: new Date().getTime(),
      titulo,
      autor,
    };
    setLivros([...livros, novoLivro]);
    setTitulo('');
    setAutor('');
  };

  const handleDeleteLivro = (id: number) => {
    const novosLivros = livros.filter((livro) => livro.id !== id);
    setLivros(novosLivros);
  };

}
