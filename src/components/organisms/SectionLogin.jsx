import React, { useState, useContext } from 'react';
import UserContext from '../../context/userContext';
import Button from '../atoms/Button';
import FormField from '../molecules/FormField';
import Logo from '../atoms/Logo';
import { useNavigate } from 'react-router-dom';

function SectionLogin() {
  const [userData, setUserData] = useState({ login: '', contraseña: '' });
  const [errors, setErrors] = useState({ login: '', contraseña: '' });
  const [loginError, setLoginError] = useState('');
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUserData({ ...userData, [id]: value });
    validateInput(id, value);
  };

  const validateInput = (id, value) => {
    let error = '';
    if (id === 'login') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const matriculaRegex = /^[A-Za-z0-9]+$/;

      if (!emailRegex.test(value) && !matriculaRegex.test(value)) {
        error = 'Por favor, ingresa un correo electrónico válido o una matrícula válida.';
      }
    }
    setErrors((prevErrors) => ({ ...prevErrors, [id]: error }));
  };

  const validateForm = () => {
    let isValid = true;
    let error = '';

    if (!userData.login) {
      error = 'El campo de usuario es requerido.';
      setErrors((prevErrors) => ({ ...prevErrors, login: error }));
      isValid = false;
    }

    if (!userData.contraseña) {
      error = 'El campo de contraseña es requerido.';
      setErrors((prevErrors) => ({ ...prevErrors, contraseña: error }));
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');

    if (validateForm()) {
      try {
        const response = await fetch(`${import.meta.env.VITE_URL}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify(userData),
          credentials: 'include',
        });

        const data = await response.json();

        if (!response.ok) {
          handleLoginError(response.status, data);
        } else {
          const token = response.headers.get('Authorization');
          if (token) {
            sessionStorage.setItem('authToken', token);
          }
          setUser(data);
          const role = data.role;
          if (role === 'administrador') {
            navigate('/Administrador');
          } else if (role === 'alumno') {
            navigate('/HomeAlumno');
          } else if (role === 'instructor') {
            navigate('/HomeInstructor');
          }
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
        setLoginError('Ocurrió un error al intentar iniciar sesión.');
      }
    }
  };

  const handleLoginError = (status, data) => {
    if (status === 401) {
      setLoginError('El correo electrónico o la matrícula y/o la contraseña son incorrectos.');
    } else {
      setLoginError('Ocurrió un error al intentar iniciar sesión.');
    }
  };

  return (
    <form className="flex flex-col items-center justify-center h-auto">
      <div className="p-6 rounded shadow-md bg-white max-w w-full md:w-96">
        <div className="p-2 flex items-center">
          <Logo />
          <h2 className="text-2xl font-bold ml-4">Iniciar sesión</h2>
        </div>
        <FormField
          label="Username:"
          type="text"
          id="login"
          placeholder="example@gmail.com o matrícula"
          value={userData.login}
          onChange={handleInputChange}
          error={errors.login}
        />
        {errors.login && <p className="text-red-500 text-sm">{errors.login}</p>}
        <FormField
          label="Contraseña"
          type="password"
          id="contraseña"
          placeholder="********"
          value={userData.contraseña}
          onChange={handleInputChange}
          error={errors.contraseña}
        />
        {errors.contraseña && <p className="text-red-500 text-sm">{errors.contraseña}</p>}
        <div className="text-red-500 text-sm mt-2">
          {loginError}
        </div>
        <div className="flex justify-center mt-4">
          <Button
            type="button"
            className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors"
            onClick={handleLogin}
          >
            Iniciar Sesión
          </Button>
        </div>
      </div>
    </form>
  );
}

export default SectionLogin;
