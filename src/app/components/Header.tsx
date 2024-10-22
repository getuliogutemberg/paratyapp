// components/Header.tsx
'use client';
import {  useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';


const Header: React.FC<{ setTheme: (theme: string) => void; theme: string ;setNavBar: (open: boolean) => void; navBar: boolean}> = ({ setTheme, theme, setNavBar, navBar }) => {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [platform, setPlatform] = useState<{ name: string; logo: string } | null>(null);
  const router = useRouter();
  // const pathname = usePathname();

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, [setTheme]);

  const handleLogout = () => {
    toast.info('Deslogando...', {
      position: 'top-center',
      theme: theme === 'dark' ? 'dark' : 'light',
      autoClose: 3000,
    });
    localStorage.removeItem('token');
    router.push('/');
    // router.push('/login');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
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
        if (userData) {
          setUser(userData);
        }
      })();
    }
  }, [router]);

  useEffect(() => {
    const getPlatform = async () => {
      try {
        const response = await axios.get<{ name: string; logo: string } | null>('/api/platform');
        setPlatform(response.data);
      } catch (error) {
        console.error('Erro ao obter dados da plataforma:', error);
      }
    };

    getPlatform();
  }, []);

  // const handleThemeChange = () => {
  //   localStorage.setItem('theme', theme === 'dark' ? 'light' : 'dark');
  //   setTheme(theme === 'dark' ? 'light' : 'dark');
  //   toast.info('Tema alterado para' + ' ' +  (theme === 'dark' ? 'light' : 'dark'), {
  //     position: 'top-right',
  //     theme: theme === 'dark' ? 'light' : 'dark',
  //     autoClose: 3000,
  //   });
    
  // };

  return (
    <header className={`${theme === 'dark' ? 'bg-[#00669d] text-[#F3F3F3]' : 'bg-black text-[#F3F3F3]'} flex items-center justify-between p-4 bg-[#3183CF] absolute top-0 left-0 right-0 z-10 `}>
      {/* <Link href="/" className="flex items-center">
        {platform ? (
          <>
            eslint-disable-next-line @next/next/no-img-element
            <img src={platform.logo} alt="Logo" className="object-contain w-9 h-9 m-0 p-0" />
            <h1 className="text-xl font-bold ml-2">{platform.name}</h1>
            
          </>
        ) : (
          <>
          
          <div className="object-contain w-9 h-9 m-0 p-0 bg-gray-500" />
          <h1 className="text-xl font-bold ml-2">Carregando...</h1>
        </>
        )}
      </Link> */}
      <button onClick={() => setNavBar(!navBar)} className="flex items-center">
        {platform ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {/* <img src={platform.logo} alt="Logo" className="object-contain w-9 h-9 m-0 p-0" /> */}
            {/* <h1 className="text-xl font-bold ml-2">{platform.name}</h1> */}
            <h1 className="text-xl font-bold ml-8">Indicadores</h1>
          </>
        ) : (
          <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {/* <div className="object-contain w-9 h-9 m-0 p-0 bg-gray-500" /> */}
          <h1 className="text-xl font-bold ml-8">Carregando...</h1>
        </>
        )}
      </button>

      <div className="relative">
        <button onClick={toggleDropdown} className="flex items-center focus:outline-none">
          <span>{isDropdownOpen ? 'Fechar' : user ? user.name : 'Menu' }</span>
          <svg className={`ml-2 w-4 h-4 ${!isDropdownOpen ? 'rotate-180' : ''} `} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>

        {isDropdownOpen && (
          <div className={`absolute right-0 mt-2 w-48 ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'} bg-[#3183CF] text-[#F3F3F3]   rounded shadow-lg`}>
            <ul className="py-1" onClick={toggleDropdown} onMouseLeave={toggleDropdown}>
              {/* <li>
                <button onClick={handleThemeChange} className="block px-4 py-2 hover:bg-gray-200 w-full text-left dark:hover:text-black">
                  Trocar Tema
                </button>
              </li> */}
              {/* <li>
                <Link href="/dashboard">
                  <button onClick={() => toast.info('dashboard em desenvolvimento ...', { position: 'top-center',theme: theme === 'dark' ? 'dark' : 'light' })}  className="block px-4 py-2 hover:bg-gray-200 w-full text-left dark:hover:text-black">
                    Dashboard
                  </button>
                </Link>
              </li> */}
              {/* <li>
                <Link href="/dashboard/settings">
                  <button onClick={() => toast.info('configurações em desenvolvimento ...', { position: 'top-center',theme: theme === 'dark' ? 'dark' : 'light' })}  className="block px-4 py-2 hover:bg-gray-200 w-full text-left dark:hover:text-black">
                    Configurações	
                  </button>
                </Link>
              </li> */}
              <li>
                <button onClick={handleLogout} className="block px-4 py-2 hover:bg-red-500 hover:text-white w-full text-left">
                  Sair
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};


export default Header;
