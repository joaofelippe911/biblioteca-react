'use client'

import axios from "axios";
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react";

interface interAluno {
    "id": number;
    "ra": number;
    "nome": string;
    "endereco": string;
    "cidade": string;
    "uf": string;
    "telefone": string;
    "curso": string;
}

export default function PageAluno() {
    const [cursos, setCursos] = useState<interAluno[]>([])

    const router = useRouter();

    const excluirAluno = useCallback((id: number) => {
        axios.delete('http://127.0.0.1:8000/api/alunos/'+id)
        .then((res) => {
            setCursos(prevState => prevState.filter((aluno) => aluno.id !== id));
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/alunos')
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
                className="d-flex justify-content-between"
            >
                <h1>Aluno</h1>
                <div>
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => {
                            router.push('/aluno/criar')
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
                        <th>Nome</th>
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
                                        <button
                                            className="btn btn-primary"
                                            type="button"
                                            onClick={() => {
                                                router.push('/aluno/' + element.id)
                                            }}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            type="button"
                                            onClick={() => {
                                                excluirAluno(element.id)
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
            </table>

        </>
    )
}