import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
// Instanciar o Prisma Client
const prisma = new PrismaClient();





export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  

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
    let settings = {
      plataforma: { 
        id: 1,
        logo: 'Logo da Plataforma em Base64 ou URL',
        Background:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
        CssInit:'{}',
        LogoInit:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
        Subtitle:'subtitle',
        TitleInit:'title',
        pages: 'Páginas Disponíveis',
        primaryColor:'#e60000',
        secondaryColor:'#e60000',
        createdAt: '2022-01-01T00:00:00.000Z',
       },
      usuarios: [{ 
        id: 1,
  name: 'Nome do Usuário',
  email: 'Email do Usuário',
  password: 'Senha do Usuário',
  role: 'BASIC',
  groupId: 1,
  group: 'Nome do Grupo',
  logs: 'Logs do Usuário',
  dashboards: 'Dashboards do Usuário',
  pages: 'Páginas do Usuário',
  createdAt: '2022-01-01T00:00:00.000Z',
      },
      { 
        id: 2,
  name: 'Nome do Usuário2',
  email: 'Email do Usuário2',
  password: 'Senha do Usuário2',
  role: 'BASIC',
  groupId: 1,
  group: 'Nome do Grupo2',
  logs: 'Logs do Usuário2',
  dashboards: 'Dashboards do Usuário2',
  pages: 'Páginas do Usuário2',
  createdAt: '2022-01-01T00:00:00.000Z2',
      },
      
    ],
      sensores: [{
        id: 1,
        name: 'Nome do Sensor',
        type: 'Tipo de Sensor (ex: temperatura, umidade, pressão)',
        groupId: 1,
        group: 'Nome do Grupo',
        data: [],
        createdAt: '2022-01-01T00:00:00.000Z',
      },
      {
        id: 2,
        name: 'Nome do Sensor2',
        type: 'Tipo de Sensor (ex: temperatura, umidade, pressão)',
        groupId: 1,
        group: 'Nome do Grupo2',
        data: [],
        createdAt: '2022-01-01T00:00:00.000Z2',
      },
    ],
      paginas: [
        { 
          id: 1,
          name: 'Nome da página (ex: "Configurações", "Analytics")',
          content: 'Conteúdo ou estrutura da página em formato JSON ou HTML',
          route:'/route',
          icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
          permission: 'Administrador',
          platformId: 1,
          platform: 'Nome da Plataforma',
          createdBy: 1,
          createdByUser: 'Nome do Usuário',
          createdAt: '2022-01-01T00:00:00.000Z',
  
        },
        { 
          id: 2,
          name: 'Nome da página2 (ex: "Configurações", "Analytics")',
          content: 'Conteúdo ou estrutura da página em formato JSON ou HTML',
          route:'/route2',
          icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
          permission: 'Administrador',
          platformId: 1,
          platform: 'Nome da Plataforma',
          createdBy: 1,
          createdByUser: 'Nome do Usuário',
          createdAt: '2022-01-01T00:00:00.000Z2',
  
        },
      ],
      grupos: [
        { 
          id: 1,
          name: 'Nome do Grupo',
          users: [],
          dashboards: [],
          sensors: [],
          createdAt: '2022-01-01T00:00:00.000Z',
  
        },
        { 
          id: 2,
          name: 'Nome do Grupo2',
          users: [],
          dashboards: [],
          sensors: [],
          createdAt: '2022-01-01T00:00:00.000Z2',
  
        },
      ],
      dashboards: [
        { 
          id: 1,
          name: 'Nome do Dashboard',
          groupId: 1,
          group: 'Nome do Grupo',
          charts: [],
          createdBy: 1,
          createdByUser: 'Nome do Usuário',
          createdAt: '2022-01-01T00:00:00.000Z',
  
        },
        { 
          id: 2,
          name: 'Nome do Dashboard2',
          groupId: 1,
          group: 'Nome do Grupo2',
          charts: [],
          createdBy: 1,
          createdByUser: 'Nome do Usuário',
          createdAt: '2022-01-01T00:00:00.000Z2',
  
        },
      ],
      graficos: [
        { 
          id: 1,  
          type: 'Tipo de Gráfico (ex: linha, barra, pizza, etc.)',
          dataSource: 'Fonte de dados do gráfico (ex: API externa ou banco de dados interno)',
          dashboardId: 1,
          dashboard: 'Nome do Dashboard',
          createdAt: '2022-01-01T00:00:00.000Z',
        },
        { 
          id: 2,  
          type: 'Tipo de Gráfico (ex: linha, barra, pizza, etc.)',
          dataSource: 'Fonte de dados do gráfico (ex: API externa ou banco de dados interno)',
          dashboardId: 1,
          dashboard: 'Nome do Dashboard2',
          createdAt: '2022-01-01T00:00:00.000Z2',
        },
      ],
    };

    //   // Verificar se a aba é uma chave válida de 'settings'
    if (!tab || typeof tab !== 'string') {
      return res.status(200).json(settings);
    }

    try {

      // Buscar dados do banco com base na aba
      switch (tab) {
        case 'plataforma':
          const plataform = await prisma.platform.findMany();
          settings = { ...settings, [tab as keyof typeof settings]: plataform[0] };
          break;
        case 'usuarios':
          const users = await prisma.user.findMany();
          settings = { ...settings, [tab as keyof typeof settings]: users };
          break;
        case 'sensores':
          const sensors = await prisma.sensor.findMany();
          settings = { ...settings, [tab as keyof typeof settings]: sensors };
          break;
        case 'paginas':
          const pages = await prisma.page.findMany();
          settings = { ...settings, [tab as keyof typeof settings]: pages };
          break;
        case 'grupos':
          const groups = await prisma.group.findMany();
          settings = { ...settings, [tab as keyof typeof settings]: groups };
          break;
        case 'dashboards':
          const dashboards = await prisma.dashboard.findMany();
          settings = { ...settings, [tab as keyof typeof settings]: dashboards };
          break;
        case 'graficos':
          const charts = await prisma.chart.findMany();
          settings = { ...settings, [tab as keyof typeof settings]: charts };
          break;
        // Adicione os casos para as outras abas conforme necessário
        default:
          return res.status(404).json({ message: 'Aba não encontrada' + tab });
      }

      return res.status(200).json(settings);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao buscar configurações.' });
    }
  }

  res.status(405).json({ message: 'Método não permitido' });
}
