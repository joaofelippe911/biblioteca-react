import { cookies } from 'next/headers'
import { LayoutDashboard } from "@/components/LayoutDashboard";
import { verificaTokenExpirou } from '@/services/Token';
import { redirect } from 'next/navigation';
import axios from 'axios';
import PageAutor from '@/components/PageAutor';

interface interAutor {
    "id": number;
    "nome": string;
    "endereco": string;
    "cidade": string;
    "uf": string;
    "telefone": number;
}

export default async function Autor() {

    const cookie = cookies();

    const token = cookie.get('biblioteca-react.token')

    if (!token?.value || verificaTokenExpirou(token.value)) {
        redirect('/login')
    }

    let autor: { data: Array<interAutor> } = { data: [] }

    try {
      autor = await axios.get('http://127.0.0.1:8000/api/autores');
        console.log({editora: autor})
    } catch (error) {
        console.log({error})
    }


    return (
        <LayoutDashboard
            active='autor'
            token={token.value}
        >
            <PageAutor dados={autor.data} />
        </LayoutDashboard>
    )
}
