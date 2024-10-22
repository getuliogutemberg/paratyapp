'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Importando o CSS do Toastify
import axios from 'axios';
import { ClipLoader } from 'react-spinners';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [theme, setTheme] = useState<string>('dark');
  const [platformData, setPlatformData] = useState<{ Background: string } | null>(null);
  const router = useRouter();

  // Fetch platform data for the background image
  useEffect(() => {
    const fetchPlatformData = async () => {
      try {
        const response = await axios.get('/api/platform'); // Adjust the endpoint if needed
        setPlatformData(response.data);
      } catch (error) {
        console.error('Erro ao obter dados da plataforma:', error);
      }
    };

    fetchPlatformData();
  }, []);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem('token', token);
        toast.success('Registro bem-sucedido!'); // Notificação de sucesso
        router.push('/dashboard');
      } else {
        toast.error('Erro ao registrar'); // Notificação de erro
      }
    } catch (error) {
      console.error('Erro ao registrar:', error);
      toast.error('Erro ao registrar, tente novamente.'); // Notificação de erro
    }
  };

  return (
    <div className={`flex flex-col ${platformData ? 'items-start' : ' items-center'} justify-center min-h-screen p-8 gap-8 ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}
    style={{
      backgroundImage: platformData ? `url(${platformData.Background})` : 'none',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>
     { platformData ? <main className="flex flex-col items-center justify-center gap-8 min-w-[400px] max-w-[600px] xl:ml-[200px] mr-auto w-full backdrop-blur-[2px] backdrop-brightness-95 p-4 rounded-lg p-8"><h1 className="text-3xl font-bold text-[#101C44]">Registro</h1>
      <form onSubmit={handleRegister} className="flex flex-col gap-4 w-full max-w-md">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome"
          required
          className="border border-gray-300 p-2 rounded dark:text-black"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="border border-gray-300 p-2 rounded dark:text-black"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
          required
          className="border border-gray-300 p-2 rounded dark:text-black"
        />
        <button type="submit" className="rounded-full border border-transparent bg-[#101C44] text-[#FFFFFF] h-10 px-4 hover:bg-[#101C44] hover:text-white dark:hover:bg-[#101C44] text-sm sm:text-base">
          Registrar
        </button>
      </form>

      {/* Links para outras páginas */}
      <div className="flex gap-4 flex-col sm:flex-row">
        {/* <Link href="/login">
          <button className="rounded-full border border-transparent bg-foreground text-background h-10 px-4 hover:bg-[#f2f2f2] hover:text-white dark:hover:bg-[#1a1a1a] text-sm sm:text-base">
            Já tem uma conta? Faça Login
          </button>
        </Link> */}
        <Link href="/">
          <button className="rounded-full border border-transparent bg-[#101C44] text-[#FFFFFF] h-10 px-4 hover:bg-[#101C44] hover:text-white dark:hover:bg-[#101C44] text-sm sm:text-base">
            Voltar para a Página Inicial
          </button>
        </Link>
      </div>

      <ToastContainer /> {/* Componente do ToastContainer para exibir notificações */}
      </main> : 
      <div className="flex justify-center items-center">
      <ClipLoader size={50} color={theme === 'dark' ? '#fff' : '#000'} loading={!platformData} />
    </div>
      }
    </div>
  );
}
