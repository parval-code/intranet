import React from 'react'

interface IBtn {
  label: string;
  onClick?: any;
  size: number | string;
  color: string;
  classAdditional?: string;
  disabled?: boolean;
}


export default function Btn(props: IBtn) {
  return (
    <>
      <button
        onClick={props.onClick}
        disabled={props.disabled}
        className={`
        ${props.size} rounded ${props.classAdditional} ${props.color} px-5 py-2 text-[14px] font-normal text-slate-700  hover:bg-yellow-500       
        `}>
        {props.label}
      </button>
    </>
  )
}
