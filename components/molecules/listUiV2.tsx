import React from 'react'

export default function listUiV2() {
  return (
    <div className='text-[13px] my-8'>
       <p className='mb-4'>Objetivo 1</p>
       <div className='grid  grid:cols-1 md:grid-cols-9 gap-10'>

            <div className='md:col-span-8 lg:col-span-2 col-span-8 '>
                {/* title Titúlo del objetivo */}
                <p className='font-light'>Titúlo del objetivo</p>
                <span className='text-gray-600'>Meta operativa</span>
            </div>

            <div className='md:col-span-8 lg:col-span-2 col-span-8 '>
                {/* title Fecha de cierre*/}
                <p className='font-light'>Fecha de cierre</p>
                <span className='text-gray-600'>Julio 2024</span>
            </div>

            <div className='md:col-span-8 lg:col-span-3 col-span-8 '>
                {/* title Objetivo especifico*/}
                <p className='font-light'>Objetivo especifico</p>
                <span className='text-gray-600'>
                    Introducción a la empresa en los alineamientos de ISO 900.1:2015
                </span>
            </div>

            <div className='md:col-span-8 lg:col-span-2 col-span-8 '>
                <p>icon</p>
            </div>
       </div>
       <p className='mb-4'>bar progress</p>
       <hr/>
    </div>
  )
}
