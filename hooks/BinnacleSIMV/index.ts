import { useDispatchBinnacleSIMV } from "./StoreProvider";
import { TypesBinnacleSIMV } from './binnacleSIMVTypes';
import urlApis from '@/routes_apis';
import { set, isEmpty } from 'lodash'; 
import { postAll, getAll } from "@/utils/methods";
import { GetDateMonthWithText } from '@/utils/getMonthForDate';

export function useBinnacleSIMV() {
    const dispatch = useDispatchBinnacleSIMV();
    return {
        async getAllBinnacleSIMV(filter: any[] = []){
            const binnacleSIMV: any = await getAll(`${urlApis.API_INTRENET}/binnacle-SIMV`);
            const dataBinnacleSIMV: any[] = [];

            for(let x: number = 0; filter.length > x; x++) {
                const data = binnacleSIMV.filter((item: any) => {
                    if(item.documentType === filter[x].key) {
                        let dateFormant
                        try {
                            dateFormant = String(item.createdAt).split('T')[0];
                        } catch(e: any) {
                            dateFormant = item.createdAt;
                        }
                        set(item, 'documentType', filter[x].name);
                        set(item, 'createdAt', dateFormant);
                        return item;
                    }
                });
                if(!isEmpty(data)) {
                    dataBinnacleSIMV.push(...data);
                }

            }

            dispatch({
                type: TypesBinnacleSIMV.GET_BINNACLE_SIMV,
                payload: {
                    binnacleSIMV: dataBinnacleSIMV,
                },
            })
        },
        async saveBinnacleSIMV(data: any){
            await postAll(`${urlApis.API_INTRENET}/binnacle-SIMV`, data).then(async (res: any) => {
                if (res.status === 200){
                    const binnacleSIMV: any = await getAll(`${urlApis.API_INTRENET}/binnacle-SIMV`);
                    dispatch({
                        type: TypesBinnacleSIMV.GET_BINNACLE_SIMV,
                        payload: {
                            binnacleSIMV,
                        },
                    });
                }
            });
        },
    }
}
