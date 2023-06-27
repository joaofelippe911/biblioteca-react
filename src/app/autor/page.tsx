import { cookies } from 'next/headers'
import { LayoutDashboard } from "@/components/LayoutDashboard";
import { verificaTokenExpirou } from '@/services/Token';
import { redirect } from 'next/navigation';
import axios from 'axios';
import PageAutor from '@/components/PageAutor';

//interface interAutor {
//    "id": number;
//    "nome": string;
//  "endereco": string;
//  "cidade": string;
//  "uf": string;
 //   "telefone": number;
//}

const AutorPage = () => {
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
            <PageAutor dados={[]} />
        </LayoutDashboard>
    )
}