import { cookies } from 'next/headers'
import { LayoutDashboard } from "@/components/LayoutDashboard";
import { verificaTokenExpirou } from '@/services/Token';
import { redirect } from 'next/navigation';
import PageCategoria from '@/components/PageCategoria';
import axios from 'axios';

interface interCategoria {
    "id": number,
    "categoria": string
}

export default async function Categoria() {

    const cookie = cookies();

    const token = cookie.get('shoopypainel.token')

    if (!token?.value || verificaTokenExpirou(token.value)) {
        redirect('/login')
    }

    let categoria: { data: Array<interCategoria> } = { data: [] }

    categoria = await axios.get('http://localhost:3001/categorias')

    return (
        <LayoutDashboard
            active='categoria'
            token={token.value}
        >
            <PageCategoria dados={categoria.data} />
        </LayoutDashboard>
    )
}