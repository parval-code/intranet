import React from 'react';
import Image from 'next/image';


interface INewsCard{
    title:string;
    description:string;
    date:string;
    imageUrl: string;
}

export default function cardNewHorizon(props:INewsCard) {
  return (
    <div>
      <div className='mb-5 block gap-5 xl:flex md:flex items-center w-auto p-4'>
        <Image
            priority
            src={props.imageUrl} 
            alt={"logo de parval"}
            className="rounded mb-4 md:mb-0 w-32 h-32 aspect-video bg-gray-50 object-contain"
            width={240}
            height={240}
            />
        <div>
            <h5 className='w-auto xl:max-w-[300px] font-medium mb-2 text-[14px] text-[#192134]'>{props.title}</h5>
            <div className='w-auto xl:max-w-[300px]'>
                <p className='overflow-hidden overflow-ellipsis  text-[11px] text-gray-400 leading-6 font-light '>
                    {props.description}
                </p>
            </div>
            <p className='text-[11px] leading-6 font-light'>
                {props.date}
            </p>
        </div>
    </div>
    </div>
  )
}
