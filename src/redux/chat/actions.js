// import localStorage from "localforage";

import * as types from './types';
import { CHAT } from '../../helpers/consts';
/*
 * action creators
 */
export function join(room) {
    localStorage.setItem(CHAT.ROOM, room);
    return {
        type: types.JOIN,
        room,
    };
}
