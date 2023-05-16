import { NextResponse } from 'next/server'
import axios from 'axios'

export async function POST(req: Request) {
    const { email, senha }: any = await req.json()

    try {

        let usuario = await axios.get(
            "http://localhost:3001/usuarios?email="
            +
            email
        )

        console.log(usuario)
        return NextResponse.json({data: 'teste'})

    } catch (error) {
        console.log("error")
        // console.log(error)
    }

    return NextResponse.json({ data: "Rota get" })
}