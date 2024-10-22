// 'use client';
// import axios from "axios";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from "react";
// import { ClipLoader } from 'react-spinners';

// // Defina o tipo dos dados que você espera receber do banco de dados
// interface PlatformData {
//   TitleInit: string;
//   Subtitle: string;
//   Background: string;
//   LogoInit: string;
// }
// export default function Home() {
//   const [user, setUser] = useState<{ name: string }>({ name: '' });
//   const [theme, setTheme] = useState<string>('dark');
//   const [platformData, setPlatformData] = useState<PlatformData | null>(null); // Novo estado para dados da plataforma
//   const [loading, setLoading] = useState(true); // Estado para controlar o loading
//   const router = useRouter();

//   useEffect(() => {
//     const token = localStorage.getItem('token');

//     const getUser = async () => {
//       try {
//         const response = await axios.get('/api/auth/me', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         return response.data.user;
//       } catch (error) {
//         console.error('Erro ao obter dados do usuário:', error);
//       }
//     };

//     (async () => {
//       const userData = await getUser();
//       setUser(userData); // userData conterá o nome, email, etc.
//       setLoading(false); // Para de exibir o spinner após obter os dados
//     })();
//   }, []);

//   useEffect(() => {
//     const storedTheme = localStorage.getItem('theme');
//     if (storedTheme) {
//       setTheme(storedTheme);
//     }
//   }, []);

//   // Buscar dados da plataforma
//   useEffect(() => {
//     const fetchPlatformData = async () => {
//       try {
//         const response = await axios.get('/api/platform'); // Chamando o endpoint que você criou
//         // console.log(response.data);
//         setPlatformData(response.data); // Armazena os dados da plataforma
//       } catch (error) {
//         console.error('Erro ao obter dados da plataforma:', error);
//         setPlatformData(null)
//         router.push('/setup')
//       }
//     };

//     fetchPlatformData();
//   }, [router]);

//   const handleThemeChange = () => {
//     localStorage.setItem('theme', theme === 'light' ? 'dark' : 'light');
//     setTheme(theme === 'dark' ? 'light' : 'dark');
//   };
  
//   return (
//     <div
//   className={`relative flex flex-col justify-between h-screen w-screen font-[family-name:var(--font-geist-sans)]  ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}
// >
//     <div
//     style={{
      
//       backgroundImage: platformData
//       ? `url(${theme === 'dark' ? platformData.Background : platformData.Background})`
//       : 'none',
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//     backgroundRepeat: 'no-repeat',
//     filter: theme === 'dark' ? 'blur(0px) brightness(0.3)' : 'brightness(1)', // Aplica blur apenas no tema escuro
//     transition: 'filter 1s ease, background-image 1s ease', // Adicionando transição
//     }} 
//     className="absolute w-screen h-screen z-[0]  transition duration-1000" // Ocupa todo o espaço do contêiner
//     /> 
   
//       <>
//         <div className={user && user.name !== '' ? " flex justify-space-between flex-row w-full  gap-8 row-start-2 sm:row-start-1 items-center" : "flex flex-col gap-8  row-start-2 items-center sm:items-start my-auto "}>
//           {loading ? (
//             <div className="flex justify-center items-center h-full w-full">
//               <ClipLoader size={50} color={theme === 'dark' ? '#fff' : '#000'} loading={loading} />
//             </div>
//           ) : (
//             <div className={`z-[0] flex min-w-[400px]  w-full  gap-8 items-center ${user && user.name !== ''  ? 'flex-row justify-space-betweenw-full backdrop-blur-[2px] backdrop-brightness-95 p-4 rounded-lg ' :'flex-col max-w-[600px] xl:ml-[200px] mr-auto w-full backdrop-blur-[2px] backdrop-brightness-95 p-4 rounded-lg p-8' }`}>
//               {platformData && <Image
//                 onClick={handleThemeChange}
//                 className={` cursor-pointer transition duration-1000 ${theme === 'dark' ? 'filter grayscale invert' : ''} `}
//                 src={platformData.LogoInit}
//                 alt="Logo do App Paraty"
//                 width={user ? 100 : 200}
//                 height={user ? 100 : 200}
//                 priority
//               />}
//               <h1 className={` text-3xl font-bold flex flex-grow text-center justify-center items-center transition duration-1000  ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} `}>{user && user.name !== ''  ? `Bem-vindo ${user.name}!` : platformData ? platformData.TitleInit  : ' '  }</h1>
//               {user && user.name !== '' && (
//                 <div className="flex gap-4 items-center flex-col sm:flex-row">
//                   <Link href='/dashboard'>
//                     <button className="rounded-full border transition duration-1000 border-transparent bg-foreground text-background h-10 px-4 hover:bg-[#f2f2f2] hover:text-white dark:hover:bg-[#1a1a1a] text-sm sm:text-base">
//                       Área do Usuário
//                     </button>
//                   </Link>
//                   <button onClick={() => {
//                     localStorage.removeItem('token');
//                     router.push('/login');
//                   }} className="rounded-full border border-transparent transition duration-1000 bg-foreground text-background h-10 px-4 hover:text-white dark:hover:bg-red-500 text-sm sm:text-base">
//                     Sair
//                   </button>
//                 </div>
//               )}
//               {platformData && !user &&   (
//                 <div className="flex flex-col gap-4">
//                   <p className={`text-center sm:text-left transition duration-1000   ${theme === 'dark' ? 'text-gray-300' : 'text-gray-50'}`}>
//                     { platformData ? platformData.Subtitle : ' '}
//                   </p>
//                   <div className="flex gap-4 items-center flex-col sm:flex-row">
//                     <Link href="/login">
//                       <button className="rounded-full border border-transparent bg-foreground text-background transition duration-1000 h-10 px-4 hover:bg-[#f2f2f2] hover:text-white dark:hover:bg-[#1a1a1a] text-sm sm:text-base">
//                         Fazer Login
//                       </button>
//                     </Link>
//                     <Link href="/register">
//                       <button className="rounded-full border border-transparent bg-foreground text-background h-10 px-4 transition duration-1000 hover:bg-[#f2f2f2] hover:text-white dark:hover:bg-[#1a1a1a] text-sm sm:text-base">
//                         Registrar
//                       </button>
//                     </Link>
//                   </div>
//                 </div>
//               )}

              
//             </div>
            
//           )}
          
//         </div>
//       </>
//         <footer className="row-start-3 w-full flex gap-6 flex-wrap items-center justify-center z-[0]">
//           <Link href="/about" className={`flex items-center gap-2 hover:underline hover:underline-offset-4   ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
//             <Image
//               className={theme === 'dark' ? '' :'filter invert' }
//               aria-hidden
//               src="https://nextjs.org/icons/file.svg"
//               alt="File icon"
//               width={16}
//               height={16}
//             />
//             Sobre o Aplicativo
//           </Link>
//           <Link href="/contact" className={`flex items-center gap-2 hover:underline hover:underline-offset-4   ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
//             <Image
//               className={theme === 'dark' ? '' :'filter invert' }
//               aria-hidden
//               src="https://nextjs.org/icons/window.svg"
//               alt="Window icon"
//               width={16}
//               height={16}
//             />
//             Contato
//           </Link>
//         </footer>
//     </div>
//   );
// }


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
            <Link href="/register">
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
        <div className="flex justify-center items-center">
          <ClipLoader size={50} color={theme === 'dark' ? '#fff' : '#000'} loading={!platformData} />
        </div>
      )}
    </main>
  );
}