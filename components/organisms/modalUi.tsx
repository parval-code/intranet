import React, { ReactNode } from 'react';
import Btn from '../atoms/btn';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const ModalUi: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-black bg-opacity-50">
      <div className="relative w-auto max-w-3xl mx-auto my-6">
        {/* Contenido del Modal */}
        <div className="relative overflow-scroll h-auto md:h-[750px] lg:h-[450px] 2xl:h-[550px] flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
          {/* Cerrar el Modal */}
          {/* <button
            className="absolute top-0 right-0 p-2 mt-2 mr-2 text-sm font-semibold text-gray-500 transition duration-300 ease-in-out hover:text-gray-800 focus:outline-none"
            onClick={onClose}
          >
            cerrar
          </button> */}
          {/* Contenido del Modal */}
          <div className="relative p-6 flex-auto">
            {children}
            {/* Botón para cerrar el modal dentro del contenido */}
            <div className='absolute bottom-[38px] right-[26px] flex content-center '>
            <button
              className="text-gray-600 text-[13px]  px-4 py-2 rounded-md"
              onClick={onClose}
            >
              Cerrar Modal
            </button>
            <Btn label={'Guardar'} onClick={undefined} classAdditional={'p-[8px]'} size={'h-[36px] w-[90px]'} color={'bg-parvalColor'}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalUi;
