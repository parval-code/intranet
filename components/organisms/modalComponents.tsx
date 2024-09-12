import React, { useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/20/solid';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: any;
}

const ModalComponents: React.FC<ModalProps> = (props: ModalProps) => {
    useEffect(() => {
        if (props.isOpen) {
            document.body.style.overflow = 'hidden'; // Evita que el fondo de la página se desplace cuando el modal está abierto
        } else {
            document.body.style.overflow = 'unset'; // Restaura el comportamiento de desplazamiento normal
        }

        return () => {
            document.body.style.overflow = 'unset'; // Asegura que el comportamiento de desplazamiento se restablezca cuando el componente se desmonta
        };
    }, [props.isOpen]);

    return (
        <>
            <div className={`fixed inset-0 flex p-2 items-start justify-center z-50 ${
                props.isOpen ? 'block' : 'hidden'
            }`}>
                <div className="fixed inset-0 bg-black opacity-50" onClick={props.onClose}/>
                    <div className="bg-white rounded-lg p-1 z-50 overflow-auto">
                        <div className={'flex justify-end pb-4'}>
                            <button
                                className="hover:bg-gray-100 flex py-1 px-1 rounded"
                                onClick={props.onClose}
                            >
                                <XMarkIcon className="w-7 h-7 text-slate-700" />
                            </button>
                        </div>
                        {props.children}
                    </div>
            </div>
        </>
    );
};

export default ModalComponents;
