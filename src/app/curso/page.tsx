import { cookies } from 'next/headers'
import { LayoutDashboard } from "@/components/LayoutDashboard";
import { verificaTokenExpirou } from '@/services/Token';
import { redirect } from 'next/navigation';
import PageCurso from '@/components/PageCurso';


export default async function Curso() {

    const cookie = cookies();

    const token = cookie.get('biblioteca-react.token')

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