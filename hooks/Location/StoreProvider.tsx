import { createContext, useContext, useReducer } from 'react';
const StoreContextLocation = createContext<any | null>(null);
import LocationTypes, { TypesLocation }  from './locationTypes';

const inicialState : any = {
    location: {},
}

export default function StoreProviderLocation({ children } : any) {

    const [ store, dispatch ] = useReducer(LocationTypes, inicialState);

    return (
        <StoreContextLocation.Provider value={[store, dispatch]}>
            {
                children
            }
        </StoreContextLocation.Provider>
    )
}

const useStoreLocation = () => useContext(StoreContextLocation)[0];
const useDispatchLocation = () => useContext(StoreContextLocation)[1];

export { StoreContextLocation, useStoreLocation, useDispatchLocation, TypesLocation };
