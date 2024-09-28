'use client';
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { ClipLoader } from 'react-spinners';


export default function Home() {
  const [user, setUser] = useState<{ name: string }>({ name: '' });
  const [theme, setTheme] = useState<string>('dark');
  const [loading, setLoading] = useState(true); // Estado para controlar o loading
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    const getUser = async () => {
      try {
        const response = await axios.get('/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data.user;
      } catch (error) {
        console.error('Erro ao obter dados do usuário:', error);
      }
    };

    (async () => {
      const userData = await getUser();
      setUser(userData); // userData conterá o nome, email, etc.
      setLoading(false); // Para de exibir o spinner após obter os dados
    })();
  }, []);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  const handleThemeChange = () => {
    localStorage.setItem('theme', theme === 'light' ? 'dark' : 'light');
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  const apiUrl = process.env.NEXT_PUBLIC_API_URL; // Acessar a variável pública
  return (
    <div className={`grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <p className="text-3xl font-bold">{apiUrl}</p>
      <>
        <main className={user && user.name !== '' ? "flex justify-space-between flex-row w-full gap-8 row-start-2 sm:row-start-1 items-center" : "flex flex-col gap-8 row-start-2 items-center sm:items-start "}>
          {loading ? (
            <div className="flex justify-center items-center">
              <ClipLoader size={50} color={theme === 'dark' ? '#fff' : '#000'} loading={loading} />
            </div>
          ) : (
            <>
              <Image
                onClick={handleThemeChange}
                className={`cursor-pointer ${theme === 'dark' ? 'filter grayscale' : ''} `}
                src="https://e7.pngegg.com/pngimages/916/237/png-clipart-lego-logo-lego-city-undercover-the-lego-group-lego-minifigure-brand-svg-library-game-text.png"
                alt="Logo do App Paraty"
                width={user ? 100 : 200}
                height={user ? 100 : 200}
                priority
              />
              <h1 className="text-3xl font-bold flex-grow">{user && user.name !== '' ? <p>Olá, {user.name}!</p> : 'Bem-vindo ao App Paraty'}</h1>
              {user && user.name !== '' && (
                <div className="flex gap-4 items-center flex-col sm:flex-row">
                  <Link href='/dashboard'>
                    <button className="rounded-full border border-transparent bg-foreground text-background h-10 px-4 hover:bg-[#f2f2f2] hover:text-white dark:hover:bg-[#1a1a1a] text-sm sm:text-base">
                      Área do Usuário
                    </button>
                  </Link>
                  <button onClick={() => {
                    localStorage.removeItem('token');
                    router.push('/login');
                  }} className="rounded-full border border-transparent bg-foreground text-background h-10 px-4 hover:bg-red-500 hover:text-white dark:hover:bg-[#1a1a1a] text-sm sm:text-base">
                    Sair
                  </button>
                </div>
              )}
              {!user && (
                <div className="flex flex-col gap-4">
                  <p className="text-center sm:text-left">
                    Clique no botão abaixo para fazer login ou registrar-se.
                  </p>
                  <div className="flex gap-4 items-center flex-col sm:flex-row">
                    <Link href="/login">
                      <button className="rounded-full border border-transparent bg-foreground text-background h-10 px-4 hover:bg-[#f2f2f2] hover:text-white dark:hover:bg-[#1a1a1a] text-sm sm:text-base">
                        Fazer Login
                      </button>
                    </Link>
                    <Link href="/register">
                      <button className="rounded-full border border-transparent bg-foreground text-background h-10 px-4 hover:bg-[#f2f2f2] hover:text-white dark:hover:bg-[#1a1a1a] text-sm sm:text-base">
                        Registrar
                      </button>
                    </Link>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
          <Link href="/about" className="flex items-center gap-2 hover:underline hover:underline-offset-4">
            <Image
              aria-hidden
              src="https://nextjs.org/icons/file.svg"
              alt="File icon"
              width={16}
              height={16}
            />
            Sobre o Aplicativo
          </Link>
          <Link href="/contact" className="flex items-center gap-2 hover:underline hover:underline-offset-4">
            <Image
              aria-hidden
              src="https://nextjs.org/icons/window.svg"
              alt="Window icon"
              width={16}
              height={16}
            />
            Contato
          </Link>
        </footer>
      </>
    </div>
  );
}
