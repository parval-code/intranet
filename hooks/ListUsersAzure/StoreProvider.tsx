import { createContext, useContext, useReducer } from 'react';
const StoreContextListUsersAzure = createContext<any | null>(null);
import ListUsersAzureTypes, { TypesListUsersAzure }  from './ListUsersAzureTypes';

const inicialState : any = {
    listUsersAzure: {},
}

export default function StoreProviderListUsersAzure({ children } : any) {

    const [ store, dispatch ] = useReducer(ListUsersAzureTypes, inicialState);

    return (
        <StoreContextListUsersAzure.Provider value={[store, dispatch]}>
            {
                children
            }
        </StoreContextListUsersAzure.Provider>
    )
}

const useStoreListUsersAzure = () => useContext(StoreContextListUsersAzure)[0];
const useDispatchListUsersAzure = () => useContext(StoreContextListUsersAzure)[1];

export { StoreContextListUsersAzure, useStoreListUsersAzure, useDispatchListUsersAzure, TypesListUsersAzure };
