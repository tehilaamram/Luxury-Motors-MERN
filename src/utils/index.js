// import localStorage from "localforage";

export const isLogin = () => {
    if (localStorage.getItem("role")) {
        return true;
    }

    return false;
}