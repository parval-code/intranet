import React, { useEffect, useState } from 'react';
import SearchInput from '@/components/atoms/searchInput';
import CardRequests from '@/components/molecules/cardRequests';
import Link from 'next/link';
import { isEmpty } from 'lodash';
// import { useVacations } from '@/hooks/Vacations'; 
import { useReasonAbsence } from '@/hooks/ReasonAbsence'; 
import { useStoreReasonAbsence } from "@/hooks/ReasonAbsence/StoreProvider";
import { IconAssignmentForId } from '@/utils/iconAssignmentForId';
import Loading from '@/components/molecules/loading';

function SolicitudesComponents() {

  const [ search, setSearch ] = useState('');
  const [ searchListData, setSearchListData ] = useState([]);
  const [ loading, setLoading ] = useState(false);

  // const { getAllVacations } = useVacations();
  const { getAllReasonAbsence, getOneReasonAbsence } = useReasonAbsence();

  const { reasonAbsence } = useStoreReasonAbsence() || [];

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      await Promise.all([
        // getAllVacations();
        // getAllReasonAbsence();
        getOneReasonAbsence('2')
      ]);
      setLoading(false);
    }
    if(isEmpty(reasonAbsence)) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const { vacations } = useStoreVacations() || [];

  useEffect(() => {
    if(!isEmpty(reasonAbsence) && search !== '') {
      setSearchListData(reasonAbsence.filter((reason: any) => reason.name && reason.name.toLowerCase().includes(search.toLowerCase())));
    }
  }, [search, reasonAbsence]);

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
          <h1 className='font-semibold text-xl'>RRHH</h1>
          <p className='font-light text-sm text-slate-500'>Solicitud de permisos</p>
        </div>
        <SearchInput 
          placeholder={'Buscar tipo de permisos'}
          value={search}
          name={'search'}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const { value } = e.target;
            setSearch(value);
          }}
        />

        <div className='grid md:grid-cols-12 grid-cols-1 xl:grid-cols-12 gap-5 mt-10 mb-12'>
          {/* Mapea las solicitudes y renderiza el componente CardRequests para cada una */}
          {
                !isEmpty(search) && isEmpty(searchListData) ?
                  <>
                    <div className={'col-span-3'}>
                      <div className={'flex justify-center'}>
                        <span>No existen opciones de solicitud para { search }</span>
                      </div>
                    </div>
                  </> : null
          }
          {
            reasonAbsence && reasonAbsence.length ? (!isEmpty(search) ? searchListData : reasonAbsence).map((solicitud: any) => (
              <>
                <div className='col-span-1 md:col-span-6 xl:col-span-3 2xl:col-span-2 mb-4' key={solicitud.id}>
                  <Link href={`/formulario-solicitudes/${solicitud.id}`}>
                    <CardRequests 
                      title={solicitud.name} 
                      image={IconAssignmentForId(solicitud.id)} />
                  </Link>
                </div>
              </>
            )) : null
          }
        </div>
        </div>
      }
      
    </>
  );
}

export default function Solicitudes() {
  return (
    <>
      <SolicitudesComponents />
    </>
  )
}
