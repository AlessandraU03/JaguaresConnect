import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Button from '../atoms/Button';

function PagosCard() {
    const location = useLocation();
    const [tipoPago, setTipoPago] = useState('realizados'); 
    const [showButtons, setShowButtons] = useState(false); 
  
    useEffect(() => {
      const tipo = new URLSearchParams(location.search).get('tipo');
      if (tipo === 'pendientes') {
        setTipoPago('pendientes');
      } else {
        setTipoPago('realizados');
      }
      setShowButtons(true); 
    }, [location]);
  
    return (
      <div className="container mx-auto p-4">
        {showButtons && (
          <div className="flex justify-center space-x-32 mb-4">
            <Link to="/Pagos?tipo=realizados">
              <Button
                type="button"
                className="px-4 w-[444px] h-[239px] py-2 font-semibold text-white bg-[#1B3140] rounded border-4 border-[#1B3140]"
              >
                Pagos Realizados
              </Button>
            </Link>
            <Link to="/Pagos?tipo=pendientes">
              <Button
                type="button"
                className="px-4 w-[444px] h-[239px] py-2 font-semibold text-white bg-[#1B3140] rounded border-4 border-[#1B3140]"
              >
                Pagos Pendientes
              </Button>
            </Link>
          </div>
        )}
      </div>
    );
  }
  
export default PagosCard;
