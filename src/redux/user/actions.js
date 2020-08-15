// import localStorage from "localforage";

import * as types from './types';
import { CONNECTED_USER, ROLE } from '../../helpers/consts';
/*
 * action creators
 */
export function signUp(id, email, fullName) {
    localStorage.setItem(CONNECTED_USER.ID, id);
    localStorage.setItem(CONNECTED_USER.ROLE, ROLE.USER);
    localStorage.setItem(CONNECTED_USER.EMAIL, email);
    localStorage.setItem(CONNECTED_USER.FULL_NAME, fullName);
    return {
        type: types.SIGN_UP,
        id,
        email,
        fullName,
    };
}

export function signIn(id, role, email, fullName) {
    localStorage.setItem(CONNECTED_USER.ID, id);
    localStorage.setItem(CONNECTED_USER.ROLE, role);
    localStorage.setItem(CONNECTED_USER.EMAIL, email);
    localStorage.setItem(CONNECTED_USER.FULL_NAME, fullName);
    return {
        type: types.SIGN_IN,
        id,
        role,
        email,
        fullName,
    };
}

export function signOut() {
    localStorage.clear();
    return {
        type: types.SIGN_OUT,
    };
}

export function updateFromLocalStorage(id, role, email, fullName) {
    return {
        type: types.UPDATE_FROM_STORAGE,
        id,
        role,
        email,
        fullName,
    };
}
