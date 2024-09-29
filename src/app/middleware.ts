import { NextResponse } from 'next/server';
import { checkPlatformConfigured } from '../../lib/db'; // Função para verificar se a tabela `platform` está configurada

export async function middleware(req: { nextUrl: { clone: () => URL; }; url: string | URL | undefined; }) {
  const url = req.nextUrl.clone();
  const platformConfigured = await checkPlatformConfigured();

  // Adicionando logs para verificar o estado da configuração da plataforma e a rota atual
  // console.log('Middleware rodando. Plataforma configurada:', platformConfigured);
  // console.log('Rota atual:', url.pathname);

  // Verifica se a plataforma está configurada
  if (!platformConfigured && !url.pathname.startsWith('/setup')) {
    // Redireciona para a rota de configuração `/setup`
    return NextResponse.redirect(new URL('/setup', req.url));
  } 
  if (platformConfigured && url.pathname.startsWith('/setup')) {
    // Redireciona para a rota de configuração `/setup`
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

// Configuração do matcher para definir quais rotas devem passar pelo middleware
export const config = {
  matcher: ['/((?!setup|api|_next/static|favicon.ico).*)'],
};
