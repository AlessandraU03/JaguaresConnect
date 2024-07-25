import React, { useState, useEffect } from "react";
import ListaCard from "../molecules/ListaCard";

function SectionAsistencia() {
  const [listas, setListas] = useState([]);

  useEffect(() => {
    fetchListas();
  }, []);

  const fetchListas = async () => {
    try {
      const token = sessionStorage.getItem('authToken');
      if (!token) {
        throw new Error('Token no encontrado');
      }
      const cleanedToken = token.startsWith('Bearer ') ? token.substring(7) : token;

      const response = await fetch("https://jaguaresconnectapi.integrador.xyz/api/listas", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${cleanedToken}`, // Usa el token limpio en el encabezado
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${errorText}`);
      }

      const data = await response.json();
      setListas(data);
    } catch (error) {
      console.error("Error fetching listas:", error);
    }
  };

  const handleCreateLista = async () => {
    try {
      // Recupera el token de sessionStorage
      const token = sessionStorage.getItem('authToken');
      if (!token) {
        throw new Error('Token no encontrado');
      }

      // Limpia el token si incluye 'Bearer '
      const cleanedToken = token.startsWith('Bearer ') ? token.substring(7) : token;

      const response = await fetch("https://jaguaresconnectapi.integrador.xyz/api/listas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${cleanedToken}`, // Usa el token limpio en el encabezado
        },
        body: JSON.stringify({
          fecha_creacion: new Date().toISOString(),
          fecha_miercoles: new Date().toISOString(),
          fecha_viernes: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to create lista: ${errorText}`);
      }

      const newLista = await response.json();
      setListas([...listas, newLista]);
    } catch (error) {
      console.error("Error creating lista:", error);
    }
  };

  const handleDeleteLista = async (id) => {
    try {
      // Recupera el token de sessionStorage
      const token = sessionStorage.getItem('authToken');
      if (!token) {
        throw new Error('Token no encontrado');
      }

      // Limpia el token si incluye 'Bearer '
      const cleanedToken = token.startsWith('Bearer ') ? token.substring(7) : token;

      const response = await fetch(`https://jaguaresconnectapi.integrador.xyz/api/listas/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${cleanedToken}`, // Usa el token limpio en el encabezado
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to delete lista: ${errorText}`);
      }

      setListas(listas.filter(lista => lista.id !== id));
    } catch (error) {
      console.error("Error deleting lista:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {listas.map((lista) => (
          <ListaCard
            key={lista.id}
            lista={lista}
            onDeleteClick={handleDeleteLista}
          />
        ))}
      </div>
    </div>
  );
}

export default SectionAsistencia;
