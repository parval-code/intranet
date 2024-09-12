import React, { ReactNode, useEffect } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const ModalFullComponent: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'; // Evita que el fondo de la página se desplace cuando el modal está abierto
        } else {
            document.body.style.overflow = 'unset'; // Restaura el comportamiento de desplazamiento normal
        }

        return () => {
            document.body.style.overflow = 'unset'; // Asegura que el comportamiento de desplazamiento se restablezca cuando el componente se desmonta
        };
    }, [isOpen]);

    return (
        <div
            className={`fixed inset-0 flex items-end justify-center z-50 ${
                isOpen ? 'block' : 'hidden'
            }`}
        >
            <div
                className="fixed inset-0 bg-black opacity-50"
                onClick={onClose}
            />
            <div className="bg-white rounded-lg p-1 z-50 w-full h-full max-w-full max-h-full overflow-auto">
                <div className={'flex justify-end'}>
                    <button
                        className="hover:bg-gray-100 flex py-1 px-5 rounded"
                        onClick={onClose}
                    >
                        X
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
};

export default ModalFullComponent;
