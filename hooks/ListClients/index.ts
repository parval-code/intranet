import { useDispatchListClients } from "./StoreProvider";
import { TypesListClients } from './listClientsTypes';
import urlApis from '@/routes_apis';
import { set, isEmpty } from 'lodash'; 
import { getAll } from "@/utils/methods";

export function useListClients() {
    const dispatch = useDispatchListClients();
    return {
        async getAllListClients(){
            const listClients: any = await getAll(`${urlApis.URL_RATE_YIELD}/accounts-client-la`);
            
            dispatch({
                type: TypesListClients.GET_LIST_CLIENTS,
                payload: {
                    listClients,
                },
            });
        },
    }
}
