import { useDispatchCategoriesNews } from "./StoreProvider";
import { TypesCategoriesNews } from './CategoriesNewsTypes';
import { getAll, postAll } from "@/utils/methods";
import urlApis from '@/routes_apis';

interface ISaveInfoCategoriesNews {
    name: string;
}

export function useCategoriesNews() {
    const dispatch = useDispatchCategoriesNews();
    return {
        async getOneCategoriesNews(id: string){
            const categoriesNews: any = await getAll(`${urlApis.API_INTRENET}/categories-news?id=${id}`);
            dispatch({
                type: TypesCategoriesNews.GET_CATEGORIES_NEWS,
                payload: {
                    categoriesNews,
                },
            });
        },
        async getAllCategoriesNews(){
            const categoriesNews: any = await getAll(`${urlApis.API_INTRENET}/categories-news`);
            
            dispatch({
                type: TypesCategoriesNews.GET_CATEGORIES_NEWS,
                payload: {
                    categoriesNews,
                },
            });
        },
        async saveCategoriesNews(data: ISaveInfoCategoriesNews){
            await postAll(`${urlApis.API_INTRENET}/categories-news`, data).then(async (res: any) => {
                if (res.status === 200){
                    const categoriesNews: any = await getAll(`${urlApis.API_INTRENET}/categories-news`);
                    dispatch({
                        type: TypesCategoriesNews.GET_CATEGORIES_NEWS,
                        payload: {
                            categoriesNews,
                        },
                    });
                }
            });
        },
    }
}
