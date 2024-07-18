import React from 'react';
import LogoJC from '/public/Images/LogoJC.png'; 

function Logo() {
  return (
    <img src={LogoJC} alt="IDEM Jaguares Logo" className="h-16 xl:h-20 w-auto" />
  );
}

export default Logo;
