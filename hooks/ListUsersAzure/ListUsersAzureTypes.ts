const TypesListUsersAzure = {
    POST_LIST_USERS_AZURE: 'POST_LIST_USERS_AZURE',
    GET_LIST_USERS_AZURE: 'GET_LIST_USERS_AZURE',
}

function ListUsersAzureTypes(state: any, action: any) {
    const { type, payload } = action;
    switch (type) {
        case TypesListUsersAzure.POST_LIST_USERS_AZURE:
        case TypesListUsersAzure.GET_LIST_USERS_AZURE:
            return {
                ...state, person: payload.listUsersAzure,
            }
        default:
            return state;
    }
}
export { TypesListUsersAzure };
export default ListUsersAzureTypes;