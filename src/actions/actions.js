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

export const correctField = (idYear, idMonth, idStartDayWeek, idDay, startTime, durationTime, subj, namePup, cost, homework, isPayed) => { // корректирует
    return async (dispatch) => {
        dispatch(setIsFetching(true));
        await axios.post("http://localhost:5000/extentions/checkIsRead", {idYear: idYear, idMonth: idMonth, idStartDayWeek: idStartDayWeek, idDay: idDay, startTime: startTime})
            .then(response => {
                localStorage.setItem('idNowLesson', response.data.id);
                //alert('уже существует, начинаем коррекцию');
                axios.post("http://localhost:5000/extentions/reductByID", {
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
                    isDecayed: false,
                    idDecayed: localStorage.getItem('idNowLesson')
                })
                    .then(response => {
                        localStorage.setItem('idNowLesson', response.data.id);
                        //alert('откорректировал');

                    })
                    .catch(err => {
                        dispatch(setError(err.response.data.message))
                        alert("не смог скорректировать")
                    })
            })
            .catch(err => {
                //alert('занятия еще не существует, будем добавлять')
                dispatch(setError(err.response.data.message))
                axios.post("http://localhost:5000/extentions", {
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
                    isDecayed: false
                })
                    .then(response => {
                        localStorage.setItem('idNowLesson', response.data.id);
                        //alert('создал новое');

                    })
                    .catch(err => {
                        dispatch(setError(err.response.data.message))
                        alert("не смог создать новое")
                    })
            })
            .finally(() => {
                dispatch(setIsFetching(false));
            })
    }
}

export const decayLess = (idYear, idMonth, idStartDayWeek, idDay, startTime, durationTime, subj, namePup, cost, homework, isPayed) => { // проверяет есть ли занятие в массиве Ext, если нет, то создает занятия с декеем равным фолс, если есть то редактирует с деккеем фолс
    return async (dispatch) => {
        dispatch(setIsFetching(true))
        await axios.post("http://localhost:5000/extentions/checkIsRead", {idYear: idYear, idMonth: idMonth, idStartDayWeek: idStartDayWeek, idDay: idDay, startTime: startTime})
            .then(response => {
                //alert('уже существует, будем его редактировать');
                localStorage.setItem('idReductLess', response.data.id);
                axios.post("http://localhost:5000/extentions/reductByID", { //простое редактирование по айди и всеми параметрами
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
                    isDecayed: true,
                    idDecayed: localStorage.getItem('idReductLess')
                })
                    .then(response => {
                        //alert('заредактировал старое с декей фолс');

                    })
                    .catch(err => {
                        dispatch(setError(err.response.data.message))
                        alert("не смог заредактировать старое")
                    })
            })
            .catch(err => {
                //alert('занятия еще не существует, будем добавлять и ставить декей фолс')
                dispatch(setError(err.response.data.message))
                axios.post("http://localhost:5000/extentions", {
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
                    isDecayed: true
                })
                    .then(response => {
                        //alert('создал новое с декеем фолс');
                    })
                    .catch(err => {
                        dispatch(setError(err.response.data.message))
                        alert("не смог создать новое с декеем фолс")
                    })
            })
            .finally(() => {
                dispatch(setIsFetching(false));
            })
    }
}

export const checkIsRead = (idYear, idMonth, idStartDayWeek, idDay, startTime, durationTime, subj, namePup, cost, homework, isPayed) => { // проверяет есть ли занятие в массиве Ext, если нет, то создает новое со всеми данными значениями и записывает в ЛС айди рабочего занятия
    return async (dispatch) => {
        dispatch(setIsFetching(true))
        await axios.post("http://localhost:5000/extentions/checkIsRead", {idYear: idYear, idMonth: idMonth, idStartDayWeek: idStartDayWeek, idDay: idDay, startTime: startTime})
            .then(response => {
                localStorage.setItem('idNowLesson', response.data.id);
                //alert('уже существует');
            })
            .catch(err => {
                //alert('занятия еще не существует, будем добавлять')
                dispatch(setError(err.response.data.message))
                axios.post("http://localhost:5000/extentions", {
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
                    isDecayed: false
                })
                    .then(response => {
                        localStorage.setItem('idNowLesson', response.data.id);
                        //alert('создал новое');

                    })
                    .catch(err => {
                        dispatch(setError(err.response.data.message))
                        alert("не смог создать новое")
                    })
            })
            .finally(() => {
                dispatch(setIsFetching(false));
            })
    }
}

export const onSaveCorrect = (idYear, idMonth, idStartDayWeek, idDay, startTime, durationTime, subj, namePup, cost, homework, isPayed) => { // декеит старое занятие по айди из ЛС и добавляет новое со всеми данными значениями
    return async (dispatch) => {
        dispatch(setIsFetching(true));
        await axios.post("http://localhost:5000/extentions", {
            idYear: idYear,
            idMonth: idMonth,
            idStartDayWeek: idStartDayWeek,
            idDay: idDay,
            startTime: localStorage.getItem('newStartTime'),
            durationTime: durationTime,
            subj: subj,
            namePup: namePup,
            cost: cost,
            homework: homework,
            isPayed: isPayed,
            isDecayed: false
            })
            .then(response => {
                //alert('Заредактированно успешно');
                axios.post("http://localhost:5000/extentions/decayID", {idExt: localStorage.getItem('idNowLesson')})
                    .then(response => {
                        //alert('Прошлое занятие отменено');
                    })
                    .catch(err => {
                        alert('Ошибка при удалении прошлого занятия')
                        dispatch(setError(err.response.data.message))
                    })
            })
            .catch(err => {
                dispatch(setError(err.response.data.message))
                alert("не смог создать новое заредактированное")
            })
            .finally(() => {
            })
    }
}

export const decExt = (idExt) => {
    return async (dispatch) => {
        dispatch(setIsFetching(true))
        await axios.post("http://localhost:5000/extentions/decayID", {idExt: idExt})
            .then(response => {
                //alert("kk")
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

export const createExt = (idYear, idMonth, idStartDayWeek, idDay, startTime, durationTime, subj, namePup, cost) => {
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
            homework: "",
            isPayed: false,
            isDecayed: false
        })
            .then(response => {
                //alert("kk")
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

export const createRep = (idYear, idMonth, idStartDayWeek, idDay, startTime, durationTime, subj, namePup, cost) => {
    return async (dispatch) => {
        dispatch(setIsFetching(true))
        await axios.post("http://localhost:5000/repeateble",             {
            idYear: idYear,
            idMonth: idMonth,
            idStartDayWeek: idStartDayWeek,
            idDay: idDay,
            startTime: startTime,
            durationTime: durationTime,
            subj: subj,
            namePup: namePup,
            cost: cost,
            isDecayed: false
        })
            .then(response => {
                //alert("rep")
            })
            .catch(err => {
                dispatch(setError(err.response.data.message))
                alert("badrep")
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

