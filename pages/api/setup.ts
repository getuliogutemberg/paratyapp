// pages/api/setup.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const data = req.body; // Obtenha os dados do corpo da requisição
    console.log('Dados recebidos:', data); // Log dos dados recebidos

    try {
        // Atualiza a primeira linha da tabela platform
        const updatedPlatform = await prisma.platform.create({
         
          data, 
        });
  
        // Retorna a resposta de sucesso
        res.status(200).json({ message: 'Dados atualizados com sucesso!', updatedPlatform });
      } catch (error) {
        console.error('Erro ao atualizar dados:', error);
        res.status(500).json({ message: 'Erro ao atualizar dados', error: error });
      }

    // Aqui você pode processar os dados (ex: salvar no banco de dados)
    
    // Se tudo estiver correto, retorne um status 200
    res.status(200).json({ message: 'Dados recebidos com sucesso!' });
  } else {
    // Se não for um método POST, retorne 405 (Método não permitido)
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Método ${req.method} não permitido`);
  }
}