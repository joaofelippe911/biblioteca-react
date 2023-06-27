'use client'

import axios from "axios";
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react";

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

interface interfReserva {
    "id": number;
    "aluno": interfAluno;
    "livro": interfLivro;
    "dataInicio": string;
    "dataFim": string;
    "observacao": string;
  }

export default function PageReserva() {
    const [reservas, setReservas] = useState<interfReserva[]>([])

    const router = useRouter();

    const excluirReserva = useCallback((id: number) => {
        axios.delete('http://127.0.0.1:8000/api/reservas/'+id)
        .then((res) => {
            setReservas(prevState => prevState.filter((reserva) => reserva.id !== id));
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/reservas')
            .then((res) => {
                setReservas(res.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    console.log(reservas);

    return (
        <>
            <div
                className="d-flex justify-content-between"
            >
                <h1>Reserva</h1>
                <div>
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => {
                            router.push('/reserva/criar')
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
                        <th>Aluno</th>
                        <th>Livro</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        reservas.map((element) => {
                            return (
                                <tr key={element.id}>
                                    <td>
                                        {element.id}
                                    </td>
                                    <td>
                                        {element.aluno.nome}
                                    </td>
                                    <td>
                                        {element.livro.titulo}
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-primary"
                                            type="button"
                                            onClick={() => {
                                                router.push('/reserva/' + element.id)
                                            }}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            type="button"
                                            onClick={() => {
                                                excluirReserva(element.id)
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