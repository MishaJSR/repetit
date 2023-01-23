import {difference} from "lodash";
import _ from 'lodash';
const SET_USERS = 'SET_USERS'
const SET_MY_USER = 'SET_MY_USER'
const SET_MY_USER_INFO = 'SET_MY_USER_INFO'
const SET_PROFILE_ERROR = 'SET_PROFILE_ERROR'
const SET_FULL_SCREEN = 'SET_FULL_SCREEN'
const SET_SLIDER_ACTIVE = 'SET_SLIDER_ACTIVE'
const SET_SLIDER_POSITION = 'SET_SLIDER_POSITION'

const SET_NOW_DAY = 'SET_NOW_DAY'
const WEEK_CHANGE = 'WEEK_CHANGE'
const PLUS_WEEK = 'PLUS_WEEK'
const MINUS_WEEK = 'MINUS_WEEK'
const GET_WEEK_MASS = 'GET_WEEK_MASS'
const FILTER_LESSONS_MASS = 'FILTER_LESSONS_MASS'
const SORT_MASS_FOR_DAY = 'SORT_MASS_FOR_DAY'
const SET_IS_FETCH = 'SET_IS_FETCH'
const SET_EXT_MASS = 'SET_EXT_MASS'
const SET_DEC_EXT_MASS = 'SET_DEC_EXT_MASS'
const SET_REPEAT_MASS = 'SET_REPEAT_MASS'
const SET_ERROR_MESS = 'SET_ERROR_MESS'
const FILTER_END_MASS = 'FILTER_END_MASS'



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
    nowDay: Date.now(),
    firstWeekDay: Date.now(),
    secondWeekDay: Date.now(),
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
    monMass: [],
    tueMass: [],
    wenMass: [],
    thusMass: [],
    friMass: [],
    setMass: [],
    sunMass: [],
    dayMass: [],
    allUsers : [],
    nowUser:[],
    nowUserInfo:[],
    errorMessage: null,
    fullScreen: 8,
    sliderPosition: 0,
    isFetch: true,
    errorMess: null,
    filterExt: null
}


export default  function profileReducer(state= defaultState, action){
    switch (action.type) {
        case SET_NOW_DAY:
            return {
                ...state
            }

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
                console.log(extFilt)
                dif = filtRep.concat(extFilt);
                console.log("yes")
            } else dif = state.repeateble.concat(state.ext)




            let mMass = [];
            let tuMass = [];
            let wMass = [];
            let thMass = [];
            let frMass = [];
            let satMass = [];
            let sunMass = [];
            dif.map((e) => {
                if (e.idDay === 0) mMass.push(e)
                if (e.idDay === 1) tuMass.push(e)
                if (e.idDay === 2) wMass.push(e)
                if (e.idDay === 3) thMass.push(e)
                if (e.idDay === 4) frMass.push(e)
                if (e.idDay === 5) satMass.push(e)
                if (e.idDay === 6) sunMass.push(e)
            })
            return {
                ...state,
                errorMess: errRep,
                monMass: mMass,
                tueMass: tuMass,
                wenMass: wMass,
                thusMass: thMass,
                friMass: frMass,
                setMass: satMass,
                sunMass: sunMass,
                filtDecRep: dif,
                endLessonsMass: [mMass, tuMass, wMass, thMass,frMass, satMass, sunMass, ]
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
            localStorage.setItem('monthNumber', monthName1)

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

export const setNowDay = () => ({type: SET_NOW_DAY})
export const setNewWeek = (us1, us2) => ({type: WEEK_CHANGE, payload1: us1, payload2: us2})
export const plusWeek = () => ({type: PLUS_WEEK})
export const minusWeek = () => ({type: MINUS_WEEK})
export const getWeekMass = () => ({type: GET_WEEK_MASS})
export const filtLessons = () => ({type: FILTER_LESSONS_MASS})
export const sortLess = () => ({type: SORT_MASS_FOR_DAY})
export const setIsFetching = (bol) => ({type: SET_IS_FETCH, payload: bol})
export const setExtMass = (bol) => ({type: SET_EXT_MASS, payload: bol})
export const setRepMass = (bol) => ({type: SET_REPEAT_MASS, payload: bol})
export const setError = (bol) => ({type: SET_ERROR_MESS, payload: bol})
export const filterEndMass = () => ({type: FILTER_END_MASS})
export const setDecMass = (bol) => ({type: SET_DEC_EXT_MASS, payload: bol})


export const setUsers = (us) => ({type: SET_USERS, payload: us})
export const setMyUser = (us) => ({type: SET_MY_USER, payload: us})
export const setMyUserInfo = (us) => ({type: SET_MY_USER_INFO, payload: us})
export const setProfileError = (err) => ({type: SET_PROFILE_ERROR, payload: err})
export const setFullScreen = (bool) => ({type: SET_FULL_SCREEN, payload: bool})
export const setSliderActive = (num, len) => ({type: SET_SLIDER_ACTIVE, payload: num, len: len})
export const setSliderPosition = (num) => ({type: SET_SLIDER_POSITION, payload: num})

