const TypesNews = {
    POST_NEWS: 'POST_NEWS',
    GET_NEWS: 'GET_NEWS',
}

function NewsTypes(state: any, action: any) {
    const { type, payload } = action;
    switch (type) {
        case TypesNews.POST_NEWS:
        case TypesNews.GET_NEWS:
            return {
                ...state, news: payload.news
            };
        default:
            return state;
    }
}
export { TypesNews };
export default NewsTypes;