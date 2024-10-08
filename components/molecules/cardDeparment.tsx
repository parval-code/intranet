import React from 'react';
import PersonGroup from '../atoms/personGroup';
import ProgresBar from '../atoms/progresBar';
import Link from 'next/link'; // Importa Link de Next.js

interface CardDeparmentProps {
  department: string;
  direction: string;
  imageUrls: string[];
  progressValue: number;
  src: string; 
}

const CardDeparment: React.FC<CardDeparmentProps> = ({
  department,
  direction,
  imageUrls,
  progressValue,
  src, // Recibimos el prop src
}) => {
  return (
    <Link href={src}> {/* Usamos Link para redirigir */}
      <div className="text-[0.9rem] font-light rounded-lg w-full md:w-full lg:w-60 p-4 border-solid border-[1px] border-[#E0E2E5] hover:bg-gray-100 cursor-pointer">
        {/* Departamento */}
        <div className="mb-2">
          <p className="text-gray-500 text-[0.8rem] font-semibold">Departamento</p>
          <p>{department}</p>
        </div>
        
        {/* Dirección */}
        <div className="mb-6">
          <p className="text-gray-500 text-[0.8rem] font-semibold">Dirección</p>
          <p>{direction}</p>
        </div>

        {/* Imagenes */}
        <div className='mb-2'>
          <div className="isolate flex-space-x-2 overflow-hidden">
            <PersonGroup imageUrls={imageUrls} />
          </div>
        </div>
        
        {/* ProgressBar */}
          <div>
            <ProgresBar progressValue={progressValue} />
            {/* porcentaje dinámico */}
            <p className='text-[0.9rem] font-light text-gray-600 mt-3'>{progressValue}%</p>
        </div>
      </div>
    </Link>
  );
};

export default CardDeparment;
