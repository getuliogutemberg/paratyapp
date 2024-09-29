'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'react-toastify';

interface ValueType {
  name: string;
  [key: string]: string | ValueType; // Permite outras propriedades
}

// Supondo que 'settings' tenha um tipo específico
interface Settings {
  [key: string]: ValueType ; // Define que cada valor pode ser um ValueType ou qualquer outro tipo
}

interface RenderTabContentProps {
  settings: Settings;
  activeTab: string;
  handleInputChange: (tab: string, key: string, value: string) => void;


}


const RenderTabContent: React.FC<RenderTabContentProps> = ({ settings, activeTab, handleInputChange }) => {
  const currentSettings = settings[activeTab];

  // Estado para controlar as linhas expandidas
  const [expandedRows, setExpandedRows] = useState<{ [key: string]: boolean }>({});

  const toggleRow = (key: string) => {
    setExpandedRows((prev) => ({
      ...prev,
      [key]: !prev[key], // Alterna o estado expandido
    }));
  };

  return Object.keys(currentSettings).map((key) => {
    const value = currentSettings[key];

    console.log('key:', key, 'tipo:', typeof value, 'value:', value);

    // Verifica se o valor é um array de objetos
    if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'object') {
      return value.map((item, index) => (
        <div key={`${key}-${index}`} className="mb-4 border p-2 rounded ">
          <h3 className="font-semibold cursor-pointer text-gray-700" onClick={() => toggleRow(`${key}-${index}`)}>
            {`Item ${index + 1}`} {expandedRows[`${key}-${index}`] ? '-' : '+'}
          </h3>
          {expandedRows[`${key}-${index}`] && (
            <div className="pl-4">
              {Object.keys(item).map((itemKey) => (
                <div key={itemKey} className="mb-2">
                  <label className="block text-gray-700">{itemKey}</label>
                  <input
                    type="text"
                    value={item[itemKey]}
                    onBlur={(e) => handleInputChange(activeTab, `${key}[${index}].${itemKey}`, e.target.value)}
                    className="border p-2 w-full"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      ));
    }

    // Verifica se o valor é um objeto (mas não um array)
    if (value && typeof value === 'object') {
      return (
        <div key={key} className="mb-4 border p-2 rounded">
          <h3 className="font-semibold cursor-pointer text-gray-700" onClick={() => toggleRow(key)}>
            {value.name} {expandedRows[key] ? '-' : '+'}
          </h3>
          {expandedRows[key] && (
            <div className="pl-4">
              {Object.keys(value).map((objKey) => (
                <div key={objKey} className="mb-2">
                  <label className="block text-gray-700">{objKey}</label>
                  <input
                    type="text"
                    value={value[objKey] as string}
                    onBlur={(e) => handleInputChange(activeTab, `${key}.${objKey}`, e.target.value)}
                    className="border p-2 w-full text-gray-700"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    // Caso seja um valor simples
    return (
      <div key={key} className="mb-4">
        <label className="block text-gray-700">{key}</label>
        <input
          type="text"
          value={value}
          onBlur={(e) => handleInputChange(activeTab, key, e.target.value)}
          className="border p-2 w-full text-gray-700"
        />
      </div>
    );
  });
};
const SettingsPage: React.FC = () => {
  const router = useRouter();
  
  // Estado para armazenar as abas ativas e as configurações
  const [activeTab, setActiveTab] = useState('plataforma');
  const [settings, setSettings] = useState<{ [key: string]: { [key: string]: string } }>({
    plataforma: {},
    usuarios: {},
    sensores: {},
    paginas: {},
    grupos: {},
    dashboards: {},
    graficos: {}
  });

  // Função para carregar os dados iniciais do banco de dados
  const loadSettings = async () => {
    try {
      const response = await fetch('/api/settings'); // API que retorna os dados do banco
  
      // Log para verificar o status da resposta
      console.log('Response status:', response.status);
      const text = await response.text(); // Leia a resposta como texto
      console.log('Response text:', text); // Log o texto da resposta
  
      // Verifique se a resposta é JSON antes de tentar analisá-lo
      if (!response.ok) {
        throw new Error(`Erro: ${response.status} ${response.statusText}`);
      }
  
      const data = JSON.parse(text); // Tente analisar o texto como JSON
      setSettings(data);
    } catch (error) {
      toast.error('Erro ao carregar configurações. ' + error);
    }
  };

  // Carregar os dados ao montar o componente
  useEffect(() => {
    loadSettings();
  }, []);

  // Função para enviar as mudanças ao backend
  const handleInputChange = async (tab: string, key: string, value: string) => {
    setSettings({
      ...settings,
      [tab]: {
        ...settings[tab],
        [key]: value
      }
    });

    try {
      const response = await fetch(`/api/settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ [key]: value })
      });

      if (response.ok) {
        toast.success('Configuração atualizada com sucesso!');
      } else {
        throw new Error('Falha na atualização');
      }
    } catch (error) {
      toast.error('Erro ao atualizar configuração. ' + error);
    }
  };

 
  

  return (
    <div className="p-4">
      

      {/* Navegação entre as abas */}
      <div className="flex space-x-4 mb-4">
        {['plataforma', 'usuarios', 'sensores', 'paginas', 'grupos', 'dashboards', 'graficos'].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 ${activeTab === tab ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-500 hover:text-white`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>


      <h1>Configurações - {activeTab}</h1>
      {/* Conteúdo da aba ativa */}
      <div className="p-4 border bg-white shadow">
        <RenderTabContent settings={settings as Settings} activeTab={activeTab} handleInputChange={handleInputChange} />
      </div>

      {/* Botão de voltar */}
      <button
        type="button"
        onClick={() => {
          router.back();
          toast.success('Configurações salvas!');
        }}
        className="block px-4 py-2 hover:bg-gray-200 w-full text-left dark:hover:text-black "
      >
        Voltar
      </button>
    </div>

  );
};

export default SettingsPage;
