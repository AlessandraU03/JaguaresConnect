import React, { useState, useEffect } from 'react';
import StudentCard from '../molecules/StudentCard';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import PedidosCard from '../molecules/PedidosCard';

function SectionPedido({ searchTerm }) {
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState([]);
  const [filteredpedidos, setFilteredpedidos] = useState([]);

  useEffect(() => {
    fetch('https://jaguaresconnectapi.integrador.xyz/api/pedidos')
      .then(response => response.json())
      .then(data => {
        setPedidos(data);
        setFilteredpedidos(data);
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
    })
      .then(response => {
        if (response.ok) {
          const updatedpedidos = pedidos.filter(pedido => pedido.id !== pedidoId);
          setPedidos(updatedpedidos);
          setFilteredpedidos(updatedpedidos);
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
      {filteredpedidos.map(pedido => (
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
