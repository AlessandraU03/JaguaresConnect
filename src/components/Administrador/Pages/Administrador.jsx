import PagosPendientes from "../organisms/PagosPendientes";
import HeaderAdmi from "../organisms/HeaderAdmi";
import SectionAsistencia from "../organisms/SectionAsistencia";

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
