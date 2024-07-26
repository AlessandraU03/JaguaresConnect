import React, { useState, useEffect } from "react";
import HeaderAdmi from "../organisms/HeaderAdmi";
import Image from "../atoms/Image";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function PedidoDetail() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem('authToken');
  const { id } = useParams();
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    fetch(`https://jaguaresconnectapi.integrador.xyz/api/pedidos/${id}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': token
       }
    })
      .then(response => response.json())
      .then(data => {
        // Verificar si data es un array
        if (Array.isArray(data)) {
          setPedidos(data);
        } else {
          // Si data no es un array, convertirlo en uno
          setPedidos([data]);
        }
      })
      .catch(error => console.error('Error fetching pedidos data:', error));
  }, [id]);

  const handleClick = () => {
    navigate("/Pedidos");
  };

  if (pedidos.length === 0) {
    return <div className="p-4">Cargando...</div>;
  }

  return (
    <>
      <HeaderAdmi />
      <div className="container mx-auto p-14">
        {pedidos.map((pedido) => (
          <div key={pedido.pedido_id} className="mb-8">
            <div className="text-black text-3xl font-medium flex items-center">
              <Image></Image>
              <h1>{pedido.nombre_alumno} {pedido.apellido}</h1>
            </div>
            <Image/>
            <div className="mt-14 text-black text-2xl">
              <p>{pedido.nombre_equipo}</p>
              <p>{pedido.color}</p>
              <p>{pedido.talla}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default PedidoDetail;
