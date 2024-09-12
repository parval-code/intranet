import React, { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css'
import Link from 'next/link';
import Btn from '@/components/atoms/btn';
import YearSelector from "@/components/atoms/yearSelector";
import { useHappinnessDays } from '@/hooks/HappinnessDays'; 
import { useStoreHappinnessDays } from "@/hooks/HappinnessDays/StoreProvider"; 
import { useAuthLogin } from "@/hooks/AuthLogin";
import { useStoreAuthLogin } from '@/hooks/AuthLogin/StoreProvider';
import { useRouter } from 'next/router';
import { useReasonAbsence } from '@/hooks/ReasonAbsence'; 
import { useVacations } from '@/hooks/Vacations'; 
import { useStoreReasonAbsence } from "@/hooks/ReasonAbsence/StoreProvider";
import { useNotification } from '@/hooks/Notifications';
import { get, isEmpty } from 'lodash';  
import { calcularDiferenciaToDays } from '@/utils/getMonthForDate';

// menos 3 year son 14 dias
// mas 3 year son 20 dias

// maternidad 98 dias


function FormRequestsComponents() {
    const router = useRouter();
    const { id }: any = useRouter().query;

    const [loading, setLoading] = useState(false);
    const [checkDepartament, setCheckDepartament] = useState(false);
    const [ selectYear, setSelectYear ]: any = useState(new Date().getFullYear());
    const { showNotification } = useNotification();
    const [startDate, setStartDate]: any = useState(null);
    const [requestedDays, setRequestedDays] = useState(0);
    const [commentRRHH, setCommentRRHH] = useState('');
    const [endDate, setEndDate]: any = useState(null);

    const { getOneReasonAbsence } = useReasonAbsence();
    const { getAuthLogin } = useAuthLogin();
    const { saveVacations } = useVacations();
    const { getAllHappinnessDays } = useHappinnessDays();

    const { reasonAbsence } = useStoreReasonAbsence() || {};
    const { authLogin } = useStoreAuthLogin() || {};
    const { happinnessDays } = useStoreHappinnessDays() || [];

    useEffect(() => {
        async function fetchData() {
            await Promise.all([
                getAuthLogin(),
              getOneReasonAbsence(id),
             
            ]);
          }
        if(id) {
            fetchData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        async function fetchData() {
            await Promise.all([
                getAllHappinnessDays()
            ]);
          }
        if(isEmpty(happinnessDays)) {
            fetchData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if(get(authLogin, 'area.id', 0) || get(authLogin, 'area', 0)) {
            setCheckDepartament(true)
        } else {
            setCheckDepartament(false)
        }
    }, [authLogin])

    const clearInfo = () => {
        setStartDate(null);
        setRequestedDays(0);
        setCommentRRHH('');
        setEndDate(null);
    }

    useEffect(() => {
        if(startDate && endDate) {
            try {
                setRequestedDays(calcularDiferenciaToDays(startDate, endDate, happinnessDays));
            } catch(e: any) {
                setRequestedDays(requestedDays);
                console.log(e);
            }
        }
    }, [startDate, endDate])

    const onSaveVacationsHandle = async () => {
            setLoading(true);
            await saveVacations({
                dateEnd: endDate,
                dateStart: startDate,
                commentRRHH: commentRRHH,
                department: get(authLogin, 'area.id', 0) ? authLogin.area.id : get(authLogin, 'area', 0),
                year: selectYear,
                quantityDay: requestedDays,
                approvedRRHH: false,
                reasonAbsence: id,
                userId: authLogin.id
            }).then(() => {
                setLoading(false);
                clearInfo();
                showNotification('Se Registro sus vacaciones.', "success");
                router.push('/rrhh/solicitudes');
            });
            setLoading(false);
    }
  return (
    <>
        <div className='p-8'>
            {/* title */}
            <div className='mb-[40px]'>
            <h1 className='font-semibold text-xl'>Vacaciones</h1>
            <p className='font-light text-sm text-slate-500'>
                {
                    reasonAbsence && reasonAbsence.name
                }
            </p>
            </div>

            <div className='text-[15px] grid md:flex leading-8 justify-between bg-[#F9FAFB] p-6 rounded-md border-solid border-[1px] border-[#E0E2E5]'>
                <div className='grid md:flex'>
                    <p>
                        {
                            authLogin && authLogin.displayName
                        }
                    </p>
                    <p className='ml-0 md:ml-20 font-light text-[#6B7280]'>
                        Cargo: {
                            authLogin && authLogin.jobTitle
                        }
                    </p>
                    <p className='ml-0 md:ml-20 font-light'>
                        Encargado: <span className='text-[#6B7280]'>{
                            authLogin && get(authLogin, 'area.infoManager.name', '')
                        }</span>
                    </p>
                </div>
                {/* <div className='font-light'>Cantidad de dias: {requestedDays} / {quantityDay}</div> */}
            </div>
            
            {/* form content */}
            <div className='mt-10'>
                <span className='text-sm'>Duración de la solicitud</span>
                <div className='mt-2 flex items-center'>
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
                    <div className={'mt-2'}>
                        <div className={'h-12'}>
                            <YearSelector
                                year={selectYear}
                                setYear={setSelectYear}
                                maxYear={2}
                            />
                        </div>
                    </div>
                    <div className='text[#1D293C] ml-5'>
                        <p className='font-light'> {requestedDays} Dias solicitados</p>
                        {/* <p className='text-sm text-gray-600'><b> { quantityDay - requestedDays } Dias nuevos</b> |  saldo pendiente</p> */}
                    </div>
                </div>
                <div className='mt-10'>
                    <label htmlFor="commentRRHH" className="block text-sm font-medium leading-6 text-gray-900">
                    Agrege una nota
                    </label>
                    <div className="mt-2">
                        <textarea
                            rows={4}
                            name={"commentRRHH"}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                                e.preventDefault();
                                setCommentRRHH(e.target.value);
                            }}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 sm:text-sm sm:leading-6"
                            value={commentRRHH}
                        />
                    </div>
                </div>

                <div className='flex justify-between mt-10 mb-10'>
                    <Link href={'/rrhh/solicitudes'}>
                        <Btn 
                            label={'volver atras'} 
                            size={''} 
                            color={'border-solid border-[1px] border-[#D0D4D8]'} />
                    </Link>
                    {
                        loading ?
                            <>
                                <button type="button" className={`bg-parvalColor rounded  px-3 py-2 text-[14px] font-normal text-slate-700  hover:bg-yellow-500`} disabled>
                                    <svg aria-hidden="true" className="inline w-8 h-8 px-1 text-gray-200 animate-spin dark:text-white fill-yellow-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                    </svg>
                                    <span className='px-2 font-normal text-wrap'>Processing...</span>
                                </button>
                            </> :
                            <>
                                {
                                    checkDepartament ?
                                        <>
                                            <Btn 
                                                label={'Enviar solicitud'}
                                                onClick={onSaveVacationsHandle} size={''} 
                                                color={'bg-parvalColor'}/>
                                        </> : 
                                        <>
                                            <button type="button" className={`bg-gray-200 rounded  px-3 py-2 text-[14px] font-normal text-slate-700`} disabled>
                                                Enviar solicitud
                                            </button>    
                                        </>
                                }
                            </>
                    }
                </div>
            </div>
        </div>
    </>
  )
}

export default function FormRequests(){
    return (
        <>
            <FormRequestsComponents />
        </>
    );
}
