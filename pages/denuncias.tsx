import React, { useEffect, useState } from 'react';
import { isEmpty, get } from 'lodash';
import { getAll } from '../utils/methods';
import { GetFormatDateAndYear } from '@/utils/getMonthForDate';
import { EyeIcon, PaperClipIcon } from '@heroicons/react/20/solid';
import ModalComponents from '@/components/organisms/modalComponents';
import moment from 'moment';

const stepPage: number = 12;

export default function DetalleReporte() {
    const [ show, setShow ] = useState(false);
    const [ complaints, setComplaints] = useState([]);
    const [ search, setSearch ] = useState('');
    const [ pageNumbers, setPageNumbers ]: any[] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [reportInfo, setReportInfo] = useState(null);
    const [ indexPaginate, setIndexPaginate ] = useState(1);
    const [ searchListComplaints, setSearchListComplaints ] = useState([]);
    const [ listPaginationData, setListPaginationData ] = useState([]);
    const [ searchEmailOrPhone, setSearchEmailOrPhone ] = useState('');
    const [startDate, setStartDate]: any = useState(null);
    const [endDate, setEndDate]: any = useState(null);

    const getListComplaints = async () => {
        await getAll('/api/getListComplaints').then((res: any) => {
          setComplaints(res);
        });
    }

    useEffect(() => {
        getListComplaints();
      }, []);

    useEffect(() => {
        if(!isEmpty(complaints)) {
          const indexOfLastItem = currentPage * stepPage;
          const indexOfFirstItem = indexOfLastItem - stepPage;
    
          setListPaginationData(complaints.slice(indexOfFirstItem, indexOfLastItem));
    
          const pageNumbersItems = [];
          for (let i = 1; i <= Math.ceil(complaints.length / stepPage); i++) {
            pageNumbersItems.push(i);
          }
          setPageNumbers(pageNumbersItems);
        }
    
    }, [complaints, currentPage]);

    useEffect(() => {
        console.log(startDate, endDate)
    }, [startDate, endDate])
    console.log(reportInfo, 'reportInfo')
    return(
        <>
            <div className="-mx-4 p-8 mb-32 sm:-mx-0">
                <div className='mb-[40px]'>
                    <h1 className='font-semibold text-xl'> Denuncias </h1>
                    <p className='font-light text-sm text-slate-500'>Verifica el Listado de denuncias</p>
                </div>
                
                <div style={{ height: '570px' }}>
                    <div className={'my-2 grid grid-cols-3 gap-2'}>
                        <div className={'p-2'}>
                            <label>Buscar por Email o Telefono</label>
                                <input 
                                    name={'searchEmailOrPhone'} 
                                    type={'text'}
                                    className={"border border-gray-300 text-sm h-[50px] rounded-md p-2 w-full"}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        const { value } = e.target;
                                        setSearchEmailOrPhone(value);
                                    }}
                                    value={searchEmailOrPhone} />
                        </div>
                        <div className={'p-2'}>
                            <label>Desde:</label>
                                <input 
                                    name={'startDate'}
                                    type={'date'}
                                    className={"border border-gray-300 text-sm h-[50px] rounded-md p-2 w-full"}
                                     onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        const { value } = e.target;
                                        setStartDate(value)
                                    }}
                                    min={new Date().toISOString().split('T')[0]}
                                    max={endDate}
                                    required
                                    value={startDate} />
                        </div>
                        <div className={'p-2'}>
                            <label>Hasta:</label>
                                <input 
                                    name={'endDate'} 
                                    type={'date'}
                                    className={"border border-gray-300 text-sm h-[50px] rounded-md p-2 w-full"}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        const { value } = e.target;
                                        setEndDate(value);
                                    }}
                                    min={startDate}
                                    value={endDate} />
                        </div>
                    </div>

                    <table className="min-w-full divide-y divide-gray-300">
                        <thead>
                        <tr>
                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Fecha Reporte</th>
                            <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"> Tipo de denuncia </th>
                            <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"> Phone </th>
                            <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"> Email </th>
                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0" />
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                        { complaints && complaints.length ? (!isEmpty(search) ? searchListComplaints : listPaginationData).map((report: any) => (
                            <>
                                <tr>
                                <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                    <div className="text-gray-900">{ `${GetFormatDateAndYear(report.createdAt)}` }</div>
                                </td>
                                <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                    <div className="mt-1 text-gray-500 "> { report.typeComplaint.name } </div>
                                </td>
                                <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                    <div className="mt-1 text-gray-500 "> { report.phone } </div>
                                </td>
                                <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                    <div className="mt-1 text-gray-500 "> { report.email } </div>
                                </td>
                                <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                    <div className="mt-1 text-gray-500" style={{ cursor:"pointer" }}> 
                                        <span onClick={() => {
                                            setShow(true);
                                            setReportInfo(report);
                                        }}> <EyeIcon className='hover:text-gray-700' /> </span>
                                    </div>
                                </td>
                                </tr>
                            </>
                            )) : null
                        }
                        </tbody>
                    </table>
                </div>
                <hr />
                {
                    complaints && complaints.length ?
                        <>
                        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                            <div>
                            <p className="text-sm text-gray-700">
                                <span className="font-medium">{ complaints.length }</span> resultados en total.
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
            <ModalComponents isOpen={show} onClose={() => {
                setShow(false);
                setReportInfo(null);
            }}>
                <>
                    <div className="isolate bg-white p-6">
                        <div>
                            <div className="px-4 sm:px-0">
                                <h3 className="text-base font-semibold leading-7 text-gray-900">Datalles de la Denuncia #{ reportInfo ? get(reportInfo, 'id', '') : null } </h3>
                                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Detalles de la denuncia mas apliado.</p>
                            </div>
                            <div className="mt-6">
                                <dl className="grid grid-cols-1 sm:grid-cols-2">
                                <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Tipo de denuncia</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2"> { reportInfo ? get(reportInfo, 'typeComplaint.name', '') : null } </dd>
                                </div>
                                <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Fecha de Envio</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2"> { reportInfo ? moment(get(reportInfo, 'createdAt', '')).locale('es-do').format('llll') : null } </dd>
                                </div>
                                <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Email comunicacion</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{ reportInfo ? get(reportInfo, 'email', '') : null }</dd>
                                </div>
                                <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Telefono de Contacto</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2"> { reportInfo ? get(reportInfo, 'phone', '') : null } </dd>
                                </div>
                                <div className="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900"> Descripcion de la denuncia </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2 p-1" style={{ width: '500px', height: '100px' }}>
                                        { reportInfo ? get(reportInfo, 'comment', '') : null }
                                    </dd>
                                </div>
                                <div className="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Imagenes Attachments</dt>
                                    <dd className="mt-2 text-sm text-gray-900">
                                    <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                                        <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                            <div className="flex w-0 flex-1 items-center">
                                                <PaperClipIcon aria-hidden="true" className="h-5 w-5 flex-shrink-0 text-gray-400" />
                                                <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                                <span className="truncate font-medium">resume_back_end_developer.pdf</span>
                                                <span className="flex-shrink-0 text-gray-400">2.4mb</span>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                    </dd>
                                </div>
                                </dl>
                            </div>
                        </div>
                    </div>   
                </>
            </ModalComponents>
        </>
    )

}