import React, { useState, useEffect } from 'react';
import { routes } from '../../utils/routes';
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/20/solid';
import style from '../../styles/collapse.module.scss';
import { isEmpty, get } from 'lodash';
import Link from 'next/link';
import Image from 'next/image';
import Permissions from '@/utils/permissions';
import VerificatePermissions from  '@/utils/verificatePermissions';
import { useAuthLogin } from "@/hooks/AuthLogin";
import { useStoreAuthLogin } from '@/hooks/AuthLogin/StoreProvider';

interface ISidebar {
  isOpen: boolean;
  setIsOpen: any;
}

export default function SidebarUi(props: ISidebar) {
  const [dropdownStates, setDropdownStates]:any = useState({});
  const [ routesMap, setRoutesMap ] = useState([])
  const { getAuthLogin } = useAuthLogin();

  const toggleDropdown = (dropdownName: any) => {
    setDropdownStates((prev:any) => ({ ...prev, [dropdownName]: !prev[dropdownName] }));
  };

  useEffect(() => {
    async function fetchData() {
      await Promise.all([
        getAuthLogin(),
      ]);
  }
  if(isEmpty(authLogin)){
    fetchData();
  }
  }, []);

  const { authLogin } = useStoreAuthLogin();

  useEffect(() => {
    if (!isEmpty(authLogin)) {
      const filteredRoutes: any = routes.filter((route: any) => {
        if (route.name === 'Reportes' && !VerificatePermissions(get(authLogin, 'permissions', []), [Permissions.CONTABILIDAD, Permissions.SUPER_ADMINISTRADOR])) {
          return;
        }
        if(route.name === 'RRHH') {
          route.dropdownOptions = route.dropdownOptions.filter((item: any) => {
            if(item.href === '/aprobacion-rrhh' && !VerificatePermissions(get(authLogin, 'permissions', []), [Permissions.RECURSOS_HUMANOS, Permissions.SUPER_ADMINISTRADOR])) {
              return;
            }
            if(item.href === '/aprobacion-supervisor' && !VerificatePermissions(get(authLogin, 'permissions', []), [Permissions.DIRECTOR, Permissions.SUPER_ADMINISTRADOR])) {
              return;
            }
            return item;
          })
        }
        return route;
      });
      setRoutesMap(filteredRoutes);
    }
  }, [authLogin]);

  return (
    <>
      <div
        className={`hidden lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col ${style.Navbar} ${
          props.isOpen ? style.navOpen : style.navClouse
        }`}
      >
        <div className="transition-all duration-300 ease-in-out flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center">
            {props.isOpen ? (
              <Image
                        priority
                        src={"/logo_horizon.svg"} 
                        alt={"logo de parval"}
                        className={"h-8 w-auto"}
                        width={200}
                        height={200}
                      />
            ) : (
              <Image
                        priority
                        src={'/isoLogo.svg'} 
                        alt={"logo de parval"}
                        className={"absolute left-[16px] h-8 w-auto"}
                        width={200}
                        height={200}
                      />
            )}
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {routesMap &&
                    routesMap.map((item: any) => (
                      <>
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
                      </>
                    ))}
                </ul>
              </li>
            </ul>
            <div className={`style.btnOpen cursor-pointer`} onClick={props.setIsOpen}>
              <div>
                {props.isOpen ? (
                  <div className="flex bg-yellow-500 text-slate-900 p-2 rounded">
                    <ChevronDoubleLeftIcon className="w-6 h-6 " />
                    <p>Ocultar</p>
                  </div>
                ) : (
                  <ChevronDoubleRightIcon className="w-6 h-6 bg-gray-50 text-slate-700 rounded" />
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}