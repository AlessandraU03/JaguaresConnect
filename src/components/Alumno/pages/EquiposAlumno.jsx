// src/components/pages/EquiposAlumnos.js
import React from 'react';
import HeaderAlumnos from '../organisms/HeaderAlumnos';
import SectionEquiposA from '../organisms/SectionEquiposAlumno';

function EquiposAlumno() {
  return (
    <>
      <HeaderAlumnos />
      <div className="min-h-screen p-10 bg-gray-100 flex items-center justify-center">
        <main className="p-4 w-full max-w-10xl">
          <SectionEquiposA />
        </main>
      </div>
    </>
  );
}

export default EquiposAlumno;
