import { cookies } from 'next/headers'
import { LayoutDashboard } from "@/components/LayoutDashboard";
import { verificaTokenExpirou } from '@/services/Token';
import { redirect } from 'next/navigation';
import PageFormCategoria from '@/components/PageFormCategoria';
import PageFormCurso from '@/components/PageFormCurso';

export default async function AddCurso({params}: any) {

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
            <PageFormCurso parametro={params.id} />
        </LayoutDashboard>
    )
}