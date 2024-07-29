import SectionExamenAlumno from '../organisms/SectionExamenAlumno';
import HeaderAlumnos from '../organisms/HeaderAlumnos';

function ExamenesAlumno() {

  return (
    <>
    <HeaderAlumnos/>
    <div className="min-h-screen p-10 bg-gray-100 flex items-center justify-center">
      <main className="p-4 w-full max-w-6xl">
      <SectionExamenAlumno/>

      </main>
    </div>
    </>
  );
}

export default ExamenesAlumno;
