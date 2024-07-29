import HeaderAlumnos from "../organisms/HeaderAlumnos";
import SectionAnuncios from "../organisms/SectionAnunciosAlumno";

function HomeAlumnos() {
  return (
    <>
      <HeaderAlumnos />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <main className="p-4 w-full ">
          <SectionAnuncios />
        </main>
      </div>
    </>
  ); 
}

export default HomeAlumnos;
