import HeaderAdmi from "../components/organisms/HeaderAdmi";
import EventSection from "../components/organisms/SectionEventos";

function Administrador() {
  return (
    <>
    <HeaderAdmi/>
    <div className="min-h-screen bg-gray-100">
      <main className="p-8 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
        <div></div>
        <EventSection />
      </main>
    </div>
    </>
    
  );
}

export default Administrador;
