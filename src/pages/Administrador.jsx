import PagosPendientes from "../components/organisms/PagosPendientes";
import PagosPendientesCard from "../components/organisms/PagosPendientes";
import HeaderAdmi from "../components/organisms/HeaderAdmi";
import EventSection from "../components/organisms/SectionEventos";

function Administrador() {
  return (
    <>
    <HeaderAdmi/>
    <div className="min-h-screen bg-gray-100">
      <main className="p-8 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
        <PagosPendientes/>
        <EventSection />
      </main>
    </div>
    </>
    
  );
}

export default Administrador;
