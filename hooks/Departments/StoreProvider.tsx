import { createContext, useContext, useReducer } from 'react';
const StoreContextDepartments = createContext<any | null>(null);
import DepartmentsTypes, { TypesDepartments }  from './departmentsTypes';

const inicialState : any = {
    departments: {},
}

export default function StoreProviderDepartments({ children } : any) {

    const [ store, dispatch ] = useReducer(DepartmentsTypes, inicialState);

    return (
        <StoreContextDepartments.Provider value={[store, dispatch]}>
            {
                children
            }
        </StoreContextDepartments.Provider>
    )
}

const useStoreDepartments = () => useContext(StoreContextDepartments)[0];
const useDispatchDepartments = () => useContext(StoreContextDepartments)[1];

export { StoreContextDepartments, useStoreDepartments, useDispatchDepartments, TypesDepartments };
