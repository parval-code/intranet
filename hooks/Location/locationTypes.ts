const TypesLocation = {
    POST_LOCATION: 'POST_LOCATION',
    GET_LOCATION: 'GET_LOCATION',
}

function LocationTypes(state: any, action: any) {
    const { type, payload } = action;
    switch (type) {
        case TypesLocation.GET_LOCATION:
        case TypesLocation.POST_LOCATION:    
            return {
                ...state, location: payload.location
            };
        default:
            return state;
    }
}
export { TypesLocation };
export default LocationTypes;