import { useDispatchFileSystemDepartments } from "./StoreProvider";
import { TypesFileSystemDepartments } from './fileSystemDepartmentsTypes';
import { getAll, postAll, updateAll } from "@/utils/methods";
import urlApis from '@/routes_apis';

interface ISaveInfoFileSystemDepartments {
    name: string;
    description: string;
    manager: string;
}

export function useFileSystemDepartments() {
    const dispatch = useDispatchFileSystemDepartments();
    return {
        async getOneFileSystemDepartments(id: string){
            const fileSystemDepartments: any = await getAll(`${urlApis.API_INTRENET}/file-system-departments?id=${id}`);
            dispatch({
                type: TypesFileSystemDepartments.GET_FILE_SYSTEM_DEPARTMENTS,
                payload: {
                    fileSystemDepartments,
                },
            });
        },
        async getAllFileSystemDepartments(){
            const fileSystemDepartments: any = await getAll(`${urlApis.API_INTRENET}/file-system-departments`);
            
            dispatch({
                type: TypesFileSystemDepartments.GET_FILE_SYSTEM_DEPARTMENTS,
                payload: {
                    fileSystemDepartments,
                },
            });
        },
        async saveFileSystemDepartments(data: ISaveInfoFileSystemDepartments){
            await postAll(`${urlApis.API_INTRENET}/file-system-departments`, data).then(async (res: any) => {
                if (res.status === 200){
                    const fileSystemDepartments: any = await getAll(`${urlApis.API_INTRENET}/file-system-departments`);
                    dispatch({
                        type: TypesFileSystemDepartments.GET_FILE_SYSTEM_DEPARTMENTS,
                        payload: {
                            fileSystemDepartments,
                        },
                    });
                }
            });
        },
        async updateFileSystemDepartments(id: number, data: any){
            await updateAll(`${urlApis.API_INTRENET}/file-system-departments/${id}`, data).then(async (res: any) => {
                if (res.status === 200){
                    const fileSystemDepartments: any = await getAll(`${urlApis.API_INTRENET}/file-system-departments`);
                    dispatch({
                        type: TypesFileSystemDepartments.GET_FILE_SYSTEM_DEPARTMENTS,
                        payload: {
                            fileSystemDepartments,
                        },
                    });
                }
            });
        },
        async sendNotificationFileSystemDepartments(data: any){
            console.log(data, 'data')
            await postAll(`${urlApis.API_INTRENET}/send-notification-new-folders`, data).then(async (res: any) => {
                if (res.status === 200){
                    return { send: true }
                }
            });
        },
    }
}
