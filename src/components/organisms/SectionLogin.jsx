import React, { useState, useContext } from 'react';
import UserContext from '../../context/userContext';
import Button from '../atoms/Button';
import FormField from '../molecules/FormField';

function SectionLogin() {
  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    const apiUrl = `${import.meta.env.VITE_URL}/login/instructor`; // Corrige la URL

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        setUser(data.user); // Asume que la respuesta contiene los detalles del usuario
      } else {
        console.log('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleClientsClick = async (e) => {
    e.preventDefault();

    const apiUrl = `${import.meta.env.VITE_URL}/alumnos`;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
      } else {
        console.log('Fetching clients failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form className="flex flex-col items-center justify-center h-auto">
      <h1>{user ? user.username : ''}</h1>
      <div className="p-6 rounded shadow-md bg-white max-w w-full md:w-96">
        <div className="p-2 flex items-center">
          <h2 className="text-2xl font-bold ml-4">Iniciar sesión</h2>
        </div>

        <FormField
          label="Username:"
          type="text"
          id="username"
          placeholder="Ingrese el username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <FormField
          label="Contraseña"
          type="password"
          id="password"
          placeholder="Ingrese su contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex justify-center mt-4">
          <Button
            type="submit"
            className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors"
            onClick={handleLogin}
          >
            Iniciar Sesión
          </Button>
          <Button
            type="submit"
            className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors"
            onClick={handleClientsClick}
          >
            Mostrar Clientes
          </Button>
        </div>
      </div>
    </form>
  );
}

export default SectionLogin;
