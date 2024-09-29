import { createContext, useContext, useReducer } from 'react';
const StoreContextAssignedUserGroups = createContext<any | null>(null);
import AssignedUserGroupsTypes, { TypesAssignedUserGroups }  from './assignedUserGroupsTypes';

const inicialState : any = {
    AssignedUserGroups: {},
}

export default function StoreProviderAssignedUserGroups({ children } : any) {

    const [ store, dispatch ] = useReducer(AssignedUserGroupsTypes, inicialState);

    return (
        <StoreContextAssignedUserGroups.Provider value={[store, dispatch]}>
            {
                children
            }
        </StoreContextAssignedUserGroups.Provider>
    )
}

const useStoreAssignedUserGroups = () => useContext(StoreContextAssignedUserGroups)[0];
const useDispatchAssignedUserGroups = () => useContext(StoreContextAssignedUserGroups)[1];

export { StoreContextAssignedUserGroups, useStoreAssignedUserGroups, useDispatchAssignedUserGroups, TypesAssignedUserGroups };
