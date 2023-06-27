import axios from 'axios';
import { useEffect, useState } from 'react';
import LivroUpdate from './update';
import LivroDelete from './delete';
import LivroCreate from './create';
import { verificaTokenExpirou } from '@/services/Token';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { LayoutDashboard } from '@/components/LayoutDashboard';
import PageLivro from '@/components/PageLivro';

const Livro = () => {
  const cookie = cookies();

  const token = cookie.get('biblioteca-react.token')

  if (!token?.value || verificaTokenExpirou(token.value)) {
      redirect('/login')
  }
  
  return (
    <LayoutDashboard
        active='livro'
        token={token.value}
    >
        <PageLivro/>
    </LayoutDashboard>
)
};

export default Livro;