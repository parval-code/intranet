const TypesAssignedUserGroups = {
    POST_ASSIGNED_USER_GROUPS: 'POST_ASSIGNED_USER_GROUPS',
    GET_ASSIGNED_USER_GROUPS: 'GET_ASSIGNED_USER_GROUPS',
}

function AssignedUserGroupsTypes(state: any, action: any) {
    const { type, payload } = action;
    switch (type) {
        case TypesAssignedUserGroups.POST_ASSIGNED_USER_GROUPS:
        case TypesAssignedUserGroups.GET_ASSIGNED_USER_GROUPS:    
            return {
                ...state, assignedUserGroups: payload.assignedUserGroups
            };
        default:
            return state;
    }
}
export { TypesAssignedUserGroups };
export default AssignedUserGroupsTypes;