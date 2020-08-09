import * as types from './types';
/*
 * action creators
 */
export function addTransmission(transmission) {
    return {
        type: types.ADD_TRANSMISSION,
        transmission,
    };
}

export function deleteTransmission(transmission) {
    return {
        type: types.DELETE_TRANSMISSION,
        transmission,
    };
}

export function addMaker(maker) {
    return {
        type: types.ADD_MAKER,
        maker,
    };
}

export function deleteMaker(maker) {
    return {
        type: types.DELETE_MAKER,
        maker,
    };
}

export function addYear(year) {
    return {
        type: types.ADD_YEAR,
        year,
    };
}

export function deleteYear(year) {
    return {
        type: types.DELETE_YEAR,
        year,
    };
}

export function addDoors(doors) {
    return {
        type: types.ADD_DOORS,
        doors,
    };
}

export function deleteDoors(doors) {
    return {
        type: types.DELETE_DOORS,
        doors,
    };
}

export function addSeats(seats) {
    return {
        type: types.ADD_SEATS,
        seats,
    };
}

export function deleteSeats(seats) {
    return {
        type: types.DELETE_SEATS,
        seats,
    };
}

