'use client'; // Importante para usar estados e hooks no App Router

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';


interface FormData {
  logo: string;
  Background: string;
  CssInit: string;
  LogoInit: string;
  Subtitle: string;
  TitleInit: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  
}

const SetupForm: React.FC = () => {

    // Controle de etapas
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    logo: '',
    Background: '',
    CssInit: '',
    LogoInit: '',
    Subtitle: '',
    TitleInit: '',
    name: '',
    primaryColor: '',
    secondaryColor: '',
  });

  const [logoInputType, setLogoInputType] = useState<'file' | 'base64'>('file');
  const [backgroundInputType, setBackgroundInputType] = useState<'file' | 'base64'>('file');
  const [logoInitInputType, setLogoInitInputType] = useState<'file' | 'base64'>('file');

  const router = useRouter();


  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, field: keyof FormData) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData((prevData) => ({
        ...prevData,
        [field]: reader.result as string, // O resultado será a string base64
      }));
    };

    if (file) {
      reader.readAsDataURL(file); // Converte a imagem para base64
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Controle de navegação entre etapas
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/setup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/'); // Redireciona após o sucesso
      } else {
        console.error('Erro ao enviar os dados');
      }
    } catch (error) {
      console.error('Erro ao enviar os dados', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Configuração Inicial do Sistema</h2>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto mt-8 space-y-4 p-4 rounded-lg bg-white">
        {step === 1 && (
          <div className="flex flex-col h-full justify-between">
            <h3 className="text-2xl font-semibold text-center mb-8">Passo 1: Informações Gerais</h3>
            <div className="flex flex-col justify-center flex-grow">
              <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">Nome do Sistema</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="block w-full p-4 text-lg text-gray-700 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500"
              />
            </div>
            
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 className="text-xl font-semibold">Passo 2: Logo e Background</h3>
            <div>
        <label htmlFor="logo" className="flex flex-row items-center gap-2 justify-between text-md font-medium text-gray-700">Logo :
        <div className="mt-1 mb-2">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="logoInputType"
              checked={logoInputType === 'file'}
              onChange={() => setLogoInputType('file')}
              className="form-radio"
            />
            <span className="ml-2 text-gray-700">Carregar do computador</span>
          </label>
          <label className="inline-flex items-center ml-4">
            <input
              type="radio"
              name="logoInputType"
              checked={logoInputType === 'base64'}
              onChange={() => setLogoInputType('base64')}
              className="form-radio"
            />
            <span className="ml-2 text-gray-700">Inserir string Base64</span>
          </label>
        </div>
        </label>
        {logoInputType === 'file' ? (
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, 'logo')}
            required
            className="flex w-full antialiased text-gray-700 justify-center rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500"
          />
        ) : (
          <input
            type="text"
            value={formData.logo}
            onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
            placeholder="Insira a string Base64 da imagem"
            required
            className="flex w-full antialiased text-gray-700 justify-center rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500"
          />
        )}
      </div>

             {/* Input para o background */}
      <div>
        <label htmlFor="Background" className="flex flex-row items-center gap-2 justify-between text-md font-medium text-gray-700">Background :
        <div className="mt-1 mb-2">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="backgroundInputType"
              checked={backgroundInputType === 'file'}
              onChange={() => setBackgroundInputType('file')}
              className="form-radio"
            />
            <span className="ml-2 text-gray-700">Carregar do computador</span>
          </label>
          <label className="inline-flex items-center ml-4">
            <input
              type="radio"
              name="backgroundInputType"
              checked={backgroundInputType === 'base64'}
              onChange={() => setBackgroundInputType('base64')}
              className="form-radio"
            />
            <span className="ml-2 text-gray-700">Inserir string Base64</span>
          </label>
        </div>
        </label>
        {backgroundInputType === 'file' ? (
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, 'Background')}
            required
            className="mt-1 block w-full text-sm text-gray-700 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500"
          />
        ) : (
          <input
            type="text"
            value={formData.Background}
            onChange={(e) => setFormData({ ...formData, Background: e.target.value })}
            placeholder="Insira a string Base64 do background"
            required
            className="mt-1 block w-full text-sm text-gray-700 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500"
          />
        )}
      </div>

      {/* Logo Inicial */}
      <div>
        <label htmlFor="LogoInit" className="block text-sm font-medium text-gray-700">Logo Inicial (Base64)</label>
        <div className="mt-1 mb-2">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="logoInitInputType"
              checked={logoInitInputType === 'file'}
              onChange={() => setLogoInitInputType('file')}
              className="form-radio"
            />
            <span className="ml-2">Carregar do computador</span>
          </label>
          <label className="inline-flex items-center ml-4">
            <input
              type="radio"
              name="logoInitInputType"
              checked={logoInitInputType === 'base64'}
              onChange={() => setLogoInitInputType('base64')}
              className="form-radio"
            />
            <span className="ml-2">Inserir string Base64</span>
          </label>
        </div>
        {logoInitInputType === 'file' ? (
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, 'LogoInit')}
            required
            className="mt-1 block w-full text-sm text-gray-700 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500"
          />
        ) : (
          <input
            type="text"
            value={formData.LogoInit}
            onChange={(e) => setFormData({ ...formData, LogoInit: e.target.value })}
            placeholder="Insira a string Base64 da logo inicial"
            required
            className="mt-1 block w-full text-sm text-gray-700 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500"
          />
        )}
      </div>

          </div>
        )}

        {step === 3 && (
          <div>
            <h3 className="text-xl font-semibold">Passo 3: Título e Subtítulo</h3>
            <div>
              <label htmlFor="TitleInit" className="block text-sm font-medium text-gray-700">Título Inicial</label>
              <input
                type="text"
                name="TitleInit"
                value={formData.TitleInit}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full text-sm text-gray-700 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="Subtitle" className="block text-sm font-medium text-gray-700">Subtítulo</label>
              <input
                type="text"
                name="Subtitle"
                value={formData.Subtitle}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full text-sm text-gray-700 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500"
              />
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h3 className="text-xl font-semibold">Passo 4: Configurações de Cores e CSS</h3>
            <div>
              <label htmlFor="primaryColor" className="block text-sm font-medium text-gray-700">Cor Primária</label>
              <input
                type="color"
                name="primaryColor"
                value={formData.primaryColor}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full text-sm text-gray-700 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="secondaryColor" className="block text-sm font-medium text-gray-700">Cor Secundária</label>
              <input
                type="color"
                name="secondaryColor"
                value={formData.secondaryColor}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full text-sm text-gray-700 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="CssInit" className="block text-sm font-medium text-gray-700">CSS Customizado</label>
              <textarea
                name="CssInit"
                value={formData.CssInit}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full text-sm text-gray-700 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500"
              />
            </div>
          </div>
        )}

        {/* Navegação entre as etapas */}
        <div className="flex justify-between mt-6">
          {step > 1 && <button type="button" onClick={prevStep} className="rounded-full border border-transparent bg-foreground text-background h-10 px-4 hover:bg-[#f2f2f2] hover:text-white dark:hover:bg-[#1a1a1a] text-sm sm:text-base">Voltar</button>}
          {step < 4 && <button type="button" onClick={nextStep} className="rounded-full border border-transparent bg-foreground text-background h-10 px-4 hover:bg-[#f2f2f2] hover:text-white dark:hover:bg-[#1a1a1a] text-sm sm:text-base">Próximo</button>}
          {step === 4 && <button type="submit" className="rounded-full border border-transparent bg-foreground text-background h-10 px-4 hover:bg-[#f2f2f2] hover:text-white dark:hover:bg-[#1a1a1a] text-sm sm:text-base">{loading ? 'Enviando...' : 'Finalizar'}</button>}
        </div>
      </form>
    </div>
  );
};

export default SetupForm;
