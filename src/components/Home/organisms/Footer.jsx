import React from 'react';

function Footer() {
  return (
    <footer className="bg-[#223A47] text-white py-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        <div className="flex flex-col items-start pl-[235px]">
          <p className="text-lg">Central Sur 111, San Esteban,</p>
          <p className="text-lg">29150 Suchiapa, Chis.</p>
        </div>
        <div className="flex space-x-4">
          <a href="https://www.facebook.com/profile.php?id=100090151391903" target="_blank" rel="noopener noreferrer">
            <img src="public/F.png" alt="Facebook" className="h-6 w-6 md:h-8 md:w-8" />
          </a>
        </div>
        <div className="flex items-center space-x-2 pr-[169px]">
          <img src="public\LogoJC.png" alt="Jaguares Logo" className="h-8 w-8 md:h-12 md:w-12" />
          <p className="text-lg">IDEM "Jaguares"</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
