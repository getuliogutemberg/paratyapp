'use client';
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { ClipLoader } from 'react-spinners';

// Defina o tipo dos dados que você espera receber do banco de dados
interface PlatformData {
  TitleInit: string;
  Subtitle: string;
  Background: string;
  LogoInit: string;
}
export default function Home() {
  const [user, setUser] = useState<{ name: string }>({ name: '' });
  const [theme, setTheme] = useState<string>('dark');
  const [loading, setLoading] = useState(true); // Estado para controlar o loading
  const [platformData, setPlatformData] = useState<PlatformData | null>(null); // Novo estado para dados da plataforma
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

  // Buscar dados da plataforma
  useEffect(() => {
    const fetchPlatformData = async () => {
      try {
        const response = await axios.get('/api/platform'); // Chamando o endpoint que você criou
        // console.log(response.data);
        setPlatformData(response.data); // Armazena os dados da plataforma
      } catch (error) {
        console.error('Erro ao obter dados da plataforma:', error);
        setPlatformData(null)
        router.push('/setup')
      }
    };

    fetchPlatformData();
  }, []);

  const handleThemeChange = () => {
    localStorage.setItem('theme', theme === 'light' ? 'dark' : 'light');
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  const apiUrl = process.env.NEXT_PUBLIC_API_URL; // Acessar a variável pública
  return (
    <div
  className={`relative grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]  ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}
>
    <div
    style={{
      
      backgroundImage: platformData
      ? `url(${theme === 'dark' ? platformData.Background : platformData.Background})`
      : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    filter: theme === 'dark' ? 'blur(0px) brightness(0.3)' : 'brightness(0.8)', // Aplica blur apenas no tema escuro
    transition: 'filter 1s ease, background-image 1s ease', // Adicionando transição
    }} 
    className="absolute w-screen h-screen z-[0]  transition duration-1000" // Ocupa todo o espaço do contêiner
    /> 
    {/* <p className={`text-3xl font-bold flex-grow ${theme === 'dark' ? 'text-gray-300' : 'text-gray-50'}`}>
    {apiUrl}
  </p> */}
      <>
        <main className={user && user.name !== '' ? " flex justify-space-between flex-row w-full gap-8 row-start-2 sm:row-start-1 items-center" : "flex flex-col gap-8 row-start-2 items-center sm:items-start "}>
          {loading ? (
            <div className="flex justify-center items-center">
              <ClipLoader size={50} color={theme === 'dark' ? '#fff' : '#000'} loading={loading} />
            </div>
          ) : (
            <div className={`z-[0] flex  ${user && user.name !== ''  ? 'flex-row justify-space-between w-full' :'flex-col' }`}>
              {platformData && <Image
                onClick={handleThemeChange}
                className={`cursor-pointer transition duration-1000 ${theme === 'dark' ? 'filter grayscale' : ''} `}
                src={platformData.LogoInit}
                alt="Logo do App Paraty"
                width={user ? 100 : 200}
                height={user ? 100 : 200}
                priority
              />}
              <h1 className={` text-3xl font-bold flex flex-grow text-center justify-center items-center transition duration-1000  ${theme === 'dark' ? 'text-gray-300' : 'text-gray-50'} `}>{user && user.name !== ''  ? `Bem-vindo ${user.name}!` : platformData ? platformData.TitleInit  : ' '  }</h1>
              {user && user.name !== '' && (
                <div className="flex gap-4 items-center flex-col sm:flex-row">
                  <Link href='/dashboard'>
                    <button className="rounded-full border transition duration-1000 border-transparent bg-foreground text-background h-10 px-4 hover:bg-[#f2f2f2] hover:text-white dark:hover:bg-[#1a1a1a] text-sm sm:text-base">
                      Área do Usuário
                    </button>
                  </Link>
                  <button onClick={() => {
                    localStorage.removeItem('token');
                    router.push('/login');
                  }} className="rounded-full border border-transparent transition duration-1000 bg-foreground text-background h-10 px-4 hover:text-white dark:hover:bg-red-500 text-sm sm:text-base">
                    Sair
                  </button>
                </div>
              )}
              {platformData && !user &&   (
                <div className="flex flex-col gap-4">
                  <p className={`text-center sm:text-left transition duration-1000   ${theme === 'dark' ? 'text-gray-300' : 'text-gray-50'}`}>
                    { platformData ? platformData.Subtitle : ' '}
                  </p>
                  <div className="flex gap-4 items-center flex-col sm:flex-row">
                    <Link href="/login">
                      <button className="rounded-full border border-transparent bg-foreground text-background transition duration-1000 h-10 px-4 hover:bg-[#f2f2f2] hover:text-white dark:hover:bg-[#1a1a1a] text-sm sm:text-base">
                        Fazer Login
                      </button>
                    </Link>
                    <Link href="/register">
                      <button className="rounded-full border border-transparent bg-foreground text-background h-10 px-4 transition duration-1000 hover:bg-[#f2f2f2] hover:text-white dark:hover:bg-[#1a1a1a] text-sm sm:text-base">
                        Registrar
                      </button>
                    </Link>
                  </div>
                </div>
              )}

              
            </div>
            
          )}
          
        </main>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center z-[0]">
          <Link href="/about" className={`flex items-center gap-2 hover:underline hover:underline-offset-4   ${theme === 'dark' ? 'text-gray-300' : 'text-gray-50'}`}>
            <Image
              className={theme === 'dark' ? '' :'filter invert' }
              aria-hidden
              src="https://nextjs.org/icons/file.svg"
              alt="File icon"
              width={16}
              height={16}
            />
            Sobre o Aplicativo
          </Link>
          <Link href="/contact" className={`flex items-center gap-2 hover:underline hover:underline-offset-4   ${theme === 'dark' ? 'text-gray-300' : 'text-gray-50'}`}>
            <Image
              className={theme === 'dark' ? '' :'filter invert' }
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
