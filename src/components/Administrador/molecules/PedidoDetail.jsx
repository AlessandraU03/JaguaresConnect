import React, { useState, useEffect } from "react";
import HeaderAdmi from "../organisms/HeaderAdmi";
import Image from "../../General/atoms/Image";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Button from "../atoms/Button";

function PedidoDetail() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem('authToken');
  const [images, setImages] = useState([]);
  const { id } = useParams();
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL}/pedidos/${id}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': token
       }
    })
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setPedidos(data);
        } else {
          setPedidos([data]);
        }
      })
      .catch(error => console.error('Error fetching pedidos data:', error));

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
      });
  }, [id, token]);

  const getImageUrl = (id) => {
    const image = images.find(img => img.alumno_id === id || img.equipo_id === id);
    if (!image) {
      console.log(`No image found for ID ${id}`);
      return '/default-image.png'; 
    }
    const url = `https://jaguaresconnectapi.integrador.xyz/${image.image_path.replace('\\', '/')}`;
    console.log(`Image URL for ID ${id}: ${url}`);
    return url;
  };

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
          <div key={pedido.pedido_id} className="mb-8 p-6 ">
            <div className="flex items-center justify-start mb-8">
             
              <h1 className="ml-4 mt-2 text-2xl font-semibold">{pedido.nombre_alumno} {pedido.apellido}</h1>
            </div>
            <div className="flex flex-col items-center justify-center">
              <Image src={getImageUrl(pedido.equipo_id)} alt={`${pedido.nombre_equipo}`} className="w-60 h-60 object-cover" />
              <div className="mt-4 text-center">
                <p className="text-lg font-medium">{pedido.nombre_equipo}</p>
                <p className="text-gray-500">COLOR: {pedido.color}</p>
                <p className="text-gray-500">TALLA: {pedido.talla}</p>
              </div>
              <div className="mt-4 flex justify-center">
                  <Button onClick={handleClick}>Salir</Button>
                </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default PedidoDetail;
