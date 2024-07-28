import PagosPendientes from "../components/organisms/PagosPendientes";
import HeaderAdmi from "../components/organisms/HeaderAdmi";
import SectionAsistencia from "../components/organisms/SectionAsistencia";

function Administrador() {
  return (
    <>
    <HeaderAdmi/>
    <div className="min-h-screen bg-gray-100">
      <main className="p-8 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
        <PagosPendientes/>
        <SectionAsistencia/>
      </main>
    </div>
    </>
    
  );
}

export default Administrador;
