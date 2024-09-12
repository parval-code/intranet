import React, { useEffect } from 'react';
import NamePage from '@/components/atoms/namePage';
import { ChartPieIcon} from '@heroicons/react/20/solid';
import ListUi from '@/components/molecules/ListUi';
import { useAuthLogin } from "@/hooks/AuthLogin";
import { useStoreAuthLogin } from '@/hooks/AuthLogin/StoreProvider';
import { useRouter } from "next/router";
import Permissions from '@/utils/permissions';
import VerificatePermissions from  '@/utils/verificatePermissions';
import { isEmpty, get } from 'lodash';

export default function Reportes() {

  const { getAuthLogin } = useAuthLogin();
  const router = useRouter();

  const { authLogin } = useStoreAuthLogin();

  useEffect(() => {
    async function fetchData() {
      await Promise.all([
        getAuthLogin()
      ]);
    }
    if(isEmpty(authLogin)) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if(get(authLogin, 'id', false) && !isEmpty(authLogin.permissions)) {
        const verify = VerificatePermissions(get(authLogin, 'permissions', []), [Permissions.CONTABILIDAD, Permissions.SUPER_ADMINISTRADOR]);
        if(!verify) {
            router.push('/');
        }
    }
  }, [authLogin])

   // Data in the list
   const data = [
    { 
      name: 'Carta DGII',
      description:'Aqui se inserta las descripciones de los reportes agregados',
      href:'/detalle-reporte'
    },
    { 
      name: 'Reporte de Contabilidad-SIMV',
      description:'Aqui se inserta las descripciones de los reporte de contabilidad agregados',
      href:'/reporte-de-contabilidad-simv'
    },
    { 
      name: 'Reporte de Operaciones-SIMV',
      description:'Aqui se inserta las descripciones de los reporte operaciones agregados',
      href:'/reporte-operaciones-simv'
    },
  ];

  return (
    <>
    <div className='p-8'>
      <NamePage
        title={"Lista de reportes"}
        icon={<ChartPieIcon className="w-7 h-7 mr-1" />} backPage={''} backIcon={''}      />

      {/* body view page */}
      <div className='mt-5'>
        <ListUi data={data}/>
      </div>
    </div>
    </>
  )
}
