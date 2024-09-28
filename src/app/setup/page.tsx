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
}

const SetupForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    logo: '',
    Background: '',
    CssInit: '',
    LogoInit: '',
    Subtitle: '',
    TitleInit: '',
    name: '',
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/setup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/dashboard'); // Redireciona após o sucesso
      } else {
        console.error('Erro ao enviar os dados');
      }
    } catch (error) {
      console.error('Erro ao enviar os dados', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md space-y-4">
      
      <h2 className="text-2xl font-bold mb-4">Configuração da Plataforma</h2>

      {/* Input para o logo */}
      <div>
        <label htmlFor="logo" className="block text-sm font-medium text-gray-700">Logo (Base64)</label>
        <div className="mt-1 mb-2">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="logoInputType"
              checked={logoInputType === 'file'}
              onChange={() => setLogoInputType('file')}
              className="form-radio"
            />
            <span className="ml-2">Carregar do computador</span>
          </label>
          <label className="inline-flex items-center ml-4">
            <input
              type="radio"
              name="logoInputType"
              checked={logoInputType === 'base64'}
              onChange={() => setLogoInputType('base64')}
              className="form-radio"
            />
            <span className="ml-2">Inserir string Base64</span>
          </label>
        </div>
        {logoInputType === 'file' ? (
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, 'logo')}
            required
            className="mt-1 block w-full text-sm text-gray-700 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500"
          />
        ) : (
          <input
            type="text"
            value={formData.logo}
            onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
            placeholder="Insira a string Base64 da imagem"
            required
            className="mt-1 block w-full text-sm text-gray-700 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500"
          />
        )}
      </div>
      
      {/* Input para o background */}
      <div>
        <label htmlFor="Background" className="block text-sm font-medium text-gray-700">Background (Base64)</label>
        <div className="mt-1 mb-2">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="backgroundInputType"
              checked={backgroundInputType === 'file'}
              onChange={() => setBackgroundInputType('file')}
              className="form-radio"
            />
            <span className="ml-2">Carregar do computador</span>
          </label>
          <label className="inline-flex items-center ml-4">
            <input
              type="radio"
              name="backgroundInputType"
              checked={backgroundInputType === 'base64'}
              onChange={() => setBackgroundInputType('base64')}
              className="form-radio"
            />
            <span className="ml-2">Inserir string Base64</span>
          </label>
        </div>
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

      {/* CSS Inicial */}
      <div>
        <label htmlFor="CssInit" className="block text-sm font-medium text-gray-700">CSS Inicial</label>
        <textarea
          name="CssInit"
          value={formData.CssInit}
          onChange={handleInputChange}
          required
          className="mt-1 block w-full text-sm text-gray-700 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500"
        />
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

      {/* Subtitle */}
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

      {/* Title Initial */}
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

      {/* Nome */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="mt-1 block w-full text-sm text-gray-700 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500"
        />
      </div>

      {/* Botão de Enviar */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Salvar Configurações
        </button>
      </div>
    </form>
  );
};

export default SetupForm;
