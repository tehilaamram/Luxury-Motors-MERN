import {
    SAVE_VEHICLE
} from './types';

const initialState =
{
    model: '',
    make: '',
    year: 2020,
    color: 'black',
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SAVE_VEHICLE:
            return {
                ...state,
                model: action.model,
                make: action.make,
                year: action.year,
                color: action.color,
            };
        default:
            return state;
    }
}