import { cookies } from 'next/headers'
import { LayoutDashboard } from "@/components/LayoutDashboard";
import { verificaTokenExpirou } from '@/services/Token';
import { redirect } from 'next/navigation';
import axios from 'axios';
import PageEditora from '@/components/PageEditora';

export default async function Editora() {

    const cookie = cookies();

    const token = cookie.get('biblioteca-react.token')

    if (!token?.value || verificaTokenExpirou(token.value)) {
        redirect('/login')
    }


    return (
        <LayoutDashboard
            active='editora'
            token={token.value}
        >
            <PageEditora />
        </LayoutDashboard>
    )
}
