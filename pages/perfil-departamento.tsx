import Btn from '@/components/atoms/btn';
import PersonGroup from '@/components/atoms/personGroup';
import CircularChart from '@/components/molecules/circular-chart-Props';
import ListUiV2 from '@/components/molecules/listUiV2';
import Link from 'next/link';
import React from 'react';

export default function perfilDepartamento() {

    // Equipo
  const imageUrls = [
    'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80',
  ];

    // Lista de objetivos
  const objetivos = [
    {
      objetivoTitle: "Objetivo 1",
      metaOperativa: "Meta operativa 1",
      fechaCierre: "Julio 2024",
      objetivoEspecifico: "Introducción a la empresa en los alineamientos de ISO 900.1:2015",
      progressValue: 10,
    },
    {
      objetivoTitle: "Objetivo 2",
      metaOperativa: "Meta operativa 2",
      fechaCierre: "Agosto 2024",
      objetivoEspecifico: "Implementación de nuevas estrategias",
      progressValue: 50,
    },
    {
      objetivoTitle: "Objetivo 3",
      metaOperativa: "Meta operativa 3",
      fechaCierre: "Septiembre 2024",
      objetivoEspecifico: "Revisión de procesos internos",
      progressValue: 30,
    },
    {
        objetivoTitle: "Objetivo 3",
        metaOperativa: "Meta operativa 3",
        fechaCierre: "Septiembre 2024",
        objetivoEspecifico: "Revisión de procesos internos",
        progressValue: 30,
      },
  ];

  return (
    <div className='p-10'>
      <div className="grid md:grid-cols-8 grid-rows-5 gap-10 h-10">
        {/* Col Info person */}
        <div className="md:col-span-8 lg:col-span-2 col-span-8">
          <p className='text-xl mb-10'>Dirección de Riesgos</p>

          {/* Box picture profile and people */}
          <div>
            <span className="relative inline-block">
              <img
                alt=""
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                className="h-28 w-28 rounded-full"
              />
            </span>

            <div className='mt-3'>
              <p className='text-gray-500 font-light text-[0.9rem]'>Directora</p>
              <p className='text-[1rem] font-medium'>Nicole Gual</p>
            </div>
          </div>

          {/* Team */}
          <div className='mt-14'>
            <p className='text-gray-800 font-medium mb-2'>Equipo</p>
            <PersonGroup imageUrls={imageUrls} />
          </div>

          {/* Btn group actions */}
          <div className='mt-10'>
            <div className='mb-4'>
              <Btn label={'CALIFICACIÓN PEERS'} size={'w-full'} color={'bg-parvalColor'} />
            </div>

            <Link href="/rrhh/score-balance-rrhh">
              <Btn label={'Volver atras'} size={'w-full'} color={'border-solid border-[1px] border-gray-300'} />
            </Link>
          </div>
        </div>

        {/* Col charts and listing */}
        <div className="md:col-span-8 lg:col-span-6 col-span-8 col-start-0">
          {/* Components charts */}
          <div className='block md:flex gap-2 2xl:flex-row-reverse mb-4'>
            <CircularChart progress={50} size={70} strokeWidth={10} label="Meta Financiera" />
            <br />
            <CircularChart progress={50} size={70} strokeWidth={10} label="Meta Financiera" />
            <br />
            <CircularChart progress={50} size={70} strokeWidth={10} label="Meta Financiera" />
          </div>

          {/* Listing */}
          <div className='overflow-scroll h-[560px] 2xl:h-[900px]'>
            {objetivos.map((objeto, index) => (
              <ListUiV2
                key={index} // Usar un key único
                objetivoTitle={objeto.objetivoTitle}
                metaOperativa={objeto.metaOperativa}
                fechaCierre={objeto.fechaCierre}
                objetivoEspecifico={objeto.objetivoEspecifico}
                progressValue={objeto.progressValue}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
