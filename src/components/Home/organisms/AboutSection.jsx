import React from 'react';

function AboutSection() {
  return (
    <section className="relative">
      <img
        src="public\Banner.png"
        alt="Taekwondo"
        className="w-full h-[854px] object-cover"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-[#E4C000]">
        <h2 className="w-[612px] h-[108px] text-[73px] font-extrabold leading-normal font-inter ml-[1017px] mr-[202px]">
          QUIENES SOMOS
        </h2>
        <p className="flex flex-col items-center justify-center w-[644px] h-[331px] flex-shrink-0 text-justify text-black font-inter text-[24px] font-bold leading-[36px] mt-4 ml-[829px] mr-[61px]">
          Somos Jaguares Taekwondo, una escuela dedicada a impartir conocimientos y habilidades en el arte del Taekwondo. Nuestro enfoque está en la formación integral de nuestros alumnos, combinando el aprendizaje técnico con el desarrollo personal. Nos comprometemos a fomentar un ambiente seguro, respetuoso y motivador, donde cada estudiante pueda alcanzar su máximo potencial.
        </p>
      </div>
    </section>
  );
}

export default AboutSection;
