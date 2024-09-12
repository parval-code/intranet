import { useDispatchReasonAbsence } from "./StoreProvider";
import { TypesReasonAbsence } from './PersonTypes';
import { getAll, postAll, getId } from "@/utils/methods";
import urlApis from '@/routes_apis';

interface ISaveInfoReasonAbsence {
    name: string;
    description: string;
}

export function useReasonAbsence() {
    const dispatch = useDispatchReasonAbsence();
    return {
        async getOneReasonAbsence(id: string){
            // const reasonAbsence: any = await getId(`${urlApis.API_INTRENET}/reason-absence/${id}`);
            // console.log(reasonAbsence);
            const reasonAbsence: any = await getAll(`${urlApis.API_INTRENET}/reason-absence?id=${id}`);
            dispatch({
                type: TypesReasonAbsence.GET_REASON_ABSENCE,
                payload: {
                    reasonAbsence,
                },
            });
        },
        async getAllReasonAbsence(){
            const reasonAbsence: any = await getAll(`${urlApis.API_INTRENET}/reason-absence`);

            dispatch({
                type: TypesReasonAbsence.GET_REASON_ABSENCE,
                payload: {
                    reasonAbsence,
                },
            });
        },
        async saveReasonAbsence(data: ISaveInfoReasonAbsence){
            await postAll(`${urlApis.API_INTRENET}/reason-absence`, data).then(async (res: any) => {
                if (res.status === 200){
                    const reasonAbsence: any = await getAll(`${urlApis.API_INTRENET}/reason-absence`);
                    dispatch({
                        type: TypesReasonAbsence.GET_REASON_ABSENCE,
                        payload: {
                            reasonAbsence,
                        },
                    });
                }
            });
        },
    }
}
