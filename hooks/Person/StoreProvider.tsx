import { createContext, useContext, useReducer } from 'react';
const StoreContextPerson = createContext<any | null>(null);
import PersonTypes, { TypesPerson }  from './PersonTypes';

const inicialState : any = {
    person: {},
}

export default function StoreProviderPerson({ children } : any) {

    const [ store, dispatch ] = useReducer(PersonTypes, inicialState);

    return (
        <StoreContextPerson.Provider value={[store, dispatch]}>
            {
                children
            }
        </StoreContextPerson.Provider>
    )
}

const useStorePerson = () => useContext(StoreContextPerson)[0];
const useDispatchPerson = () => useContext(StoreContextPerson)[1];

export { StoreContextPerson, useStorePerson, useDispatchPerson, TypesPerson };
