const TypesPermissions = {
    POST_PERMISSIONS: 'POST_PERMISSIONS',
    GET_PERMISSIONS: 'GET_PERMISSIONS',
}

function PermissionsTypes(state: any, action: any) {
    const { type, payload } = action;
    switch (type) {
        case TypesPermissions.POST_PERMISSIONS:
        case TypesPermissions.GET_PERMISSIONS:    
            return {
                ...state, permissions: payload.permissions
            };
        default:
            return state;
    }
}
export { TypesPermissions };
export default PermissionsTypes;