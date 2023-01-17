
import './App.css';
import arrowl from '../src/icons/left.png'
import arrowr from '../src/icons/right.png'
import {Link, NavLink} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    filtLessons,
    getWeekMass,
    minusWeek,
    plusWeek,
    setNewWeek,
    setNowDay,
    sortLess
} from "./reducers/profileReducer";
import {
    checkIsRead, correctField,
    correctLess,
    correctLessWithDel,
    createExt, decayLess,
    decExt,
    getWeekDec,
    getWeekExt,
    getWeekRep, onSaveCorrect
} from "./actions/actions";


const App = () => {
    const [name, setName] = useState("And");
    const [timeStH, setTimeStH] = useState("");
    const [timeStM, setTimeStM] = useState("");
    const [timeEnH, setTimeEnH] = useState("");
    const [timeEnM, setTimeEnM] = useState("");
    const [dur, setDur] = useState("");
    const [durMin, setDurMin] = useState("");
    const [sub, setSub] = useState("");
    const [cost, setCost] = useState("");
    const [isPay, setIsPay] = useState("");
    const [idDay1, setIdDay1] = useState("");
    const [startTime1, setStartTime1] = useState("");
    const [displaySpan, setDisplaySpan] = useState(false);
    const [homeW, setHome] = useState("");
    const [selected, setSelected] = useState("");
    const [idSelected, setIdSelected] = useState("");
    const refUser = useRef();
    const nowDay = useSelector(state => state.profile.nowDay);
    const firstWeekDay = useSelector(state => state.profile.firstWeekDay);
    const secondWeekDay = useSelector(state => state.profile.secondWeekDay);
    const [checked, setChecked] = useState(false);
    const fDay = useSelector(state => state.profile.fDay);
    const sDay = useSelector(state => state.profile.sDay);
    const monthWeek = useSelector(state => state.profile.monthWeek);
    const monthNumber = useSelector(state => state.profile.monthNumber);
    const fullYear = useSelector(state => state.profile.fullYear);
    const dayMass = useSelector(state => state.profile.dayMass);
    const endLessonsMass = useSelector(state => state.profile.endLessonsMass);
    const isFetch = useSelector(state => state.profile.isFetch);
    const dispatch = useDispatch();

    useEffect(() => {
        setThisWeek();
        dispatch(getWeekMass());
        dispatch(getWeekExt(2023, localStorage.getItem('monthNumber'), localStorage.getItem('fDay')));
        dispatch(getWeekDec(2023, localStorage.getItem('monthNumber'), localStorage.getItem('fDay')));
        dispatch(getWeekRep());
    }, []);

    const correctSome = () => {//при сохранении дз
        //dispatch(createExt(fullYear, monthNumber, localStorage.getItem('fDay'), idDay1, startTime1, dur, sub, name, cost, homeW, isPay, false))
        dispatch(correctField(fullYear, monthNumber, localStorage.getItem('fDay'), idDay1, startTime1, dur, sub, name, cost, homeW, isPay));
        setTimeout(() => {
            dispatch(getWeekMass());
            dispatch(getWeekExt(2023, localStorage.getItem('monthNumber'), localStorage.getItem('fDay')))
            dispatch(getWeekDec(2023, localStorage.getItem('monthNumber'), localStorage.getItem('fDay')));
            dispatch(getWeekRep())
        }, 5000)

    }

    const delayButton = () => {//при корректирвке и нажатии на сохранить
        let numDay = Number(selected);
        //dispatch(createExt(fullYear, monthNumber, localStorage.getItem('fDay'), idDay1, startTime1, dur, sub, name, cost, homeW, isPay, false))
        dispatch(onSaveCorrect(fullYear, monthNumber, localStorage.getItem('fDay'), numDay, startTime1, dur, sub, name, cost, homeW, isPay));
        setTimeout(() => {
            dispatch(getWeekMass());
            dispatch(getWeekExt(2023, localStorage.getItem('monthNumber'), localStorage.getItem('fDay')))
            dispatch(getWeekDec(2023, localStorage.getItem('monthNumber'), localStorage.getItem('fDay')));
            dispatch(getWeekRep())
        }, 5000)

    }

    const reductButton = () => {//при клике на корректировать
        dispatch(checkIsRead(fullYear, monthNumber, localStorage.getItem('fDay'), idDay1, startTime1, dur, sub, name, cost, homeW, isPay));
        setTimeout(() => {
            dispatch(getWeekMass());
            dispatch(getWeekExt(2023, localStorage.getItem('monthNumber'), localStorage.getItem('fDay')))
            dispatch(getWeekDec(2023, localStorage.getItem('monthNumber'), localStorage.getItem('fDay')));
            dispatch(getWeekRep())
        }, 5000)

    }

    const reductButtonDec = () => {//при клике на отмену
        dispatch(decayLess(fullYear, monthNumber, localStorage.getItem('fDay'), idDay1, startTime1, dur, sub, name, cost, homeW, isPay));
        setTimeout(() => {
            dispatch(getWeekMass());
            dispatch(getWeekExt(2023, localStorage.getItem('monthNumber'), localStorage.getItem('fDay')))
            dispatch(getWeekDec(2023, localStorage.getItem('monthNumber'), localStorage.getItem('fDay')));
            dispatch(getWeekRep())
        }, 5000)

    }


    const setThisWeek = () => {
        let weekNowDay = new Date().getDay()
        if (weekNowDay === 0) {
            dispatch(setNewWeek(-6, 1))
        }
        if (weekNowDay === 1) {
            dispatch(setNewWeek(0, 6))
        }
        if (weekNowDay === 2) {
            dispatch(setNewWeek(-1, 5))
        }
        if (weekNowDay === 3) {
            dispatch(setNewWeek(-2, 4))
        }
        if (weekNowDay === 4) {
            dispatch(setNewWeek(-3, 3))
        }
        if (weekNowDay === 5) {
            dispatch(setNewWeek(-4, 2))
        }
        if (weekNowDay === 6) {
            dispatch(setNewWeek(-5, 1))
        }
    }

    const changeWeekPlus = () => {
        dispatch(plusWeek());
        dispatch(getWeekMass());
        dispatch(getWeekExt(2023, localStorage.getItem('monthNumber'), localStorage.getItem('fDay')))
        dispatch(getWeekDec(2023, localStorage.getItem('monthNumber'), localStorage.getItem('fDay')));
        dispatch(getWeekRep())

    }

    const changeWeekMinus = () => {
        dispatch(minusWeek());
        dispatch(getWeekMass());
        dispatch(getWeekExt(2023, localStorage.getItem('monthNumber'), localStorage.getItem('fDay')))
        dispatch(getWeekDec(2023, localStorage.getItem('monthNumber'), localStorage.getItem('fDay')));
        dispatch(getWeekRep())
    }

  return (!isFetch && endLessonsMass.length > 0)?(
    <div className="app">
      <div className="header">
          <div className="pay">

          </div>
          <div className="date_field">
              <Link to="/" onClick={changeWeekMinus}>
                  <img className="left_arrow" src={arrowl}></img>
              </Link>
              <Link to="/" onClick={changeWeekPlus}>
                  <img className="right_arrow" src={arrowr}></img>
              </Link>

              <div className="year">{fullYear}</div>
              <div className="month">{monthWeek}</div>
              <div className="week">
                  <span className="first_date">{fDay}</span>
                  <span> - </span>
                  <span className="second_date">{sDay}</span>
              </div>
          </div>
      </div>
        <div className="main">
            <div className="activity">
                <input className="input_activity text-center" value={name} onChange={(e) => setName(e.target.value)} placeholder="Имя"/>
                <div className="timeF">
                    <input className="timeF_input text-center" value={timeStH} onChange={(e) => setTimeStH(e.target.value)} />
                    <input className="timeF_input text-center" value={timeStM} onChange={(e) => setTimeStM(e.target.value)} />
                    <input className="timeF_input padR-10 text-center" value={timeEnH} onChange={(e) => setTimeEnH(e.target.value)} />
                    <input className="timeF_input text-center" value={timeEnM} onChange={(e) => setTimeEnM(e.target.value)} />
                </div>
                <input className="input_activity text-center" value={durMin} onChange={(e) => setDurMin(e.target.value)} placeholder="Длительность"/>
                <input className="input_activity text-center" value={sub} onChange={(e) => setSub(e.target.value)} placeholder="Предмет"/>
                <div className="payField">
                    <input className="input_activity text-center payLabel" value={cost} onChange={(e) => setCost(e.target.value)} placeholder="Стоимость"/>
                    <button className="payButton"></button>
                </div>
                <div className="homeFiled">
                    <div className="homeSpan text-center">
                        Homework
                    </div>
                    <textarea name="" id="" cols="27" rows="8" value={homeW} onChange={(e) => setHome(e.target.value)}></textarea>
                    <button className="saveDZ" onClick={() => correctSome()}>Сохранить</button>
                </div>



                <button className="correct activity-buttons" onClick={() => {
                    reductButton();
                    setDisplaySpan(true)
                }}>Коррекция занятия</button>
                <button className="create-new activity-buttons" onClick={() => setDisplaySpan(true)}>Создать новое занятие</button>
                <button className="delete-one activity-buttons" onClick={() => reductButtonDec()}
                >Удалить текущее занятие</button>
                <button className="end-work activity-buttons">Удалить текущее и закончить работу с учеником</button>
            </div>
            <div className="calendar_field">
                <div className="timeBar">

                </div>
                {dayMass.map((e, index) => {
                    return <div className="dayWeek_field">
                        <div className="monthPart">
                            <span>{e.date}</span>
                            <span>.</span>
                            <span>{e.day}</span>
                        </div>
                        <div className="lessonsPart">
                            {endLessonsMass[index].map((e) => {
                                let currentTimeForFirst = new Date();
                                currentTimeForFirst.setHours(8, 0);
                                currentTimeForFirst.setMinutes(currentTimeForFirst.getMinutes() + 5*e.startTime);
                                let currentTimeForSecond = new Date();
                                currentTimeForSecond.setHours(8, 0);
                                currentTimeForSecond.setMinutes(currentTimeForSecond.getMinutes() + 5*e.durationTime + 5*e.startTime);
                                return <button className="lesson"
                                               style={{ top:`${e.startTime*5}px`, height:`${e.durationTime*5}px`, backgroundColor: "#ffd43a"}}
                                onClick={() => {
                                    setName(e.namePup);
                                    setTimeStH(currentTimeForFirst.getHours())
                                    setTimeStM(currentTimeForFirst.getMinutes())
                                    setTimeEnH(currentTimeForSecond.getHours())
                                    setTimeEnM(currentTimeForSecond.getMinutes())
                                    setSub(e.subj)
                                    setCost(e.cost)
                                    setIdDay1(e.idDay);
                                    setStartTime1(e.startTime);
                                    setDurMin(Number(e.durationTime)*5);
                                    setHome(e.homework);
                                    if (!e.id) setIdSelected(0); else setIdSelected(e.id)
                                    if (!e.isPayed) setIsPay(false); else setIsPay(e.isPayed)
                                    setDur(e.durationTime)
                                    if (!e.homework) setHome("Пусто")
                                }
                                }>
                                    <span>{e.namePup}</span>
                                    <br/>
                                    <span>{(currentTimeForFirst.getMinutes() === 0)? currentTimeForFirst.getHours()+":"+"00"
                                        : currentTimeForFirst.getHours()+":"+currentTimeForFirst.getMinutes()}</span>
                                    <span>-</span>
                                    <span>{(currentTimeForSecond.getMinutes() === 0)? currentTimeForSecond.getHours()+":"+"00"
                                        : currentTimeForSecond.getHours()+":"+currentTimeForSecond.getMinutes()}</span>
                                </button>
                            })}
                        </div>
                    </div>
                })
                }
            </div>
        </div>

        <div className={displaySpan? "adderField" : "adderField-none"}>
            <div className="pupData">
                <input className="input_activity text-center" value={name} onChange={(e) => setName(e.target.value)} placeholder="Имя"/>
                <div className="time-center">
                    <input className="timeF_input big-pad text-center" value={timeStH} onChange={(e) => setTimeStH(e.target.value)} />
                    <input className="timeF_input big-pad text-center" value={timeStM} onChange={(e) => setTimeStM(e.target.value)} />
                    <input className="timeF_input big-pad padR-10 text-center" value={timeEnH} onChange={(e) => setTimeEnH(e.target.value)} />
                    <input className="timeF_input big-pad text-center" value={timeEnM} onChange={(e) => setTimeEnM(e.target.value)} />
                </div>
                <input className="input_activity text-center" value={durMin} onChange={(e) => setDur(e.target.value)} placeholder="Длительность"/>
                <input className="input_activity text-center" value={sub} onChange={(e) => setSub(e.target.value)} placeholder="Предмет"/>
                <input className="input_activity text-center payLabel2" value={cost} onChange={(e) => setCost(e.target.value)} placeholder="Стоимость"/>
                <button className="top-auto" onClick={() => {
                    delayButton()
                }}>Сохранить</button>
            </div>
            <div className="timeData">
                <select className="select-field" name="" id="">
                    <option value="this">{monthWeek} {localStorage.getItem('fDay')} - {localStorage.getItem('sDay')}</option>
                    <option value="next">Следующая</option>
                </select>
                <select className="select-field" name="" id="" onChange={(e) => setSelected(e.target.value)} >
                    <option value="0">Понедельник</option>
                    <option value="1">Вторник</option>
                    <option value="2">Среда</option>
                    <option value="3">Четверг</option>
                    <option value="4">Пятница</option>
                    <option value="5">Суббота</option>
                    <option value="6">Воскресенье</option>
                </select>
                <div className="isRepeat">
                  <input className="scale-check" type="checkbox" id="contactChoice1" checked={checked} onChange={() => setChecked(!checked)}/> <label htmlFor="contactChoice1">Повторять каждую неделю</label>
                </div>
                <button className="top-auto-close" onClick={() => setDisplaySpan(false)}>Закрыть</button>
            </div>
        </div>


    </div>
  ): (<div>ERROR</div>)
}

export default App;
