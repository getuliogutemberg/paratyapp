import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { hashPassword, generateToken } from '../../../lib/auth';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, password } = req.body;

    const hashedPassword = await hashPassword(password);

    try {
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      const token = generateToken(user.id);
      res.status(201).json({ token });
    } catch (error) {
      res.status(400).json({ error: 'Erro ao registrar usuário', message: error });
    }
  } else {
    res.status(405).json({ message: 'Método não permitido' });
  }
}
