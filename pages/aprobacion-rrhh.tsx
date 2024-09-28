import React, { useEffect, useState } from 'react';
import SearchInput from '@/components/atoms/searchInput';
import { XMarkIcon, CheckIcon } from '@heroicons/react/20/solid';
import { useVacations } from '@/hooks/Vacations'; 
import { useStoreVacations } from "@/hooks/Vacations/StoreProvider";
import { useNotification } from '@/hooks/Notifications';
import { useAuthLogin } from "@/hooks/AuthLogin";
import { useStoreAuthLogin } from '@/hooks/AuthLogin/StoreProvider';
import { useRouter } from "next/router";
import Image from 'next/image';
import { isEmpty, get } from 'lodash';
import Loading from '@/components/molecules/loading';
import { GetFormatDateAndYear } from '@/utils/getMonthForDate';
import Permissions from '@/utils/permissions';
import VerificatePermissions from  '@/utils/verificatePermissions';

interface ApprovalUpdateComponents{
  approvedRRHH?: boolean;
  approved?: boolean;
  approvedDate?: any;
  approvedDateRRHH?: any;
}

const stepPage: number = 12;

enum StatusVacations {
  TODAS = 0,
  APROBADA_POR_SUPERVISOR = 1,
  SIN_APROBAR_POR_SUPERVISOR = 2,
  DECLINADAS_POR_RRHH = 3,
}

function ApprovalComponents() {

  const { getAllVacations, updatedVacations } = useVacations();
  const { getAuthLogin } = useAuthLogin();
  const router = useRouter();
  const { showNotification } = useNotification();
  const [ search, setSearch ] = useState('');
  const [ searchListData, setSearchListData ] = useState([]);
  const [ listPaginationData, setListPaginationData ] = useState([]);
  const [ pageNumbers, setPageNumbers ]: any[] = useState([]);
  const [ clearVacations, setClearVacations ]: any[] = useState([]);
  const [ indexPaginate, setIndexPaginate ] = useState(1);
  const [ loading, setLoading ] = useState(false);
  const [ loadingAction, setLoadingAction ] = useState(false);
  const [ loadingId, setLoadingId ] = useState(0);
  const [selectCategory, setSelectCategory]: any = useState(1);

  const { authLogin } = useStoreAuthLogin();
  const { vacations } = useStoreVacations() || [];

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      await Promise.all([
        getAuthLogin(),
        getAllVacations()
      ]);
      setLoading(false);
    }
    if(isEmpty(vacations)) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if(get(authLogin, 'id', false) && !isEmpty(authLogin.permissions)) {
        const verify = VerificatePermissions(get(authLogin, 'permissions', []), [Permissions.RECURSOS_HUMANOS, Permissions.SUPER_ADMINISTRADOR]);
        if(!verify) {
            router.push('/');
        }
    }
}, [authLogin])

  useEffect(() => {
    if(!isEmpty(vacations)) {
      if(selectCategory === StatusVacations.APROBADA_POR_SUPERVISOR) {
        setClearVacations(vacations.filter((item: any) => item.approved === true && item.approvedDateRRHH === null && get(authLogin, 'id', '0') !== get(item, 'personInfo.userId', '')));
      } else if (selectCategory === StatusVacations.DECLINADAS_POR_RRHH) {
        setClearVacations(vacations.filter((item: any) => item.approvedDateRRHH !== null && item.approvedRRHH === false && get(authLogin, 'id', '0') !== get(item, 'personInfo.userId', '')));
      } else {
        setClearVacations(vacations.filter((item: any) => get(authLogin, 'id', '0') !== get(item, 'personInfo.userId', '')));
      }
    }
  }, [selectCategory, vacations, authLogin])

  const onUpdatedVacations = async (id: number | string, data: ApprovalUpdateComponents) => {
    setLoadingAction(true);
    try{
      await updatedVacations(id, data).then(() => {
        showNotification('Actualizacion de Vacaciones', "success");
      });
    } catch(e) {
      console.log(e);
      setLoadingId(0);
    }
    setLoadingId(0);
    setLoadingAction(false);
  }

  useEffect(() => {
    if(!isEmpty(clearVacations) && search !== '') {
      setSearchListData(clearVacations.filter((person: any) => person.personInfo && person.personInfo.name && person.personInfo.name.toLowerCase().includes(search.toLowerCase())));
    }
  }, [search, clearVacations]);

  // paginate
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if(!isEmpty(clearVacations)) {
      const indexOfLastItem = currentPage * stepPage;
      const indexOfFirstItem = indexOfLastItem - stepPage;

      setListPaginationData(clearVacations.slice(indexOfFirstItem, indexOfLastItem));

      const pageNumbersItems = [];
      for (let i = 1; i <= Math.ceil(clearVacations.length / stepPage); i++) {
        pageNumbersItems.push(i);
      }
      setPageNumbers(pageNumbersItems);
    }

  }, [clearVacations, currentPage]);

  return (
    <>
      {
        loading ?
        <>
          <div className={'pt-20'}>
              <div className={'flex justify-center'}>
                  <Loading name={'Cargando ...'} />
              </div>
          </div>
        </> :
        <div className='p-8'>
          {/* title */}
          <div className='mb-[40px]'>
            <h1 className='font-semibold text-xl'>Aprobacion RRHH</h1>
            <p className='font-light text-sm text-slate-500'>Aprobacion de Sollicitudes de Vacaciones</p>
          </div>
          <div className='mb-[40px]'>
            <div className={'block	md:flex xl:flex gap-x-5 mt-10 mb-5 text-sm'}>
              <div>
                <span 
                  style={{ cursor: 'pointer' }}
                  className={`p-3 xl:mb-0 md:mb-0 mb-3 self-center cursor-pointer rounded-full pl-6 pr-6 ${StatusVacations.APROBADA_POR_SUPERVISOR === selectCategory ? 'bg-parvalColor' : 'bg-gray-100'}`}
                  onClick={() => setSelectCategory(StatusVacations.APROBADA_POR_SUPERVISOR)}
                >
                  Aprobadas por el supervisor
                </span>
              </div>
              {/* <div>
                <span 
                  style={{ cursor: 'pointer' }}
                  className={`p-3 xl:mb-0 md:mb-0 mb-3 self-center cursor-pointer rounded-full pl-6 pr-6 ${StatusVacations.DECLINADAS_POR_RRHH === selectCategory ? 'bg-parvalColor' : 'bg-gray-100'}`}
                  onClick={() => setSelectCategory(StatusVacations.DECLINADAS_POR_RRHH)}
                >
                  Declinadas por RRHH
                </span>
              </div> */}
              <div>
                <span 
                  style={{ cursor: 'pointer' }}
                  className={`p-3 xl:mb-0 md:mb-0 mb-4 self-center cursor-pointer rounded-full pl-6 pr-6 ${StatusVacations.TODAS === selectCategory ? 'bg-parvalColor' : 'bg-gray-100'}`}
                  onClick={() => setSelectCategory(StatusVacations.TODAS)}>
                    Todas
                </span>
              </div>
            </div>
          </div>
          <SearchInput
            value={search}
            name={'search'}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const { value } = e.target;
              setSearch(value);
            }}
            placeholder={'Buscar'} />

            {

              selectCategory === 0 ?
                <>
                  <div className="-mx-4 mt-8 mb-32 sm:-mx-0">
                    <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                      <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Nombre</th>
                        <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell">Dias Solicitados</th>
                        <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">Estado</th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      { clearVacations && clearVacations.length ? (!isEmpty(search) ? searchListData : listPaginationData).map((person: any) => (
                          <>
                            <tr>
                              <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                <div className="text-gray-900">{person.personInfo ? person.personInfo.name : 'N/A'}</div>
                                <div className="mt-1 text-gray-500">{person.personInfo.jobTitle}</div>
                              </td>
                              <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                <div className="text-gray-900">{`Desde ${GetFormatDateAndYear(person.dateStart)} Al ${GetFormatDateAndYear(person.dateEnd)} `}</div>
                                <div className="mt-1 text-gray-500 ">Total de Dias: {person.quantityDay}</div>
                              </td>
                              <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                <div className="text-gray-900">
                                  RRHH: {get(person, 'approvedRRHH', false) ? 'Aprobada' : person.approvedDateRRHH !== null ? 'Declinada': 'Pendiente'}
                                </div>
                                <div className="text-gray-900">
                                  Supervisor: {get(person, 'approved', false) ? 'Aprobada' : person.approvedDate !== null ? 'Declinada': 'Pendiente'}
                                </div>
                              </td>
                            </tr>
                          </>
                        )) : null
                      }
                    </tbody>
                    </table>
                  </div>
                </> : 
                <>
                  <div className="grid mt-6 grid-cols-3 gap-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3  lg:grid-cols-3 mb-32">
                {
                  !isEmpty(search) && isEmpty(searchListData) ?
                    <>
                      <div className={'col-span-3'}>
                        <div className={'flex justify-center'}>
                          <span>No existen vacaciones reservadas para { search }</span>
                        </div>
                      </div>
                    </> : null
                }

                { clearVacations && clearVacations.length ? (!isEmpty(search) ? searchListData : listPaginationData).map((person: any) => (
                  <>
                      <div key={person.id} className={"col-span-1 divide-y divide-gray-200 rounded-lg bg-gray-50 shadow p-1"}>
                    <div className="flex w-full items-center justify-between space-x-6 p-6 rounded-t-lg bg-white">
                      <div className="flex-1 truncate">
                        <div className="flex items-center space-x-3">
                          <h3 className="truncate text-sm font-medium text-gray-900">
                            {person.personInfo ? person.personInfo.name : 'N/A'}
                          </h3>
                          
                        </div>
                        
                        <p className="mt-1 truncate text-sm text-gray-500 pb-2">{person.personInfo.jobTitle}</p>
                        
                        <span className="inline-flex flex-shrink-0 items-center rounded-full bg-blue-50 p-1 text-sm font-small text-blue-500 ring-1 ring-inset ring-green-600/20">
                            {person.approvedRRHH ? 'Aprobada-RRHH' : person.approvedDateRRHH === null ? 'Pendiente' : 'Declinada-RRHH'}
                          </span>
                      </div>
                      <Image
                        className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"
                        src={ person.personInfo ? person.personInfo.urlImage : 'N/A' }
                        alt=""
                        width={40} // Ajusta el ancho deseado
                        height={40} // Ajusta la altura deseada
                      />
                    </div>
                    <div className="flex w-full items-center justify-between space-x-6 px-2 py-1 bg-white">
                        <p className="mt-1 truncate text-sm text-gray-500">{`Localizacion: ${get(person, 'personInfo.location.name', '')} `}</p>
                        <p className="mt-1 truncate text-sm text-gray-500">{`Dias Solicitados: ${person.quantityDay} ` }</p>
                    </div>
                    <div className="flex w-full items-center justify-between space-x-6 px-2 py-1 bg-white">
                        <p className="mt-1 truncate text-sm text-gray-500">{`Desde ${GetFormatDateAndYear(person.dateStart)} Al ${GetFormatDateAndYear(person.dateEnd)} `}</p>
                    </div>
                    <div className="flex w-full items-center justify-between space-x-6 px-2 py-1 bg-white">
                        <p className="mt-1 truncate text-sm text-gray-500">{`Supervisor: ${get(person, 'personInfo.area.name', '')} `}</p>
                      </div>
                    <div className='bg-white rounded-b-lg'>
                          <div className="-mt-px flex divide-x divide-gray-200">
                            {
                              person.approvedDateRRHH === null ?
                                <>
                                  {
                                    loadingAction && Number(loadingId) === Number(person.id) ?
                                      <>
                                          <div className={'flex justify-center items-center w-full'}>
                                            <div role="status" className={'py-2'}>
                                                <svg aria-hidden="true" className="inline w-8 h-8 text-gray-400 animate-spin fill-yellow-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                                </svg>
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                          </div>
                                      </> : <>
                                      <div className="flex w-0 flex-1">
                                          <span
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => {
                                              setLoadingId(person.id);
                                              onUpdatedVacations(person.id, {
                                                approvedRRHH: false,
                                                approvedDateRRHH: new Date(),
                                              })
                                            }}
                                            className="relative -mr-px inline-flex w-0 flex-1 items-center hover:bg-gray-50 justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                                          >
                                            <XMarkIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                            Declinar
                                          </span>
                                        </div>
                                        <div className="-ml-px flex w-0 flex-1">
                                          <span
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => {
                                              setLoadingId(person.id);
                                              onUpdatedVacations(person.id, {
                                                approvedRRHH: true,
                                                approvedDateRRHH: new Date(),
                                              })
                                            }}
                                            className="relative inline-flex w-0 flex-1 hover:bg-gray-50 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                                          >
                                            <CheckIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                            Aprobar
                                          </span>
                                        </div>
                                      </>
                                  }
                            </> : <>
                              <div className="flex w-0 flex-1">
                                
                                <span
                                      style={{ cursor: 'pointer' }}
                                      className="relative -mr-px inline-flex w-0 flex-1 items-center hover:bg-gray-50 justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                                    >
                                      Declinada por RRHH
                                    </span>
                              </div>
                            </>
                        }
                      </div>
                    </div>
                  </div>
                  </>
                )) : <>
                    <div className={'flex justify-center'}>
                      <span>No existen vacaciones disponibles</span>
                    </div>
                </>}
          </div>
                </>

            }

          
              <div className='fixed	bottom-0 w-4/5 2xl:w-[87%]'>
            
            {
              clearVacations && clearVacations.length ?
                <>
                  <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">{ clearVacations.length }</span> resultados en total.
                      </p>
                    </div>
                      <div>
                        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm border" aria-label="Pagination">
                          {!isEmpty(pageNumbers) && pageNumbers.map((number: any) => (
                            <>
                              <div onClick={() => {
                                  setCurrentPage(number);
                                  setIndexPaginate(number);
                                  setSearch('');
                                }} style={{ cursor: 'pointer' }} key={number} className={`relative z-10 inline-flex items-center ${ number === indexPaginate ? 'bg-parvalColor' : 'bg-white' } px-4 py-2 text-sm font-semibold text-gray-600 focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}>
                                <span>
                                  {number}
                                </span>
                              </div>
                            </>
                          ))}
                        </nav>
                        </div>
                      </div>
                    </div>
                </> : null
            }  
          </div>
        </div>
      }
    </>
  );
}

export default function Approval() {
  return (
    <>
      <ApprovalComponents />
    </>
  )
}
