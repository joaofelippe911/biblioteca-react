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

export default function PageEditora() {
    const [editoras, setEditoras] = useState<interfEditora[]>([]);

    const router = useRouter();

    const excluirEditora = useCallback((id: number) => {
        axios.delete('http://localhost:8000/api/editoras/'+id)
        .then((res) => {
            setEditoras(prevState => prevState.filter((editora) => editora.id !== id));
        })
    }, [])

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/editoras')
            .then((res) => {
                setEditoras(res.data);
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
            <Table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Telefone</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        editoras.map((element) => {
                            return (
                                <tr>
                                    <td>
                                        {element.id}
                                    </td>
                                    <td>
                                        {element.nome}
                                    </td>
                                    <td>
                                        {element.telefone}
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
            </Table>

        </>
    )
}