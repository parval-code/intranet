const TypesPerson = {
    POST_PERSON: 'POST_PERSON',
    GET_PERSON: 'GET_PERSON',
}

function PersonTypes(state: any, action: any) {
    const { type, payload } = action;
    switch (type) {
        case TypesPerson.POST_PERSON:
            return {
                ...state, person: payload.person
            };
        case TypesPerson.GET_PERSON:
            return {
                ...state, person: payload.person,
            }
        default:
            return state;
    }
}
export { TypesPerson };
export default PersonTypes;