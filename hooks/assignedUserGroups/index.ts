import { useDispatchAssignedUserGroups } from "./StoreProvider";
import { TypesAssignedUserGroups } from './assignedUserGroupsTypes';
import { getAll, postAll } from "@/utils/methods";
import urlApis from '@/routes_apis';

interface ISaveInfoAssignedUserGroups {
    userId: string;
    group: string;
}

export function useAssignedUserGroups() {
    const dispatch = useDispatchAssignedUserGroups();
    return {
        async getAllAssignedUserGroups(userId: string){
            const assignedUserGroups: any = await getAll(`${urlApis.API_INTRENET}/assigned-user-groups?userId=${userId}`);

            dispatch({
                type: TypesAssignedUserGroups.GET_ASSIGNED_USER_GROUPS,
                payload: {
                    assignedUserGroups,
                },
            });
        },
        async saveAssignedUserGroups(data: ISaveInfoAssignedUserGroups){
            await postAll(`${urlApis.API_INTRENET}/assigned-user-groups`, data).then(async (res: any) => {
                if (res.status === 200){
                    const assignedUserGroups: any = await getAll(`${urlApis.API_INTRENET}/assigned-user-groups`);
                    dispatch({
                        type: TypesAssignedUserGroups.GET_ASSIGNED_USER_GROUPS,
                        payload: {
                            assignedUserGroups,
                        },
                    });
                }
            });
        },
        async updatedAssignedUserGroups(data: any){
            await postAll(`${urlApis.API_INTRENET}/updated-gruop-persons`, data).then(async (res: any) => {
                if (res.status === 200){
                    const assignedUserGroups: any = await getAll(`${urlApis.API_INTRENET}/assigned-user-groups`);
                    dispatch({
                        type: TypesAssignedUserGroups.GET_ASSIGNED_USER_GROUPS,
                        payload: {
                            assignedUserGroups,
                        },
                    });
                }
            });
        },
    }
}
