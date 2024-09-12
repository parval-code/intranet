import { createContext, useContext, useReducer } from 'react';
const StoreContextBinnacleSIMV = createContext<any | null>(null);
import BinnacleSIMVTypes, { TypesBinnacleSIMV }  from './binnacleSIMVTypes';

const inicialState : any = {
    binnacleSIMV: {},
}

export default function StoreProviderBinnacleSIMV({ children } : any) {

    const [ store, dispatch ] = useReducer(BinnacleSIMVTypes, inicialState);

    return (
        <StoreContextBinnacleSIMV.Provider value={[store, dispatch]}>
            {
                children
            }
        </StoreContextBinnacleSIMV.Provider>
    )
}

const useStoreBinnacleSIMV = () => useContext(StoreContextBinnacleSIMV)[0];
const useDispatchBinnacleSIMV = () => useContext(StoreContextBinnacleSIMV)[1];

export { StoreContextBinnacleSIMV, useStoreBinnacleSIMV, useDispatchBinnacleSIMV, TypesBinnacleSIMV };
