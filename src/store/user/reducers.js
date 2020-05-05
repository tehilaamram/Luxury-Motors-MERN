import {
    SIGN_IN,
    SIGN_UP,
    SIGN_OUT,
} from './types';

const initialState =
{
    email: '',
    role: 'user',
    fullName: '',
    password: '',
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SIGN_UP:
            return {
                ...state,
                email: action.email,
                password: action.password,
                fullName: action.fullName,
                role: 'user',
            };
        case SIGN_IN:
            return {
                ...state,
                email: action.email,
                password: action.password,
            };
        case SIGN_OUT:
            return {
                ...state,
                email: '',
                password: '',
                fullName: '',
                role: 'user',
            };

        default:
            return state;
    }
}