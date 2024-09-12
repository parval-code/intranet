import axios from 'axios';
import { set } from 'lodash';

export const setAuthorizationToken = (token: string) => {
    if (token){
        set(axios.defaults.headers, 'authtokenintranet', `Bearer ${token}`)
    } else {
        delete axios.defaults.headers.common['authtokenintranet'];
    }
};
