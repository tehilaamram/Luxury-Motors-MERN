import localStorage from "localforage";

import * as types from './types';
import { CONNECTED_USER, ROLE } from '../../helpers/consts';
/*
 * action creators
 */
export function signUp(email, fullName) {
    localStorage.setItem(CONNECTED_USER.ROLE, ROLE.USER);
    localStorage.setItem(CONNECTED_USER.EMAIL, email);
    localStorage.setItem(CONNECTED_USER.FULL_NAME, fullName);
    return {
        type: types.SIGN_UP,
        email,
        fullName,
    };
}

export function signIn(role, email, fullName) {
    return {
        type: types.SIGN_IN,
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

export function updateFromLocalStorage(role, email, fullName) {
    return {
        type: types.UPDATE_FROM_STORAGE,
        role,
        email,
        fullName,
    };
}
