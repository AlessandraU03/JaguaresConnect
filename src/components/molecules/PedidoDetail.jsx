import React, { useState, useEffect } from "react";
import HeaderAdmi from "../organisms/HeaderAdmi";
import Image from "../atoms/Image";
import { useParams, useNavigate } from "react-router-dom";
import Text from "../atoms/Text";
import Button from "../atoms/Button";

function PedidoDetail() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem('authToken');
  const { id } = useParams();
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setLoading(false);
        if (Array.isArray(data)) {
          setPedidos(data);
        } else {
          setPedidos([data]);
        }
      })
      .catch(error => {
        setLoading(false);
        setError(error);
        console.error('Error fetching pedidos data:', error);
      });
  }, [id, token]);

  const handleClick = () => {
    navigate("/Pedidos");
  };

  if (loading) {
    return <div className="p-4 text-center">Cargando...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">Error al cargar los pedidos.</div>;
  }

  return (
    <>
      <HeaderAdmi />
      <div className="container mx-auto p-14 grid grid-cols-1 gap-8">
        {pedidos.map((pedido) => (
          <div key={pedido.pedido_id} className="bg-white p-6 rounded-lg  grid grid-cols-1 gap-6 text-center">
            <div className="text-black text-3xl font-medium mb-4">
              <Image src={pedido.imagen_url} alt={pedido.nombre_alumno} className="w-32 h-32 object-cover mx-auto" /> {/* Ajusta el tamaño según sea necesario */}
              <h1>{pedido.nombre_alumno} {pedido.apellido}</h1>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex justify-center items-center">
                <Image src={pedido.imagen_equipo_url} alt={pedido.nombre_equipo} className="w-32 h-32 object-cover mx-auto" /> {/* Ajusta el tamaño según sea necesario */}
              </div>
              <div className="text-black text-2xl space-y-2">
                <Text>{pedido.nombre_equipo}</Text>
                <Text>{pedido.color}</Text>
                <Text>{pedido.talla}</Text>
              </div>
            </div>
          </div>
        ))}
        <div className="text-center mt-8">
          <Button onClick={handleClick} >
            Volver a Pedidos
          </Button>
        </div>
      </div>
    </>
  );
}

export default PedidoDetail;
