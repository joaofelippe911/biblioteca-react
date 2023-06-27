'use client'

import React, { ChangeEvent, useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Form from 'react-bootstrap/Form';

interface LivroFormData {
  id?: number;
  titulo: string;
  subtitulo: string;
  isbn: string;
  autor: string;
  editora: string;
  local: string;
  ano: string;
}

interface PageFormLivroProps {
  parametro?: string;
}

export default function PageFormLivro(props: PageFormLivroProps) {
  const router = useRouter();
  const refForm = useRef<any>();

  const [editar, setEditar] = useState<boolean>(false);

  useEffect(() => {
    const idQuery = Number(props.parametro);

    if (Number.isInteger(idQuery)) {
      setEditar(true);
      axios.get('http://127.0.0.1:8000/api/livros/' + idQuery).then((res) => {
        const livroData: LivroFormData = res.data;
        setLivroData(livroData);
      });
    }
  }, []);

  const [livroData, setLivroData] = useState<LivroFormData>({
    titulo: '',
    subtitulo: '',
    isbn: '',
    autor: '',
    editora: '',
    local: '',
    ano: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLivroData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addOrEditLivro = () => {
    const { id, ...livroDataWithoutId } = livroData;

    if (editar) {
      axios.put('http://127.0.0.1:8000/api/livros/' + id, livroDataWithoutId).then(() => {
        router.push('/livros');
      });
    } else {
      axios.post('http://127.0.0.1:8000/api/livros', livroDataWithoutId).then(() => {
        router.push('/livros');
      });
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <h1>{editar ? 'Editar Livro' : 'Criar Livro'}</h1>
        <div>
          <button type="button" className="btn btn-success" onClick={addOrEditLivro}>
            Salvar
          </button>
        </div>
      </div>
      <Form ref={refForm}>
        {editar && (
          <Form.Group>
            <Form.Label>Id</Form.Label>
            <Form.Control name="id" id="id" disabled readOnly type="text" value={livroData.id} />
          </Form.Group>
        )}
        <Form.Group>
          <Form.Label>Título</Form.Label>
          <Form.Control
            type="text"
            id="titulo"
            name="titulo"
            value={livroData.titulo}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Subtítulo</Form.Label>
          <Form.Control
            type="text"
            id="subtitulo"
            name="subtitulo"
            value={livroData.subtitulo}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>ISBN</Form.Label>
          <Form.Control
            type="text"
            id="isbn"
            name="isbn"
            value={livroData.isbn}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Autor</Form.Label>
          <Form.Control
            type="text"
            id="autor"
            name="autor"
            value={livroData.autor}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Editora</Form.Label>
          <Form.Control
            type="text"
            id="editora"
            name="editora"
            value={livroData.editora}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Local</Form.Label>
          <Form.Control
            type="text"
            id="local"
            name="local"
            value={livroData.local}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Ano</Form.Label>
          <Form.Control
            type="text"
            id="ano"
            name="ano"
            value={livroData.ano}
            onChange={handleInputChange}
          />
        </Form.Group>
      </Form>
    </>
  );
}
