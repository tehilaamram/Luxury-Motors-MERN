import {
    SIGN_IN,
    SIGN_UP,
    SIGN_OUT,
    UPDATE_FROM_STORAGE,
} from './types';
import { ROLE } from '../../helpers/consts';
// import localStorage from "localforage";

const initialState =
{
    // role: localStorage.getItem("role"),
    // role: localStorage.getItem("role").then((userRole) => {
    //     return userRole;
    // }),
    role: localStorage.getItem("role"),
    // role: ROLE.GUEST,
    email: '',
    fullName: '',
    id: '',
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SIGN_UP:
            return {
                ...state,
                id: action.id,
                role: ROLE.USER,
                email: action.email,
                fullName: action.fullName,
            };
        case SIGN_IN:
            return {
                ...state,
                id: action.id,
                role: action.role,
                email: action.email,
                fullName: action.fullName,
            };
        case UPDATE_FROM_STORAGE:
            return {
                ...state,
                id: action.id,
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