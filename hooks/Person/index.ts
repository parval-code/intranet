import { useDispatchPerson } from "./StoreProvider";
import { TypesPerson } from './PersonTypes';
import { getAll, postAll, updateAll } from "@/utils/methods";
import urlApis from '@/routes_apis';

interface ISaveInfoPersons {
    userId: string;
    urlImage: string;
    birthdate?: string;
}

export function usePerson() {
    const dispatch = useDispatchPerson();
    return {
        async getOnePerson(userId: string){
            const person: any = await getAll(`${urlApis.API_INTRENET}/persons?userId=${userId}`);
            dispatch({
                type: TypesPerson.GET_PERSON,
                payload: {
                    person,
                },
            });
        },
        async getAllPersons(){
            const person: any = await getAll(`${urlApis.API_INTRENET}/persons?status=1`);

            dispatch({
                type: TypesPerson.GET_PERSON,
                payload: {
                    person,
                },
            });
        },
        async savePerson(data: any){
            await postAll(`${urlApis.API_INTRENET}/persons`, data).then(async (res: any) => {
                if (res.status === 200){
                    const person: any = await getAll(`${urlApis.API_INTRENET}/persons`);
                    dispatch({
                        type: TypesPerson.GET_PERSON,
                        payload: {
                            person,
                        },
                    });
                }
            });
        },
        async updatedPerson(id: number | string, data: any,){
            await updateAll(`${urlApis.API_INTRENET}/persons/${id}`, data).then(async (res: any) => {
                if (res.status === 200){
                    const person: any = await getAll(`${urlApis.API_INTRENET}/persons`);
                    dispatch({
                        type: TypesPerson.GET_PERSON,
                        payload: {
                            person,
                        },
                    });
                }
            });
        },
    }
}
