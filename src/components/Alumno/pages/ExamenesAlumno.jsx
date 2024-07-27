import SectionExamenAlumno from '../organisms/SectionExamenAlumno';
import HeaderAlumnos from '../organisms/HeaderAlumnos';

function ExamenesAlumno() {

  return (
    <>
    <HeaderAlumnos/>
    <div className="p-4">
      <main className="flex justify-between items-center py-4">
      <SectionExamenAlumno/>

      </main>
    </div>
    </>
  );
}

export default ExamenesAlumno;
