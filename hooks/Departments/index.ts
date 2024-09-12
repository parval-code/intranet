import { useDispatchDepartments } from "./StoreProvider";
import { TypesDepartments } from './departmentsTypes';
import { getAll, postAll } from "@/utils/methods";
import urlApis from '@/routes_apis';

interface ISaveInfoDepartments {
    name: string;
    description: string;
    manager: string;
}

export function useDepartments() {
    const dispatch = useDispatchDepartments();
    return {
        async getOneDepartments(id: string){
            const departments: any = await getAll(`${urlApis.API_INTRENET}/departments?id=${id}`);
            dispatch({
                type: TypesDepartments.GET_DEPARTMENTS,
                payload: {
                    departments,
                },
            });
        },
        async getAllDepartments(){
            const departments: any = await getAll(`${urlApis.API_INTRENET}/departments`);
            
            dispatch({
                type: TypesDepartments.GET_DEPARTMENTS,
                payload: {
                    departments,
                },
            });
        },
        async saveDepartments(data: ISaveInfoDepartments){
            await postAll(`${urlApis.API_INTRENET}/categories-news`, data).then(async (res: any) => {
                if (res.status === 200){
                    const departments: any = await getAll(`${urlApis.API_INTRENET}/departments`);
                    dispatch({
                        type: TypesDepartments.GET_DEPARTMENTS,
                        payload: {
                            departments,
                        },
                    });
                }
            });
        },
    }
}
