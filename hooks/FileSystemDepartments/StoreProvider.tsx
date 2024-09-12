import { createContext, useContext, useReducer } from 'react';
const StoreContextFileSystemDepartments = createContext<any | null>(null);
import FileSystemDepartmentsTypes, { TypesFileSystemDepartments }  from './fileSystemDepartmentsTypes';

const inicialState : any = {
    fileSystemDepartments: {},
}

export default function StoreProviderFileSystemDepartments({ children } : any) {

    const [ store, dispatch ] = useReducer(FileSystemDepartmentsTypes, inicialState);

    return (
        <StoreContextFileSystemDepartments.Provider value={[store, dispatch]}>
            {
                children
            }
        </StoreContextFileSystemDepartments.Provider>
    )
}

const useStoreFileSystemDepartments = () => useContext(StoreContextFileSystemDepartments)[0];
const useDispatchFileSystemDepartments = () => useContext(StoreContextFileSystemDepartments)[1];

export { StoreContextFileSystemDepartments, useStoreFileSystemDepartments, useDispatchFileSystemDepartments, TypesFileSystemDepartments };
