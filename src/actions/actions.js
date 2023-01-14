import axios from "axios";
import React from "react";
import {
    filterEndMass,
    setError,
    setExtMass,
    setIsFetching,
    setNewWeek,
    setRepMass,
    sortLess
} from "../reducers/profileReducer";

export const getWeekExt = (idYear, idMonth, idStartDayWeek) => {
    return async (dispatch) => {
        dispatch(setIsFetching(true))
        await axios.post("http://localhost:5000/extentions/getWeek", {idYear: idYear, idMonth: idMonth, idStartDayWeek: idStartDayWeek})
            .then(response => {
                dispatch(setExtMass(response.data))
            })
            .catch(err => {
                dispatch(setError(err.response.data.message))
            })
            .finally(() => {
                dispatch(setIsFetching(false));
            })
    }
}

export const getWeekRep = (idYear, idMonth, idStartDayWeek) => {
    return async (dispatch) => {
        dispatch(setIsFetching(true))
        await axios.post("http://localhost:5000/repeateble/getWeek", {idYear: idYear, idMonth: idMonth, idStartDayWeek: idStartDayWeek})
            .then(response => {
                dispatch(setRepMass(response.data))
            })
            .catch(err => {
                dispatch(setError(err.response.data.message))
            })
            .finally(() => {
                dispatch(filterEndMass())
                dispatch(setIsFetching(false));
            })
    }
}

