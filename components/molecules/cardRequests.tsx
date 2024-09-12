import React from 'react'
import Image from 'next/image';
import Btn from '../atoms/btn'

interface ICardRequest{
    title:string;
    image: string;
}

export default function cardRequests(props:ICardRequest) {
  return (
    <div className='h-[175px] grid justify-items-center text-center p-5 rounded-md border-solid border-[1px] border-[#E0E2E5]'>
          <Image
           priority
           src={props.image}
            alt="icon"
            width={35}
            height={35}
            />
        <p className='mb-4 mt-4 text-sm'>{props.title}</p>
        <Btn label={'Solicitar'} size={'text-sm'} color={'border-solid border-[1px] border-[#E0E2E5]'} onClick={undefined}/>
    </div>
  )
}
