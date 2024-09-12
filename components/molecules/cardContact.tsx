import React from 'react'
import { InformationCircleIcon } from '@heroicons/react/20/solid';



interface Icontact{
    telefono:string;
    correo:string;
    pais:string;
    ciudad:string;
}
  
export default function cardContact(props:Icontact) {
  return (
    <div className='divide-y w-auto md:w-[400px] xl:w-[550px] mb-10 divide-gray-200 rounded-lg bg-white shadow p-5 text-gray-600'>
        <div className='flex mb-3'>
          <InformationCircleIcon className="w-6 h-6 mr-2" />
          <p>Contactos</p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2'>
            <div className=' mt-6 font-light text-gray-800 leading-2'>
              <p className='font-medium'>Telefono</p>
             <span>{props.telefono}</span>
            </div>
            <div className=' mt-6 font-light text-gray-800 leading-2'>
              <p className='font-medium'>Correo</p>
              <span>{props.correo}</span>
            </div>
            <div className=' mt-6 font-light text-gray-800 leading-2'>
              <p className='font-medium'>Pais</p>
              <span>{props.pais}</span>
            </div>
            <div className=' mt-6 font-light text-gray-800 leading-2'>
              <p className='font-medium'>Ciudad</p>
              <span>{props.ciudad}</span>
            </div>
        </div>
    </div>
  )
}
