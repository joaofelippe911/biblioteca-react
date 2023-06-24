'use client'

import axios from "axios";
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react";

interface interProps {
    dados: Array<{ id: number, 
        nome: string, 
        endereco: string, 
        cidade: string, uf: string, 
        telefone: number }>
}

export default function PageEditora(props: interProps) {

    const router = useRouter();

    const [dados, setDados] = useState<Array<{
        id: number,
        nome: string,
        endereco: string, 
        cidade: string,
        uf: string,
        telefone: number,
    }
    >>(props.dados)

    const excluirEditora = useCallback((id: number) => {
        axios.delete('http://localhost:8000/api/editoras/'+id)
        .then((res) => {
            
        })
    }, [])

    return (
        <>
            <div
                className="d-flex justify-content-between"
            >
                <h1>Editora</h1>
                <div>
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => {
                            router.push('/editora/criar')
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
                                                router.push('/editora/' + element.id)
                                            }}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            type="button"
                                            onClick={() => {
                                                excluirEditora(element.id)
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