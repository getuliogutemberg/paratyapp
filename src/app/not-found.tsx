// pages/404.js (ou 404.tsx se estiver usando TypeScript)
import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">404 - Página Não Encontrada</h1>
      <p className="mt-4 text-lg">A página que você está procurando não existe.</p>
      <Link href="/">
        <button className="mt-6 rounded-full border border-transparent bg-foreground text-background h-10 px-4 hover:bg-gray-800 text-sm">
          Voltar para a Página Inicial
        </button>
      </Link>
    </div>
  );
}