import React, { useEffect, useState } from 'react';
import InputComponent from '../components/atoms/inputUi';
import Btn from '../components/atoms/btn';
import NamePage from '../components/atoms/namePage';
import TableUi from '../components/molecules/tableUi';
import Loading from '../components/molecules/loading';
import {
    ArrowUturnLeftIcon,
    DocumentTextIcon,
    UserIcon,
    PencilSquareIcon,
    EyeSlashIcon,
    IdentificationIcon,
    CurrencyBangladeshiIcon,
    UserCircleIcon
} from '@heroicons/react/20/solid';
import YearSelector from "../components/atoms/yearSelector";
import { postAll, getAll } from '../utils/methods';
import { isEmpty, get, sumBy } from 'lodash';
import { PDFViewer } from '@react-pdf/renderer';
import GeneratePdfComponents from '@/components/organisms/generatePdf';
import { GetDateMonthWithText, GetMonthForDate } from '@/utils/getMonthForDate';
import ModalFullComponent from '@/components/organisms/modalFullComponent';
import ModalComponents from '@/components/organisms/modalComponents';
import ConvertNumberToText from '@/utils/getNameOfNumberInText';
import { ConvertDecimal } from '@/utils/convertDecimal';
import { FormatForNamePdf } from '@/utils/formatForNamePdf';
import { getOneName } from '@/utils/getOneName';
import { calcularPorcentaje } from '@/utils/getPorcentage';
import { OrderDate } from '@/utils/orderDate';

const optionsMrAndMrs: string[] = ['Sr. ', 'Sra. '];

export default function DetalleReporte() {

  const [ dataUSD, setDataUSD ] = useState([]);
  const [ dataDOP, setDataDOP ] = useState([]);
  const [ vencMTn, setVencMT ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ modalPdf, setModalPdf ] = useState(false);
  const [ openEditName, setOpenEditName ] = useState(false);
  const [ nameClientModifid, setNameClientModifid] = useState('');
  const [ isNameModifid, setIsNameModifid] = useState(false);
  const [ mrAndMrs, setMrAndMrs] = useState(optionsMrAndMrs[0]);
  const [ code, setCode ] = useState('');
  const [ decimal, setDecimal ] = useState(0);
  const [ cent, setCent ] = useState(0);
  const [ integ, setInteg ] = useState(0);
  const [ selectYear, setSelectYear ]: any = useState(new Date().getFullYear());

  const getListIDMRif = async (body: {}) => {
      return await postAll('/api/getListIDMRif',body)
          .then((res: any) => {
          return res.data;
      });
  }

  const getListVencMT = async (body: {}) => {
     const info: any = await postAll('/api/getListVencMT', body).then((res: any) => {
         return res.data
     })
      setVencMT(info);
  }

  const onHandleSearchVencMT = async () => {
      setLoading(true);
      setVencMT([]);
      const info: any = await getListIDMRif({
          "Id": `${code.toLocaleUpperCase()}`,
          "Cual": "I"
      });

      if(!isEmpty(info) && info?.Rif) {
          await getListVencMT({
              "Hasta":`31/12/${selectYear}`,
              "rif": info?.Rif,
              "Desde": `01/01/${selectYear}`,
              "Mensualidad": "A"
          });
      }
      setLoading(false);
  }

  useEffect(() => {
      if (vencMTn.length) {
          const dop: any = [];
          const usd: any = [];
          let deci: number = 0;
          let totalMontoImpuestoUsd = 0;
          let totalMontoImpuestoDop = 0;
          vencMTn.map((item: any) => {
              if (item.Moneda_abrevia === "DOP") {
                  dop.push({
                      Fechavenc: item.Fechavenc,
                      Nominal: item.Nominal,
                      Contrap: item.Contrap,
                      // Impuesto: item.Impuesto,
                      Impuesto: (calcularPorcentaje(parseFloat(item.Contrap.replace(/,/g, '')), 10)).toFixed(2),
                      Mes: GetMonthForDate(item.Fechavenc)
                  })
              } 
              
              if(item.Moneda_abrevia === "USD") {
                  usd.push({
                      Fechavenc: item.Fechavenc,
                      Nominal: item.Nominal,
                      Contrap: (parseFloat(item.Contrap.replace(/,/g, '')) * parseFloat(item.Tcfinal)).toFixed(2),
                      // Impuesto: (parseFloat(item.Impuesto) * parseFloat(item.Tcfinal)).toFixed(2),
                      Impuesto: (calcularPorcentaje(parseFloat(item.Contrap.replace(/,/g, '')), 10) * parseFloat(item.Tcfinal)).toFixed(2),
                      Tcfinal: item.Tcfinal,
                      Mes: GetMonthForDate(item.Fechavenc)
                  })
              }
          });
          if (dop.length) {
              const totalMontoContrapDop = sumBy(dop, (item: any) => parseFloat(item.Contrap.replace(/,/g, '')));
              totalMontoImpuestoDop = sumBy(dop, (item: any) => parseFloat(item.Impuesto));

              dop.push({
                  Fechavenc: 'Total',
                  Nominal: '',
                  Contrap: `RD$ ${ConvertDecimal(totalMontoContrapDop.toFixed(2))}`,
                  Impuesto: `RD$ ${ConvertDecimal(totalMontoImpuestoDop.toFixed(2))}`,
                  Moneda_tc: '',
                  Mes: ''
              })
          }
          if (usd.length) {
              const totalMontoContrapUsd = sumBy(usd, (item: any) => parseFloat(item.Contrap.replace(/,/g, '')));
              totalMontoImpuestoUsd = sumBy(usd, (item: any) => parseFloat(item.Impuesto.replace(/,/g, '')));

              usd.push({
                  Fechavenc: 'Total',
                  Nominal: '',
                  Contrap: `RD$ ${ConvertDecimal(totalMontoContrapUsd.toFixed(2))}`,
                  Impuesto: `RD$ ${ConvertDecimal(totalMontoImpuestoUsd.toFixed(2))}`,
                  Mes: ''
              })
          }
          const plusImpustos: any = Number(totalMontoImpuestoDop + totalMontoImpuestoUsd).toFixed(2);
          setDecimal(plusImpustos);
          setDataDOP(dop);
          setDataUSD(usd);
      }
      console.log('vencMTn');
  }, [vencMTn]);

  useEffect(() => {
    if(decimal > 0) {
        try {
            setCent(parseFloat(decimal.toString().split('.')[1]));
            setInteg(parseFloat(decimal.toString().split('.')[0]));
        } catch(e) {
            setInteg(0);
            setCent(0);
            console.log(e);
        }
    }
    console.log('decimal');
  }, [decimal])

  return (
    <>
    {/* body view page */}
    <div className='mt-5 p-6'>
      <NamePage
          title={"Carta DGII"}
          backPage={"Lista de reportes"}
          backIcon={<ArrowUturnLeftIcon className="w-5 h-5 mr-2" /> }
          icon={<DocumentTextIcon className="w-7 h-7 mr-1" /> }
      />
      {/* Card search repo */}
      <div>
        <div className='rounded-lg shadow-sm border border-gray-200 bg-white mt-[40px] p-5 pb-7'>
          <p className='mb-7 text-slate-800 font-semibold text-[15px]'>Buscar un Reporte</p>
          {/* Form input for search report */}
          <div className='gap-4 grid md:grid-cols-2 sm:grid-cols-1 grid-cols-1 xl:grid-cols-3'>
            <div>
                <InputComponent
                    type={'text'}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setCode(e.target.value);
                    }}
                    defaultValue={code}
                    disabled={loading}
                    name={'code'}
                    label={'Codigo del cliente'}
                    placeholder={'Ingresar codigo del cliente'}
                />
            </div>
            {/*<SelectUi />*/}
            <YearSelector
                year={selectYear}
                setYear={setSelectYear}
            />
              <div className={'flex justify-end'}>
                  <div>
                      {
                        vencMTn.length ?
                            <>
                                <Btn
                                    label={"Exportar PDF"}
                                    onClick={() => setModalPdf(!modalPdf)}
                                    disabled={vencMTn.length === 0 ? true : false}
                                    color={"bg-gray-200 text-gray-400 font-base"}
                                    size={"w-auto mr-5"} />
                            </> : null
                      }
                      <Btn
                          label={"Buscar"}
                          disabled={loading || (code.length ? false : true)}
                          onClick={onHandleSearchVencMT}
                          color={`${!loading && (code.length ? true : false) ? 'bg-parvalColor' : 'bg-gray-200'}`}
                          size={"w-[130px]"} />
                  </div>
              </div>
          </div>

        </div>

          {
              !isEmpty(vencMTn) ?
                <>
                    <div className='rounded-lg shadow-sm border border-gray-200 bg-white mt-[40px] p-5 pb-7'>
                        <div className={'grid grid-cols-4 gap-4'}>
                            <div>
                                <div className='flex items-center justify-between'>
                                    <div className='grid grid-cols-12 gap-4'>
                                        <div className={'col-span-10'}>
                                            <div className='flex items-center text-yellow-500 '>
                                                <UserIcon className={"w-8 h-8 mr-2"} />
                                                <p className=' text-slate-800 font-medium text-lg'>
                                                    Nombre de cliente
                                                </p>
                                        </div>
                                        </div>
                                        <div className={'col-span-2'}>
                                            <div className='flex justify-end'>
                                                <div>
                                                    <PencilSquareIcon onClick={() => setOpenEditName(true)} style={{ cursor: 'pointer' }} className={"w-5 h-5 mr-2"} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p className={'text-slate-700'}> { isNameModifid && nameClientModifid !== '' ? `${mrAndMrs} ${nameClientModifid}` : getOneName(get(vencMTn[0], 'Nombrecliente', '')) } </p>
                            </div>
                            <div>
                                <div className='flex items-center justify-between'>
                                    <div className='flex items-center text-yellow-500 '>
                                        <IdentificationIcon className={"w-8 h-8 mr-2"} />
                                        <p className=' text-slate-800 font-medium text-lg'>
                                            Codigo Cliente
                                        </p>
                                    </div>
                                </div>
                                <p className={'text-slate-700'}> { get(vencMTn[0], 'Codigocliente', '') } </p>
                            </div>
                            <div>
                                <div className='flex items-center justify-between'>
                                    <div className='flex items-center text-yellow-500 '>
                                        <CurrencyBangladeshiIcon className={"w-8 h-8 mr-2"} />
                                        <p className=' text-slate-800 font-medium text-lg'>
                                            Tipo de persona
                                        </p>
                                    </div>
                                </div>
                                <p className={'text-slate-700'}> { get(vencMTn[0], 'Tppersonacliente', '') } </p>
                            </div>
                            <div>
                                <div className='flex items-center justify-between'>
                                    <div className='flex items-center text-yellow-500 '>
                                        <UserCircleIcon className={"w-8 h-8 mr-2"} />
                                        <p className=' text-slate-800 font-medium text-lg'>
                                            Ejecutivo
                                        </p>
                                    </div>
                                </div>
                                <p className={'text-slate-700'}> { get(vencMTn[vencMTn.length - 1], 'Nmejecutivo', '') } </p>
                            </div>
                        </div>
                    </div>
                    {/* Component Tab Ui */}
                    <TableUi data={vencMTn}/>
                </> : <>
                     {
                         loading ?
                             <>
                                <div className={'pt-20'}>
                                    <div className={'flex justify-center'}>
                                        <Loading name={'Cargando ...'} />
                                    </div>
                                </div>
                             </> : null
                     }
                 </>
          }

            <ModalComponents isOpen={openEditName} onClose={() => {
                setNameClientModifid('');
                setIsNameModifid(false);
                setOpenEditName(false);
            }}>
                <div className='p-2'>
                    <p className='mb-7 text-slate-800 font-semibold text-[15px]'>
                        Modificar nombre del documento
                    </p>
                    <div className='rounded-lg shadow-sm border border-gray-200 bg-white px-3 py-4'>
                        <div className='grid grid-cols-12 gap-4'>

                            <div className={'col-span-4'}>
                                <select
                                    name={"MrAndMrs"}
                                    value={mrAndMrs}
                                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                        setMrAndMrs(e.target.value);
                                    }} className={"mt-0 block w-full rounded h-[40px] border-0 py-1 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"}
                                >
                                    {
                                        optionsMrAndMrs.map((item: string, index: number) => (
                                            <>
                                            <option value={item} key={index}>{ item }</option>
                                            </>
                                        ))
                                    }
                                </select>
                            </div>

                            <div className={'col-span-8'}>
                                <input
                                    type={"text"}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        setNameClientModifid(e.target.value);
                                    }}
                                    value={nameClientModifid}
                                    name={"nameClientModifid"}
                                    className={"block w-full rounded border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"}
                                    placeholder={"Modificar nombre"}
                                />
                            </div>
                        </div>
                        <div className="mt-4 w-100">
                            <div className={'grid grid-cols-2 gap-4'}>
                                <div>
                                    <div>
                                        <Btn label={'Cancelar'} disabled={nameClientModifid === '' ? true : false} onClick={() => {
                                            setNameClientModifid('');
                                            setIsNameModifid(false);
                                            setOpenEditName(false);
                                        }} size={'w-30 mt-5'} color={'bg-gray-300 text-white'} />   
                                    </div>
                                </div>
                                <div>
                                    <div className={'flex justify-end'}>
                                        <Btn label={'Aceptar'} disabled={nameClientModifid === '' ? true : false} onClick={() => {
                                            setIsNameModifid(true)
                                            setOpenEditName(false);
                                        }} size={'w-30 mt-5'} color={`${nameClientModifid === '' ? 'bg-gray-300 text-white' : 'bg-parvalColor text-gray-400'} font-base`} />       
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ModalComponents>
          <ModalFullComponent
              isOpen={modalPdf}
              onClose={() => setModalPdf(!modalPdf)}
          >
            {
                modalPdf ?
                    <>
                         <PDFViewer width={'100%'} height={'100%'}>
                            <GeneratePdfComponents
                                date={GetDateMonthWithText(`${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`)}
                                dataAmountDOP={OrderDate(dataDOP)}
                                dataAmountUSD={OrderDate(dataUSD)}
                                year={selectYear}
                                decimal={String(cent).length > 1 ? cent : `0${cent}`}
                                Impuesto={ConvertDecimal(decimal)}
                                nameNumber={FormatForNamePdf(ConvertNumberToText(integ))}
                                Nombrecliente={isNameModifid && nameClientModifid !== '' ? `${mrAndMrs} ${nameClientModifid}` : `Sr(a) ${getOneName(FormatForNamePdf(get(vencMTn[0], 'Nombrecliente', '').trim()))}`}
                                rif_cotitular={get(vencMTn[0], 'Cedulacliente', '').trim()}
                            />
                        </PDFViewer>
                    </> : null
            }
          </ModalFullComponent>
      </div>
    </div>
    </>
  )
}
