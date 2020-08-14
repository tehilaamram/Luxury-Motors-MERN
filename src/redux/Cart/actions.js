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

export function restart(sum) {
    return {
        type: types.RESTART,
        sum,
    };
}

export function addMany(sum) {
    return {
        type: types.ADD_MANY,
        sum,
    }
}