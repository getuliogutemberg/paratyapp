'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Header from '../components/Header';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,PieChart, Pie, Cell  } from 'recharts';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';

// Definindo a interface para os dados do gráfico
interface ChartData {
  name: string;
  value: number;
}

export default function DashboardPage() {
  const [user, setUser] = useState<{ name: string } | null>(null);
  
  const [data, setData] = useState<ChartData[]>([]); // Usando a interface para tipar o estado dos dados
  const router = useRouter();

  const [theme, setTheme] = useState<string>('dark');
 

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

  // const handleThemeChange = () => {
  //   localStorage.setItem('theme', theme === 'light' ? 'dark' : 'light');
  //   setTheme(theme === 'dark' ? 'light' : 'dark');
    
  // };

 // Define a classe do cabeçalho com base no tema
 const dashboardClass = theme === 'dark' ? 'dashboard-dark' : 'dashboard-light';



  useEffect(() => {
   

    const token = localStorage.getItem('token');
  
    if (!token) {
      router.push('/login');
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
          const response = await axios.get<ChartData[]>('/api/data'); // Tipando a resposta
          // console.log(response.data);
          setData(response.data); // Armazena os dados recebidos no estado
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

  const value = Math.floor(Math.random() * 1000);
  const maxValue = 1000;
  
  const percentage = (value / maxValue) * 100;
  const datapie = [
    { value: percentage }, // Porcentagem preenchida
    { value: 100 - percentage }, // Porcentagem vazia
  ];

  const colors = ['#00C49F', '#E0E0E0']; // Cores: preenchido e vazio

  
  return (
  <>
    <Header setTheme={setTheme} theme={theme}/>
  <div onClick={() => toast.warn('Em desenvolvimento ...', { position: 'top-center', theme: theme === 'dark' ? 'dark' : 'light' })}  className={` ${dashboardClass} absolute w-screen h-screen z-[-1] px-4`}>
    <h1 className={`text-3xl font-bold pt-20 text-start`}>Bem-vindo, {user.name}</h1>
    <div >
      <p className="text-md mb-4">Este é o seu dashboard.</p>
      <div className="flex flex-row flex-wrap justify-center gap-4">
      {/* Gráfico de linha */}

      <div className='flex flex-col items-center justify-center'>
      <PieChart width={200} height={220}>
        <Pie
          data={data}
          startAngle={180}
          endAngle={0}
          innerRadius={60}
          outerRadius={90}
          dataKey="value"
        >
          {datapie.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index]} />
          ))}
        </Pie>
      </PieChart>
      <h2 className='absolute text-center text-xl font-bold text-gray-600 trnasform -translate-x-[0px] -translate-y-[-20px]'>{value} / {maxValue}</h2> {/* Valor no centro */}
    </div>
      
      <LineChart
     
        width={1000}
        height={250}
        data={data}

        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
      > 
        <CartesianGrid strokeDasharray="2 5" />
        
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
      

       {/* Gráfico de linha */}
       <LineChart
        width={600}
        height={250}
        data={data}
        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="2 5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>


 {/* Gráfico de linha */}
 <LineChart
        width={600}
        height={250}
        data={data}
        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="2 5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>


 {/* Gráfico de linha */}
 <LineChart
        width={600}
        height={250}
        data={data}
        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="2 5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>


 {/* Gráfico de linha */}
 <LineChart
        width={600}
        height={250}
        data={data}
        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="2 5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>

    </div>
   
    </div></div>
    </>
  );
}

