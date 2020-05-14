import {
   JOIN
} from './types';
// import { CHAT } from '../../helpers/consts';

const initialState =
{
    room: '',
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case JOIN:
            return {
                ...state,
                room: action.room,
            };
        default:
            return state;
    }
}