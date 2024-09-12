import React from 'react'
import Image from 'next/image';
import Styles from '../../styles/bannerStyle.module.scss';

export default function banner() {
  return (
    <div className={`bg-gradient-to-r from-cyan-500 to-blue-500 p-2 rounded-lg ${Styles['bannerStyle']}`}>
        <div className='flex justify-between'>
            <div className='p-4'>
                <h1 className='text-[#503E0A] text-[22px]	font-bold'>SOMOS PARVAL</h1>
                {/* <div className='bg-[#C99F1F] p-3 cursor-pointer rounded-md mt-3 text-center w-28 text-sm'>Leer mas...</div> */}
            </div>
            {/* Img style */}
            <div>
                {/* <Image
                    priority
                    src={'/peopple.png'}
                    alt={"logo de parval"}
                    className={Styles.svgPeopple}
                    width={293}
                    height={293}
                    /> */}
            </div>
        </div>          
    </div>
  )
}


