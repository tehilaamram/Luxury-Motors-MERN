import {
   ADD, SUB, RELOAD, RESTART, ADD_MANY
} from './types';

export default function reducer(state = 0, action) {
    switch (action.type) {
        case ADD:
            return state + 1;
        case SUB:
            return state - 1;
        case RELOAD:
            return action.sum;
        case RESTART:
            return action.sum;
        case ADD_MANY:
            return state + action.sum;
        default:
            return state;
    }
}