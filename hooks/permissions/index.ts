import { useDispatchPermissions } from "./StoreProvider";
import { TypesPermissions } from './PermissionsTypes';
import { getAll, postAll } from "@/utils/methods";
import urlApis from '@/routes_apis';

interface ISaveInfoPermissions {
    codePermission: string;
    description: string;
}

export function usePermissions() {
    const dispatch = useDispatchPermissions();
    return {
        async getOnePermissions(id: string){
            const permissions: any = await getAll(`${urlApis.API_INTRENET}/permissions/${id}`);
            dispatch({
                type: TypesPermissions.GET_PERMISSIONS,
                payload: {
                    permissions,
                },
            });
        },
        async getAllPermissions(){
            const permissions: any = await getAll(`${urlApis.API_INTRENET}/permissions`);

            dispatch({
                type: TypesPermissions.GET_PERMISSIONS,
                payload: {
                    permissions,
                },
            });
        },
        async savePermissions(data: ISaveInfoPermissions){
            await postAll(`${urlApis.API_INTRENET}/permissions`, data).then(async (res: any) => {
                if (res.status === 200){
                    const permissions: any = await getAll(`${urlApis.API_INTRENET}/permissions`);
                    dispatch({
                        type: TypesPermissions.GET_PERMISSIONS,
                        payload: {
                            permissions,
                        },
                    });
                }
            });
        },
    }
}
