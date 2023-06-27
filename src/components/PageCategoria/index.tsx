'use client'

import axios from "axios";
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react";

interface interProps {
    dados: Array<{ id: number, categoria: string }>
}

export default function PageCategoria(props: interProps) {

    const router = useRouter();

    const [dados, setDados] = useState<Array<{
        id: number,
        categoria: string
    }
    >>(props.dados)

    const excluirCategoria = useCallback((id: number) => {
        axios.delete('http://localhost:3001/categorias/'+id)
        .then((res) => {
            
        })
    }, [])

    return (
        <>
            <div
                className="d-flex justify-content-between align-items-center"
            >
                <h1>Categoria</h1>
                <div>
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => {
                            router.push('/categoria/criar')
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
                                        {element.categoria}
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-primary"
                                            type="button"
                                            onClick={() => {
                                                router.push('/categoria/' + element.id)
                                            }}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            type="button"
                                            onClick={() => {
                                                excluirCategoria(element.id)
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