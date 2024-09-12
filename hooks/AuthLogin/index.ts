import { useDispatchAuthLogin } from "./StoreProvider";
import { TypesAuthLogin } from './authLoginTypes';
import { jwtDecode } from 'jwt-decode';
import urlApis from '@/routes_apis';
import { postAll } from "@/utils/methods";

interface IDataInfoBuildingToken {
    "@odata.context": string;
    "businessPhones": string[];
    "displayName": string;
    "givenName": string;
    "jobTitle": string;
    "mail": string;
    "mobilePhone": string;
    "officeLocation": string;
    "preferredLanguage": string;
    "surname": string;
    "userPrincipalName": string;
    "id": string;
}

export interface IDataUsersLoggers {
    "@odata.context": string;
    "businessPhones": string[];
    "displayName": string;
    "givenName": string;
    "info"?: any;
    "jobTitle": string;
    "mail": string;
    "mobilePhone": string;
    "officeLocation": string;
    "preferredLanguage": string;
    "surname": string;
    "userPrincipalName": string;
    "id": string;
}


export function useAuthLogin() {
    const dispatch = useDispatchAuthLogin();
    return {
        async postAuthLogin(dataUsers: IDataInfoBuildingToken){

            try {
                const authLogin: any = await postAll(`${urlApis.API_INTRENET}/login`, dataUsers);
                localStorage.setItem('authtokenintranet', authLogin.data);
                return authLogin.data;
            } catch (e){
                return {
                    code: 400,
                    message: 'Not Found Data',
                    name: 'NotFound',
                }
            }
        },
        getAuthLogin() {
            if (global.window?.localStorage.authtokenintranet) {
                const authLogin : any = localStorage.getItem('authtokenintranet');

                dispatch({
                    type: TypesAuthLogin.GET_AUTHLOGIN,
                    payload: {
                        authLogin: jwtDecode(authLogin),
                    },
                });
            }
        }
    }
}
