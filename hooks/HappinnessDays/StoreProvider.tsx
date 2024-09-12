import { createContext, useContext, useReducer } from 'react';
const StoreContextHappinnessDays = createContext<any | null>(null);
import HappinnessDaysTypes, { TypesHappinnessDays }  from './HappinnessDaysTypes';

const inicialState : any = {
    happinnessDays: {},
}

export default function StoreProviderHappinnessDays({ children } : any) {

    const [ store, dispatch ] = useReducer(HappinnessDaysTypes, inicialState);

    return (
        <StoreContextHappinnessDays.Provider value={[store, dispatch]}>
            {
                children
            }
        </StoreContextHappinnessDays.Provider>
    )
}

const useStoreHappinnessDays = () => useContext(StoreContextHappinnessDays)[0];
const useDispatchHappinnessDays= () => useContext(StoreContextHappinnessDays)[1];

export { StoreContextHappinnessDays, useStoreHappinnessDays, useDispatchHappinnessDays, TypesHappinnessDays };
