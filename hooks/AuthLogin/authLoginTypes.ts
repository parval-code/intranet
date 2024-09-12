const TypesAuthLogin = {
    POST_AUTHLOGIN: 'POST_AUTHLOGIN',
    GET_AUTHLOGIN: 'GET_AUTHLOGIN',
}

function AuthLoginTypes(state: any, action: any){
    const { type, payload } = action;
    switch (type) {
        case TypesAuthLogin.POST_AUTHLOGIN:
            return {
                ...state, authLogin: payload.authLogin
            };
        case TypesAuthLogin.GET_AUTHLOGIN:
            return {
                ...state, authLogin: payload.authLogin,
            }
        default:
            return state;
    }
}
export { TypesAuthLogin };
export default AuthLoginTypes;