import React, { useState, useEffect } from 'react';
import Btn from '@/components/atoms/btn';
import CardNewHorizon from '@/components/molecules/cardNewHorizon';
// import ModalUi from '@/components/organisms/modalUi';
import { useStoreNews } from '@/hooks/News/StoreProvider';
import { useStoreCategoriesNews } from '@/hooks/CategoriesNews/StoreProvider';
import { useNews } from '@/hooks/News'; 
import { useCategoriesNews } from '@/hooks/CategoriesNews'; 
import Link from 'next/link';
import { useAuthLogin } from "@/hooks/AuthLogin";
import { useStoreAuthLogin } from '@/hooks/AuthLogin/StoreProvider';
import { isEmpty, get } from 'lodash';
import Loading from '@/components/molecules/loading';
import Permissions from '@/utils/permissions';
import VerificatePermissions from  '@/utils/verificatePermissions';

const stepPage: number = 9;

function NewsComponents() {

  const [selectCategory, setSelectCategory]: any = useState(1);
  const { getAuthLogin } = useAuthLogin();
  const [ listPaginationData, setListPaginationData ] = useState([]);
  const [ pageNumbers, setPageNumbers ]: any[] = useState([]);
  const [ indexPaginate, setIndexPaginate ] = useState(1);
  const [ newsList, setNewsList ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ permissionsValue, setPermissionsValue ] = useState(false);

  const { getAllCategoriesNews } = useCategoriesNews();
  const { getAllNews } = useNews();

  const { news } = useStoreNews() || [];
  const { categoriesNews } = useStoreCategoriesNews() || [];
  const { authLogin } = useStoreAuthLogin();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      await Promise.all([
        getAllCategoriesNews(),
        getAllNews(),
        getAuthLogin(),
      ]);
      setLoading(false);
    }
    if(isEmpty(news) || isEmpty(categoriesNews)) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [news, categoriesNews])

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {

    if(selectCategory && !isEmpty(news)) {
      setNewsList(news.filter((item: any) => item.category.id === selectCategory));
    }

  }, [selectCategory, news]);

  useEffect(() => {
    if(!isEmpty(news)) {
      const indexOfLastItem = currentPage * stepPage;
      const indexOfFirstItem = indexOfLastItem - stepPage;

      setListPaginationData(newsList.slice(indexOfFirstItem, indexOfLastItem));

      const pageNumbersItems = [];
      for (let i = 1; i <= Math.ceil(newsList.length / stepPage); i++) {
        pageNumbersItems.push(i);
      }
      setPageNumbers(pageNumbersItems);
    }

  }, [newsList, currentPage]);

  useEffect(() => {
    if(!isEmpty(authLogin.permissions)) {
      setPermissionsValue(VerificatePermissions(get(authLogin, 'permissions', []), [Permissions.NOTICIAS, Permissions.SUPER_ADMINISTRADOR]))
    }
  }, [authLogin])

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
          <div className='p-10'>
            {/* Btn Modal News form */}
              {
                permissionsValue ?
                  <>
                    <div className='block md:flex justify-between items-center'>
                      <h4 className='font-medium text-xl mb-5 md:mb-0'>Noticias</h4>
                      <Link href={'/nueva-noticia'}>
                        <Btn label={'Nueva noticia'} size={''} color={'bg-parvalColor'} />
                      </Link>
                    </div>
                  </> : null
              }
              
      
            {/* Badge group and text*/}
              <div className='block	md:flex xl:flex gap-x-5 mt-10 mb-5 text-sm'>
                {
                  categoriesNews && categoriesNews.length ? categoriesNews.map((item: any, index: number) => (
                    <>
                      <div
                        key={index}
                        className={`p-3 xl:mb-0 md:mb-0 mb-3 self-center cursor-pointer rounded-full pl-6 pr-6 ${item.id === selectCategory ? 'bg-parvalColor' : 'bg-gray-100'}`}
                        onClick={() => setSelectCategory(item.id)}
                      >
                        <p>{ item.name }</p>
                      </div>
                    </>
                  )) : null
                }
              </div>
      
            {/* Content News card */}
            <div>
                  {
                    listPaginationData && listPaginationData.length ?
                      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-2 2xl:grid-cols-3 mb-10'>
                        {
                            listPaginationData.map((item: any) => (
                              <>
                                <Link href={`/leer-noticia/${item.id}`}>
                                  <CardNewHorizon
                                    imageUrl={item.frontPage ? item.frontPage : "/bg-ground.svg"}
                                    title={item.title}
                                    description={`${item.description.slice(0, 100)}...`}
                                    date={item.createdAt ? String(item.createdAt).slice(0, 10) : ''}
                                  />
                                </Link>
                            </>
                          ))
                        }
                      </div>
                      : <>
                        <div className={'flex justify-center'}>
                            <span className={'text-xl text-gray-600'}>
                                No tiene noticias disponibles
                            </span>
                        </div>
                      </>
                  }
              
            </div>
      
            <div className='fixed	bottom-0 w-4/5 2xl:w-[87%]'>
                
                {
                  newsList && newsList.length ?
                    <>
                      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                        <div>
                          <p className="text-sm text-gray-700">
                            <span className="font-medium">{ newsList.length }</span> resultados en total.
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
            <div>
        
            {/* <ModalUi isOpen={modalOpen} onClose={() => setModalOpen(false)}>
              <div className='w-auto md:w-[500px] '>
                <form>
                  <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                      <h2 className="text-base font-semibold leading-7 text-gray-900">Nueva noticia</h2>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                      Completa el formulario para crear una nueva noticia
                      </p>
      
                      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="col-span-full">
                          <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                            Asignar una imagen
                          </label>
                          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                            <div className="text-center">
                              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                <label
                                  htmlFor="file-upload"
                                  className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                >
                                  <span>Subir imagen</span>
                                  <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                </label>
                                <p className="pl-1">o arrasta y suelta</p>
                              </div>
                              <p className="text-xs leading-5 text-gray-500">PNG, JPG, GIF up to 10MB</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
      
                      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                          <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                            Titulo de la noticia
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              name="first-name"
                              id="first-name"
                              autoComplete="given-name"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-parvalColor sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                        <div className="col-span-full">
                        <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                          Descripcion de la noticia
                        </label>
                        <div className="mt-2">
                          <textarea
                            id="about"
                            name="about"
                            rows={3}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-parvalColor sm:text-sm sm:leading-6"
                            defaultValue={''}
                          />
                        </div>
                      </div>
                      </div>
                  
      
                    <div className="border-b border-gray-900/10 pb-12">
                      <div className="space-y-10">
                        <fieldset>
                          <legend className="text-sm font-semibold leading-6 text-gray-900">Seleccione un tipo de noticia</legend>
                          <div className="mt-6 space-y-6">
                            <div className="flex items-center gap-x-3">
                              <input
                                id="push-everything"
                                name="push-notifications"
                                type="radio"
                                className="h-4 w-4 border-gray-300 text-parvalColor focus:ring-parvalColor"
                              />
                              <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">
                                Noticas interna
                              </label>
                            </div>
                            <div className="flex items-center gap-x-3">
                              <input
                                id="push-email"
                                name="push-notifications"
                                type="radio"
                                className="h-4 w-4 border-gray-300 text-parvalColor focus:ring-parvalColor"
                              />
                              <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-gray-900">
                                Noticias publicas
                              </label>
                            </div>
                          </div>
                        </fieldset>
                      </div>
                    </div>
                  </div>
                </form>
              </div>        
            </ModalUi> */}
          </div>
          </div>
      }
    </>
  )
}

export default function Noticias() {
  return (
   <>
      <NewsComponents />
   </>
  )
}


