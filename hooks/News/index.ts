import { useDispatchNews } from "./StoreProvider";
import { TypesNews } from './NewsTypes';
import { getAll, postAll, updateAll, deleteOne } from "@/utils/methods";
import urlApis from '@/routes_apis';

interface ISaveInfoNews {
    title: string;
    frontPage: string;
    description: string;
    category: number |  string;
    content: string;
    createdBy: string;
    updatedBy: string;
}

export function useNews() {
    const dispatch = useDispatchNews();
    return {
        async getOneNews(newsId: number | string){
            const news: any = await getAll(`${urlApis.API_INTRENET}/news?id=${newsId}`);
            dispatch({
                type: TypesNews.GET_NEWS,
                payload: {
                    news,
                },
            });
        },
        async getListForTitleNews(title: string){
            const news: any = await getAll(`${urlApis.API_INTRENET}/news?title=${title}`);
            dispatch({
                type: TypesNews.GET_NEWS,
                payload: {
                    news,
                },
            });
        },
        async getAllNews(){
            const news: any = await getAll(`${urlApis.API_INTRENET}/news`);

            dispatch({
                type: TypesNews.GET_NEWS,
                payload: {
                    news: news.reverse(),
                },
            });
        },
        async saveNews(data: ISaveInfoNews){
            await postAll(`${urlApis.API_INTRENET}/news`, data).then(async (res: any) => {
                if (res.status === 200){
                    const news: any = await getAll(`${urlApis.API_INTRENET}/news`);
                    dispatch({
                        type: TypesNews.POST_NEWS,
                        payload: {
                            news,
                        },
                    });
                }
            });
        },
        async updatedNews(data: ISaveInfoNews, id: number | string){
            await updateAll(`${urlApis.API_INTRENET}/news/${id}`, data).then(async (res: any) => {
                if (res.status === 200){
                    const news: any = await getAll(`${urlApis.API_INTRENET}/news`);
                    dispatch({
                        type: TypesNews.POST_NEWS,
                        payload: {
                            news,
                        },
                    });
                }
            });
        },
        async deleteNews(id: number | string){
            await deleteOne(`${urlApis.API_INTRENET}/news`, id).then(async (res: any) => {
                if (res.status === 200){
                    const news: any = await getAll(`${urlApis.API_INTRENET}/news`);
                    dispatch({
                        type: TypesNews.POST_NEWS,
                        payload: {
                            news,
                        },
                    });
                }
            });
        },
    }
}
