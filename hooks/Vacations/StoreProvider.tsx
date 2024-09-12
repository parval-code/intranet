import { createContext, useContext, useReducer } from 'react';
const StoreContextVacations = createContext<any | null>(null);
import VacationsTypes, { TypesVacations }  from './VacationsTypes';

const inicialState : any = {
    vacations: {},
}

export default function StoreProviderVacations({ children } : any) {

    const [ store, dispatch ] = useReducer(VacationsTypes, inicialState);

    return (
        <StoreContextVacations.Provider value={[store, dispatch]}>
            {
                children
            }
        </StoreContextVacations.Provider>
    )
}

const useStoreVacations = () => useContext(StoreContextVacations)[0];
const useDispatchVacations = () => useContext(StoreContextVacations)[1];

export { StoreContextVacations, useStoreVacations, useDispatchVacations, TypesVacations };
