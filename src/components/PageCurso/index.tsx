'use client'

import axios from "axios";
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react";

interface interProps {
    dados: Array<{ id: number, nome: string, coordenador: string, duracao: number }>
}

export default function PageCurso(props: interProps) {

    const router = useRouter();

    const [dados, setDados] = useState<Array<{
        id: number,
        nome: string,
        coordenador: string, 
        duracao: number
    }
    >>(props.dados)

    const excluirCurso = useCallback((id: number) => {
        axios.delete('http://localhost:8000/api/cursos/'+id)
        .then((res) => {
            setDados(prevState => prevState.filter((curso) => curso.id !== id));
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    return (
        <>
            <div
                className="d-flex justify-content-between"
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
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        dados.map((element) => {
                            return (
                                <tr>
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
            </table>

        </>
    )
}