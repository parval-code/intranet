import React, { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import NamePage from '@/components/atoms/namePage';
import { ArrowUturnLeftIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { CloudArrowUpIcon } from '@heroicons/react/20/solid';
import axios from 'axios';
import Btn from '@/components/atoms/btn';
import FormData from 'form-data';
import { checkOfRecportsSIMV } from '@/utils/checkOfReportsSIMV';
import Loading from '../components/molecules/loading';
import { useNotification } from '@/hooks/Notifications';
import { useStoreBinnacleSIMV } from "@/hooks/BinnacleSIMV/StoreProvider";
import { useBinnacleSIMV } from '@/hooks/BinnacleSIMV';    
import ModalComponents from '@/components/organisms/modalComponents';
import { useAuthLogin } from "@/hooks/AuthLogin";
import { useStoreAuthLogin } from '@/hooks/AuthLogin/StoreProvider';

const optionsSelects: {key: string, name: string}[] = [
  {key: 'CVCCD', name: 'Cartera de Custodia Semanal'},
  {key: 'CVCCM', name: 'Cartera de Custodia Mensual'},
];

function ReporteSIMVOperacionesComponents() {
  const { showNotification } = useNotification();
  const { getAuthLogin } = useAuthLogin();

  const { getAllBinnacleSIMV, saveBinnacleSIMV } : any = useBinnacleSIMV();

  useEffect(() => {
    async function fetchData() {
      await Promise.all([
        getAuthLogin(),
        getAllBinnacleSIMV(optionsSelects),
      ]);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { binnacleSIMV }: any = useStoreBinnacleSIMV();
  const { authLogin } = useStoreAuthLogin();

  const [selectedDate, setSelectedDate]: any = useState(null);
  const [year, setYear] = useState(null);
  const [month, setMonth] = useState(null);
  const [day, setDay] = useState(null);
  const [searchDate, setSearchDate]: any = useState(null);
  const [file, setFile] = useState<File | any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState('');
  const [nameOriginalFile, setNameOriginalFile] = useState('');
  const [loading, setLoading] = useState(false);
  const [ code, setCode ] = useState('CVCCD');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setError('');
    if (file) {
      const fileName = file.name;
      if (fileName.endsWith('.xml') || fileName.endsWith('.XML')) {
        setFile(file);
        setError('');
      } else {
        console.log('Error');
        setFile(null);
        setError('Error: Por favor, selecciona un archivo .xml.');
      }
    }
  };

  const handleFileUpload = async () => {
    setLoading(true);
    try {
      const dateActuality = new Date();
      const token = 'amX54AnE7S0COj64dvho3onkOWbKBSnu';
      const formatoDeArchivo = 0;
      let nameValidFile =  `api.simv.gob.doSRTPapiSendxml{${token}}{${code}} - ${dateActuality.getFullYear()}${dateActuality.getMonth() + 1}`
      if (code === 'CVCID') {
      nameValidFile =  `api.simv.gob.doSRTPapiSendxml{${token}}{${code}} - ${dateActuality.getFullYear()}${dateActuality.getMonth() + 1}${dateActuality.getDate()}`
      }
      // if(nameOriginalFile === nameValidFile) {

      const formData = new FormData();
      formData.append('file', file);

        await axios.post('/api/getReportSIMV', { file: formData }, { 
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          params: {
            token,
            formatoDeArchivo,
            code,
          },
        }).then(async (response: any) => {
            checkOfRecportsSIMV(response.data.Code, response.data.Message, showNotification);
            await saveBinnacleSIMV({
              documentType: code,
              department: 'Operaciones',
              createdBy: authLogin.id,
              createdAt: new Date(),
              dateSend: selectedDate,
              requirements: response.data.Message,
              status: response.data.Code === 1 ? true : false
            })
            setIsOpen(false);
          }).catch((error) => {
            console.error('Error en la solicitud:', error);
          });
          setSelectedDate(null);
        
      // } else {
      //   showNotification('El archivo elegido no coincide con el formato especificado.', 'error');
      // }
      
    } catch (error) {
      console.error('Error al enviar el archivo', error);
    }
    setLoading(false);
  }; 

  return (
    <>
      <div className='p-10'>
        <NamePage
            title={"Reporte de Operaciones SIMV"}
            backPage={"Lista de reportes"}
            backIcon={<ArrowUturnLeftIcon className="w-5 h-5 mr-2" /> }
            icon={<DocumentTextIcon className="w-7 h-7 mr-1" /> }
        />
          <div className='rounded-lg shadow-sm border border-gray-200 bg-white mt-[40px] p-5 pb-7'>
            <p className='mb-7 text-slate-800 font-semibold text-[15px]'>Enviar reporte</p>
            {/* Form input for search report */}
            <div className='gap-4 grid md:grid-cols-2 sm:grid-cols-1 grid-cols-1 xl:grid-cols-6'>
            <div className={'col-span-2'}>
              <select
                id={"reporte"}
                name={"reporte"}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  setCode(e.target.value);
                }}
                className={"mt-0 block w-full rounded h-[60px] border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"}
                >
                {
                  optionsSelects.map((item: any, index: number) => (
                    <>
                      <option value={item.key} key={index}>{ item.name }</option>
                    </>
                  ))
                }
              </select>
            </div>

            <div className="relative max-w-sm col-span-3">
              <div className={'grid grid-cols-2 gap-4'}>
                <div>
                    <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setSearchDate(e.target.value);
                      }} type="date" className="border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5 py-4 dark:focus:border-blue-500" placeholder="Select date" />
                </div>
                <div className="relative flex bg-gray-50 p-4 rounded items-start">
                  <div className="flex h-6 items-center">
                    <input
                      id="comments"
                      aria-describedby="comments-description"
                      name="comments"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="ml-3 text-sm leading-6 ">
                    <label htmlFor="comments" className="font-medium text-gray-900">
                      Enviado
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative col-span-1 max-w-sm">
                <div className={'flex justify-end'}
                  style={{ cursor: 'pointer' }}
                  >
                    <Btn
                          label={"Buscar"}
                          disabled={loading || (code.length ? false : true)}
                          onClick={() => console.log('hola')}
                          color={`${!loading && (code.length ? true : false) ? 'bg-parvalColor' : 'bg-gray-200'}`}
                          size={"w-[90px] h-[45px]"} />
                    <span className={'px-2'} />
                    <CloudArrowUpIcon onClick={() => setIsOpen(!isOpen)} className="w-12 h-12 text-slate-700 mb-6" />
             </div>
            </div>
          </div>
          </div>

          <div className='text-center pt-12'>
          {
              binnacleSIMV.length ?
                  <>
                      <div className="rounded border border-gray-200">
                        <div className="mt-8 flow-root">
                          <div className="-mx-4 -my-2 overflow-x-auto w-[400px] xl:w-auto md:w-auto sm:w-auto sm:-mx-6 lg:-mx-8 ">
                            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                              <table className="min-w-full divide-y divide-gray-300">
                                <thead>
                                  <tr>
                                    <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                                      Tipo de Documento
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                                      Departamento
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                                      Creado Por
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                                      Fecha de creación
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                                      Requerimiento
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                                      Estado
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                  { 
                                    binnacleSIMV.map((item: any, index: number) => (
                                      <>
                                        <tr key={index}>
                                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.documentType}</td>
                                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.department}</td>
                                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.createdBy}</td>
                                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.createdAt}</td>
                                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.requirements}</td>
                                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            <span className={"inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"}>
                                              {item.status ? 'Ingresado' : 'Conflictos'}
                                          </span>
                                          </td>
                                        </tr>
                                      </>
                                    ))
                                  }
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                  </> : <>
                    <div className={'pt-20'}>
                          <div className={'flex justify-center'}>
                            No hay registros para mostrar.
                          </div>
                      </div>
                  </>
          }
        </div>
      </div>
      <ModalComponents
        isOpen={isOpen}
        onClose={() => setIsOpen(!isOpen)}
      >
          <div className='rounded-lg shadow-sm border border-gray-200 bg-white p-5 pb-7'>
            <p className='mb-7 text-slate-800 font-semibold text-[15px]'>Enviar reporte</p>
            {/* Form input for search report */}
            <div className='gap-4 grid md:grid-cols-2 sm:grid-cols-1 grid-cols-2 xl:grid-cols-2'>
              <div>
                <select
                  id={"reporte"}
                  name={"reporte"}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    setCode(e.target.value);
                  }}
                  className={"mt-0 block w-full rounded h-[60px] border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"}
                  >
                  {
                    optionsSelects.map((item: any, index: number) => (
                      <>
                        <option value={item.key} key={index}>{ item.name }</option>
                      </>
                    ))
                  }
                </select>
              </div>
                  
              {/*<SelectUi />*/}
              {/* <InputDatepicker selectedDate={selectedDate} onChange={handleDateChange} /> */}
              <div className="relative max-w-sm">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                  </svg>
                </div>
                <input onChange={(e: React.ChangeEvent<HTMLInputElement>) =>  {
                  const selectedDateValue = e.target.value;
                  const dateObject: any = new Date(selectedDateValue);
                        
                  if (!isNaN(dateObject.getTime())) {
                    setSelectedDate(dateObject);
                          
                    setMonth(dateObject.getMonth() + 1);
                    setYear(dateObject.getFullYear());
                    setDay(dateObject.getDate());
                    setSelectedDate(selectedDateValue);
                  } else {
                    setSelectedDate(null);
                    console.error('Fecha no válida');
                  }
                }} type="date" className="border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 py-4 dark:focus:border-blue-500" placeholder="Select date" />
              </div>
            </div>
          </div>
          <div className='mt-[130px] flex justify-center text-center pb-12'>
          {
              loading ?
                  <>
                      <div className={'pt-20'}>
                          <div className={'flex justify-center'}>
                              <Loading name={'Cargando ...'} />
                          </div>
                      </div>
                  </> : <>
                  <div className="bg-[#f3ba0e1a] p-8 rounded">
                      <div className='flex justify-center'><CloudArrowUpIcon className="w-12 h-12 text-slate-700 mb-6" /></div>
                          <label className="hover:bg-parvalColor  hover:border-none cursor-pointer border-dotted border-2 border-slate-400 text-sm font-medium text-slate-700 py-2 px-4 rounded">
                          Seleccionar Archivo
                          <input
                              type="file"
                              accept={".xml"}
                              onChange={handleFileChange}
                              className={"hidden"}
                          />
                          </label>
                          {!isEmpty(error) && <p className="text-red-500 pt-4">{error}</p>}
                          {file && (
                          <div className="mt-4">
                              <p className="text-green-600">Archivo seleccionado:</p>
                              <p className="text-blue-500 font-semibold">{file.name}</p>
                              {
                                  isEmpty(error) ?
                                      <>
                                      <Btn label={'Enviar'} onClick={handleFileUpload} size={'w-60 mt-5'} color={'bg-parvalColor text-gray-400 font-base'} />
                                      </> : null
                              }
                              
                          </div>
                          )}
                      </div>
                  </>
          }
        </div>
      </ModalComponents>
    </>
  )
}

export default function ReporteOperacionesSIMV() {
  return (
    <>
      <ReporteSIMVOperacionesComponents />
    </>
  )
}
