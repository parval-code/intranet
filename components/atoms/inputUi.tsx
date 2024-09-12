import React from 'react'

interface InInput {
    label?:string;
    placeholder?:string;
    type: string;
    name: string;
    additionalClass?: string;
    onChange: any;
    defaultValue?: any;
    disabled?: boolean;
}


export default function InputComponent(props:InInput) {
  return (
    <>
      <div className="rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-parvalColor">
        <label htmlFor="name" className="block text-[14px] font-xs  text-gray-900">
          {props.label}
        </label>
        <input
          type={props.type}
          disabled={props.disabled}
          value={props.defaultValue}
          onChange={props.onChange}
          name={props.name}
          className={`block font-light w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6`}
          placeholder={props.placeholder}
        />
      </div>
    </>
  )
}
