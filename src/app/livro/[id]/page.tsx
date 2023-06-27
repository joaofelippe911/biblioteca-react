import { cookies } from 'next/headers';
import { LayoutDashboard } from '@/components/LayoutDashboard';
import { verificaTokenExpirou } from '@/services/Token';
import { redirect } from 'next/navigation';
import PageFormLivro from '@/components/PageFormLivro';

export default async function AddLivro({ params }: any) {
  const cookie = cookies();
  const token = cookie.get('shoopypainel.token');

  if (!token?.value || verificaTokenExpirou(token.value)) {
    redirect('/login');
  }

  return (
    <LayoutDashboard active="livro" token={token.value}>
      <PageFormLivro parametro={params.id} />
    </LayoutDashboard>
  );
}
