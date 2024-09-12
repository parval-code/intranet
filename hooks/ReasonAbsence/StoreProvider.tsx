import { createContext, useContext, useReducer } from 'react';
const StoreContextReasonAbsence = createContext<any | null>(null);
import ReasonAbsenceTypes, { TypesReasonAbsence }  from './PersonTypes';

const inicialState : any = {
    reasonAbsence: {},
}

export default function StoreProviderReasonAbsence({ children } : any) {

    const [ store, dispatch ] = useReducer(ReasonAbsenceTypes, inicialState);

    return (
        <StoreContextReasonAbsence.Provider value={[store, dispatch]}>
            {
                children
            }
        </StoreContextReasonAbsence.Provider>
    )
}

const useStoreReasonAbsence = () => useContext(StoreContextReasonAbsence)[0];
const useDispatchReasonAbsence = () => useContext(StoreContextReasonAbsence)[1];

export { StoreContextReasonAbsence, useStoreReasonAbsence, useDispatchReasonAbsence, TypesReasonAbsence };
