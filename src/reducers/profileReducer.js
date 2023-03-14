import _ from 'lodash';
import moment from "moment";

const SET_NOW_DAY = 'SET_NOW_DAY'
const WEEK_CHANGE = 'WEEK_CHANGE'
const PLUS_WEEK = 'PLUS_WEEK'
const MINUS_WEEK = 'MINUS_WEEK'
const GET_WEEK_MASS = 'GET_WEEK_MASS'
const SET_IS_FETCH = 'SET_IS_FETCH'
const SET_EXT_MASS = 'SET_EXT_MASS'
const SET_DEC_EXT_MASS = 'SET_DEC_EXT_MASS'
const SET_REPEAT_MASS = 'SET_REPEAT_MASS'
const SET_ERROR_MESS = 'SET_ERROR_MESS'
const FILTER_END_MASS = 'FILTER_END_MASS'
const FAKE_PLUS_WEEK = 'FAKE_PLUS_WEEK'
const FAKE_MINUS_WEEK = 'FAKE_MINUS_WEEK'
const SET_MONTH_SUM = 'SET_MONTH_SUM'
const SET_MONTH_PAY = 'SET_MONTH_PAY'

const monthName = [
    {name: 'January'},
    {name: 'February'},
    {name: 'March'},
    {name: 'April'},
    {name: 'May'},
    {name: 'June'},
    {name: 'July'},
    {name: 'August'},
    {name: 'September '},
    {name: 'October'},
    {name: 'November'},
    {name: 'December'},
]

const weekName = [
    {name: 'Monday'},
    {name: 'Tuesday'},
    {name: 'Wednesday'},
    {name: 'Thursday'},
    {name: 'Friday'},
    {name: 'Saturday'},
    {name: 'Sunday'},
]

const defaultState = {
    nowDay: moment().format('e') - 1,
    firstWeekDay: Date.now(),
    secondWeekDay: Date.now(),
    nowDate: moment().format('DD'),
    nowMonth: moment().format('MM'),
    fDay: null,
    sDay: null,
    monthWeek: monthName[new Date().getMonth()].name,
    monthNumber: new Date().getMonth(),
    fullYear: new Date().getFullYear(),
    ext: null,
    decExt: null,
    filtDecRep: null,
    repeateble: null,
    lessonsFilter: [],
    endLessonsMass: [],
    filtExt: [],
    dayMass: [],
    errorMessage: null,
    isFetch: true,
    errorMess: null,
    filterExt: null,
    payInWeek: null,
    nowPayInWeek: null,
    payInDay: null,
    nowPayInDay: null,
    monthSumCost: null,
    monthPayCost: null
}


export default  function profileReducer(state= defaultState, action){
    switch (action.type) {

        case SET_IS_FETCH:
            return {
                ...state,
                isFetch: action.payload
            }
        case SET_EXT_MASS:
            return {
                ...state,
                ext: action.payload
            }

        case SET_NOW_DAY:
            return {
                ...state,
                nowDay: action.payload
            }

        case SET_REPEAT_MASS:
            return {
                ...state,
                repeateble: action.payload
            }
        case SET_DEC_EXT_MASS:
            return {
                ...state,
                decExt: action.payload
            }

        case SET_MONTH_SUM:
            return {
                ...state,
                monthSumCost: action.payload
            }

        case SET_MONTH_PAY:
            return {
                ...state,
                monthPayCost: action.payload
            }

        case SET_ERROR_MESS:
            return {
                ...state,
                errorMess: action.payload
            }

        case FILTER_END_MASS:
            let errExtRep = [] // надо удалить из ext
            let errRep = [] // надо удалить из repeat
            let dif = [] //будет итоговый совмещенный массив

            if (state.decExt.length > 0) {
                for (let i = 0; i < state.decExt.length; i++) {
                    state.repeateble.map((e) => {
                        if ((state.decExt[i].idDay === e.idDay) && (state.decExt[i].startTime === e.startTime)) {
                            if (!errRep.includes(e)) errRep.push(e);
                        }
                    })
                    state.ext.map((e) => {
                        if ((state.decExt[i].idDay === e.idDay) && (state.decExt[i].startTime === e.startTime)  && (state.decExt[i].id > e.id)) {
                            if (!errExtRep.includes(e)) errExtRep.push(e);
                        }
                    })
                }

                let extFilt = _.difference(state.ext, errExtRep);
                let filtRep = _.difference(state.repeateble, errRep);

                for (let i = 0; i < extFilt.length; i++) {
                    filtRep.map((e, index) => {
                        if ((extFilt[i].idDay === e.idDay) && (extFilt[i].startTime === e.startTime)) {

                            filtRep.splice(index, 1);
                        }
                    })
                }
                dif = extFilt.concat(filtRep);
            } else
            {
                let extFilt = _.difference(state.ext, errExtRep);
                let filtRep = _.difference(state.repeateble, errRep);

                for (let i = 0; i < extFilt.length; i++) {
                    filtRep.map((e, index) => {
                        if ((extFilt[i].idDay === e.idDay) && (extFilt[i].startTime === e.startTime)) {

                            filtRep.splice(index, 1);
                        }
                    })
                }

                dif = extFilt.concat(filtRep)
            }

            //calcPayWeek
            const sumOfFullCost = dif.reduce((acc, number) => acc + number.cost, 0);

            const truePayed = dif.filter(e => e.isPayed === true)
            const sumOfNowCost = truePayed.reduce((acc, number) => acc + number.cost, 0);

            //calcNowDayPay
            let nowD = Number(state.nowDay)

            const truePayedFildDay = dif.filter(e => e.idDay === nowD)
            const sumOfFullCostDay = truePayedFildDay.reduce((acc, number) => acc + number.cost, 0);
            const truePayedDay = truePayedFildDay.filter(e => e.isPayed === true)
            const sumOfNowCostDay = truePayedDay.reduce((acc, number) => acc + number.cost, 0);

            let dM = [[],[],[],[],[],[],[]]

            dif.map((e) => dM[e.idDay].push(e))

            return {
                ...state,
                errorMess: errRep,
                filtDecRep: dif,
                endLessonsMass: dM,
                payInWeek: sumOfFullCost,
                nowPayInWeek: sumOfNowCost,
                payInDay: sumOfFullCostDay,
                nowPayInDay: sumOfNowCostDay
            }


        case WEEK_CHANGE:
            let f;
            let s;
                let one = new Date(state.firstWeekDay + 86400000*action.payload1)
                f = one.getDate();
                let two = new Date(state.secondWeekDay + 86400000*action.payload2)
                s = two.getDate()

            return {
                ...state,
                firstWeekDay: one.toISOString(),
                secondWeekDay: two.toISOString(),
                fDay: f,
                sDay: s
            }



        case FAKE_MINUS_WEEK:
            let yerMin = state.firstWeekDay.slice(0,4);
            let monhMin = state.firstWeekDay.slice(5,7);
            let monh2Min  = Number(monhMin) - 1;
            let day2Min = state.firstWeekDay.slice(8,10);
            let w11Min = new Date(yerMin, monh2Min, day2Min)
            w11Min.setDate(w11Min.getDate() + 8);

            let year211Min = state.secondWeekDay.slice(0,4);
            let month211Min = state.secondWeekDay.slice(5,7);
            let mon211Min  = Number(month211Min) - 1;
            let da211Min = state.secondWeekDay.slice(8,10);
            let y11Min = new Date(year211Min, mon211Min, da211Min)
            y11Min.setDate(y11Min.getDate() + 8);
            let monthNameNextMin = w11Min.getMonth();
            let letToLSWNextMin = (w11Min.getDate() - 1).toString()
            let letToLSYNextMin = (y11Min.getDate() - 1).toString()
            localStorage.setItem('fDayNext', letToLSWNextMin);
            localStorage.setItem('sDayNext', letToLSYNextMin);
            localStorage.setItem('monthNumberNext', monthName[monthNameNextMin].name )
            localStorage.setItem('monthNumberN',  monthNameNextMin)
            return {
                ...state
            }


        case FAKE_PLUS_WEEK:
            let yer = state.firstWeekDay.slice(0,4);
            let monh = state.firstWeekDay.slice(5,7);
            let monh2  = Number(monh) - 1;
            let day2 = state.firstWeekDay.slice(8,10);
            let w11 = new Date(yer, monh2, day2)
            w11.setDate(w11.getDate() + 8);

            let year211 = state.secondWeekDay.slice(0,4);
            let month211 = state.secondWeekDay.slice(5,7);
            let mon211  = Number(month211) - 1;
            let da211 = state.secondWeekDay.slice(8,10);
            let y11 = new Date(year211, mon211, da211)
            y11.setDate(y11.getDate() + 8);
            let monthNameNext = w11.getMonth();
            let letToLSWNext = (w11.getDate() - 1).toString()
            let letToLSYNext = (y11.getDate() - 1).toString()
            localStorage.setItem('fDayNext', letToLSWNext);
            localStorage.setItem('sDayNext', letToLSYNext);
            localStorage.setItem('monthNumberNext', monthName[monthNameNext].name )
            localStorage.setItem('monthNumberN',  monthNameNext)
            return {
                ...state
            }

        case PLUS_WEEK:
            let year = state.firstWeekDay.slice(0,4);
            let month = state.firstWeekDay.slice(5,7);
            let mon  = Number(month) - 1;
            let da = state.firstWeekDay.slice(8,10);
            let w = new Date(year, mon, da)
            w.setDate(w.getDate() + 8);

            let year2 = state.secondWeekDay.slice(0,4);
            let month2 = state.secondWeekDay.slice(5,7);
            let mon2  = Number(month2) - 1;
            let da2 = state.secondWeekDay.slice(8,10);
            let y = new Date(year2, mon2, da2)
            y.setDate(y.getDate() + 8);
            let monthName2 = w.getMonth();
            let letToLSW = (w.getDate() - 1).toString()
            let letToLSY = (y.getDate() - 1).toString()
            localStorage.setItem('fDay', letToLSW);
            localStorage.setItem('sDay', letToLSY);
            localStorage.setItem('monthNumber', monthName2)

            return {
                ...state,
                firstWeekDay: w.toISOString(),
                secondWeekDay: y.toISOString(),
                fDay: w.getDate() - 1,
                sDay: y.getDate() - 1,
                monthWeek: monthName[monthName2].name,
                monthNumber: monthName2,
                fullYear: w.getFullYear()
            }

        case MINUS_WEEK:
            let year3 = state.firstWeekDay.slice(0,4);
            let month3 = state.firstWeekDay.slice(5,7);
            let mon3  = Number(month3) - 1;
            let da3 = state.firstWeekDay.slice(8,10);
            let w3 = new Date(year3, mon3, da3)
            w3.setDate(w3.getDate() - 6);

            let year4 = state.secondWeekDay.slice(0,4);
            let month4 = state.secondWeekDay.slice(5,7);
            let mon4  = Number(month4) - 1;
            let da4 = state.secondWeekDay.slice(8,10);
            let y4 = new Date(year4, mon4, da4)
            y4.setDate(y4.getDate() - 6);
            let monthName1 = w3.getMonth();

            let letToLSW2 = (w3.getDate() - 1).toString()
            let letToLSY2 = (y4.getDate() - 1).toString()

            localStorage.setItem('fDay', letToLSW2);
            localStorage.setItem('sDay', letToLSY2);
            localStorage.setItem('monthNumber', monthName1);
            let sDate = moment(y4).format('DD');
            console.log(sDate);

            return {
                ...state,
                firstWeekDay: w3.toISOString(),
                secondWeekDay: y4.toISOString(),
                fDay: w3.getDate() - 1,
                sDay: y4.getDate() - 1,
                monthWeek: monthName[monthName1].name,
                monthNumber: monthName1,
                fullYear: w3.getFullYear()
            }


        case GET_WEEK_MASS:
            let massDays = [];
            let fir = new Date(state.fullYear, state.monthNumber, state.fDay);
            massDays.push({date: fir.getDate(), day: weekName[0].name});
            for (let i = 1; i < 6; i++) {
                let z = fir.setDate(fir.getDate() + 1)
                massDays.push({date: fir.getDate(), day: weekName[i].name});
            }
            massDays.push({date: state.sDay, day: weekName[6].name});
            let a = state.monthNumber.toString()
            let b = state.fDay.toString()
            let c = state.sDay.toString()
            localStorage.setItem('monthNumber', a);
            localStorage.setItem('fDay', b);
            localStorage.setItem('sDay', c);
            return {
                ...state,
                dayMass: massDays
            }

        default:
            return state
    }
}

export const setNowDay = (us) => ({type: SET_NOW_DAY, payload: us})
export const setNewWeek = (us1, us2) => ({type: WEEK_CHANGE, payload1: us1, payload2: us2})
export const plusWeek = () => ({type: PLUS_WEEK})
export const minusWeek = () => ({type: MINUS_WEEK})
export const getWeekMass = () => ({type: GET_WEEK_MASS})
export const setIsFetching = (bol) => ({type: SET_IS_FETCH, payload: bol})
export const setExtMass = (bol) => ({type: SET_EXT_MASS, payload: bol})
export const setRepMass = (bol) => ({type: SET_REPEAT_MASS, payload: bol})
export const setError = (bol) => ({type: SET_ERROR_MESS, payload: bol})
export const filterEndMass = () => ({type: FILTER_END_MASS})
export const setDecMass = (bol) => ({type: SET_DEC_EXT_MASS, payload: bol})
export const fakePlusWeek = () => ({type: FAKE_PLUS_WEEK})
export const fakeMinusWeek = () => ({type: FAKE_MINUS_WEEK})
export const setMonthSum = (us) => ({type: SET_MONTH_SUM, payload: us})
export const setMonthPay = (us) => ({type: SET_MONTH_PAY, payload: us})

