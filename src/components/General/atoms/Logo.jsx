import React from 'react';
import LogoJC from '/public/LogoJC.png'; 

function Logo({onClick}) {
  return (
    <div onClick={onClick} className="cursor-pointer">
    <img src={LogoJC} alt="IDEM Jaguares Logo" className="h-14 xl:h-20 w-auto" />
    </div>
  );
}

export default Logo;

