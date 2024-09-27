// pages/api/data.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = [
    { name: 'Janeiro', value: 4000 },
    { name: 'Fevereiro', value: 3000 },
    { name: 'Março', value: 2000 },
    { name: 'Abril', value: 2780 },
    { name: 'Maio', value: 1890 },
    { name: 'Junho', value: 2390 },
    { name: 'Julho', value: 3490 },
    { name: 'Agosto', value: 2000 },
    { name: 'Setembro', value: 3000 },
    { name: 'Outubro', value: 4000 },
    { name: 'Novembro', value: 4500 },
    { name: 'Dezembro', value: 3500 },
  ];
  
  res.status(200).json(data);
}