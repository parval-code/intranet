import { createContext, useContext, useReducer } from 'react';
const StoreContextUsersPermissions = createContext<any | null>(null);
import UsersPermissionsTypes, { TypesUsersPermissions }  from './usersPermissionsTypes';

const inicialState : any = {
    usersPermissions: {},
}

export default function StoreProviderUsersPermissions({ children } : any) {

    const [ store, dispatch ] = useReducer(UsersPermissionsTypes, inicialState);

    return (
        <StoreContextUsersPermissions.Provider value={[store, dispatch]}>
            {
                children
            }
        </StoreContextUsersPermissions.Provider>
    )
}

const useStoreUsersPermissions = () => useContext(StoreContextUsersPermissions)[0];
const useDispatchUsersPermissions = () => useContext(StoreContextUsersPermissions)[1];

export { StoreContextUsersPermissions, useStoreUsersPermissions, useDispatchUsersPermissions, TypesUsersPermissions };
