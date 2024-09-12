import React from 'react'
import { BriefcaseIcon } from '@heroicons/react/20/solid';


interface Iposition{
  title:string;
  description:string;
}

export default function cardPosition(props:Iposition) {
  return (
    <div className='w-auto md:w-[400px] xl:w-[550px] divide-y divide-gray-200 rounded-lg bg-white shadow p-5 text-gray-600'>
        <div className='flex mb-3'>
          <BriefcaseIcon className="w-6 h-6 mr-2" />
          <p>Cargo en la empresa</p>
        </div>  

        <div>
            <div className=' mt-6 font-light text-gray-800 leading-8'>
              <p className='font-medium'>{props.title}</p>
              <p>{props.description}</p>
            </div>
        </div>
    </div>
  )
}
