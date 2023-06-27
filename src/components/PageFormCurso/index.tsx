'use client'

import axios from "axios";
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useRef, useState } from "react";
import Form from 'react-bootstrap/Form';

interface interProps {
    parametro: string
}

export default function PageFormCurso(props: interProps) {

    const router = useRouter();
    const refForm = useRef<any>()

    const [editar, setEditar] = useState<boolean>(false)

    useEffect(() => {

        const idQuery = Number(props.parametro);

        if (Number.isInteger(idQuery)) {
            setEditar(true)
            axios.get('http://127.0.0.1:8000/api/cursos/' + idQuery).then(
                (res) => {
                    refForm.current['id'].value = res.data.id;
                    refForm.current['nome'].value = res.data.nome;
                    refForm.current['coordenador'].value = res.data.coordenador;
                    refForm.current['duracao'].value = res.data.duracao;
                }
            )
        }
    }, [])

    const addOrEditCurso = useCallback(() => {        
        if (editar) {
            let objSalvar = {
                id: refForm.current['id'].value,
                nome: refForm.current['nome'].value,
                coordenador: refForm.current['coordenador'].value,
                duracao: refForm.current['duracao'].value
            }

            axios.put('http://127.0.0.1:8000/api/cursos/'+refForm.current['id'].value, objSalvar).then((res) => {
                router.push('/curso')
            })

        } else {
            let objSalvar = {
                nome: refForm.current['nome'].value,
                coordenador: refForm.current['coordenador'].value,
                duracao: refForm.current['duracao'].value,
            }

            axios.post('http://127.0.0.1:8000/api/cursos', objSalvar).then((res) => {
                router.push('/curso')
            })
        }
    }, [editar])

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
                            addOrEditCurso()
                        }}
                    >
                        Salvar
                    </button>
                </div>
            </div>
            <Form
                ref={refForm}
            >
                {
                    editar ?
                        <Form.Group>
                            <Form.Label>
                                Id
                            </Form.Label>
                            <Form.Control name="id" id="id" disabled readOnly type="text" />
                        </Form.Group>
                        :
                        <></>
                }

                <Form.Group>
                    <Form.Label>
                        Nome
                    </Form.Label>
                    <Form.Control type="text" id="nome" name="nome" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        Coordenador
                    </Form.Label>
                    <Form.Control type="text" id="coordenador" name="coordenador" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        Duração (semestres)
                    </Form.Label>
                    <Form.Control type="number" id="duracao" name="duracao" />
                </Form.Group>
            </Form>

        </>
    )
}