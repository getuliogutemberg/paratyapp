// pages/api/auth/me.ts

import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import prisma from '../../../lib/pisma'; // Certifique-se de que o Prisma esteja configurado corretamente

const secret = process.env.JWT_SECRET || 'supersecretjwtkey'; // Defina uma chave secreta no .env

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const authHeader = req.headers.authorization;
  
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Token não fornecido.' });
    }
  
    const token = authHeader.split(' ')[1];
  
    try {
      // Verifica e decodifica o token
      const decoded = jwt.verify(token, secret) as jwt.JwtPayload;
  
      // Decodificado: { userId: 1, iat: ..., exp: ... }
      const { userId } = decoded;
  
      // Busca o usuário no banco de dados pelo userId
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });
  
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
      }
  
      // Retorna as informações do usuário
      return res.status(200).json({ user });
    } catch (error) {

      return res.status(401).json({ message: 'Token inválido ou expirado.', error });
    }
  }