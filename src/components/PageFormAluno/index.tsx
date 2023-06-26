'use client'

import axios from "axios";
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useRef, useState } from "react";
import Form from 'react-bootstrap/Form';

interface interProps {
    parametro: string
}

export default function PageFormAluno(props: interProps) {

    const router = useRouter();
    const refForm = useRef<any>()

    const [editar, setEditar] = useState<boolean>(false)

    useEffect(() => {

        const idQuery = Number(props.parametro);

        if (Number.isInteger(idQuery)) {
            setEditar(true)
            axios.get('http://127.0.0.1:8000/api/alunos/' + idQuery).then(
                (res) => {
                    refForm.current['id'].value = res.data.id;
                    refForm.current['ra'].value = res.data.ra;
                    refForm.current['nome'].value = res.data.nome;
                    refForm.current['endereco'].value = res.data.endereco;
                    refForm.current['cidade'].value = res.data.cidade;
                    refForm.current['uf'].value = res.data.telefone;
                    refForm.current['curso'].value = res.data.curso;
                }
            )
        }
    }, [])

    const addOrEditAluno = useCallback(() => {        
        if (editar) {
            let objSalvar = {
                id: refForm.current['id'].value,
                ra: refForm.current['ra'].value,
                nome: refForm.current['nome'].value,
                endereco: refForm.current['endereco'].value,
                cidade: refForm.current['cidade'].value,
                uf: refForm.current['uf'].value,
                telefone: refForm.current['telefone'].value,
                curso: refForm.current['curso'].value,
            }

            axios.put('http://127.0.0.1:8000/api/alunos/'+refForm.current['id'].value, objSalvar).then((res) => {
                router.push('/alunos')
            })

        } else {
            let objSalvar = {
                ra: refForm.current['ra'].value,
                nome: refForm.current['nome'].value,
                endereco: refForm.current['endereco'].value,
                cidade: refForm.current['cidade'].value,
                uf: refForm.current['uf'].value,
                telefone: refForm.current['telefone'].value,
                curso: refForm.current['curso'].value,
            }

            axios.post('http://127.0.0.1:8000/api/alunos', objSalvar).then((res) => {
                router.push('/alunos')
            })
        }
    }, [editar])

    return (
        <>
            <div
                className="d-flex justify-content-between"
            >
                <h1>Alunos</h1>
                <div>
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => {
                            addOrEditAluno()
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

                <Form.Group>
                    <Form.Label>
                        RA
                    </Form.Label>
                    <Form.Control type="text" id="ra" name="rAA" />
                </Form.Group>

                    <Form.Label>
                        Nome
                    </Form.Label>
                    <Form.Control type="text" id="nome" name="nome" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        Endereço
                    </Form.Label>
                    <Form.Control type="text" id="endereco" name="endereco" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        Cidade
                    </Form.Label>
                    <Form.Control type="text" id="cidade" name="cidade" />
                </Form.Group>

                <Form.Group>
                    <Form.Label>
                        UF
                    </Form.Label>
                    <Form.Control type="text" id="uf" name="uf" />
                </Form.Group>

                <Form.Group>
                    <Form.Label>
                        Telefone
                    </Form.Label>
                    <Form.Control type="text" id="telefone" name="telefone" />
                </Form.Group>

                <Form.Group>
                    <Form.Label>
                        Curso
                    </Form.Label>
                    <Form.Control type="text" id="curso" name="curso" />
                </Form.Group>

            </Form>

        </>
    )
}