import { createContext, useContext, useReducer } from 'react';
const StoreContextListClients = createContext<any | null>(null);
import ListClientsTypes, { TypesListClients }  from './listClientsTypes';

const inicialState : any = {
    listClients: [],
}

export default function StoreProviderListClients({ children } : any) {

    const [ store, dispatch ] = useReducer(ListClientsTypes, inicialState);

    return (
        <StoreContextListClients.Provider value={[store, dispatch]}>
            {
                children
            }
        </StoreContextListClients.Provider>
    )
}

const useStoreListClients = () => useContext(StoreContextListClients)[0];
const useDispatchListClients = () => useContext(StoreContextListClients)[1];

export { StoreContextListClients, useStoreListClients, useDispatchListClients, TypesListClients };
