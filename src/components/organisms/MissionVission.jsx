import React from 'react'

function MissionVision() {
  return (
    <section className="flex p-6">
      <div className="w-1/2 pr-4">
        <h3 className="bg-yellow-400 text-black font-bold px-4 py-2 mb-2">MISIÓN</h3>
        <p className="text-sm">
          Fortalecer el físico y carácter de nuestros alumnos. Fomentamos un ambiente positivo donde se valoren el respeto, la autodisciplina y el espíritu deportivo.
        </p>
      </div>
      <div className="w-1/2 pl-4">
        <h3 className="bg-yellow-400 text-black font-bold px-4 py-2 mb-2">VISIÓN</h3>
        <p className="text-sm">
          Transformar vidas a través del Taekwondo, estableciendo una escuela líder en innovación educativa y formación de individuos resilientes.
        </p>
      </div>
    </section>
  )
}

export default MissionVision;