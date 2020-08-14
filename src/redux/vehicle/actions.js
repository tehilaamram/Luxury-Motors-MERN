// import localStorage from "localforage";

import * as types from './types';
import { VEHICLE } from '../../helpers/consts';
/*
 * action creators
 */
export function saveVehicle(model, make, year, color) {
    localStorage.setItem(VEHICLE.MODEL, model);
    localStorage.setItem(VEHICLE.MAKE, make);
    localStorage.setItem(VEHICLE.YEAR, year);
    localStorage.setItem(VEHICLE.COLOR, color);
    return {
        type: types.SAVE_VEHICLE,
        model,
        make,
        year,
        color,
    };
}