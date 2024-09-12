import { useDispatchUsersPermissions } from "./StoreProvider";
import { TypesUsersPermissions } from './usersPermissionsTypes';
import { getAll, postAll, updateAll } from "@/utils/methods";
import urlApis from '@/routes_apis';

interface ISaveInfoUsersPermissions {
    userId: string;
    permissions: string[];
}

export function useUsersPermissions() {
    const dispatch = useDispatchUsersPermissions();
    return {
        async getOneUsersPermissions(userId: string){
            const usersPermissions: any = await getAll(`${urlApis.API_INTRENET}/users-permissions?userId=${userId}`);
            dispatch({
                type: TypesUsersPermissions.GET_USER_PERMISSIONS,
                payload: {
                    usersPermissions,
                },
            });
        },
        async getAllUsersPermissions(){
            const usersPermissions: any = await getAll(`${urlApis.API_INTRENET}/users-permissions`);

            dispatch({
                type: TypesUsersPermissions.GET_USER_PERMISSIONS,
                payload: {
                    usersPermissions,
                },
            });
        },
        async saveUsersPermissions(data: ISaveInfoUsersPermissions){
            await postAll(`${urlApis.API_INTRENET}/users-permissions`, data).then(async (res: any) => {
                if (res.status === 200){
                    const usersPermissions: any = await getAll(`${urlApis.API_INTRENET}/users-permissions`);
                    dispatch({
                        type: TypesUsersPermissions.GET_USER_PERMISSIONS,
                        payload: {
                            usersPermissions,
                        },
                    });
                }
            });
        },
        async updateUsersPermissions(id: number | string, data: ISaveInfoUsersPermissions){
            await updateAll(`${urlApis.API_INTRENET}/users-permissions/${id}`, data).then(async (res: any) => {
                if (res.status === 200){
                    const usersPermissions: any = await getAll(`${urlApis.API_INTRENET}/users-permissions`);
                    dispatch({
                        type: TypesUsersPermissions.GET_USER_PERMISSIONS,
                        payload: {
                            usersPermissions,
                        },
                    });
                }
            });
        },
    }
}
