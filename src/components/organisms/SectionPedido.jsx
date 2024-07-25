import React, { useState, useEffect } from 'react';
import StudentCard from '../molecules/StudentCard';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import PedidosCard from '../molecules/PedidosCard';

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
  }, []);

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

/*   useEffect(() => {
    const results = pedidos.filter(pedido =>
      pedido.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pedido.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pedido.id.toString().includes(searchTerm)
    );
    setFilteredpedidos(results);
  }, [searchTerm, pedidos]);
 */
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredPedidos.map(pedido => (
        <PedidosCard
          key={pedido.id} 
          pedido={pedido}
          onViewClick={handleViewClick} 
          onDeleteClick={handleDeleteClick}
        />
      ))}
    </div>
  );
}

export default SectionPedido;
