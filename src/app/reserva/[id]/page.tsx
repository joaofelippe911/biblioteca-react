import { cookies } from 'next/headers';
import { LayoutDashboard } from '@/components/LayoutDashboard';
import { verificaTokenExpirou } from '@/services/Token';
import { redirect } from 'next/navigation';
import PageFormReserva from '@/components/PageFormCategoria';

export default async function AddReserva({ params }: any) {
  const cookie = cookies();
  const token = cookie.get('shoopypainel.token');

  if (!token?.value || verificaTokenExpirou(token.value)) {
    redirect('/login');
  }

  return (
    <LayoutDashboard active="reserva" token={token.value}>
      <PageFormReserva parametro={params.id} />
    </LayoutDashboard>
  );
}
