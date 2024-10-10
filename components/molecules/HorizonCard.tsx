import React from 'react';
import ProgresBar from '../atoms/ProgresBar';

interface HorizonCardProps {
  name: string;
  id: string;
  cargo: string;
  departamento: string;
  progreso: number;
  imageUrl: string; // Nuevo prop para la imagen
}

const HorizonCard: React.FC<HorizonCardProps> = ({ name, id, cargo, departamento, progreso, imageUrl }) => {
  return (
    <div className='my-5 leading-7 p-4 block md:flex items-center content-center justify-between rounded border-solid border-[1px] border-[#E0E2E5]'>
      <div>
        <div className="flex items-center">
          <div>
            <img
              alt=""
              src={imageUrl} // Utiliza el prop imageUrl
              className="inline-block h-9 w-9 rounded-full"
            />
          </div>
          {/* name and ID */}
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{name}</p>
            <p className="text-[0.8rem]  text-gray-500 group-hover:text-gray-700">#{id}</p>
          </div>
        </div>
      </div>
      {/* Cargo */}
      <div>
        <p className='text-[0.9rem] text-[#1D293C] font-light'>{cargo}</p>
      </div>
      {/* Departamento */}
      <div>
        <p className='text-[0.9rem] text-[#1D293C] font-light'>{departamento}</p>
      </div>
      {/* Progreso */}
      <div className='w-[200px]'>
        <ProgresBar progressValue={progreso} />
      </div>
    </div>
  );
};

export default HorizonCard;
