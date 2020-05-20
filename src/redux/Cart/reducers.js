import {
   ADD, SUB, RELOAD
} from './types';

export default function reducer(state = 0, action) {
    switch (action.type) {
        case ADD:
            return state + 1;
        case SUB:
            return state - 1;
        case RELOAD:
            return action.sum;
        default:
            return state;
    }
}