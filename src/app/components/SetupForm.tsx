// components/SetupForm.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';

const SetupForm: React.FC = () => {
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formData); // Log dos dados do formulário

    try {
      const response = await fetch('/api/setup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Dados enviados com sucesso'); // Log de sucesso
        router.push('/dashboard'); // Redireciona para o dashboard
      } else {
        const errorData = await response.json();
        console.error('Erro ao enviar os dados:', errorData); // Log de erro
      }
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="exampleField"
        onChange={handleChange}
        placeholder="Campo Exemplo"
        required
      />
      <button type="submit">Enviar</button>
    </form>
  );
};

export default SetupForm;