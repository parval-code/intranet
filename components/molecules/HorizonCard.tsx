import React from 'react'

export default function HorizonCard() {
  return (
    <div className='p-5 flex items-center content-center justify-between rounded border-solid border-[1px] border-[#E0E2E5]'>
       <div>
       <div className="flex items-center">
        <div>
          <img
            alt=""
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            className="inline-block h-9 w-9 rounded-full"
          />
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Judith Vargas</p>
          <p className="text-[0.8rem]  text-gray-500 group-hover:text-gray-700">#909390</p>
        </div>
      </div>
       </div>
       <div>2</div>
       <div>3</div>
       <div>4</div>
    </div>
  )
}
