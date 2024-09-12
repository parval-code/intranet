import axios from "axios";


export const offCloseSectionToken = () => {
    localStorage.clear();
    localStorage.removeItem("authtokenintranet");
    delete axios.defaults.headers.common['Authorization'];
    return window.location.href = '/login';
}
