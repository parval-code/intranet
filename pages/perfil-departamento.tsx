import Btn from '@/components/atoms/btn';
import PersonGroup from '@/components/atoms/personGroup';
import CircularChart from '@/components/molecules/circular-chart-Props';
import ListUiV2 from '@/components/molecules/listUiV2';
import Link from 'next/link';
import React, { useState } from 'react';

export default function perfilDepartamento() {
  const [showCalifica, setShowCalifica] = useState(false); // Estado para controlar la visualización
  const [buttonLabel, setButtonLabel] = useState('CALIFICACIÓN PEERS'); // Estado para el texto del botón

  // Equipo
  const imageUrls = [
    'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80',
  ];

  // Datos de calificación Peers
  const peers = [
    {
      name: 'Tom Cook',
      id: '#09090',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      position: 'Sub gerente de calidad y proceso',
    },
    {
      name: 'Anna Roberts',
      id: '#09123',
      photo: 'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      position: 'Gerente de innovación',
    },
    {
      name: 'Mark Green',
      id: '#09234',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80',
      position: 'Líder de proyectos',
    },
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
  ];

  // Función para manejar el clic en el botón
  const handleCalificacionClick = () => {
    if (showCalifica) {
      setShowCalifica(false); // Volver a mostrar la lista de objetivos
      setButtonLabel('Calificación Peers'); // Cambiar el texto del botón de vuelta
    } else {
      setShowCalifica(true); // Mostrar "Califica tu team"
      setButtonLabel('Lista de Objetivos'); // Cambiar el texto del botón
    }
  };

  return (
    <div className='p-10'>
      <div className="grid md:grid-cols-8 gap-10 lg:h-10 h-auto">
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
              <Btn 
                label={buttonLabel}
                onClick={handleCalificacionClick}
                size={'w-full'} 
                color={'bg-parvalColor'} 
              />
            </div>
            <Link href="/rrhh/score-balance-rrhh">
              <Btn label={'Volver atras'} size={'w-full'} color={'border-solid border-[1px] border-gray-300'} />
            </Link>
          </div>
        </div>

        {/* Col charts and listing */}
        <div className="md:col-span-8 lg:col-span-6 col-span-8 col-start-0">

          {/* Components charts */}
          <div className='block md:flex gap-2 2xl:flex-row-reverse mb-3'>
            <CircularChart progress={50} size={70} strokeWidth={10} label="Meta Financiera" />
            <CircularChart progress={50} size={70} strokeWidth={10} label="Meta Financiera" />
            <CircularChart progress={50} size={70} strokeWidth={10} label="Meta Financiera" />
          </div>

          {/* Conditional rendering */}
          {showCalifica ? (
            <div>
              <div className='text-[0.9rem] leading-6 my-8'>
                <p className='font-semibold'>Califica tu equipo</p>
                <p className='text-[0.8rem] text-gray-500'>Selecciona la persona de tu equipo que quieres calificar y asignadle un número</p>
              </div>

              {/* Calificacion peers */}
              {peers.map((peer, index) => (
                <div key={index} className='block md:flex items-center content-center justify-between p-4 border-solid border-[1px] rounded-md border-[#E0E2E5] mb-4'>
                  {/* name,photo and ID */}
                  <div className="flex items-center">
                    <div>
                      <img
                        alt={peer.name}
                        src={peer.photo}
                        className="inline-block h-9 w-9 rounded-full"
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{peer.name}</p>
                      <p className="text-sm text-gray-500 group-hover:text-gray-700">{peer.id}</p>
                    </div>
                  </div>

                  {/* Cargo */}
                  <div>
                    <p className='text-sm'>{peer.position}</p>
                  </div>

                  {/* Calificación */}
                  <div>
                    <select
                      id="calificacion"
                      name="calificacion"
                      defaultValue="Calificacion Peers"
                      className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-parvalColor sm:text-sm sm:leading-6"
                    >
                      <option>Calificacion Peers</option>
                      <option>2</option>
                      <option>3</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className='overflow-scroll h-[560px] 2xl:h-[900px]'>
              {objetivos.map((objeto, index) => (
                <ListUiV2
                  key={index} 
                  objetivoTitle={objeto.objetivoTitle}
                  metaOperativa={objeto.metaOperativa}
                  fechaCierre={objeto.fechaCierre}
                  objetivoEspecifico={objeto.objetivoEspecifico}
                  progressValue={objeto.progressValue}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
