import React from 'react';

function PhilosophySection() {
  return (
    <section className="philosophy-section">
      <div className="flex flex-col items-center pt-[50px] md:pt-[101px] pb-[40px] md:pb-[80px]">
        <div className="w-full max-w-[1066px] flex-shrink-0">
          <div className='flex items-center justify-center pb-[30px] md:pb-[45px]'>
            <h2 className="flex flex-col justify-center w-full max-w-[579px] h-auto text-center text-black font-inter text-[32px] md:text-[73px] font-extrabold leading-normal rounded-[30px_0px] bg-[#E4C000]">
              NUESTRA FILOSOFÍA
            </h2>
          </div>
          <div>
            <p className="w-full max-w-[1066px] text-justify text-black font-inter text-[20px] md:text-[32px] font-medium leading-normal">
              En Jaguares Taekwondo creemos que el verdadero aprendizaje va más allá de las técnicas marciales. Nuestra filosofía se basa en el desarrollo integral de cada estudiante, inculcando valores que los acompañarán toda la vida. Creemos en la educación a través del ejemplo, y nuestros instructores son modelos a seguir que inspiran a los alumnos a ser su mejor versión. Promovemos un ambiente inclusivo y de apoyo donde cada estudiante es valorado y animado a superar sus propios límites.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PhilosophySection;
