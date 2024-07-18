import Button from "../atoms/Button";
import FormField from "../molecules/FormField";
import { useState } from "react";
import { useRef } from "react";

function SectionLogin() {
  const usernameRef = useRef('');
  const passwordRef = useRef('');

  const handleClick = (e) => {
    e.preventDefault()
        fetch(`${import.meta.env.VITE_URL}/auth/login` ,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin' : '*'
            }, 
            body: JSON.stringify({
                username:usernameRef.current.value,
                password:passwordRef.current.value
            })
        })
        .then (response => {
          if (response.ok)
            return response.json
            // console.log(response.headers.has('Authorization'))
        })
        .then (data=>{
           localStorage.setItem('token', data.token)
        })
        .catch(error=>{
            console.log(error);
        })

    }

    const handleClientsClick = (e) => {
      e.preventDefault()
          fetch(`${import.meta.env.VITE_URL}/clientes` ,{
              method:'POST',
              headers:{
                  'Content-Type':'application/json',
                  'Access-Control-Allow-Origin' : '*',
                  'Authorization': localStorage.getItem('token')
              }, 
              body: JSON.stringify({
                  username:usernameRef.current.value,
                  password:passwordRef.current.value
              })
          })
          .then (response => {
            if (response.ok)
              return response.json
              // console.log(response.headers.has('Authorization'))
          })
          .then (data=>{
             localStorage.setItem('token', data.token)
          })
          .catch(error=>{
              console.log(error);
          })
  
      }

  return (
    
    <form className="flex flex-col items-center justify-center h-auto">
      <div className="p-6 rounded shadow-md bg-white  max-w w-full md:w-96">
      <div className="p-2 flex items-center">
        <h2 className="text-2xl font-bold ml-4">Iniciar sesión</h2>
      </div>
      
      <FormField
        label="Username:"
        type="text"
        id="usernameRef"
        placeholder="Ingrese el username"
        ref={usernameRef}
          
      />
      <FormField
        label="Contraseña"
        type="password" 
        id="passwordRef"
        placeholder="Ingrese su contraseña"
        ref={passwordRef}   
      />
      <div className="flex justify-center mt-4">
        <Button
          type="submit"
          className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors"
          onClick={handleClick}
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
