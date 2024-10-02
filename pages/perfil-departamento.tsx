import React from 'react'

export default function perfilDepartamento() {
  return (
    <div className='p-5'>
        <div className="grid grid-cols-8 grid-rows-5 gap-4">

            {/* Info person */}
            <div className="col-span-2 row-span-5">
            <span className="relative inline-block">
            <img
            alt=""
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            className="h-28 w-28 rounded-full"
            />
             <span className="absolute left-[5.6rem] top-3 block h-9 w-9 rounded-full bg-gray-300 ring-4 ring-white" /></span>

            </div>

            {/* graphic */}
            <div className="col-span-6 row-span-5 col-start-3">
                11
            </div>
        </div>
    </div>
  )
}
