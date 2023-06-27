'use client'

import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import Form from 'react-bootstrap/Form';

interface interProps {
    parametro: string;
}

export default function PageFormReserva(props: interProps) {
    const router = useRouter();
    const refForm = useRef<any>();

    const [editar, setEditar] = useState<boolean>(false);

    useEffect(() => {
        const idQuery = Number(props.parametro);

        if (Number.isInteger(idQuery)) {
            setEditar(true);
            axios.get('http://127.0.0.1:8000/api/reservas/' + idQuery).then((res) => {
                refForm.current['id'].value = res.data.id;
                refForm.current['aluno'].value = res.data.aluno;
                refForm.current['livro'].value = res.data.livro;
                refForm.current['dataInicio'].value = res.data.dataInicio;
                refForm.current['dataFim'].value = res.data.dataFim;
                refForm.current['observacao'].value = res.data.observacao;
            });
        }
    }, []);

    const addOrEditReserva = useCallback(() => {
        if (editar) {
            let objSalvar = {
                id: refForm.current['id'].value,
                aluno: refForm.current['aluno'].value,
                livro: refForm.current['livro'].value,
                dataInicio: refForm.current['dataInicio'].value,
                dataFim: refForm.current['dataFim'].value,
                observacao: refForm.current['observacao'].value,
            };

            axios.put('http://127.0.0.1:8000/api/reservas/' + refForm.current['id'].value, objSalvar).then((res) => {
                router.push('/reservas');
            });
        } else {
            let objSalvar = {
                aluno: refForm.current['aluno'].value,
                livro: refForm.current['livro'].value,
                dataInicio: refForm.current['dataInicio'].value,
                dataFim: refForm.current['dataFim'].value,
                observacao: refForm.current['observacao'].value,
            };

            axios.post('http://127.0.0.1:8000/api/reservas', objSalvar).then((res) => {
                router.push('/reservas');
            });
        }
    }, [editar]);

    return (
        <>
            <div className="d-flex justify-content-between">
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
                    <Form.Control type="text" id="aluno" name="aluno" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Livro</Form.Label>
                    <Form.Control type="text" id="livro" name="livro" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Data de Início</Form.Label>
                    <Form.Control type="text" id="dataInicio" name="dataInicio" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Data de Fim</Form.Label>
                    <Form.Control type="text" id="dataFim" name="dataFim" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Observação</Form.Label>
                    <Form.Control type="text" id="observacao" name="observacao" />
                </Form.Group>
            </Form>
        </>
    );
}
