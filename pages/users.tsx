import React, { useEffect, useState } from 'react';
import { useNotification } from '@/hooks/Notifications';
import { useAuthLogin } from "@/hooks/AuthLogin";
import { useStoreAuthLogin } from '@/hooks/AuthLogin/StoreProvider';
import { EyeIcon } from '@heroicons/react/24/outline';

export default function UsersComponents() {
const { showNotification } = useNotification();
const { getAuthLogin } = useAuthLogin();

useEffect(() => {
  async function fetchData() {
    await Promise.all([
      getAuthLogin(),
    ]);
  }
  fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

const { authLogin } = useStoreAuthLogin();
const [ loading, setLoading ] = useState(false);
const [listUsersFilter, setListUsersFilter] = useState([]);


return (
  <>
    <div className={'p-2 pt-5'}>
        <div className={"px-4 sm:px-6 lg:px-8"}>
            <div className={"sm:flex sm:items-center"}>
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900"> Usuarios </h1>
                    <p className="mt-2 text-sm text-gray-700"> Buscar en el listado de Usuarios. </p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <input 
                        type={"email"}
                        name={"email"} 
                        className={"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"} 
                        placeholder="Buscar" />
                </div>
            </div>
            <div className={"mt-8 flow-root"}>
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <table className="min-w-full divide-y divide-gray-300">
                        <thead>
                            <tr>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"> NOMBRE </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"> RIF </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"> Estado </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"> TELEFONO </th>
                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0" />
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            <tr>
                            <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                                <div className="flex items-center">
                                    <div className="ml-4">
                                        <div className="font-medium text-gray-900">Lindsay Walton</div>
                                        <div className="mt-1 text-gray-500">lindsay.walton@example.com</div>
                                    </div>
                                </div>
                            </td>
                            <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                <div className="text-gray-900">Front-end Developer</div>
                                <div className="mt-1 text-gray-500">Optimization</div>
                            </td>
                            <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">Active</span>
                            </td>
                            <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">Member</td>
                            <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                <EyeIcon className={"mx-auto text-gray-400 h-5 w-5 flex-shrink-0 hover:text-gray-700 rounded-full"} style={{ cursor: 'pointer' }} />
                            </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                </div>
            </div>
        </div>
    </div>
  </>
  )
}
