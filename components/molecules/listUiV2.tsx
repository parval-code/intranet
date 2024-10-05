import React, { useState } from 'react';
import ProgresBar from '../atoms/progresBar';
import { EyeIcon } from '@heroicons/react/20/solid';
import ModalUi from '../organisms/modalUi';

interface ListUiV2Props {
  objetivoTitle: string;
  metaOperativa: string;
  fechaCierre: string;
  objetivoEspecifico: string;
  progressValue: number;
}

export default function ListUiV2({
  objetivoTitle,
  metaOperativa,
  fechaCierre,
  objetivoEspecifico,
  progressValue,
}: ListUiV2Props) {
  // Estado para manejar la apertura/cierre del modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Función para abrir y cerrar el modal
  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="text-[13px] my-8">
      <p className="mb-4">{objetivoTitle}</p>
      <div className="grid grid-cols-1 md:grid-cols-9 gap-10">
        
        {/* Título del objetivo */}
        <div className="md:col-span-8 lg:col-span-2 col-span-8">
          <p className="font-light">Título del objetivo</p>
          <span className="text-gray-600">{metaOperativa}</span>
        </div>

        {/* Fecha de cierre */}
        <div className="md:col-span-8 lg:col-span-2 col-span-8">
          <p className="font-light">Fecha de cierre</p>
          <span className="text-gray-600">{fechaCierre}</span>
        </div>

        {/* Objetivo específico */}
        <div className="md:col-span-8 lg:col-span-3 col-span-8">
          <p className="font-light">Objetivo específico</p>
          <div className="text-gray-600 w-50 overflow-hidden md:whitespace-nowrap whitespace-normal text-ellipsis">
            {objetivoEspecifico}
          </div>
        </div>

        {/* Icono Ver más */}
        <div className="md:col-span-8 lg:col-span-2 col-span-8">
          <div className="float-right">
            <div
              className="w-12 h-12 flex items-center justify-center rounded-full hover:cursor-pointer hover:bg-gray-100 transition-colors duration-300"
              onClick={handleModalToggle} // Agrega el evento de clic para abrir el modal
            >
              <EyeIcon className="w-6 h-6 text-gray-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Barra de progreso */}
      <p className="mb-4 mt-5">
        <ProgresBar progressValue={progressValue} />
      </p>
      <hr />

      {/* Modal que se abrirá al hacer clic en el icono */}
      <ModalUi isOpen={isModalOpen} onClose={handleModalToggle}>
        {/* Contenido del Modal */}
        <div className='text-[0.9rem] font-light'>
            <p className="text-lg mb-5 font-semibold">Detalles del objetivo</p>

            <div className="mt-3">
              <p className='font-normal'>Meta operativa:</p>
              <p> {metaOperativa}</p>
            </div>
            <div>
            <div className="mt-7">
              <p className='font-normal'>Fecha de cierre:</p>
              <p>{fechaCierre}</p>
            </div>
            </div>
        
            <div>
             <div className="mt-7">
              <p className='font-normal'>Objetivo específico:</p>
              <p>{objetivoEspecifico}</p>
             </div>

            </div>
        </div>
      </ModalUi>
    </div>
  );
}
