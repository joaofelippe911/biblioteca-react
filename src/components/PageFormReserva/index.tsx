'use client'

import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import Form from 'react-bootstrap/Form';

interface interfAluno {
    "id": number;
    "ra": number;
    "nome": string;
    "endereco": string;
    "cidade": string;
    "uf": string;
    "telefone": string;
    "curso": string;
}

interface interfLivro {
    id: number;
    titulo: string;
    subtitulo: string;
    isbn: string;
    autor: string;
    editora: string;
    local: string;
    ano: number;
  }

interface interProps {
    parametro: string;
}

export default function PageFormReserva(props: interProps) {
    const [alunos, setAlunos] = useState<interfAluno[]>([]);
    const [alunoId, setAlunoId] = useState('');

    const [livros, setLivros] = useState<interfLivro[]>([]);
    const [livroId, setLivroId] = useState('');

    const router = useRouter();
    const refForm = useRef<any>();

    const [editar, setEditar] = useState<boolean>(false);

    useEffect(() => {
        const idQuery = Number(props.parametro);

        if (Number.isInteger(idQuery)) {
            setEditar(true);
            axios.get('http://127.0.0.1:8000/api/reservas/' + idQuery).then((res) => {
                refForm.current['id'].value = res.data.id;
                setAlunoId(res.data.aluno_id);
                setLivroId(res.data.livro_id);
                refForm.current['dataInicio'].value = res.data.dataInicio;
                refForm.current['dataFim'].value = res.data.dataFim;
                refForm.current['observacao'].value = res.data.observacao;
            });
        }
    }, []);

    useEffect(() => {
        async function loadAlunos() {
            axios.get('http://127.0.0.1:8000/api/alunos')
                .then((res) => {
                setAlunos(res.data);
            });
        }

        async function loadLivros() {
            axios.get('http://127.0.0.1:8000/api/livros')
                .then((res) => {
                setLivros(res.data);
             });
        }

        loadAlunos();
        loadLivros();
    }, [])

    const addOrEditReserva = useCallback(() => {
        if (editar) {
            let objSalvar = {
                id: refForm.current['id'].value,
                aluno_id: refForm.current['aluno'].value,
                livro_id: refForm.current['livro'].value,
                dataInicio: refForm.current['dataInicio'].value,
                dataFim: refForm.current['dataFim'].value,
                observacao: refForm.current['observacao'].value,
            };

            axios.put('http://127.0.0.1:8000/api/reservas/' + refForm.current['id'].value, objSalvar).then((res) => {
                router.push('/reserva');
            });
        } else {
            let objSalvar = {
                aluno_id: refForm.current['aluno'].value,
                livro_id: refForm.current['livro'].value,
                dataInicio: refForm.current['dataInicio'].value,
                dataFim: refForm.current['dataFim'].value,
                observacao: refForm.current['observacao'].value,
            };

            axios.post('http://127.0.0.1:8000/api/reservas', objSalvar).then((res) => {
                router.push('/reserva');
            });
        }
    }, [editar]);

    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <h1>Reservas</h1>
                <div>
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => {
                            addOrEditReserva();
                        }}
                    >
                        Salvar
                    </button>
                </div>
            </div>
            <Form ref={refForm}>
                {editar ? (
                    <Form.Group>
                        <Form.Label>Id</Form.Label>
                        <Form.Control name="id" id="id" disabled readOnly type="text" />
                    </Form.Group>
                ) : null}

                <Form.Group>
                    <Form.Label>Aluno</Form.Label>
                    <Form.Select 
                        id="aluno" 
                        name="aluno"
                        value={alunoId}
                        onChange={(e) => { console.log("alterando aluno...", e.target.value); setAlunoId(e.target.value)}}
                    >
                        <option value="0">Selecione um aluno</option>
                        {
                            alunos.map((aluno) => (
                                <option key={aluno.id} value={aluno.id}>{aluno.nome}</option>
                            ))
                        }
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Livro</Form.Label>
                    <Form.Select 
                        id="livro" 
                        name="livro"
                        value={livroId}
                        onChange={(e) => setLivroId(e.target.value)}
                    >
                        <option value="0">Selecione um livro</option>
                        {
                            livros.map((livro) => (
                                <option key={livro.id} value={livro.id}>{livro.titulo}</option>
                            ))
                        }
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Data de Início</Form.Label>
                    <Form.Control type="date" id="dataInicio" name="dataInicio" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Data de Fim</Form.Label>
                    <Form.Control type="date" id="dataFim" name="dataFim" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Observação</Form.Label>
                    <Form.Control type="text" id="observacao" name="observacao" />
                </Form.Group>
            </Form>
        </>
    );
}
