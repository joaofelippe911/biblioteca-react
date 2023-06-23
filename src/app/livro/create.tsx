import React, { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Create() {
    const [titulo, setTitulo] = useState('');
    const [subtitulo, setSubtitulo] = useState('');
    const [isbn, setIsbn] = useState('');
    const [autor, setAutor] = useState('');
    const [editora, setEditora] = useState('');
    const [local, setLocal] = useState('');
    const [ano, setAno] = useState('');
    
    const router = useRouter();


  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      await axios.post('http://127.0.0.1:8000/api/livros', {
        titulo,
        subtitulo,
        isbn,
        autor,
        editora,
        local,
        ano,
      });
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

    function handleTituloChange(event: ChangeEvent<HTMLInputElement>): void {
        throw new Error('Function not implemented.');
    }

    function handleSubtituloChange(event: ChangeEvent<HTMLInputElement>): void {
        throw new Error('Function not implemented.');
    }

    function handleIsbnChange(event: ChangeEvent<HTMLInputElement>): void {
        throw new Error('Function not implemented.');
    }

    function handleAutorChange(event: ChangeEvent<HTMLInputElement>): void {
        throw new Error('Function not implemented.');
    }

    function handleEditoraChange(event: ChangeEvent<HTMLInputElement>): void {
        throw new Error('Function not implemented.');
    }

    function handleLocalChange(event: ChangeEvent<HTMLInputElement>): void {
        throw new Error('Function not implemented.');
    }

    function handleAnoChange(event: ChangeEvent<HTMLInputElement>): void {
        throw new Error('Function not implemented.');
    }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="titulo">Título:</label>
        <input type="text" id="titulo" value={titulo} onChange={handleTituloChange} />
      </div>
      <div>
        <label htmlFor="subtitulo">Subtítulo:</label>
        <input type="text" id="subtitulo" value={subtitulo} onChange={handleSubtituloChange} />
      </div>
      <div>
        <label htmlFor="isbn">ISBN:</label>
        <input type="text" id="isbn" value={isbn} onChange={handleIsbnChange} />
      </div>
      <div>
        <label htmlFor="autor">Autor:</label>
        <input type="text" id="autor" value={autor} onChange={handleAutorChange} />
      </div>
      <div>
        <label htmlFor="editora">Editora:</label>
        <input type="text" id="editora" value={editora} onChange={handleEditoraChange} />
      </div>
      <div>
        <label htmlFor="local">Local:</label>
        <input type="text" id="local" value={local} onChange={handleLocalChange} />
      </div>
      <div>
        <label htmlFor="ano">Ano:</label>
        <input type="text" id="ano" value={ano} onChange={handleAnoChange} />
      </div>
      <button type="submit">Criar Livro</button>
    </form>
  );
};


