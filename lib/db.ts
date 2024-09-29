// lib/db.ts
import prisma from '../lib/pisma'; // Ou seu ORM/configuração de banco de dados

export async function checkPlatformConfigured() {
  const platform = await prisma.platform.findFirst();
  return !!platform; // Retorna verdadeiro se a tabela tiver dados
}