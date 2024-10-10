import React from 'react';

interface Objective {
  titulo: string;
  fecha: string;
  objetivoEspecifico: string;
}

const objectives: Objective[] = [
  {
    titulo: "Incrementar eficiencia operativa",
    fecha: "23/9/2000",
    objetivoEspecifico: "Introducción a la empresa en los alineamientos de ISO 9001:2015",
  },
  {
    titulo: "Mejorar satisfacción del cliente",
    fecha: "12/11/2021",
    objetivoEspecifico: "Implementación de un sistema de feedback post-venta",
  },
  {
    titulo: "Reducción de costos",
    fecha: "15/5/2022",
    objetivoEspecifico: "Optimización de los recursos para reducir el gasto energético",
  },
  {
    titulo: "Reducción de costos",
    fecha: "15/5/2022",
    objetivoEspecifico: "Optimización de los recursos para reducir el gasto energético",
  },
  {
    titulo: "Reducción de costos",
    fecha: "15/5/2022",
    objetivoEspecifico: "Optimización de los recursos para reducir el gasto energético",
  },
];

export default function ListObjectives() {
  return (
    <div className='mb-20'>
      {objectives.map((objective, index) => (
        <div key={index}>
          <div className="grid grid-cols-6 grid-rows-8 gap-1 text-[0.8rem] font-light p-5">
              <div className="col-span-6 md:col-span-2">
                <div className='mb-5 md:mb-0'>
                  <p className='mb-2'>Meta operativa</p>
                  <span className='text-gray-700 font-medium'>{objective.titulo}</span>
                </div>
              </div>

              <div className="col-span-6 md:col-span-2 ">
                <div className='mb-5 md:mb-0'>
                  <p className='mb-2'>Fecha de cierre</p>
                  <span className='text-gray-600'>{objective.fecha}</span>
                </div>
              </div>

              <div className="col-span-6 md:col-span-2 ">
                <div className='mb-5 md:mb-0'>
                  <p className='mb-2'>Objetivo específico</p>
                  <span className='text-gray-600'>{objective.objetivoEspecifico}</span>
                </div>
              </div>
          </div>
          <hr/>
        </div>
      ))}
    </div>
  );
}
