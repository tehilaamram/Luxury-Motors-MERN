// import localStorage from "localforage";
import { Cookies } from 'react-cookie';
const cookie = new Cookies();
export const isLogin = () => {
    // console.log(cookie.get('session'), ' session id', cookie);
    if (localStorage.getItem("role")) {
        return true;
    }

    return false;
}

export const isWorker = () => {
    if (localStorage.getItem("role") === "worker" || localStorage.getItem("role") === "admin") {
        return true;
    }
    return false;
}

export const isUser = () => {
    if (localStorage.getItem("role") === "worker" || localStorage.getItem("role") === "admin" || localStorage.getItem("role") === "user") {
        return true;
    }
    return false;
}

export const isAdmin = () => {
    if (localStorage.getItem("role") === "admin") {
        return true;
    }
    return false;
}