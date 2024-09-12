import { useDispatchLocation } from "./StoreProvider";
import { TypesLocation } from './locationTypes';
import { getAll, postAll } from "@/utils/methods";
import urlApis from '@/routes_apis';

interface ISaveInfoLocation {
    name: string;
}

export function useLocation() {
    const dispatch = useDispatchLocation();
    return {
        async getOneLocation(id: string){
            const location: any = await getAll(`${urlApis.API_INTRENET}/location?id=${id}`);
            dispatch({
                type: TypesLocation.GET_LOCATION,
                payload: {
                    location,
                },
            });
        },
        async getAllLocation(){
            const location: any = await getAll(`${urlApis.API_INTRENET}/location`);
            
            dispatch({
                type: TypesLocation.GET_LOCATION,
                payload: {
                    location,
                },
            });
        },
        async saveLocation(data: ISaveInfoLocation){
            await postAll(`${urlApis.API_INTRENET}/location`, data).then(async (res: any) => {
                if (res.status === 200){
                    const location: any = await getAll(`${urlApis.API_INTRENET}/location`);
                    dispatch({
                        type: TypesLocation.GET_LOCATION,
                        payload: {
                            location,
                        },
                    });
                }
            });
        },
    }
}
