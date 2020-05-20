import * as types from './types';
/*
 * action creators
 */
export function add() {
    return {
        type: types.ADD,
    };
}

export function sub() {
    return {
        type: types.SUB,
    };
}

export function reload(sum) {
    return {
        type: types.RELOAD,
        sum,
    };
}