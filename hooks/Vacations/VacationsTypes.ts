const TypesVacations = {
    POST_VACATIONS: 'POST_VACATIONS',
    GET_VACATIONS: 'GET_VACATIONS',
}

function VacationsTypes(state: any, action: any) {
    const { type, payload } = action;
    switch (type) {
        case TypesVacations.POST_VACATIONS:
        case TypesVacations.GET_VACATIONS:    
            return {
                ...state, vacations: payload.vacations
            };
        default:
            return state;
    }
}
export { TypesVacations };
export default VacationsTypes;