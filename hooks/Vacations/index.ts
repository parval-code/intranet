import { useDispatchVacations } from "./StoreProvider";
import { TypesVacations } from './VacationsTypes';
import { getAll, postAll, updateAll } from "@/utils/methods";
import urlApis from '@/routes_apis';

interface ISaveInfoVacations {
    userId: string;
    commentRRHH: string;
    reasonAbsence: number;
    approvedRRHH: boolean;
    dateStart: string;
    dateEnd: string;
    department: number;
    quantityDay: number;
    year: number;
}

export function useVacations() {
    const dispatch = useDispatchVacations();
    return {
        async getOneVacations(userId: string){
            const vacations: any = await getAll(`${urlApis.API_INTRENET}/vacations?userId=${userId}`);
            dispatch({
                type: TypesVacations.GET_VACATIONS,
                payload: {
                    vacations,
                },
            });
        },
        async getAllVacations(){
            const vacations: any = await getAll(`${urlApis.API_INTRENET}/vacations`);

            dispatch({
                type: TypesVacations.GET_VACATIONS,
                payload: {
                    vacations: vacations.reverse(),
                },
            });
        },
        async getAllVacationsApprovedForSupervisor(){
            const vacations: any = await getAll(`${urlApis.API_INTRENET}/vacations?approved=1`);

            dispatch({
                type: TypesVacations.GET_VACATIONS,
                payload: {
                    vacations: vacations.reverse(),
                },
            });
        },
        async getAllForIdSupervisorVacations(departmentId: number | string){
            const vacations: any = await getAll(`${urlApis.API_INTRENET}/vacations?department=${departmentId}`);

            dispatch({
                type: TypesVacations.GET_VACATIONS,
                payload: {
                    vacations: vacations.reverse(),
                },
            });
        },
        async saveVacations(data: ISaveInfoVacations){
            await postAll(`${urlApis.API_INTRENET}/vacations`, data).then(async (res: any) => {
                if (res.status === 200){
                    const vacations: any = await getAll(`${urlApis.API_INTRENET}/vacations`);
                    dispatch({
                        type: TypesVacations.GET_VACATIONS,
                        payload: {
                            vacations: vacations.reverse(),
                        },
                    });
                }
            });
        },
        async updatedVacations(id: number | string, data: any){
            await updateAll(`${urlApis.API_INTRENET}/vacations/${id}`, data).then(async (res: any) => {
                if (res.status === 200){
                    const vacations: any = await getAll(`${urlApis.API_INTRENET}/vacations`);
                    dispatch({
                        type: TypesVacations.GET_VACATIONS,
                        payload: {
                            vacations: vacations.reverse(),
                        },
                    });
                }
            });
        },
    }
}
