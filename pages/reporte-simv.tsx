import React, { useState } from 'react';
import { isEmpty, get, sumBy } from 'lodash';
import NamePage from '@/components/atoms/namePage';
import { ArrowUturnLeftIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { CloudArrowUpIcon } from '@heroicons/react/20/solid';
import axios from 'axios';
import Btn from '@/components/atoms/btn';
import ROUTES_PUBLIC from '@/routes_apis';
import { useNotification } from '@/hooks/Notifications';

const optionsSelects: {key: string, name: string}[] = [
  {key: 'CVCCD', name: 'Cartera de Custodia Semanal'},
  {key: 'CVCCM', name: 'Cartera de Custodia Mensual'},
  {key: 'CVCID', name: 'Cartera de Inversión Semanal'},
  {key: 'CVCIM', name: 'Cartera de Inversión Mensual'}
]

export default function ReporteSIMV() {
const [ code, setCode ] = useState('CVCCD');

const [selectedDate, setSelectedDate]: any = useState(null);
const [file, setFile] = useState<File | any>(null);
const [error, setError] = useState('');
const [nameOriginalFile, setNameOriginalFile] = useState('');
const { showNotification } = useNotification();

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
  try {
    const dateActuality = new Date();
    const token = 'VisnjhuKZqAkB6WFbfdXiiAmtjBEj2TE';
    const formatoDeArchivo = 0;
    let nameValidFile =  `api.simv.gob.doSRTPapiSendxml{${token}}{${code}} - ${dateActuality.getFullYear()}${dateActuality.getMonth() + 1}`
    if (code === 'CVCID') {
     nameValidFile =  `api.simv.gob.doSRTPapiSendxml{${token}}{${code}} - ${dateActuality.getFullYear()}${dateActuality.getMonth() + 1}${dateActuality.getDate()}`
    }
    // if(nameOriginalFile === nameValidFile) {
      const formData = new FormData();
      formData.append('file', file, file.name);

      const apiUrl = `${ROUTES_PUBLIC.SEND_PDF_ROUTE}/${token}/${formatoDeArchivo}/${code}`;

      const data = await axios.post(apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      }).then((response: any) => {
        if(response.data.code === 0){

          showNotification(response.data.message, 'success');

        } else if(response.data.code === 1) {

            showNotification(response.data.message, 'error');
            
        } else if(response.data.code === 2) {

          showNotification(response.data.message, 'info');
          
        } else if(response.data.code === 3) {

            showNotification(response.data.message, 'error');

        } else if(response.data.code === 4) {

          showNotification(response.data.message, 'info');

        } else if(response.data.code === 5) {

          showNotification(response.data.message, 'error');

        }  else if(response.data.code === 6) {

            showNotification(response.data.message, 'error');

        }
      });
    // } else {
    //   showNotification('El archivo elegido no coincide con el formato especificado.', 'error');
    // }
    
  } catch (error) {
    console.error('Error al enviar el archivo', error);
  }
}; 

return (
  <>
    <div>
       <NamePage
          title={"Reporte SIMV"}
          backPage={"Lista de reportes"}
          backIcon={<ArrowUturnLeftIcon className="w-5 h-5 mr-2" /> }
          icon={<DocumentTextIcon className="w-7 h-7 mr-1" /> }
      />
        <div className='rounded-lg shadow-sm border border-gray-200 bg-white mt-[40px] p-5 pb-7'>
          <p className='mb-7 text-slate-800 font-semibold text-[15px]'>Enviar reporte</p>
          {/* Form input for search report */}
          <div className='gap-4 grid md:grid-cols-2 sm:grid-cols-1 grid-cols-1 xl:grid-cols-3'>
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
              <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setSelectedDate(e.target.value);
                }} type="date" className="border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 py-4 dark:focus:border-blue-500" placeholder="Select date" />
            </div>
          </div>
        </div>

      <div className='mt-[130px] flex justify-center text-center'>
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
      </div>
    </div>
  </>
  )
}
