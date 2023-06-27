'use client'

import axios from "axios";
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react";

interface interAutor {
    "id": number;
    "nome": string;
    "endereco": string;
    "cidade": string;
    "uf": string;
    "telefone": string;
}

export default function PageAutor(){
    const [autores, setAutores] = useState<interAutor[]>([])

    const router = useRouter();

    const excluirAutor = useCallback((id: number) => {
        axios.delete('http://localhost:8000/api/autores/'+id)
        .then((res) => {
            setAutores(prevState => prevState.filter((autor)=> autor.id !== id));
        }).catch((err) => {
            console.log(err);
        })
    }, [])


    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/autores')
            .then((res) => {
                setAutores(res.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    console.log(autores);



return (
    <>
        <div
            className="d-flex justify-content-between"
        >
            <h1>Autor</h1>
            <div>
                <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => {
                        router.push('/autor/criar')
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
                    autores.map((element) => {
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
                                            router.push('/autor/' + element.id)
                                        }}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        type="button"
                                        onClick={() => {
                                            excluirAutor(element.id)
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
