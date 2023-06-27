'use client'

import axios from "axios";
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useRef, useState } from "react";
import Form from 'react-bootstrap/Form';

interface interProps {
    parametro: string
}

export default function PageFormAutor(props: interProps) {

    const router = useRouter();
    const refForm = useRef<any>()

    const [editar, setEditar] = useState<boolean>(false)

    useEffect(() => {

        const idQuery = Number(props.parametro);

        if (Number.isInteger(idQuery)) {
            setEditar(true)
            axios.get('http://127.0.0.1:8000/api/autores/' + idQuery).then(
                (res) => {
                    refForm.current['id'].value = res.data.id;
                    refForm.current['nome'].value = res.data.nome;
                    refForm.current['endereco'].value = res.data.endereco;
                    refForm.current['cidade'].value = res.data.cidade;
                    refForm.current['uf'].value = res.data.uf;
                    refForm.current['telefone'].value = res.data.telefone;
                }
            )
        }
    }, [])

    const addOrEditAutor = useCallback(() => {        
        if (editar) {
            let objSalvar = {
                id: refForm.current['id'].value,
                nome: refForm.current['nome'].value,
                endereco: refForm.current['endereco'].value,
                cidade: refForm.current['cidade'].value,
                uf: refForm.current['uf'].value,
                telefone: refForm.current['telefone'].value
            }

            axios.put('http://127.0.0.1:8000/api/autores/'+refForm.current['id'].value, objSalvar).then((res) => {
                router.push('/autor')
            })

        } else {
            let objSalvar = {
                nome: refForm.current['nome'].value,
                endereco: refForm.current['endereco'].value,
                cidade: refForm.current['cidade'].value,
                uf: refForm.current['uf'].value,
                telefone: refForm.current['telefone'].value
            }

            axios.post('http://127.0.0.1:8000/api/autores', objSalvar).then((res) => {
                router.push('/autor')
            })
        }
    }, [editar])

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
                            addOrEditAutor()
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

                <Form.Group className='mb-4'>
                    <Form.Label>
                        Nome
                    </Form.Label>
                    <Form.Control type="text" id="nome" name="nome" />
                </Form.Group>
                <Form.Group className='mb-4'>
                    <Form.Label>
                        Endereço
                    </Form.Label>
                    <Form.Control type="text" id="endereco" name="endereco" />
                </Form.Group>
                <Form.Group className='mb-4'>
                    <Form.Label>
                        Cidade
                    </Form.Label>
                    <Form.Control type="text" id="cidade" name="cidade" />
                </Form.Group>

                <Form.Group className='mb-4'>
                    <Form.Label>
                        UF
                    </Form.Label>
                    <Form.Control type="text" id="uf" name="uf" />
                </Form.Group>

                <Form.Group className='mb-4'>
                    <Form.Label>
                        Telefone
                    </Form.Label>
                    <Form.Control type="text" id="telefone" name="telefone" />
                </Form.Group>

            </Form>

        </>
    )
}