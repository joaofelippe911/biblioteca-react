<<<<<<< HEAD
import { cookies } from 'next/headers'
import { LayoutDashboard } from "@/components/LayoutDashboard";
import { verificaTokenExpirou } from '@/services/Token';
import { redirect } from 'next/navigation';
import PageFormEditora from '@/components/PageFormEditora';

export default async function AddEditora({params}: any) {

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
            <PageFormEditora parametro={params.id} />
        </LayoutDashboard>
    )
}
=======
import { cookies } from 'next/headers';
import { LayoutDashboard } from '@/components/LayoutDashboard';
import { verificaTokenExpirou } from '@/services/Token';
import { redirect } from 'next/navigation';
import PageFormEditora from '@/components/PageFormCategoria';

export default async function AddEditora({ params }: any) {
  const cookie = cookies();
  const token = cookie.get('shoopypainel.token');

  if (!token?.value || verificaTokenExpirou(token.value)) {
    redirect('/login');
  }

  return (
    <LayoutDashboard active="editora" token={token.value}>
      <PageFormEditora parametro={params.id} />
    </LayoutDashboard>
  );
}
>>>>>>> a11e47f (PageLivro)
