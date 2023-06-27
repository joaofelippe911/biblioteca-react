'use client'

import axios from "axios";
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react";

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
          </tr>
        </thead>
        <tbody>
          {livros.map((element) => (
            <tr key={element.id}>
              <td>{element.id}</td>
              <td>{element.titulo}</td>
              <td>
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => {
                    router.push(`/livros/${element.id}`);
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
      </table>
    </>
  );
}
