import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useAuthLogin } from "@/hooks/AuthLogin";
import { useStoreAuthLogin } from '@/hooks/AuthLogin/StoreProvider';
import DocumentDown from '@/components/molecules/documentDown';
import { usePerson } from '@/hooks/Person';
import { useVacations } from '@/hooks/Vacations'; 
import { useStoreVacations } from "@/hooks/Vacations/StoreProvider"; 
import { GetFormatDateAndYear } from '@/utils/getMonthForDate';
import { get, isEmpty } from 'lodash';
import Loading from '@/components/molecules/loading';
import axios from 'axios';

// type TabContents = {
//   [key: string]: Element;
// };

const stepPage: number = 6;

function ProfileComponents() {
  const { getAuthLogin } = useAuthLogin();
  const [file, setFile] = useState(null);
  const [ loading, setLoading ] = useState(false);
  const { getAllVacations } = useVacations();
  const [ clearVacations, setClearVacations ]: any[] = useState([]);
  
  // paginate
  const [currentPage, setCurrentPage] = useState(1);
  const [ listPaginationData, setListPaginationData ] = useState([]);
  const [ pageNumbers, setPageNumbers ]: any[] = useState([]);
  const [ indexPaginate, setIndexPaginate ] = useState(1);

  const { savePerson } : any = usePerson();
  const { authLogin } = useStoreAuthLogin();
  const { vacations } = useStoreVacations() || [];

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      await Promise.all([
        getAuthLogin(),
        getAllVacations(),
      ]);
      setLoading(false);
    }
    if(isEmpty(vacations) || isEmpty(authLogin)) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authLogin]);

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

  const tabs = [
    { name: 'Perfil', href: '#', current: true },
    // { name: 'Solicitudes', href: '#', current: false },
    { name: 'Documentos', href: '#', current: false },
    { name: 'Vacaciones', href: '#', current: false },
  ];
  
  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };

  useEffect(() => {
    if(!isEmpty(vacations)) {
      setClearVacations(vacations.filter(((item: any) => get(authLogin, 'id', '1') === get(item, 'personInfo.userId', ''))));
    }
  }, [vacations, authLogin])

  const handleUpload = async (event: any) => {
    setFile(event.target.files[0]);

    if (!file) {
      console.error('Selecciona un archivo antes de cargar');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);

      const reader: any = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = async () => {
        const base64Image = reader.result.split(',')[1];
        const infoImege = await axios.post(`/api/azureBlobStorage?type=${get(file, 'type', '')}`, {base64Image});
        if(authLogin.id && infoImege.data.urlImage) {
          await savePerson({
            userId: authLogin.id,
            urlImage: infoImege.data.urlImage
          })
        }
      };

      console.log('Imagen cargada con éxito');
    } catch (error: any) {
      console.error('Error al cargar la imagen:', error.message);
    }
  };
  
  const tabContents = {
    'Perfil': (
      <div>
        <div className="grid md:grid-cols-12 grid-cols-1 xl:grid-cols-12">
        {authLogin ? (
        <div className="col-span-12">
          <div>
            {/* Informacion del perfil */}
            <div className="px-4 sm:px-0">
              <h3 className="text-base font-semibold leading-7 text-gray-900">
                Informacion perfil
              </h3>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                Detalles de informacion perfil.
              </p>
            </div>
            <div className="mt-6">
              <dl className="grid grid-cols-1 sm:grid-cols-1">
                <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                  <dt className='flex'>
                    <div className='text-sm mr-10 font-medium leading-6 text-gray-900'> Nombre</div>
                    <div className="text-sm leading-6 text-gray-700 ">
                      {authLogin.displayName}
                    </div>
                  </dt>
                </div>

                <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                <dt className='flex'>
                    <div className='text-sm mr-10 font-medium leading-6 text-gray-900'> Email</div>
                    <div className="text-sm leading-6 text-gray-700 ">
                    {authLogin.userPrincipalName}
                    </div>
                  </dt>
                </div>
              </dl>

              <dl className="grid grid-cols-1 sm:grid-cols-1">
                <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0 flex items-center justify-between">
                <dt className='flex items-center'>
                    <div className='text-sm mr-10 font-medium leading-6 text-gray-900'>Fotos</div>
                    <div className="text-sm leading-6 text-gray-700">
                    <Image
                      src={authLogin && authLogin.urlImage ? authLogin.urlImage : '/perfil-de-usuario.webp'}
                      className={"rounded-full h-16 w-16"}
                      alt={"logo de parval"}
                      width={1024}
                      height={1024}
                      priority
                    />
                    </div>
                  </dt>
                    {/* <div className='text-sm flex gap-5 leading-6 text-indigo-500 cursor-pointer'>
                     <label className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                      <span>Subir</span>
                      <input onChange={handleUpload}  id="file-upload" name="file-upload" type="file" className="sr-only" />
                    </label> | <p>Remover</p>
                    </div> */}
                </div>

                <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                   <dt className='flex'>
                    <div className='text-sm mr-10 font-medium leading-6 text-gray-900'>Cargo</div>
                    <div className="text-sm leading-6 text-gray-700 ">
                       { authLogin.jobTitle ? authLogin.jobTitle : 'N/A' }
                    </div>
                  </dt>
                </div>
              </dl>
            </div>
          </div>
        </div>
        ) : null}
        </div>

        <div className="grid md:grid-cols-12 grid-cols-1 xl:grid-cols-12">
        {authLogin ?
        <div className="col-span-12 mt-5">
          <div>
            {/* Informacion del perfil */}
            <div className="px-4 sm:px-0">
              <h3 className="text-base font-semibold leading-7 text-gray-900">
                Información de contacto
              </h3>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                Detalles de cuenta parval
              </p>
            </div>
            <div className="mt-6">
              <dl className="grid grid-cols-1 sm:grid-cols-1">
                <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                <dt className='flex'>
                    <div className='text-sm mr-10 font-medium leading-6 text-gray-900'>Ubicacion</div>
                    <div className="text-sm leading-6 text-gray-700 ">
                    { authLogin.officeLocation ? authLogin.officeLocation : 'N/A' }
                    </div>
                  </dt>
                </div>

                <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0 mb-10">
                <dt className='flex'>
                    <div className='text-sm mr-10 font-medium leading-6 text-gray-900'>Telefono</div>
                    <div className="text-sm leading-6 text-gray-700 ">
                      { authLogin.mobilePhone ? authLogin.mobilePhone : 'N/A' }
                    </div>
                  </dt>
                </div>
              </dl>
            </div>
          </div>
        </div>
        : null}
        </div>
      </div>
     ),
    // 'Solicitudes': (
    //   <div>
    //     <h2>Solicitudes</h2>
    //     {/* Agrega el contenido */}
    //   </div>
    // ),
    'Documentos': (
      <div>
        <DocumentDown/>
      </div>
    ),
    'Vacaciones': (
      <>
        <div className="grid md:grid-cols-12 grid-cols-1 xl:grid-cols-12 gap-y-6">
          <div className='col-span-12'>
            <div className="px-4 sm:px-0">
              <h3 className="text-base font-semibold leading-7 text-gray-900">
                Vacaciones Solicitadas
              </h3>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                Detalles de las solicitudes de vacaciones.
              </p>
            </div>
          </div>
          {
            loading ?
              <>
                <div className={'col-span-12'}>
                    <div className={'flex justify-center'}>
                        <Loading name={'Cargando ...'} />
                    </div>
                </div>
              </> : 
              <>
                <div className={'col-span-12 h-[540px]'}>
                <div className="-mx-4 mt-8 mb-4 sm:-mx-0">
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
                            { clearVacations ? listPaginationData.map((person: any) => (
                                <>
                                  <tr>
                                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                      <div className="text-gray-900">{person.personInfo ? person.personInfo.name : 'N/A'}</div>
                                      <div className="mt-1 text-gray-500">{person.personInfo.jobTitle}</div>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                      <div className="text-gray-900">{`Desde ${GetFormatDateAndYear(person.dateStart)} Al ${GetFormatDateAndYear(person.dateEnd)} `}</div>
                                      <div className="mt-1 text-gray-500 ">Total de Dias: { person.quantityDay }</div>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                      
                                      <div className="text-gray-900">
                                        { get(person, 'approved', false) ? 
                                            <span className="inline-flex items-center rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                                              Aprobada
                                            </span>
                                          : person.approvedDate !== null ? 
                                            <span className="inline-flex items-center rounded-md bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
                                              Declinada
                                            </span> : 
                                            <span className="inline-flex items-center rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
                                              Pendiente
                                            </span>
                                        }
                                      </div>
                                    </td>
                                  </tr>
                                </>
                              )) : null
                            }
                          </tbody>
                          </table>
                </div> 
              </div>
              <div className={'col-span-12 pb-8'}>
                  
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
              </>
          }
        </div>
      </>
    ),
  };

  const [selectedTab, setSelectedTab] = useState<string | undefined>(() => {
    const selected = tabs.find((tab) => tab.current);
    return selected ? selected.name : undefined;
  });

  const handleTabChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTab(event.target.value);
  };

  return (
    <>
    {/* Tab style*/}
      <div>
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            Select a tab
          </label>
          <select
            id="tabs"
            name="tabs"
            className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-parvalColor focus:outline-none focus:ring-parvalColor sm:text-sm"
            value={selectedTab}
            onChange={handleTabChange}
          >
            {tabs.map((tab) => (
              <option key={tab.name} value={tab.name}>
                {tab.name}
              </option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 pl-10" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.name}
                  className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${
                    selectedTab === tab.name
                      ? 'border-parvalColor text-orange-500'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                  onClick={() => setSelectedTab(tab.name)}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-12 grid-cols-1 xl:grid-cols-12">
      {authLogin ? (
  <div className="col-span-12 p-[20px] xl:p-[40px]">
    {selectedTab != null && tabContents[selectedTab as keyof typeof tabContents] != null ? (
      tabContents[selectedTab as keyof typeof tabContents]
    ) : (
      <p>Contenido no encontrado</p>
    )}
  </div>
) : null}
      </div>
    </>
  );
}

export default function Profile() {
  return (
    <>
      <ProfileComponents />
    </>
  )
};
