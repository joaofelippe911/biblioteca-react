'use client'

import React, { ChangeEvent, useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Form from 'react-bootstrap/Form';

interface interfAutor {
  "id": number;
  "nome": string;
  "endereco": string;
  "cidade": string;
  "uf": string;
  "telefone": string;
}

interface interfEditora {
  "id": number;
  "nome": string;
  "endereco": string;
  "cidade": string;
  "uf": string;
  "telefone": string;
}

interface LivroFormData {
  id?: number;
  titulo: string;
  subtitulo: string;
  isbn: string;
  autor_id: string;
  editora_id: string;
  local: string;
  ano: string;
}

interface PageFormLivroProps {
  parametro?: string;
}

export default function PageFormLivro(props: PageFormLivroProps) {
  const [autores, setAutores] = useState<interfAutor[]>([]);
  const [autorId, setAutorId] = useState('');

  const [editoras, setEditoras] = useState<interfEditora[]>([]);
  const [editoraId, setEditoraId] = useState('');


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
        setAutorId(livroData.autor_id);
        setEditoraId(livroData.editora_id);
      });
    }
  }, []);

  useEffect(() => {
    async function loadAutores() {
      axios.get('http://127.0.0.1:8000/api/autores').then((res) => {
        setAutores(res.data);
      });
    }

    async function loadEditoras() {
      axios.get('http://127.0.0.1:8000/api/editoras').then((res) => {
        setEditoras(res.data);
      });
    }

    loadAutores();
    loadEditoras();
  }, []);

  const [livroData, setLivroData] = useState<LivroFormData>({
    titulo: '',
    subtitulo: '',
    isbn: '',
    autor_id: '',
    editora_id: '',
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
      axios.put('http://127.0.0.1:8000/api/livros/' + id, { ...livroDataWithoutId, editora_id: editoraId, autor_id: autorId }).then(() => {
        router.push('/livro');
      });
    } else {
      axios.post('http://127.0.0.1:8000/api/livros', { ...livroDataWithoutId, editora_id: editoraId, autor_id: autorId }).then(() => {
        router.push('/livro');
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
          <Form.Select
            id="autor"
            name="autor"
            value={autorId}
            onChange={(e) => setAutorId(e.target.value)}
          >
            <option value="0">Selecione um autor</option>
            {
                autores.map((autor) => (
                    <option key={autor.id} value={autor.id}>{autor.nome}</option>
                ))
            }
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label>Editora</Form.Label>
          <Form.Select
            id="editora"
            name="editora"
            value={editoraId}
            onChange={(e) => setEditoraId(e.target.value)}
          >
            <option value="0">Selecione uma editora</option>
            {
                editoras.map((editora) => (
                    <option key={editora.id} value={editora.id}>{editora.nome}</option>
                ))
            }
          </Form.Select>
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
