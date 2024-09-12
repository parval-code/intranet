import React, { ReactNode } from 'react';
import Btn from '../atoms/btn';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const ModalUserPermis: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-black bg-opacity-50">
      <div className="relative w-auto max-w-3xl mx-auto my-6">
        {/* Contenido del Modal */}
        <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
          <div className="overflow-y-scroll h-[600px] relative p-6 flex-auto">
            {children}
          </div>

            {/* Botón para cerrar el modal dentro del contenido */}
            <div className='p-5 flex content-center justify-between'>
            <button
              className="text-gray-600 text-[13px]  px-4 py-2 rounded-md"
              onClick={onClose}
            >
              Cerrar
            </button>
            {/* <Btn label={'Asignar'} onClick={undefined} size={'h-[36px] w-[90px]'} color={'bg-parvalColor'}/> */}
            </div>
        </div>
      </div>
    </div>
  );
};

export default ModalUserPermis;
