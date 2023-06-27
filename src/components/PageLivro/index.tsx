'use client'

import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

interface interLivro {
  id: number;
  titulo: string;
  subtitulo: string;
  isbn: string;
  autor: string;
  editora: string;
  local: string;
  ano: number;
}

export default function PageLivro() {
  const [livros, setLivros] = useState<interLivro[]>([]);
  const router = useRouter();

  const excluirLivro = useCallback((id: number) => {
    axios
      .delete(`http://127.0.0.1:8000/api/livros/${id}`)
      .then(() => {
        setLivros((prevLivros) => prevLivros.filter((livro) => livro.id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/livros')
      .then((res) => {
        setLivros(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between">
        <h1>Livro</h1>
        <div>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => {
              router.push('/livro/criar');
            }}
          >
            Adicionar
          </button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Subtítulo</th>
            <th>ISBN</th>
            <th>Autor</th>
            <th>Editora</th>
            <th>Local</th>
            <th>Ano</th>
          </tr>
        </thead>
        <tbody>
          {livros.map((livro) => (
            <tr key={livro.id}>
              <td>{livro.id}</td>
              <td>{livro.titulo}</td>
              <td>{livro.subtitulo}</td>
              <td>{livro.isbn}</td>
              <td>{livro.autor}</td>
              <td>{livro.editora}</td>
              <td>{livro.local}</td>
              <td>{livro.ano}</td>
              <td>
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => {
                    router.push(`/livro/${livro.id}`);
                  }}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger"
                  type="button"
                  onClick={() => {
                    excluirLivro(livro.id);
                  }}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
