// components/Header.tsx
'use client';
import {  useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';



const NavBar: React.FC<{ setNavBar: (open: boolean) => void; navBar: boolean; setTheme: (theme: string) => void;theme: string }> = ({ setNavBar, navBar, setTheme,theme }) => {
//   const [user, setUser] = useState<{ name: string } | null>(null);
//   const [platform, setPlatform] = useState<{ name: string; logo: string } | null>(null);
  const router = useRouter();
  // const pathname = usePathname();

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
  }, [router]);

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
    toast.info('Tema alterado para' + ' ' +  (theme === 'dark' ? 'light' : 'dark'), {
      position: 'top-right',
      theme: theme === 'dark' ? 'light' : 'dark',
      autoClose: 3000,
    });
    
  };

  return (
    <nav className={`${theme === 'dark' ? 'bg-[#00669d] text-[#F3F3F3]' : 'bg-black text-[#F3F3F3]'} flex pt-[70px] items-start   bg-[#3183CF] absolute h-full ${navBar ? 'w-[250px] justify-center' : 'w-[50px] justify-center'} transition-all duration-300 ease-in-out z-[0]`}>
     
      <ul className=" flex flex-col gap-2" onClick={() => setNavBar(false)}>
            {/* {platform && navBar && platform.name} */}
            <li>
                <Link href="/dashboard">
                  <button onClick={() => toast.info('dashboard em desenvolvimento ...', { position: 'top-center',theme: theme === 'dark' ? 'dark' : 'light' })}  className="flex items-center gap-2 px-0 py-2 hover:bg-gray-200 w-full text-left dark:hover:text-black">
                  <div className="object-contain w-9 h-9 m-0 p-0 bg-gray-500" />
                  {navBar && 'Indicadores'}
                  </button>
                </Link>
              </li>
              <li>
                <button onClick={handleThemeChange} className="flex items-center gap-2 px-0 py-2 hover:bg-gray-200 w-full text-left dark:hover:text-black">
                <div className="object-contain w-9 h-9 m-0 p-0 bg-gray-500" />
                  {navBar && 'Trocar Tema'}
                
                </button>
              </li>
              
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
