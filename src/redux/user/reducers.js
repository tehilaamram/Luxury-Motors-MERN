import {
    SIGN_IN,
    SIGN_UP,
    SIGN_OUT,
    UPDATE_FROM_STORAGE,
} from './types';
import { ROLE } from '../../helpers/consts';

const initialState =
{
    role: ROLE.GUEST,
    email: '',
    fullName: '',
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SIGN_UP:
            return {
                ...state,
                role: ROLE.USER,
                email: action.email,
                fullName: action.fullName,
            };
        case SIGN_IN:
            return {
                ...state,
                role: action.role,
                email: action.email,
                fullName: action.fullName,
            };
        case UPDATE_FROM_STORAGE:
            return {
                ...state,
                role: action.role,
                email: action.email,
                fullName: action.fullName,
            };
        case SIGN_OUT:
            return {
                ...state,
                role: ROLE.GUEST,
                email: '',
                fullName: '',
            };

        default:
            return state;
    }
}