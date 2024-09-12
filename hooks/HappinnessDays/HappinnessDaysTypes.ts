const TypesHappinnessDays = {
    POST_HAPPINNESS_DAYS: 'POST_HAPPINNESS_DAYS',
    GET_HAPPINNESS_DAYS: 'GET_HAPPINNESS_DAYS',
}

function HappinnessDaysTypes(state: any, action: any) {
    const { type, payload } = action;
    switch (type) {
        case TypesHappinnessDays.POST_HAPPINNESS_DAYS:
        case TypesHappinnessDays.GET_HAPPINNESS_DAYS:
            return {
                ...state, happinnessDays: payload.happinnessDays,
            }
        default:
            return state;
    }
}
export { TypesHappinnessDays };
export default HappinnessDaysTypes;