import * as types from './types';

/*
 * action creators
 */
export function signUp(email, password, fullName) {
    return {
        type: types.SIGN_UP,
        email,
        password,
        fullName,
    };
}

export function signIn(email, password) {
    return {
        type: types.SIGN_IN,
        email,
        password,
    };
}

export function signOut() {
    return {
        type: types.SIGN_OUT,
    };
}
