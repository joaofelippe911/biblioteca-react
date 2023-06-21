import { cookies } from 'next/headers'
import { LayoutDashboard } from "@/components/LayoutDashboard";
import { verificaTokenExpirou } from '@/services/Token';
import { redirect } from 'next/navigation';
import PageFormCategoria from '@/components/PageFormCategoria';

export default async function AddCategoria({params}: any) {

    const cookie = cookies();

    const token = cookie.get('shoopypainel.token')

    if (!token?.value || verificaTokenExpirou(token.value)) {
        redirect('/login')
    }

    return (
        <LayoutDashboard
            active='categoria'
            token={token.value}
        >
            <PageFormCategoria parametro={params.id} />
        </LayoutDashboard>
    )
}