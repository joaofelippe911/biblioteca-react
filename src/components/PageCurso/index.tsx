'use client'

import axios from "axios";
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';

interface interCurso {
    "id": number;
    "nome": string;
    "coordenador": string;
    "duracao": number;
}

export default function PageCurso() {
    const [cursos, setCursos] = useState<interCurso[]>([])

    const router = useRouter();

    const excluirCurso = useCallback((id: number) => {
        axios.delete('http://127.0.0.1:8000/api/cursos/'+id)
        .then((res) => {
            setCursos(prevState => prevState.filter((curso) => curso.id !== id));
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/cursos')
            .then((res) => {
                setCursos(res.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    return (
        <>
            <div
                className="d-flex justify-content-between align-items-center"
            >
                <h1>Curso</h1>
                <div>
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => {
                            router.push('/curso/criar')
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
                        <th>Nome</th>
                        <th>Coordenador</th>
                        <th>Duração (semestres)</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cursos.map((element) => {
                            return (
                                <tr key={element.id}>
                                    <td>
                                        {element.id}
                                    </td>
                                    <td>
                                        {element.nome}
                                    </td>
                                    <td>
                                        {element.coordenador}
                                    </td>
                                    <td>
                                        {element.duracao}
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-primary"
                                            type="button"
                                            onClick={() => {
                                                router.push('/curso/' + element.id)
                                            }}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            type="button"
                                            onClick={() => {
                                                excluirCurso(element.id)
                                            }}
                                        >
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>

        </>
    )
}