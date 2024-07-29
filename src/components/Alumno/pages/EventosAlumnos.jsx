import React from 'react';
import HeaderAlumnos from '../organisms/HeaderAlumnos';
import SectionEventosAlumno from '../organisms/SectionEventosAlumno';

function EventosAlumnos() {
  return (
    <>
      <HeaderAlumnos />
      <div className="min-h-screen p-10 bg-gray-100 flex items-center justify-center">
        <main className="p-4 w-full max-w-6xl">
          <SectionEventosAlumno />
        </main>
      </div>
    </>
  );
}

export default EventosAlumnos;