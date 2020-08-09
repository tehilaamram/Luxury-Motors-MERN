import {
    ADD_TRANSMISSION,
    DELETE_TRANSMISSION,
    ADD_MAKER,
    DELETE_MAKER,
    ADD_YEAR,
    DELETE_YEAR,
    ADD_DOORS,
    DELETE_DOORS,
    ADD_SEATS,
    DELETE_SEATS,
} from './types';

const initialState =
{
    transmission: [],
    maker: [],
    year: [],
    doors: [],
    seats: [],
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ADD_TRANSMISSION:
            return {
                ...state,
                transmission: [...state.transmission, action.transmission],
            };
        case DELETE_TRANSMISSION:
            return {
                ...state,
                transmission: [
                    ...state.transmission.filter(element => element !== action.transmission),
                ],
            }
        case ADD_MAKER:
            return {
                ...state,
                maker: [...state.maker, action.maker],
            };
        case DELETE_MAKER:
            return {
                ...state,
                maker: [
                    ...state.maker.filter(element => element !== action.maker),
                ],
            }
        case ADD_YEAR:
            return {
                ...state,
                year: [...state.year, action.year],
            };
        case DELETE_YEAR:
            return {
                ...state,
                year: [
                    ...state.year.filter(element => element !== action.year),
                ],
            }
        case ADD_DOORS:
            return {
                ...state,
                doors: [...state.doors, action.doors],
            };
        case DELETE_DOORS:
            return {
                ...state,
                doors: [
                    ...state.doors.filter(element => element !== action.doors),
                ],
            }
        case ADD_SEATS:
            return {
                ...state,
                seats: [...state.seats, action.seats],
            };
        case DELETE_SEATS:
            return {
                ...state,
                seats: [
                    ...state.seats.filter(element => element !== action.seats),
                ],
            }

        default:
            return state;
    }
}