import {
    UPDATE
} from './types';

const initialState =
{
   strSearch: '',
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE:
            return {
                ...state,
                strSearch: action.strSearch,
            };
        default:
            return state;
    }
}