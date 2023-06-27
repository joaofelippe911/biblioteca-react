'use client'

import axios from "axios";
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react";

interface interReserva {
    "id": number;
    "reserva": string;
    "livro": string;
    "dataInicio": string;
    "dataFim": string;
    "observacao": string;
  }

export default function PageReserva() {
    const [reservas, setReservas] = useState<interReserva[]>([])

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
                        <th>Nome</th>
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
                                        {element.id}
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