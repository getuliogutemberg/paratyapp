'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Header from '../components/Header';
import NavBar from '../components/NavBar';

// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,PieChart, Pie, Cell  } from 'recharts';
import { ClipLoader } from 'react-spinners';
// import { toast } from 'react-toastify';

// Definindo a interface para os dados do gráfico
// interface ChartData {
//   name: string;
//   value: number;
// }

export default function RecommendationsPage() {
  const [user, setUser] = useState<{ name: string } | null>(null);
  
  // const [data, setData] = useState<ChartData[]>([]); // Usando a interface para tipar o estado dos dados
  const router = useRouter();

  const [theme, setTheme] = useState<string>('light');
  const [navBar, setNavBar] = useState<boolean>(false);
 

  // Função que atualiza o tema
  const handleStorageChange = () => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
    }
  };

  useEffect(() => {
    // Ao carregar, definir o tema inicial
    handleStorageChange();

    // Adiciona um listener para escutar mudanças no localStorage de outras abas
    window.addEventListener('storage', handleStorageChange);

    // Cleanup do listener
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);


  useEffect(() => {
   

    const token = localStorage.getItem('token');
  
    if (!token) {
      router.push('/');
    } else {
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
          router.push('/login');
        }
      };

      const getData = async () => {
        try {
          // const response = await axios.get<ChartData[]>('/api/data'); // Tipando a resposta
          // console.log(response.data);
          // setData(response.data); // Armazena os dados recebidos no estado
        } catch (error) {
          console.error('Erro ao obter dados do gráfico:', error);
        }
      };

      (async () => {
        const userData = await getUser();
        if (userData) {
          setUser(userData); // userData conterá o nome, email, etc.
          await getData();   // Busca os dados do gráfico após o usuário ser definido
        }
      })();
    }
  }, [router]);

  if (!user) {
    return <div className={`absolute w-screen h-screen z-[0] flex justify-center items-center ${theme === 'dark' ? 'bg-black' : 'bg-gray-200'} `}>
    <ClipLoader size={50} color={theme === 'dark' ? '#fff' : '#000'} loading={!user} />
  </div>;
  }

 

  
  return (
  <>
    <Header setTheme={setTheme} theme={theme} setNavBar={setNavBar} navBar={navBar}/>
    <NavBar setNavBar={setNavBar} navBar={navBar} setTheme={setTheme} theme={theme} />
    <div className='w-full h-[calc(100vh-0px)] bg-gray-300' >
        
    </div>

    </>
  );
}
