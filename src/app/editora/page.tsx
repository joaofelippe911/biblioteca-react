import { cookies } from 'next/headers'
import { LayoutDashboard } from "@/components/LayoutDashboard";
import { verificaTokenExpirou } from '@/services/Token';
import { redirect } from 'next/navigation';
import axios from 'axios';
import PageEditora from '@/components/PageEditora';

interface interEditora {
    "id": number;
    "nome": string;
    "endereco": string;
    "cidade": string;
    "uf": string;
    "telefone": number;
}

export default async function Editora() {

    const cookie = cookies();

    const token = cookie.get('biblioteca-react.token')

    if (!token?.value || verificaTokenExpirou(token.value)) {
        redirect('/login')
    }

    let editora: { data: Array<interEditora> } = { data: [] }

    try {
      editora = await axios.get('http://127.0.0.1:8000/api/editoras');
        console.log({editora})
    } catch (error) {
        console.log({error})
    }


    return (
        <LayoutDashboard
            active='editora'
            token={token.value}
        >
            <PageEditora dados={editora.data} />
        </LayoutDashboard>
    )
}
