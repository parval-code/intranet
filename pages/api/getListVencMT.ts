import { NextApiRequest, NextApiResponse } from 'next';
import { set, isEmpty, get } from 'lodash';
import { postAll } from '../../utils/methods';
import { subDays, parse, isWithinInterval } from 'date-fns';
import urlApis from '@/routes_apis';

const getListVencMT = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        try {
            let info: {} = {
                Json: true,
            };
            if (req.body) {
                set(info, 'Param', req.body);
            }
            const response =  await postAll(`${urlApis.PVIEW_REST_CONES}/WDame_vencMT`, info)
                .then((res: any) => {
                    const data: any[] = res.data.CadJson.Operacion;
                    const aniInfoMonth: any = [];
                    const aniInfoNotMonth: any = [];

                    if(!isEmpty(data)) {
                        for(let x: number = 0; data.length > x; x++) {
                            if(!isEmpty(data[x].Mensualidades) && !isEmpty(data[x].Mensualidades.Mensualidad)) {
                                for(let z: number = 0; data[x].Mensualidades.Mensualidad.length > z; z++) {
                                    const { Fechavenc, Contrap, Impuesto, ...otros } = data[x];
                                    aniInfoMonth.push({
                                        ...otros,
                                        Fechavenc: get(data[x].Mensualidades.Mensualidad[z], 'Pago', ''),
                                        Contrap: get(data[x].Mensualidades.Mensualidad[z], 'Monto', 0),
                                        Impuesto: get(data[x].Mensualidades.Mensualidad[z], 'Impuesto', ''),
                                        llegue: true,
                                    })
                                }
                            } else  {
                                aniInfoNotMonth.push(data[x]);
                            }   
                        }
                    }
                    return [...aniInfoNotMonth, ...aniInfoMonth];
            });

            if(!isEmpty(response)) {
                const paramsDateHappiness = {
                    Json: true,
                    Param: {
                        "Cotitulo": "000001",
                        "Desde": `${req.body.Desde}`,
                        "Hasta":`${req.body.Hasta}`,
                    }
                }
                const dateHappinness = await postAll(`${urlApis.PVIEWISAPIPRO}/WDame_Precios`, paramsDateHappiness)
                .then((res: any) => {
                    return get(res.data.CadJson, 'Precios.Precio', []);
                });
                // this formart of data this utility a formart of date ej: dd/mm/yyyy
                // mapping with Fechavenc
                const formartDate: string = 'dd/MM/yyyy';
                if(!isEmpty(dateHappinness)) {
                    for(let x: number = 0; response.length > x; x++) {
                        if(response[x].Moneda_abrevia === "USD") {
                            const date: Date = parse(response[x].Fechavenc, formartDate, new Date());
                            const formartDateEnd: Date = subDays(date, 1);
                            const formartDateStart: Date = subDays(date, 5);
                        
                            const dateList =  dateHappinness.filter((item: any) => {
                                const date: Date = parse(item.Fechaprecio, formartDate, new Date());
                                return isWithinInterval(date, { start: formartDateStart, end: formartDateEnd });
                            });

                            if(!isEmpty(dateList)) {
                                const TcfinalSel = dateList[dateList.length - 1];
                                set(response[x], 'Tcfinal', get(TcfinalSel, 'Preciov', 0));
                            }
                            
                        }
                    }
                    
                }

            }

            let cleanDataDate: any[] = [];

            if(!isEmpty(response)) {
                cleanDataDate = response.filter((item: any) => String(item.Fechavenc.split('/')[2]) === String(req.body.Desde.split('/')[2]));
            }

            res.status(200).json(cleanDataDate);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener los datos de la API' });
        }
    } else {
        res.status(405).json({ error: 'Método no permitido' });
    }
};

export default getListVencMT;
