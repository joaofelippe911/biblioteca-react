import { cookies } from 'next/headers'
import { LayoutDashboard } from "@/components/LayoutDashboard";
import { verificaTokenExpirou } from '@/services/Token';
import { redirect } from 'next/navigation';
import PageFormAluno from '@/components/PageFormAluno';

export default async function AddAluno({params}: any) {

    const cookie = cookies();

    const token = cookie.get('biblioteca-react.token')

    if (!token?.value || verificaTokenExpirou(token.value)) {
        redirect('/login')
    }

    return (
        <LayoutDashboard
            active='aluno'
            token={token.value}
        >
            <PageFormAluno parametro={params.id} />
        </LayoutDashboard>
    )
}