const TypesReasonAbsence = {
    POST_REASON_ABSENCE: 'POST_REASON_ABSENCE',
    GET_REASON_ABSENCE: 'GET_REASON_ABSENCE',
}

function ReasonAbsenceTypes(state: any, action: any) {
    const { type, payload } = action;
    switch (type) {
        case TypesReasonAbsence.POST_REASON_ABSENCE:
        case TypesReasonAbsence.GET_REASON_ABSENCE:
            return {
                ...state, reasonAbsence: payload.reasonAbsence
            };
        default:
            return state;
    }
}
export { TypesReasonAbsence };
export default ReasonAbsenceTypes;