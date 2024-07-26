import LogoJC from '/public/Images/LogoJC.png'; 

function Image ({ src, alt }) {
  return <img src={LogoJC} alt={alt} className="w-full h-auto" />;
};

export default Image;
