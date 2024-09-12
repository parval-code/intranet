

const redirectLoginAuth = () => {
    if (global.window?.location.pathname !== '/login' && global.window?.location.pathname !== '/auth'
        && !global.window?.localStorage.authtokenintranet) {
        const route: string | undefined = global.window?.location.pathname;
        switch (route) {
            case '/auth':
                return global.window ? global.window.location.href = '/auth' : null;
                break;
            default:
                return global.window ? global.window.location.href = '/login' : null
        }
    }

}

export default redirectLoginAuth;
