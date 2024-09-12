import { createContext, useContext, useReducer } from 'react';
const StoreContextNews = createContext<any | null>(null);
import NewsTypes, { TypesNews }  from './NewsTypes';

const inicialState : any = {
    news: {},
}

export default function StoreProviderNews({ children } : any) {

    const [ store, dispatch ] = useReducer(NewsTypes, inicialState);

    return (
        <StoreContextNews.Provider value={[store, dispatch]}>
            {
                children
            }
        </StoreContextNews.Provider>
    )
}

const useStoreNews = () => useContext(StoreContextNews)[0];
const useDispatchNews = () => useContext(StoreContextNews)[1];

export { StoreContextNews, useStoreNews, useDispatchNews, TypesNews };
