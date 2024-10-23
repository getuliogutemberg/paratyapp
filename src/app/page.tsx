'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [theme, setTheme] = useState<string>('light');
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
    toast.info('Conectando...', {
      theme: theme === 'dark' ? 'dark' : 'light',
    });
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        toast.success('Logado !', {
          theme: theme === 'dark' ? 'dark' : 'light',
        });
        const { token } = await response.json();
        localStorage.setItem('token', token);
        router.push('/dashboard');
      } else {
        toast.error('Login falhou !', {
          theme: theme === 'dark' ? 'dark' : 'light',
        });
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      toast.error('Erro ao fazer login, tente novamente !', {
        theme: theme === 'dark' ? 'dark' : 'light',
      });
    }
  };

  return (
    <main
      className={`flex flex-col ${platformData ? 'items-start' : ' items-center'} justify-center min-h-screen p-8 gap-8 ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}
      style={{
        backgroundImage: platformData ? `url(${platformData.Background})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        
        
        
      }}
    >
      {platformData ? (
        <div className="flex flex-col items-center justify-center gap-8 min-w-[400px] max-w-[600px] xl:ml-[200px] mr-auto w-full backdrop-blur-[2px] backdrop-brightness-95 p-4 rounded-lg p-8">
          <h1 className="text-3xl font-bold text-[#101C44]  ">Login</h1>
          <form onSubmit={handleLogin} className="flex flex-col  w-full max-w-md">
            <div className='gap-4 flex flex-col'>
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
            </div>
            <Link href="/">
              <span className="text-[#101C44] hover:underline text-sm">
                  Esqueci minha senha
              </span>
            </Link>
            <button type="submit" className="mt-4 rounded-full border border-transparent bg-[#101C44] text-[#FFFFFF] h-10 px-4 hover:bg-[#101C44] hover:text-white dark:hover:bg-[#101C44] text-sm sm:text-base">
              Acessar
            </button>
          </form>

          {/* Links para outras páginas */}
          {/* <div className="flex gap-4 flex-col sm:flex-row">
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
          </div> */}


        </div>
      ) : (
        <div className={`absolute w-screen h-screen z-[0] flex justify-center items-center ${theme === 'dark' ? 'bg-black' : 'bg-[#101C44]'} `}>
   
          <ClipLoader size={50} color={theme === 'dark' ? '#fff' : '#fff'} loading={!platformData} />
        </div>
      )}
    </main>
  );
}