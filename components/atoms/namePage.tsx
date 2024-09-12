import React from 'react'
import Link from 'next/link';



interface INamePage {
    title:string;
    backPage:string;
    backIcon:any;
    icon:any;
}

export default function NamePage(props:INamePage) {
  return (
    <div className='flex items-center justify-between'>
      <div className='flex items-center text-yellow-500 '>
      {props.icon}
      <p className=' text-slate-800 font-medium text-lg'>{props.title}</p>
      </div>

      {/* Text back page */}
      <Link href="/reportes">
        <div className='flex items-center cursor-pointer hover:text-parvalColor'>
          {props.backIcon}
          <p className='text-slate-800 hover:text-parvalColor'>{props.backPage}</p>
        </div>
      </Link>
    </div>
  )
}
