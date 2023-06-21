import { cookies } from 'next/headers'
import { LayoutDashboard } from "@/components/LayoutDashboard";
import { verificaTokenExpirou } from '@/services/Token';
import { redirect } from 'next/navigation';
import PageCategoria from '@/components/PageCategoria';
import axios from 'axios';
import PageCurso from '@/components/PageCurso';

interface interCurso {
    "id": number;
    "nome": string;
    "coordenador": string;
    "duracao": number;
}

export default async function Curso() {

    const cookie = cookies();

    const token = cookie.get('shoopypainel.token')

    if (!token?.value || verificaTokenExpirou(token.value)) {
        redirect('/login')
    }

    let curso: { data: Array<interCurso> } = { data: [] }

    try {
        curso = await axios.get('http://127.0.0.1:8000/api/cursos');
        console.log({curso})
    } catch (error) {
        console.log({error})
    }


    return (
        <LayoutDashboard
            active='curso'
            token={token.value}
        >
            <PageCurso dados={curso.data} />
        </LayoutDashboard>
    )
}