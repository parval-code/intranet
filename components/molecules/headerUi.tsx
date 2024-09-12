import React, { useEffect } from 'react'
import {routes} from '../../utils/routes'
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Dialog, Menu, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import Image from 'next/image';
import Link from "next/link";
import { useAuthLogin } from "@/hooks/AuthLogin";
import { useStoreAuthLogin } from '@/hooks/AuthLogin/StoreProvider';
import {
  Bars3Icon,
  BellIcon,
  ChevronUpIcon,
  Cog6ToothIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { get, isEmpty } from 'lodash';
import { SignOutButton } from '@/utils/SignOutButton';
import Permissions from '@/utils/permissions';
import VerificatePermissions from  '@/utils/verificatePermissions';

const userNavigation: any[] = [
    { name: 'Tu perfil', href: '/profile' },
    { name: 'Configuración', href: '/configuracion' },
  ]

export default function HeaderUi() {
  const { getAuthLogin } = useAuthLogin();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownStates, setDropdownStates]:any = useState({});
  const [ permissionsValue, setPermissionsValue ] = useState(false);

  const toggleDropdown = (dropdownName: any) => {
    setDropdownStates((prev:any) => ({ ...prev, [dropdownName]: !prev[dropdownName] }));
  };
  const { authLogin } = useStoreAuthLogin();
  
  useEffect(() => {

    async function fetchData() {
        await Promise.all([
          getAuthLogin(),
        ]);
    }
    if(isEmpty(authLogin)){
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authLogin]);

  useEffect(() => {
    if(!isEmpty(authLogin)) {
      setPermissionsValue(VerificatePermissions(get(authLogin, 'permissions', []), [Permissions.ADMINISTRADOR_PERMISOS, Permissions.ADMINISTRADOR, Permissions.SUPER_ADMINISTRADOR]))
    }
  }, [authLogin]);

  return (
    <>
    <Transition.Root show={sidebarOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900/80" />
        </Transition.Child>

        <div className="fixed inset-0 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                  <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              {/* Sidebar component, swap this element with another sidebar if you like */}
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                <div className="flex h-16 shrink-0 items-center">
                      <Image
                        priority
                        src={'/logo_horizon.svg'} 
                        alt={"Your Company"}
                        className={"h-8 w-auto"}
                        width={200}
                        height={200}
                      />
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>

                      <ul role="list" className="-mx-2 space-y-1">
                      {routes &&
                        routes.map((item: any) => (
                          <li key={item.name}>
                            {item.dropdownOptions ? (
                              <>
                                <div
                                  className="flex items-center justify-between p-[8px] cursor-pointer"
                                  onClick={() => toggleDropdown(item.name)}
                                >
                                  <span
                                    className={`text-gray-700 text-[0.8rem]  flex ${
                                      item.dropdownOptions && 'font-semibold'
                                    }`}
                                  >
                                    {item.dropdownIcon && (
                                      <item.dropdownIcon className="text-gray-500 h-5 w-5 mr-4" />
                                    )}
                                    {item.name}
                                  </span>
                                  {dropdownStates[item.name] ? (
                                    <ChevronUpIcon className="h-5 w-5 text-gray-500" />
                                  ) : (
                                    <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                                  )}
                                </div>
                                {dropdownStates[item.name] && (
                                  <ul role="list" className="pl-4 space-y-1">
                                    {item.dropdownOptions.map((option: any) => (
                                      <li key={option.name}>
                                        <Link
                                          href={option.href}
                                          className="text-gray-700 hover:text-yellow-600 hover:bg-gray-50 group flex gap-x-3 rounded-md p-2 text-sm leading-6 pl-7 font-normal"
                                        >
                                          {option.name}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </>
                            ) : (
                              <Link
                                href={item.href}
                                className={`${
                                  item.current
                                    ? 'bg-gray-50 text-yellow-600'
                                    : 'text-gray-700 hover:text-yellow-600 hover:bg-gray-50'
                                } group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold`}
                              >
                                <item.icon
                                  className={`${
                                    item.current
                                      ? 'text-yellow-600'
                                      : 'text-gray-400 group-hover:text-yellow-600'
                                  }h-6 w-6 shrink-0`}
                                  aria-hidden="true"
                                />
                                {item.name}
                              </Link>
                            )}
                          </li>
                        ))
                      }
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>


         <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
        <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden" onClick={() => setSidebarOpen(true)}>
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>

        {/* Separator */}
        <div className="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />

        <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
          <div className="relative flex flex-1">
            {/* <label htmlFor="search-field" className="sr-only">
              Search
            </label>
            <MagnifyingGlassIcon
              className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
              aria-hidden="true"
            />
            <input
              id="search-field"
              className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
              placeholder="Search..."
              type="search"
              name="search"
            /> */}
          </div>
          <div className="flex items-center gap-x-4 lg:gap-x-6">
            <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Separator */}
            <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" aria-hidden="true" />

            {/* Profile dropdown */}
            <Menu as="div" className="relative">
              <Menu.Button className="-m-1.5 flex items-center p-1.5">
                <span className="sr-only">Open user menu</span>
                    <Image
                        priority
                        src={authLogin.urlImage ? authLogin.urlImage : '/perfil-de-usuario.webp'} 
                        alt={"logo de parval"}
                        width={200}
                        height={200}
                        className={"h-8 w-8 rounded-full bg-gray-50"}
                      />
                <span className="hidden lg:flex lg:items-center">
                  <span className="ml-4 text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">
                    { authLogin && get(authLogin, 'displayName', '')}
                  </span>
                  <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                  {userNavigation.map((item: any) => (
                    <>
                      {
                        item.href === '/configuracion' && !permissionsValue ?
                         null 
                         : <Menu.Item key={item.name}>
                          {
                            ({ active }) => (
                              <Link
                                href={item.href}
                                className={`${active ? 'bg-gray-50' : ''} block px-3 py-1 text-sm leading-6 text-gray-900`}
                              > {item.name} </Link>
                            )
                          }
                       </Menu.Item>
                    }
    
                    </>
                  ))}
                   <Menu.Item>
                      <SignOutButton>
                        <div className={'block px-3 py-1 text-sm leading-6 text-gray-900'} style={{
                          cursor: 'pointer'
                        }}>
                            Cerrar sesión
                        </div>
                      </SignOutButton>
                   </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </>
  )
}
