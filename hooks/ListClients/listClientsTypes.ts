const TypesListClients = {
    GET_LIST_CLIENTS: 'GET_LIST_CLIENTS',
}

function ListClientsTypes(state: any, action: any) {
    const { type, payload } = action;
    switch (type) {
        case TypesListClients.GET_LIST_CLIENTS:
            return {
                ...state, listClients: payload.listClients
            };
        case TypesListClients.GET_LIST_CLIENTS:
            return {
                ...state, listClients: payload.listClients,
            }
        default:
            return state;
    }
}
export { TypesListClients };
export default ListClientsTypes;