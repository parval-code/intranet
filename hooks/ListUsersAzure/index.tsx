import { useDispatchListUsersAzure } from "./StoreProvider";
import { TypesListUsersAzure } from './ListUsersAzureTypes';
import { getAll, postAll } from "@/utils/methods";

export function useListUsersAzure() {
    const dispatch = useDispatchListUsersAzure();
    return {
        // async getAllListUsersAzure(listUsersAzure: any[] = []) {
        //     dispatch({
        //         type: TypesListUsersAzure.GET_LIST_USERS_AZURE,
        //         payload: {
        //             listUsersAzure,
        //         },
        //     });
        // },
        saveListUsersAzure(listUsersAzure: any[] = []) {
            dispatch({
                type: TypesListUsersAzure.POST_LIST_USERS_AZURE,
                payload: {
                    listUsersAzure,
                },
            });
        }
    }
}
