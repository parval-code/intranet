const TypesDepartments = {
    POST_DEPARTMENTS: 'POST_DEPARTMENTS',
    GET_DEPARTMENTS: 'GET_DEPARTMENTS',
}

function DepartmentsTypes(state: any, action: any) {
    const { type, payload } = action;
    switch (type) {
        case TypesDepartments.POST_DEPARTMENTS:
        case TypesDepartments.GET_DEPARTMENTS:    
            return {
                ...state, departments: payload.departments
            };
        default:
            return state;
    }
}
export { TypesDepartments };
export default DepartmentsTypes;