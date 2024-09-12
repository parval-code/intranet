import { createContext, useContext, useReducer } from 'react';
const StoreContextPermissions = createContext<any | null>(null);
import PermissionsTypes, { TypesPermissions }  from './PermissionsTypes';

const inicialState : any = {
    permissions: {},
}

export default function StoreProviderPermissions({ children } : any) {

    const [ store, dispatch ] = useReducer(PermissionsTypes, inicialState);

    return (
        <StoreContextPermissions.Provider value={[store, dispatch]}>
            {
                children
            }
        </StoreContextPermissions.Provider>
    )
}

const useStorePermissions = () => useContext(StoreContextPermissions)[0];
const useDispatchPermissions = () => useContext(StoreContextPermissions)[1];

export { StoreContextPermissions, useStorePermissions, useDispatchPermissions, TypesPermissions };
