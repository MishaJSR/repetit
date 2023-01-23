
import './App.css';
import arrowl from '../src/icons/left.png'
import loader from '../src/preloader/loader.png'
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
    createExt, createRep, decayLess,
    decExt,
    getWeekDec,
    getWeekExt,
    getWeekRep, onSaveCorrect
} from "./actions/actions";
import moment from "moment";
import PreloaderLogin from "./preloader/Preloader";


const App = () => {
    const refStH = useRef()
    const refStM = useRef()
    const refEnH = useRef()
    const refEnM = useRef()

        //create

    const refStHNew = useRef()
    const refStMNew = useRef()
    const refEnHNew = useRef()
    const refEnMNew = useRef()

    const [nameNew, setNameNew] = useState("");
    const [timeStHNew, setTimeStHNew] = useState("");
    const [timeStMNew, setTimeStMNew] = useState("");
    const [durMinNew, setDurMinNew] = useState("");
    const [subNew, setSubNew] = useState("");
    const [costNew, setCostNew] = useState("");
    const [idDay1New, setIdDay1New] = useState("");
    const [selectedWeekNew, setSelectedWeekNew] = useState("");
    const [checkedNew, setCheckedNew] = useState(false);

        //create
    const [name, setName] = useState("And");
    const [timeStH, setTimeStH] = useState("");
    const [timeStM, setTimeStM] = useState("");
    const [timeEnH, setTimeEnH] = useState("");
    const [timeEnM, setTimeEnM] = useState("");
    const [durMin, setDurMin] = useState("");
    const [sub, setSub] = useState("");
    const [cost, setCost] = useState("");
    const [isPay, setIsPay] = useState("");
    const [idDay1, setIdDay1] = useState("");
    const [startTime1, setStartTime1] = useState("");
    const [toPushStartTime, setToPushStartTime] = useState(0);
    const [displaySpan, setDisplaySpan] = useState(false);
    const [displaySpanNew, setDisplaySpanNew] = useState(false);
    const [homeW, setHome] = useState("");
    const [selected, setSelected] = useState("");
    const [idSelected, setIdSelected] = useState("");
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

    const createDate = () => {//при формировании даты занятий
        let a = moment({ year :2023, month :0, day :1, hour :8, minute: 0, second :0, millisecond :0});
        let b = moment({ year :2023, month :0, day :1, hour :refStH.current.value, minute: refStM.current.value, second :0, millisecond :0});
        let diffMin = b.diff(a, 'minutes');
        let pushStartTime = diffMin / 5;
        localStorage.setItem('newStartTime', pushStartTime)
    }

    const createNewDate = () => {//при формировании даты занятий для новых
        let a = moment({ year :2023, month :0, day :1, hour :8, minute: 0, second :0, millisecond :0});
        let b = moment({ year :2023, month :0, day :1, hour :refStHNew.current.value, minute: refStMNew.current.value, second :0, millisecond :0});
        let diffMin = b.diff(a, 'minutes');
        let pushNew = diffMin / 5;
        localStorage.setItem('newCreateStartTime', pushNew)
    }

    const correctSome = () => {//при сохранении дз
        dispatch(correctField(fullYear, monthNumber, localStorage.getItem('fDay'), idDay1, startTime1, durMin/5, sub, name, cost, homeW, isPay));
        setTimeout(() => {
            dispatch(getWeekMass());
            dispatch(getWeekExt(2023, localStorage.getItem('monthNumber'), localStorage.getItem('fDay')))
            dispatch(getWeekDec(2023, localStorage.getItem('monthNumber'), localStorage.getItem('fDay')));
            dispatch(getWeekRep())
        }, 2000)

    }

    const delayButton = () => {//при корректирвке и нажатии на сохранить
        dispatch(onSaveCorrect(fullYear, monthNumber, localStorage.getItem('fDay'), localStorage.getItem('dayWeekSelected'), toPushStartTime, durMin/5, sub, name, cost, homeW, isPay));

         setTimeout(() => {
            dispatch(getWeekMass());
            dispatch(getWeekExt(2023, localStorage.getItem('monthNumber'), localStorage.getItem('fDay')))
            dispatch(getWeekDec(2023, localStorage.getItem('monthNumber'), localStorage.getItem('fDay')));
            dispatch(getWeekRep())

         }, 2000)
        setDisplaySpan(false);
    }

    const createNewButton = () => {//при клике на сохранить в новом занятии
        console.log(checkedNew)
        if (!checkedNew) {
            dispatch(createExt(fullYear, monthNumber, localStorage.getItem('fDay'), localStorage.getItem('createDayWeekSelected'), localStorage.getItem('newCreateStartTime'), durMinNew/5, subNew, nameNew, costNew));
        } else {
            dispatch(createRep(fullYear, monthNumber, localStorage.getItem('fDay'), localStorage.getItem('createDayWeekSelected'), localStorage.getItem('newCreateStartTime'), durMinNew/5, subNew, nameNew, costNew))
        }
        dispatch(getWeekMass());
        dispatch(getWeekExt(2023, localStorage.getItem('monthNumber'), localStorage.getItem('fDay')))
        dispatch(getWeekDec(2023, localStorage.getItem('monthNumber'), localStorage.getItem('fDay')));
        dispatch(getWeekRep())
        setDisplaySpanNew(false)
    }

    const reductButton = () => {//при клике на корректировать
        dispatch(checkIsRead(fullYear, monthNumber, localStorage.getItem('fDay'), idDay1, startTime1, durMin/5, sub, name, cost, homeW, isPay));
            dispatch(getWeekMass());
            dispatch(getWeekExt(2023, localStorage.getItem('monthNumber'), localStorage.getItem('fDay')))
            dispatch(getWeekDec(2023, localStorage.getItem('monthNumber'), localStorage.getItem('fDay')));
            dispatch(getWeekRep())

    }

    const reductButtonDec = () => {//при клике на отмену
        dispatch(decayLess(fullYear, monthNumber, localStorage.getItem('fDay'), idDay1, startTime1, durMin/5, sub, name, cost, homeW, isPay));
        setTimeout(() => {
            dispatch(getWeekMass());
            dispatch(getWeekExt(2023, localStorage.getItem('monthNumber'), localStorage.getItem('fDay')))
            dispatch(getWeekDec(2023, localStorage.getItem('monthNumber'), localStorage.getItem('fDay')));
            dispatch(getWeekRep())
        }, 1000)

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
                    <input className="timeF_input text-center" ref={refStH} value={timeStH} onChange={(e) => setTimeStH(e.target.value)} />
                    <input className="timeF_input text-center" ref={refStM} value={timeStM} onChange={(e) => setTimeStM(e.target.value)} />
                    <input className="timeF_input padR-10 text-center" ref={refEnH} value={timeEnH} onChange={(e) => setTimeEnH(e.target.value)} />
                    <input className="timeF_input text-center" ref={refEnM} value={timeEnM} onChange={(e) => setTimeEnM(e.target.value)} />
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
                <button className="create-new activity-buttons" onClick={() => setDisplaySpanNew(true)}>Создать новое занятие</button>
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
                </div>
                <input className="input_activity text-center" value={durMin} onChange={(e) => setDurMin(e.target.value)} placeholder="Длительность"/>
                <input className="input_activity text-center" value={sub} onChange={(e) => setSub(e.target.value)} placeholder="Предмет"/>
                <input className="input_activity text-center payLabel2" value={cost} onChange={(e) => setCost(e.target.value)} placeholder="Стоимость"/>
                <button className="top-auto" onClick={() => {
                    createDate()
                    delayButton()
                }}>Сохранить</button>
            </div>
            <div className="timeData">
                <select className="select-field" name="" id="">
                    <option value="this">{monthWeek} {localStorage.getItem('fDay')} - {localStorage.getItem('sDay')}</option>
                    <option value="next">Следующая</option>
                </select>
                <select className="select-field" name="" id="" onChange={(e) => {
                    localStorage.setItem('dayWeekSelected', e.target.value)
                    setSelected(e.target.value)
                }} >
                    <option selected disabled>-------</option>
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

        <div className={displaySpanNew? "adderFieldNew" : "adderField-none"}>
            <div className="pupData">
                <input className="input_activity text-center" value={nameNew} onChange={(e) => setNameNew(e.target.value)} placeholder="Имя"/>
                <div className="time-center">
                    <input className="timeF_input big-pad text-center" ref={refStHNew} value={timeStHNew} onChange={(e) => setTimeStHNew(e.target.value)} />
                    <input className="timeF_input big-pad text-center" ref={refStMNew} value={timeStMNew} onChange={(e) => setTimeStMNew(e.target.value)} />
                </div>
                <input className="input_activity text-center" value={durMinNew} onChange={(e) => setDurMinNew(e.target.value)} placeholder="Длительность"/>
                <input className="input_activity text-center" value={subNew} onChange={(e) => setSubNew(e.target.value)} placeholder="Предмет"/>
                <input className="input_activity text-center payLabel2" value={costNew} onChange={(e) => setCostNew(e.target.value)} placeholder="Стоимость"/>
                <button className="top-auto" onClick={() => {
                    createNewDate()
                    createNewButton()
                }}>Сохранить</button>
            </div>
            <div className="timeData">
                <select className="select-field" name="" id="">
                    <option value="this">{monthWeek} {localStorage.getItem('fDay')} - {localStorage.getItem('sDay')}</option>
                    <option value="next">Следующая</option>
                </select>
                <select className="select-field" name="" id="" onChange={(e) => {
                    localStorage.setItem('createDayWeekSelected', e.target.value)
                    setSelectedWeekNew(e.target.value)
                }} >
                    <option selected disabled>-----</option>
                    <option value="0">Понедельник</option>
                    <option value="1">Вторник</option>
                    <option value="2">Среда</option>
                    <option value="3">Четверг</option>
                    <option value="4">Пятница</option>
                    <option value="5">Суббота</option>
                    <option value="6">Воскресенье</option>
                </select>
                <div className="isRepeat">
                    <input className="scale-check" type="checkbox" id="contactChoice1" checked={checkedNew} onChange={() => setCheckedNew(!checkedNew)}/> <label htmlFor="contactChoice1">Повторять каждую неделю</label>
                </div>
                <button className="top-auto-close" onClick={() => setDisplaySpanNew(false)}>Закрыть</button>
            </div>
        </div>


    </div>
  ): (<>
      <PreloaderLogin img={loader}></PreloaderLogin>
  </>)
}

export default App;
