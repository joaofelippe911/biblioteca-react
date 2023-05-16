"use client"

import axios from "axios";
import { useCallback, useRef } from "react"

export default function Login() {

    const refForm = useRef<any>();

    const submitForm = useCallback((e: any) => {
        e.preventDefault();
        if (refForm.current.checkValidity()) {
            const objSalvar = {
                email: e.target.email.value,
                senha: e.target.senha.value,
            }

            axios.post('http://localhost:3000/api/login',
                objSalvar
            )
                .then((resposta) => {

                })
                .catch((err) => {

                })

        } else {
            refForm.current.classList.add('was-validated')
        }


    }, [])

    return (
        <>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100vw',
                height: '100vh'
            }}>
                <div style={{
                    border: 2,
                    borderColor: '#ccc',
                    borderStyle: 'solid',
                    padding: 20
                }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        // paddingTop: 20
                    }}>
                        <h1 style={{ color: "#0d6efd" }}>
                            Login
                        </h1>
                        <p>
                            Tem uma pergunta/problema? Por favor, escreva aqui e retornaremos assim que possível.
                        </p>
                    </div>
                    <hr />
                    <form
                        className="row g-3 needs-validation"
                        noValidate
                        style={{
                            // paddingBottom: 20
                            alignItems: 'center'
                        }}
                        ref={refForm}
                        onSubmit={submitForm}

                    >
                        <div className="col-md-12">
                            <label
                                htmlFor="email"
                                className="form-label"
                            >
                                Email
                            </label>
                            <div className="input-group has-validadion">
                                <span
                                    className="input-group-text"
                                // id="inputGroupPrepend"
                                >
                                    @
                                </span>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Digite o email"
                                    id="email"
                                    required
                                />
                                <div className="invalid-feedback">
                                    Por favor digite seu email.
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <label
                                htmlFor="senha"
                                className="form-label"
                            >
                                Senha
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Digite sua senha"
                                id="senha"
                                required
                            />
                            <div className="invalid-feedback">
                                Por favor digite sua senha.
                            </div>
                        </div>
                        <div className="col-md-12">
                            <button
                                className="btn btn-primary"
                                type='submit'
                                id="botao"

                            >
                                Enviar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
