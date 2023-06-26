import { cookies } from 'next/headers'
import { LayoutDashboard } from "@/components/LayoutDashboard";
import { verificaTokenExpirou } from '@/services/Token';
import { redirect } from 'next/navigation';
import PageFormAutor from '@/components/PageFormAutor';

export default async function AddAutor({params}: any) {

    const cookie = cookies();

    const token = cookie.get('biblioteca-react.token')

    if (!token?.value || verificaTokenExpirou(token.value)) {
        redirect('/login')
    }

    return (
        <LayoutDashboard
            active='autor'
            token={token.value}
        >
            <PageFormAutor parametro={params.id} />
        </LayoutDashboard>
    )
}