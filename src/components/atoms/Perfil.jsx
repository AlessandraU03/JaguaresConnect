function Perfil({ src, alt }) {
    const handleError = (event) => {
      event.target.src = '/public/Images/LogoJC.png'; }
  
    return (
      <img
        src={src}
        alt={alt}
        className="w-full max-w-[440px] h-[480px] object-cover mt-10"
        onError={handleError}
      />
    );
  }
  
  export default Perfil;
  