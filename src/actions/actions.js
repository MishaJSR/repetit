import axios from "axios";
import React from "react";
import {
    filterEndMass, setDecMass,
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

export const getWeekDec = (idYear, idMonth, idStartDayWeek) => {
    return async (dispatch) => {
        dispatch(setIsFetching(true))
        await axios.post("http://localhost:5000/extentions/getWeekDecayed", {idYear: idYear, idMonth: idMonth, idStartDayWeek: idStartDayWeek})
            .then(response => {
                dispatch(setDecMass(response.data));
            })
            .catch(err => {
                dispatch(setError(err.response.data.message))
            })
            .finally(() => {
                dispatch(setIsFetching(false));
            })
    }
}

export const getWeekRep = () => {
    return async (dispatch) => {
        dispatch(setIsFetching(true))
        await axios.get("http://localhost:5000/repeateble/getWeek")
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

export const decExt = (idExt) => {
    return async (dispatch) => {
        dispatch(setIsFetching(true))
        await axios.post("http://localhost:5000/extentions/decayID", {idExt: idExt})
            .then(response => {
                alert("kk")
            })
            .catch(err => {
                dispatch(setError(err.response.data.message))
                alert("bad")
            })
            .finally(() => {
                dispatch(setIsFetching(false));
            })
    }
}

export const createExt = (idYear, idMonth, idStartDayWeek, idDay, startTime, durationTime, subj, namePup, cost, homework, isPayed, isDecayed) => {
    return async (dispatch) => {
        dispatch(setIsFetching(true))
        await axios.post("http://localhost:5000/extentions",             {
            idYear: idYear,
            idMonth: idMonth,
            idStartDayWeek: idStartDayWeek,
            idDay: idDay,
            startTime: startTime,
            durationTime: durationTime,
            subj: subj,
            namePup: namePup,
            cost: cost,
            homework: homework,
            isPayed: isPayed,
            isDecayed: isDecayed
        })
            .then(response => {
                alert("kk")
            })
            .catch(err => {
                dispatch(setError(err.response.data.message))
                alert("bad")
            })
            .finally(() => {
                dispatch(setIsFetching(false));
            })
    }
}

export const correctLessWithDel = (idYear, idMonth, idStartDayWeek, idDay, startTime, durationTime, subj, namePup, cost, homework, isPayed, isDecayed, lastDay) => {
    return async (dispatch) => {
        dispatch(setIsFetching(true))
        await axios.post("http://localhost:5000/extentions/reduct",
            {
                idYear: idYear,
                idMonth: idMonth,
                idStartDayWeek: idStartDayWeek,
                idDay: idDay,
                startTime: startTime,
                durationTime: durationTime,
                subj: subj,
                namePup: namePup,
                cost: cost,
                homework: homework,
                isPayed: isPayed,
                isDecayed: isDecayed
            }
        )
            .then(response => {
                axios.post("http://localhost:5000/extentions/reduct", {
                    idYear: idYear,
                    idMonth: idMonth,
                    idStartDayWeek: idStartDayWeek,
                    idDay: lastDay,
                    startTime: startTime,
                    durationTime: durationTime,
                    subj: subj,
                    namePup: namePup,
                    cost: cost,
                    homework: homework,
                    isPayed: isPayed,
                    isDecayed: true
                })
                    .then(response => {
                    })
                    .catch(err => {
                        dispatch(setError(err.response.data.message))
                        alert("bad")
                    })
                    .finally(() => {
                        dispatch(setIsFetching(false));
                    })
            })
            .catch(err => {
                alert("bad")
                dispatch(setError(err.response.data.message))
            })
            .finally(() => {
                dispatch(setIsFetching(false));
            })
    }
}

export const correctLess = (idYear, idMonth, idStartDayWeek, idDay, startTime, durationTime, subj, namePup, cost, homework, isPayed, isDecayed) => {
    return async (dispatch) => {
        dispatch(setIsFetching(true))
        await axios.post("http://localhost:5000/extentions/reduct",
            {
                idYear: idYear,
                idMonth: idMonth,
                idStartDayWeek: idStartDayWeek,
                idDay: idDay,
                startTime: startTime,
                durationTime: durationTime,
                subj: subj,
                namePup: namePup,
                cost: cost,
                homework: homework,
                isPayed: isPayed,
                isDecayed: isDecayed
            }
        )
            .catch(err => {
                alert("bad")
                dispatch(setError(err.response.data.message))
            })
            .finally(() => {
                dispatch(setIsFetching(false));
            })
    }
}

