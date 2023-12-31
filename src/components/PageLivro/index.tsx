'use client'

import axios from "axios";
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react";

import Table from 'react-bootstrap/Table';

interface interfEditora {
  "id": number;
  "nome": string;
  "endereco": string;
  "cidade": string;
  "uf": string;
  "telefone": string;
}

interface interfAutor {
  "id": number;
  "nome": string;
  "endereco": string;
  "cidade": string;
  "uf": string;
  "telefone": string;
}

interface interLivro {
  id: number;
  titulo: string;
  subtitulo: string;
  isbn: string;
  autor: interfAutor;
  editora: interfEditora;
  local: string;
  ano: number;
}

export default function PageLivro() {
  const [livros, setLivros] = useState<interLivro[]>([]);

  const router = useRouter();

  const excluirLivro = useCallback((id: number) => {
    axios.delete('http://127.0.0.1:8000/api/livros/'+id)
      .then((_res) => {
        setLivros((prevState) => prevState.filter((livro) => livro.id !== id));
      })
      .catch((err) => {
        console.log(err);
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
      <div className="d-flex justify-content-between align-items-center">
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
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Autor</th>
            <th>Editora</th>
            <th>ISBN</th>
            <th>Ano</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {livros.map((element) => (
            <tr key={element.id}>
              <td>{element.id}</td>
              <td>{element.titulo}</td>
              <td>{element.autor.nome}</td>
              <td>{element.editora.nome}</td>
              <td>{element.isbn}</td>
              <td>{element.ano}</td>
              <td>
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => {
                    router.push(`/livro/${element.id}`);
                  }}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger"
                  type="button"
                  onClick={() => {
                    excluirLivro(element.id);
                  }}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
