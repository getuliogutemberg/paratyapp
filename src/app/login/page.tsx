'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [theme, setTheme] = useState<string>('dark');
  const [platformData, setPlatformData] = useState<{ Background: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.info('Fazendo login...');
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        toast.success('Login bem-sucedido');
        const { token } = await response.json();
        localStorage.setItem('token', token);
        router.push('/dashboard');
      } else {
        toast.error('Login falhou');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      toast.error('Erro ao fazer login, tente novamente.');
    }
  };

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen p-8 gap-8 ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}
      style={{
        backgroundImage: platformData ? `url(${platformData.Background})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {platformData ? (
        <>
          <h1 className="text-3xl font-bold text-black">Login</h1>
          <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full max-w-md">
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
            <button type="submit" className="rounded-full border border-transparent bg-foreground text-background h-10 px-4 hover:bg-[#f2f2f2] hover:text-white dark:hover:bg-[#1a1a1a] text-sm sm:text-base">
              Entrar
            </button>
          </form>

          {/* Links para outras páginas */}
          <div className="flex gap-4 flex-col sm:flex-row">
            <Link href="/register">
              <button className="rounded-full border border-transparent bg-foreground text-background h-10 px-4 hover:bg-[#f2f2f2] hover:text-white dark:hover:bg-[#1a1a1a] text-sm sm:text-base">
                Cadastrar
              </button>
            </Link>
            <Link href="/">
              <button className="rounded-full border border-transparent bg-foreground text-background h-10 px-4 hover:bg-[#f2f2f2] hover:text-white dark:hover:bg-[#1a1a1a] text-sm sm:text-base">
                Voltar para a Página Inicial
              </button>
            </Link>
          </div>

          <ToastContainer />
        </>
      ) : (
        <div className="flex justify-center items-center">
          <ClipLoader size={50} color={theme === 'dark' ? '#fff' : '#000'} loading={!platformData} />
        </div>
      )}
    </div>
  );
}
