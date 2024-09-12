const TypesUsersPermissions = {
    POST_USER_PERMISSIONS: 'POST_USER_PERMISSIONS',
    GET_USER_PERMISSIONS: 'GET_USER_PERMISSIONS',
}

function UsersPermissionsTypes(state: any, action: any) {
    const { type, payload } = action;
    switch (type) {
        case TypesUsersPermissions.POST_USER_PERMISSIONS:
        case TypesUsersPermissions.GET_USER_PERMISSIONS:    
            return {
                ...state, usersPermissions: payload.usersPermissions
            };
        default:
            return state;
    }
}
export { TypesUsersPermissions };
export default UsersPermissionsTypes;