import React from 'react';
import InfoCard from "../molecules/InfoCard";

function MissionVisionSection() {
  return (
    <section className="flex flex-col md:flex-row justify-between items-center pt-[50px] md:pt-[101px] px-[10px] md:px-[137px] pr-[10px] md:pr-[127px]">
      <div className="flex flex-col space-y-8">
        <InfoCard title="MISIÓN" text="Fortalecer el físico y carácter de nuestros alumnos. Fomentamos un ambiente positivo donde se valoren el respeto, la autodisciplina y el espíritu deportivo." />
        <InfoCard title="VISIÓN" text="Transformar vidas a través del Taekwondo, estableciendo una escuela líder en innovación educativa y formación de individuos resilientes." />
      </div>
      <div className="flex-shrink-0 w-full max-w-[558px] mt-4 md:mt-0">
        <img src="public/Images/Alumno.png" alt="Misión y Visión" className="w-full h-auto max-h-[400px] md:max-h-screen object-cover" />
      </div>
    </section>
  );
}

export default MissionVisionSection;
