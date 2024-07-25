import React, { useState, useEffect } from 'react';
import PedidosCard from '../molecules/PedidosCard';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function SectionPedido({ searchTerm }) {
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState([]);
  const [token, setToken] = useState(sessionStorage.getItem('authToken'));
  const [filteredPedidos, setFilteredPedidos] = useState([]);

  useEffect(() => {
    fetch('https://jaguaresconnectapi.integrador.xyz/api/pedidos', {
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
  }, [token]);

  useEffect(() => {
    const results = pedidos.filter(pedido => {
      const pedidoId = pedido.pedido_id;
      const searchTermAsNumber = Number(searchTerm);
      return (
        (pedido.nombre_alumno && pedido.nombre_alumno.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (pedidoId !== undefined && pedidoId.toString().includes(searchTerm) || searchTermAsNumber === pedidoId)
      );
    });
    setFilteredPedidos(results);
  }, [searchTerm, pedidos]);

  const handleViewClick = (pedidoId) => {
    navigate(`/pedidos/${pedidoId}`);
  };

  const handleEditClick = (pedidoId) => {
    navigate(`/pedidos/edit/${pedidoId}`);
  };

  const handleDeleteClick = (pedidoId) => {
    fetch(`https://jaguaresconnectapi.integrador.xyz/api/pedidos/${pedidoId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    })
      .then(response => {
        if (response.ok) {
          const updatedPedidos = pedidos.filter(pedido => pedido.pedido_id !== pedidoId);
          setPedidos(updatedPedidos);
          setFilteredPedidos(updatedPedidos);
        } else {
          console.error('Failed to delete pedido');
          Swal.fire(
            'Error',
            'No se pudo eliminar el pedido. Inténtalo de nuevo más tarde.',
            'error'
          );
        }
      })
      .catch(error => {
        console.error('Error deleting pedido:', error);
        Swal.fire(
          'Error',
          'No se pudo eliminar el pedido. Inténtalo de nuevo más tarde.',
          'error'
        );
      });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredPedidos.length > 0 ? (
        filteredPedidos.map(pedido => (
          <PedidosCard
            key={pedido.pedido_id} // Asegúrate de que el ID sea único
            pedido={pedido}
            onViewClick={() => handleViewClick(pedido.pedido_id)}
            onDeleteClick={() => handleDeleteClick(pedido.pedido_id)}
          />
        ))
      ) : (
        <div className="col-span-full text-center text-lg text-gray-600">No se encontraron pedidos.</div>
      )}
    </div>
  );
}

export default SectionPedido;
