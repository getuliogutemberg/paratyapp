// pages/api/plataform.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            // Busca todas as plataformas na tabela Platform
            const platforms  = await prisma.platform.findMany();
            // console.log("Plataformas encontradas:", platforms);
            res.status(200).json(platforms[0]); // Retorna as plataformas como resposta
        } catch (error) {
            // console.error("Erro ao buscar plataformas:", error);
            res.status(500).json({ error: "Erro ao buscar plataformas", message: error }); // Retorna um erro caso ocorra
        } finally {
            await prisma.$disconnect(); // Desconecta o Prisma
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Método ${req.method} não permitido`); // Retorna um erro se o método não for GET
    }
}