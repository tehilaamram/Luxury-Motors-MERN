import * as types from './types';
/*
 * action creators
 */
export function update(strSearch) {
    return {
        type: types.UPDATE,
        strSearch,
    };
}
