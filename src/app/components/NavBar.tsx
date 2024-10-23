// components/Header.tsx
'use client';
import {  useEffect } from 'react';
import Link from 'next/link';
// import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';
import { usePathname } from 'next/navigation';



const NavBar: React.FC<{ setNavBar: (open: boolean) => void; navBar: boolean; setTheme: (theme: string) => void;theme: string }> = ({ setNavBar, navBar, setTheme,theme }) => {

  // const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, [setTheme]);

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
        //   setUser(userData);
        }
      })();
    }
  }, []);

  useEffect(() => {
    const getPlatform = async () => {
      try {
        // const response = await axios.get<{ name: string; logo: string } | null>('/api/platform');
        // setPlatform(response.data);
      } catch (error) {
        console.error('Erro ao obter dados da plataforma:', error);
      }
    };

    getPlatform();
  }, []);

  const handleThemeChange = () => {
    localStorage.setItem('theme', theme === 'dark' ? 'light' : 'dark');
    setTheme(theme === 'dark' ? 'light' : 'dark');
    toast.info('Tema alterado para' + ' ' +  (theme === 'dark' ? 'claro' : 'escuro'), {
      position: 'top-right',
      theme: theme === 'dark' ? 'light' : 'dark',
      autoClose: 3000,
    });
    
  };

  return (
    <nav className={`${theme === 'light' ? 'bg-[#00669d] text-[#F3F3F3]' : 'bg-black text-[#F3F3F3]'} flex pt-[65px] items-start   bg-[#3183CF] absolute h-full ${navBar ? 'w-[250px] justify-between' : 'w-[50px] justify-between'} transition-all duration-300 ease-in-out z-[0]`}>
     
      <ul className=" flex flex-col gap-2 justify-between h-full" onClick={() => setNavBar(false)}>
            {/* {platform && navBar && platform.name} */}
              <div className="flex flex-col gap-2">
              <li className={navBar ? 'w-[250px]' : 'w-[50px]'}>
  <Link href="/dashboard">
    <button 
      className={`flex items-center ${navBar ? 'justify-start pl-3' : 'justify-center px-2'} gap-2 py-2 hover:bg-[#101C44] w-full text-left ${pathname === '/dashboard' && 'bg-[#101C44]'} `}
      title='Indicadores'
    >
      {/* Ícone circular centralizado */}
      <div className="w-6 h-6 bg-[#F3F3F3] rounded-full"></div>

      {navBar && 'Indicadores'}
    </button>
  </Link>
</li>
<li className={navBar ? 'w-[250px]' : 'w-[50px]'}>
  <Link href="/recommendations">
    <button 
      className={`flex items-center ${navBar ? 'justify-start pl-3' : 'justify-center px-2'} gap-2  py-2 hover:bg-[#101C44] w-full text-left ${pathname === '/recommendations' && 'bg-[#101C44]'} `}
      title='Recomendações'
    >
      {/* Triângulo reduzido */}
      <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[24px] border-b-[#F3F3F3]"></div>

      {navBar && 'Recomendações'}
    </button>
  </Link>
</li>

              </div>

              <div>
              <div className="border-b-[1px] border-[#F3F3F3]"></div>
              
              <li className={navBar ? 'w-[250px]' : 'w-[50px]'}>
  <button 
    onClick={handleThemeChange} 
    className={`flex items-center ${navBar ? 'justify-start pl-3' : 'justify-center px-2'} gap-2  py-2 hover:bg-[#101C44] w-full text-left`}
    title={'Tema' + ' ' + (theme === 'dark' ? 'claro' : 'escuro')}
  >
    <div className="relative w-6 h-6 flex justify-center items-center transition-all duration-500 ease-in-out"> {/* Centralização */}
      {theme === 'dark' ? (
        // Sol
        <div className="relative w-full h-full bg-[#F3F3F3] rounded-full flex justify-center items-center transition-all duration-500 ease-in-out">
          <div className="absolute w-full h-full bg-yellow-200 animate-pulse rounded-full"></div>
        </div>
      ) : (
        // Lua
        <div className="relative w-full h-full bg-[#F3F3F3] rounded-full transition-all duration-500 ease-in-out overflow-hidden">
          <div className="absolute w-full h-full bg-[#3183CF] rounded-full right-0 top-0 translate-x-1/2 transition-all duration-500 ease-in-out"></div>
        </div>
      )}
    </div>

    {navBar && 'Tema' + ' ' + (theme === 'dark' ? 'claro' : 'escuro')}
    
  </button>
</li>
              </div>


              
              {/* <li>
                <Link href="/dashboard/settings">
                  <button onClick={() => toast.info('configurações em desenvolvimento ...', { position: 'top-center',theme: theme === 'dark' ? 'dark' : 'light' })}  className="flex items-center gap-2 px-0 py-2 hover:bg-gray-200 w-full text-left dark:hover:text-black">
                  <div className="object-contain w-9 h-9 m-0 p-0 bg-gray-500" />
                 {navBar && 'Configurações'}
                  </button>
                </Link>
              </li> */}
              
            </ul>

        
      
    </nav>
  );
};


export default NavBar;
