import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

// Instanciar o Prisma Client
const prisma = new PrismaClient();





export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const settingsArray = [];
    const settings = await prisma.$queryRaw<{ table_name: string }[]>`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_type = 'BASE TABLE';
  `;
  // Array para armazenar os resultados de cada tabela
  

  for (const table of settings) {
    const tableName = table.table_name;

    // Ignorar tabelas do Prisma que não queremos exportar, como _prisma_migrations
    if (tableName === '_prisma_migrations') continue;

    // Executa uma query para pegar todos os dados dessa tabela
    const tableData = await prisma.$queryRawUnsafe(`SELECT * FROM "${tableName}";`);

    

    // Adiciona o resultado ao array de settings, com o nome da tabela
    settingsArray.push({
      tableName: JSON.stringify(tableData),
    });
  }


  if (req.method === 'PUT') {
    const { tab } = req.query;
    try {
      const updatedData = req.body;
  
      if (!updatedData || typeof updatedData !== 'object') {
        return res.status(400).json({ message: 'Dados inválidos' });
      }
  
      // Atualizar dados no banco com base na aba
      switch (tab) {
        case 'plataforma':
          await prisma.platform.update({
            where: { id: updatedData.id }, // Presuma que você tenha um ID para atualizar
            data: updatedData,
          });
          break;
        // Adicione casos para as outras abas
      }
  
      return res.status(200).json({ message: 'Configuração atualizada com sucesso!' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao atualizar configurações.' });
    }
  } else if (req.method === 'GET') {
    const { tab } = req.query;

 

    
    //   // Verificar se a aba é uma chave válida de 'settings'
    if (!tab || typeof tab !== 'string') {
      return res.status(200).json(settingsArray[0]);
    }

    try {
      // let responseData;
      // // Buscar dados do banco com base na aba
      // switch (tab) {
      //   case 'plataforma':
      //     responseData = await prisma.platform.findFirst();
      //     break;
      //   case 'usuarios':
      //     responseData = await prisma.user.findMany();
      //     break;
      //   case 'sensores':
      //     responseData = await prisma.sensor.findMany();
      //     break;
      //   case 'paginas':
      //     responseData = await prisma.page.findMany();
      //     break;
      //   case 'grupos':
      //     responseData = await prisma.group.findMany();
      //     break;
      //   case 'dashboards':
      //     responseData = await prisma.dashboard.findMany();
      //     break;
      //   case 'graficos':
      //     responseData = await prisma.chart.findMany();
      //     break;
      //   // Adicione os casos para as outras abas conforme necessário
      //   default:
      //     return res.status(404).json({ message: 'Aba não encontrada' + tab });
      // }

      return res.status(200).json(settingsArray[0]);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao buscar configurações.' });
    }
  }

  res.status(405).json({ message: 'Método não permitido' });
}
