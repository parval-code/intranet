import React from 'react'
import { MagnifyingGlassIcon  } from '@heroicons/react/20/solid';

interface ISearchInput {
    placeholder: string;
    value?: any;
    name?: string;
    type?: string;
    onChange?: any;
}

export default function SearchInput(props: ISearchInput) {
  return (
    <>
     <div className='p-1 shadow-md rounded'>
        <div className="relative flex flex-1 p-1">
              <label htmlFor="search-field" className="sr-only">
                Search
              </label>
              <MagnifyingGlassIcon
                className="pointer-events-none absolute inset-y-0 left-0 h-full w-6 text-gray-400"
                aria-hidden="true"
              />
              <input
                className="block h-full w-full border-0 py-4 pl-10 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                placeholder={props.placeholder}
                type={props.type}
                onChange={props.onChange}
                name={props.name}
              />
          </div>
      </div>
    </>
  )
}
