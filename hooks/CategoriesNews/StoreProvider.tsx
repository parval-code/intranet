import { createContext, useContext, useReducer } from 'react';
const StoreContextCategoriesNews = createContext<any | null>(null);
import CategoriesNewsTypes, { TypesCategoriesNews }  from './CategoriesNewsTypes';

const inicialState : any = {
    categoriesNews: {},
}

export default function StoreProviderCategoriesNews({ children } : any) {

    const [ store, dispatch ] = useReducer(CategoriesNewsTypes, inicialState);

    return (
        <StoreContextCategoriesNews.Provider value={[store, dispatch]}>
            {
                children
            }
        </StoreContextCategoriesNews.Provider>
    )
}

const useStoreCategoriesNews = () => useContext(StoreContextCategoriesNews)[0];
const useDispatchCategoriesNews = () => useContext(StoreContextCategoriesNews)[1];

export { StoreContextCategoriesNews, useStoreCategoriesNews, useDispatchCategoriesNews, TypesCategoriesNews };
