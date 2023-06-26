import { cookies } from 'next/headers'
import { LayoutDashboard } from "@/components/LayoutDashboard";
import { verificaTokenExpirou } from '@/services/Token';
import { redirect } from 'next/navigation';
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

    return (
        <LayoutDashboard
            active='curso'
            token={token.value}
        >
            <PageCurso/>
        </LayoutDashboard>
    )
}