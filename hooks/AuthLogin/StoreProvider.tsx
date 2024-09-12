import { createContext, useContext, useReducer } from 'react';
const StoreContextAuthLogin = createContext<any | null>(null);
import AuthLoginTypes, { TypesAuthLogin }  from './authLoginTypes';

const inicialState : any = {
    authLogin: {},
}

export default function StoreProviderAuthLogin({ children } : any) {

    const [ store, dispatch ] = useReducer(AuthLoginTypes, inicialState);

    return (
        <StoreContextAuthLogin.Provider value={[store, dispatch]}>
            {
                children
            }
        </StoreContextAuthLogin.Provider>
    )
}

const useStoreAuthLogin = () => useContext(StoreContextAuthLogin)[0];
const useDispatchAuthLogin = () => useContext(StoreContextAuthLogin)[1];

export { StoreContextAuthLogin, useStoreAuthLogin, useDispatchAuthLogin, TypesAuthLogin };
