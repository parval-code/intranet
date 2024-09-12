const TypesCategoriesNews = {
    POST_CATEGORIES_NEWS: 'POST_CATEGORIES_NEWS',
    GET_CATEGORIES_NEWS: 'GET_CATEGORIES_NEWS',
}

function CategoriesNewsTypes(state: any, action: any) {
    const { type, payload } = action;
    switch (type) {
        case TypesCategoriesNews.POST_CATEGORIES_NEWS:
        case TypesCategoriesNews.GET_CATEGORIES_NEWS:    
            return {
                ...state, categoriesNews: payload.categoriesNews
            };
        default:
            return state;
    }
}
export { TypesCategoriesNews };
export default CategoriesNewsTypes;