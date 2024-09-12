const TypesBinnacleSIMV = {
    POST_BINNACLE_SIMV: 'POST_BINNACLE_SIMV',
    GET_BINNACLE_SIMV: 'GET_BINNACLE_SIMV',
}

function BinnacleSIMVTypes(state: any, action: any) {
    const { type, payload } = action;
    switch (type) {
        case TypesBinnacleSIMV.POST_BINNACLE_SIMV:
            return {
                ...state, binnacleSIMV: payload.binnacleSIMV
            };
        case TypesBinnacleSIMV.GET_BINNACLE_SIMV:
            return {
                ...state, binnacleSIMV: payload.binnacleSIMV,
            }
        default:
            return state;
    }
}
export { TypesBinnacleSIMV };
export default BinnacleSIMVTypes;