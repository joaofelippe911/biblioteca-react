import axios from 'axios';
import { useEffect, useState } from 'react';
import ReservaUpdate from './update';
import ReservaDelete from './delete';
import ReservaCreate from './create';
import { verificaTokenExpirou } from '@/services/Token';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { LayoutDashboard } from '@/components/LayoutDashboard';
import PageReserva from '@/components/PageReserva';

const Reserva = () => {
  const cookie = cookies();

  const token = cookie.get('biblioteca-react.token');

  if (!token?.value || verificaTokenExpirou(token.value)) {
      redirect('/login');
  }

  return (
    <LayoutDashboard
        active='reserva'
        token={token.value}
    >
        <PageReserva/>
    </LayoutDashboard>
)
};

export default Reserva;