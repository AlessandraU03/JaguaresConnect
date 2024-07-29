import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import PedidosCard from '../molecules/PedidosCard';

function SectionPedido({ searchTerm }) {
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState([]);
  const [images, setImages] = useState([]);
  const [token, setToken] = useState(sessionStorage.getItem('authToken'));
  const [filteredPedidos, setFilteredPedidos] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL}/pedidos`, {
    method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setPedidos(data);
        setFilteredPedidos(data);
      })
      .catch(error => console.error('Error fetching data:', error));

      fetch(`${import.meta.env.VITE_URL}/equipos-img`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
          'Access-Control-Allow-Origin': '*',
        },
      })
        .then(response => response.json())
        .then(data => {
          setImages(data);
        })
        .catch(error => {
          console.error('Error fetching images:', error);
          Swal.fire(
            'Error',
            'No se pudieron cargar las imágenes. Inténtalo de nuevo más tarde.',
            'error'
          );
        });
  }, [token]);

  const handleViewClick = (pedidoId) => {
    navigate(`/pedidos/${pedidoId}`);
  };

  const handleEditClick = (pedidoId) => {
    navigate(`/pedidos/edit/${pedidoId}`);
  };

  const handleDeleteClick = (pedidoId) => {
    fetch(`${import.meta.env.VITE_URL}/pedidos/${pedidoId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    })
      .then(response => {
        if (response.ok) {
          const updatedpedidos = pedidos.filter(pedido => pedido.id !== pedidoId);
          setPedidos(updatedpedidos);
          setFilteredPedidos(updatedpedidos);
        } else {
          console.error('Failed to delete student');
          Swal.fire(
            'Error',
            'No se pudo eliminar al pedido. Inténtalo de nuevo más tarde.',
            'error'
          );
        }
      })
      .catch(error => {
        console.error('Error deleting student:', error);
        Swal.fire(
          'Error',
          'No se pudo eliminar al pedido. Inténtalo de nuevo más tarde.',
          'error'
        );
      });
  };



  const getImageUrl = (equipoId) => {
    const image = images.find(img => img.equipo_id === equipoId);
    if (!image) {
      console.log(`No image found for equipo ${equipoId}`);
      return '/default-image.png'; 
    }
    const url = `https://jaguaresconnectapi.integrador.xyz/${image.image_path.replace('\\', '/')}`;
    console.log(`Image URL for equipo ${equipoId}: ${url}`);
    return url;
  };

 
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredPedidos.map(pedido => (
        <PedidosCard
          key={pedido.id} 
          pedido={pedido}
          imageUrl={getImageUrl(pedido.equipo_id)}
          onViewClick={handleViewClick} 
          onDeleteClick={handleDeleteClick}
        />
      ))}
    </div>
  );
}

export default SectionPedido;
