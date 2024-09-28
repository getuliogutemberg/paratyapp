// pages/api/plataform.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const platform = await prisma.platform.findFirst(); // Ajuste o método conforme a necessidade (first, many, etc.)
        
        if (!platform) {
          return res.status(404).json({ error: 'Dados da plataforma não encontrados' });
        }
    
        res.status(200).json(platform);
      } catch (error) {
        console.error('Erro ao buscar dados da plataforma:', error);
        res.status(500).json({ error: 'Erro do Servidor Interno' });
      }
}