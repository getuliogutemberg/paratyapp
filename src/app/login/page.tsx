'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Importando o CSS do Toastify

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [theme, setTheme] = useState<string>('dark');

  const router = useRouter();


  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem('token', token);
        router.push('/dashboard');
      } else {
        toast.error('Login falhou'); // Exibindo uma notificação de erro
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      toast.error('Erro ao fazer login, tente novamente.'); // Notificação de erro
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen p-8 gap-8 ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <h1 className="text-3xl font-bold">Login</h1>
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
        <button type="submit" className=" rounded-full border border-transparent bg-foreground text-background h-10 px-4 hover:bg-[#f2f2f2] hover:text-white dark:hover:bg-[#1a1a1a] text-sm sm:text-base">
          Entrar
        </button>
      </form>

      {/* Links para outras páginas */}
      <div className="flex gap-4 flex-col sm:flex-row">
        <Link href="/register">
          <button className=" rounded-full border border-transparent bg-foreground text-background h-10 px-4 hover:bg-[#f2f2f2] hover:text-white dark:hover:bg-[#1a1a1a] text-sm sm:text-base">
            Cadastrar
          </button>
        </Link>
        <Link href="/">
          <button className=" rounded-full border border-transparent bg-foreground text-background h-10 px-4 hover:bg-[#f2f2f2] hover:text-white dark:hover:bg-[#1a1a1a] text-sm sm:text-base">
            Voltar para a Página Inicial
          </button>
        </Link>
      </div>

      <ToastContainer /> {/* Componente do ToastContainer para exibir notificações */}
    </div>
  );
}