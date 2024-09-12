import React from 'react'
import Btn from '../atoms/btn';
import Image from 'next/image';


interface ICardNews{
    title:string;
    description:string;
    url: string;
}

export default function Cardnews(props:ICardNews) {
  return (
    <>
      <div className='border-solid border-[1px] border-[#D0D4D8] rounded-md p-4'>
        <div>
          <Image
              src={props.url}
              className={"aspect-[14/13] w-full rounded object-contain"}
              alt={"logo de parval"}
              width={1024}
              height={1024}
              priority
            />
        </div>
        <div>
         <h5 style={{
          overflowX: 'hidden',
          overflowY: 'hidden',
         }} className='font-semibold mb-2 h-10 overflow-y-scroll  text-[15px] text-[#192134]'>{props.title}</h5>
        </div>
        <div>
          <p style={{
          overflowX: 'hidden',
          overflowY: 'hidden',
         }}  className='text-[12px] h-10 overflow-y-scroll leading-4 font-light text-gray-400 mb-4'>
            {props.description}
          </p>
        </div>
        <div>
          <Btn label={'Leer'} onClick={undefined} size={'w-full text-[12px]'} color={'border-solid border-[1px] border-[#D0D4D8]'}/>
        </div>
      </div>
    </>
  )
}



