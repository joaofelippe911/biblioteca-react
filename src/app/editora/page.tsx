import { cookies } from 'next/headers'
import { LayoutDashboard } from "@/components/LayoutDashboard";
import { verificaTokenExpirou } from '@/services/Token';
import { redirect } from 'next/navigation';
import axios from 'axios';
import PageEditora from '@/components/PageEditora';

interface interEditora {
    "id": number;
    "nome": string;
    "endereco": string;
    "cidade": string;
    "uf": string;
    "telefone": number;
}

export default async function Editora() {

    const cookie = cookies();

    const token = cookie.get('biblioteca-react.token')

    if (!token?.value || verificaTokenExpirou(token.value)) {
        redirect('/login')
    }

    let editora: { data: Array<interEditora> } = { data: [] }

    try {
      editora = await axios.get('http://127.0.0.1:8000/api/editoras');
        console.log({editora})
    } catch (error) {
        console.log({error})
    }

<<<<<<< HEAD

    return (
        <LayoutDashboard
            active='editora'
            token={token.value}
        >
            <PageEditora dados={editora.data} />
        </LayoutDashboard>
    )
}
=======
interface interfEditora  {
  id: number;
  nome: string;
  endereco: string;
  cidade: string;
  uf: string;
  telefone:string;
}

const LivrosPage = () => {
  const [livros, setLivros] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');

  const [editoras, setEditoras] = useState<Array<interfEditora>>([]);

  


  const handleTituloChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitulo(e.target.value);
  };

  const handleAutorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAutor(e.target.value);
  };

  const handleAddLivro = () => {
    const novoLivro = {
      id: new Date().getTime(),
      titulo,
      autor,
    };
    setLivros([...livros, novoLivro]);
    setTitulo('');
    setAutor('');
  };

  const handleDeleteLivro = (id: number) => {
    const novosLivros = livros.filter((livro) => livro.id !== id);
    setLivros(novosLivros);
  };

}
 
>>>>>>> 0b8a4ec (Crud Reserva Finalizado)
