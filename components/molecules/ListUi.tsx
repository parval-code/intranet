import React from 'react';
import SearchInput from '../atoms/searchInput';
import Link from 'next/link';

interface IListUi {
  data: any;
}

export default function ListUi(props: IListUi) {
  if (!props.data || !Array.isArray(props.data)) {
    return null;
  }

  return (
    <>
        <SearchInput placeholder={"Buscar Reportes"}/>
         {props.data.map((item: any) => (
            <>
              <div className="mt-6 border-t border-gray-100">
                  <dl className="divide-y divide-gray-100">
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">{item.name}</dt>
                      <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      <span className="flex-grow">
                         {item.description}
                      </span>
                      <Link href={item.href}>
                      <span className="ml-4 flex-shrink-0">
                          <button type="button" className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500">
                              Ver reportes
                          </button>
                      </span>
                      </Link>
                      </dd>
                  </div>
                  </dl>
              </div>
            </>
           ))}
    </>
  )
}
