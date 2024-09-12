// components/UpdateFile.tsx

import React, { useState } from 'react';
import { CloudArrowUpIcon } from '@heroicons/react/20/solid';
import Btn from './btn';

const UpdateFile: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
  };

  return (
   
    <div className="bg-[#f3ba0e1a] p-8 rounded">
       <div className='flex justify-center'><CloudArrowUpIcon className="w-12 h-12 text-slate-700 mb-6" /></div>
        <label className="hover:bg-parvalColor  hover:border-none cursor-pointer border-dotted border-2 border-slate-400 text-sm font-medium text-slate-700 py-2 px-4 rounded">
          Seleccionar Archivo
        <input
            type="file"
            accept={".pdf, .xml"}
            onChange={handleFileChange}
            className="hidden"
        />
        </label>
        {selectedFile && (
        <div className="mt-4">
            <p className="text-green-600">Archivo seleccionado:</p>
            <p className="text-blue-500 font-semibold">{selectedFile.name}</p>
            <Btn label={'Enviar'} onClick={undefined} size={'w-60 mt-5'} color={'bg-parvalColor text-gray-400 font-base'}/>
        </div>
        )}
  </div>

  );
};

export default UpdateFile;
