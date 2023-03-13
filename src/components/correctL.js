import {useEffect, useRef, useState} from "react";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {getMonthPayExt, getMonthPayRep, getWeekDec, getWeekExt, getWeekRep, onSaveCorrect} from "../actions/actions";
import {getWeekMass, setIsFetching} from "../reducers/profileReducer";
import {setCorrectVisible} from "../reducers/correctLesson";
import moment from "moment";



const CorrectL = ({fullYear, monthNumber, name, durMin, sub, cost, monthFullName, homeW, isPay}) => {
    const [selectedWeek, setSelectedWeek] = useState("");
    const [timeStH, setTimeStH] = useState(0);
    const [timeStM, setTimeStM] = useState(0);

    const isVisible = useSelector(state => state.correctLess.isCorrectVisible);
    const dispatch = useDispatch();

    const createDate = () => {//при формировании даты занятий
        let a = moment({ year :2023, month :0, day :1, hour :8, minute: 0, second :0, millisecond :0});
        let b = moment({ year :2023, month :0, day :1, hour :Number(timeStH), minute: Number(timeStM), second :0, millisecond :0});
        let diffMin = b.diff(a, 'minutes');
        let pushStartTime = diffMin / 5;
        localStorage.setItem('newStartTime', pushStartTime)
    }

    const delayButton = async () => {//при корректирвке и нажатии на сохранить
        dispatch(setIsFetching(true));
        let dur2 = Number(durMin)
        let cos2 = Number(cost)
        let selWeek = Number(selectedWeek)
        console.log(dur2, cos2, selWeek)
        if (selWeek > 0 ) await dispatch(onSaveCorrect(fullYear, localStorage.getItem('monthNumberN'), localStorage.getItem('fDayNext'), localStorage.getItem('dayWeekSelected'), dur2/5, sub, name, cos2, homeW, isPay));
        else await dispatch(onSaveCorrect(fullYear, monthNumber, localStorage.getItem('fDay'), localStorage.getItem('dayWeekSelected'), dur2/5, sub, name, cos2, homeW, isPay));
        setTimeout(async () => {
            dispatch(getWeekMass());
            await  dispatch(getWeekExt(fullYear, monthNumber, localStorage.getItem('fDay')))
            await dispatch(getWeekDec(fullYear, monthNumber, localStorage.getItem('fDay')));
            await dispatch(getWeekRep())
            await dispatch(getMonthPayExt(fullYear, monthNumber))
            await dispatch(getMonthPayRep());
            dispatch(setCorrectVisible(false));
            dispatch(setIsFetching(false));
        }, 2000)
    }

    return(
        <div className={isVisible? "adderField" : "adderField-none"}>
            <div className="pupData">
                <input className="input_activity text-center" value={name} placeholder="Имя"/>
                <div className="time-center">
                    <select className="select-field-time" name="" id="" onChange={(e) => setTimeStH(e.target.value)}>
                        <option selected disabled>-----</option>
                        <option value="8">08</option>
                        <option value="9">09</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                        <option value="21">21</option>
                        <option value="22">22</option>
                    </select>
                    <select className="select-field-time" name="" id="" onChange={(e) => setTimeStM(e.target.value)}>
                        <option selected disabled>-----</option>
                        <option value="0">00</option>
                        <option value="5">05</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                        <option value="25">25</option>
                        <option value="30">30</option>
                        <option value="35">35</option>
                        <option value="40">40</option>
                        <option value="45">45</option>
                        <option value="50">50</option>
                        <option value="55">55</option>
                    </select>
                </div>
                <input className="input_activity text-center" value={durMin/60+ " ч."} placeholder="Длительность"/>
                <input className="input_activity text-center" value={sub} placeholder="Предмет"/>
                <input className="input_activity text-center" value={cost} placeholder="Стоимость"/>
                <button className="top-auto" onClick={() => {
                    createDate()
                    delayButton()
                }}>Сохранить</button>
            </div>
            <div className="timeData">
                <select className="select-field" name="" id="" onChange={(e) => setSelectedWeek(e.target.value)}>
                    <option value="0">{monthFullName} {localStorage.getItem('fDay')} - {localStorage.getItem('sDay')}</option>
                    <option value="1">{localStorage.getItem('monthNumberNext')} {localStorage.getItem('fDayNext')} - {localStorage.getItem('sDayNext')}</option>
                </select>
                <select className="select-field" name="" id="" onChange={(e) => localStorage.setItem('dayWeekSelected', e.target.value)} >
                    <option selected disabled>-------</option>
                    <option value="0">Понедельник</option>
                    <option value="1">Вторник</option>
                    <option value="2">Среда</option>
                    <option value="3">Четверг</option>
                    <option value="4">Пятница</option>
                    <option value="5">Суббота</option>
                    <option value="6">Воскресенье</option>
                </select>
                <button className="top-auto-close" onClick={() => dispatch(setCorrectVisible(false))}>Закрыть</button>
            </div>
        </div>
    )
}

export default CorrectL;