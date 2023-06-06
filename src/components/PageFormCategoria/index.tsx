'use client'

import axios from "axios";
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useRef, useState } from "react";

interface interProps {
    parametro: string
}

export default function PageFormCategoria(props: interProps) {

    const router = useRouter();
    const refForm = useRef<any>()

    const [editar, setEditar] = useState<boolean>(false)

    useEffect(() => {

        const idQuery = Number(props.parametro)

        if (Number.isInteger(idQuery)) {
            setEditar(true)
            axios.get('http://localhost:3001/categorias?id=' + idQuery).then(
                (res) => {

                    refForm.current['id'].value = res.data[0].id
                    refForm.current['categoria'].value = res.data[0].categoria.toString()
                }
            )
        }
    }, [])

    const addOrCEditategoria = useCallback(() => {

        
        if (editar) {
            let objSalvar = {
                id: refForm.current['id'].value,
                categoria: refForm.current['categoria'].value
            }

            axios.put('http://localhost:3001/categorias/'+refForm.current['id'].value, objSalvar).then((res) => {
                router.push('/categoria')
            })

        } else {
            let objSalvar = {
                categoria: refForm.current['categoria'].value
            }

            axios.post('http://localhost:3001/categorias', objSalvar).then((res) => {
                router.push('/categoria')
            })
        }


    }, [editar])

    return (
        <>
            <div
                className="d-flex justify-content-between"
            >
                <h1>Categoria</h1>
                <div>
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => {
                            addOrCEditategoria()
                        }}
                    >
                        Adicionar
                    </button>
                </div>
            </div>
            <form
                ref={refForm}
            >
                {
                    editar ?
                        <>
                            <label>
                                Id
                            </label>
                            <input name="id" id="id"  readOnly type="text" />
                        </>
                        :
                        <></>
                }

                <label>
                    Nome
                </label>
                <input type="text" id="categoria" name="categoria" />


            </form>

        </>
    )
}