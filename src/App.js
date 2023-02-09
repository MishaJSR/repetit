
import './App.css';
import arrowl from '../src/icons/left.png'
import loader from '../src/preloader/loader.png'
import arrowr from '../src/icons/right.png'
import perenoc from '../src/icons/redIcon.png'
import zakl from '../src/icons/zaklBlack.png'
import {Link} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    fakeMinusWeek,
    fakePlusWeek,
    getWeekMass,
    minusWeek,
    plusWeek,
    setNewWeek,
    setNowDay,
} from "./reducers/profileReducer";
import {
    checkIsRead, correctField,
    createExt, createRep, decayLess,
    getMonthPayExt, getMonthPayRep,
    getWeekDec,
    getWeekExt,
    getWeekRep, onSaveCorrect
} from "./actions/actions";
import moment from "moment";
import PreloaderLogin from "./preloader/Preloader";
import CorrectL from "./components/correctL";
import {setCorrectVisible} from "./reducers/correctLesson";


const App = () => {
    const refStH = useRef()
    const refStM = useRef()
    const refEnH = useRef()
    const refEnM = useRef()

        //create
    const refStHNew = useRef()
    const refStMNew = useRef()

    const [nameNew, setNameNew] = useState("");
    const [timeStHNew, setTimeStHNew] = useState("");
    const [timeStMNew, setTimeStMNew] = useState("");
    const [durMinNew, setDurMinNew] = useState("");
    const [subNew, setSubNew] = useState("");
    const [costNew, setCostNew] = useState("");
    const [selectedWeekNew, setSelectedWeekNew] = useState("");
    const [checkedNew, setCheckedNew] = useState(false);

        //create
    const [name, setName] = useState("");
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
    const [displaySpan, setDisplaySpan] = useState(false);
    const [displaySpanNew, setDisplaySpanNew] = useState(false);
    const [homeW, setHome] = useState("");
    const [selectedWeek, setSlectedWeek] = useState(0);
    const nowDay = useSelector(state => state.profile.nowDay);
    const fDay = useSelector(state => state.profile.fDay);
    const sDay = useSelector(state => state.profile.sDay);
    const monthWeek = useSelector(state => state.profile.monthWeek);
    const monthNumber = useSelector(state => state.profile.monthNumber);
    const fullYear = useSelector(state => state.profile.fullYear);
    const dayMass = useSelector(state => state.profile.dayMass);
    const endLessonsMass = useSelector(state => state.profile.endLessonsMass);
    const isFetch = useSelector(state => state.profile.isFetch);
    const payInWeek = useSelector(state => state.profile.payInWeek);
    const nowPayInWeek = useSelector(state => state.profile.nowPayInWeek);
    const payInDay = useSelector(state => state.profile.payInDay);
    const nowPayInDay = useSelector(state => state.profile.nowPayInDay);
    const monthSumCost = useSelector(state => state.profile.monthSumCost);
    const monthPayCost = useSelector(state => state.profile.monthPayCost);
    const nowDate = useSelector(state => state.profile.nowDate);

    const dispatch = useDispatch();

    useEffect(() => {
        setThisWeek();
        dispatch(fakePlusWeek())
        toStartLoader(fullYear)
    }, []);

    const toStartLoader = (fullY) => {
        dispatch(getWeekMass());
        dispatch(getWeekExt(fullY, localStorage.getItem('monthNumber'), localStorage.getItem('fDay')))
        dispatch(getWeekDec(fullY, localStorage.getItem('monthNumber'), localStorage.getItem('fDay')));
        dispatch(getWeekRep())
        dispatch(getMonthPayExt(fullY, localStorage.getItem('monthNumber')))
        dispatch(getMonthPayRep());
    }

    const clickOnLessonPart = (ind) => {//при клике на день недели
        dispatch(setNowDay(ind))
        toStartLoader(fullYear)
    }

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
            toStartLoader(fullYear)
        }, 1000)

    }

    const payedLesson = () => {//при клике на оплатить
        if (isPay) {
            setIsPay(false)
            dispatch(correctField(fullYear, monthNumber, localStorage.getItem('fDay'), idDay1, startTime1, durMin / 5, sub, name, cost, homeW, false));
        }
        else {
            setIsPay(true)
            dispatch(correctField(fullYear, monthNumber, localStorage.getItem('fDay'), idDay1, startTime1, durMin / 5, sub, name, cost, homeW, true));
        }
        setTimeout(() => {
            toStartLoader(fullYear)
        }, 1000)

    }

    const delayButton = () => {//при корректирвке и нажатии на сохранить
        let dur2 = Number(durMin)
        let cos2 = Number(cost)
        let selWeek = Number(selectedWeek)
        if (selWeek > 0 ) dispatch(onSaveCorrect(fullYear, localStorage.getItem('monthNumberN'), localStorage.getItem('fDayNext'), localStorage.getItem('dayWeekSelected'), dur2/5, sub, name, cos2, homeW, isPay));
        else dispatch(onSaveCorrect(fullYear, monthNumber, localStorage.getItem('fDay'), localStorage.getItem('dayWeekSelected'), dur2/5, sub, name, cos2, homeW, isPay));

         setTimeout(() => {
             toStartLoader(fullYear)
         }, 2000)
        setDisplaySpan(false);
    }

    const createNewButton = () => {//при клике на сохранить в новом занятии
        let dur = Number(durMinNew)
        let cos = Number(costNew)

        if (!checkedNew) {
            dispatch(createExt(fullYear, monthNumber, localStorage.getItem('fDay'), localStorage.getItem('createDayWeekSelected'), localStorage.getItem('newCreateStartTime'), dur, subNew, nameNew, cos));
        } else {
            dispatch(createRep(fullYear, monthNumber, localStorage.getItem('fDay'), localStorage.getItem('createDayWeekSelected'), localStorage.getItem('newCreateStartTime'), dur, subNew, nameNew, cos))
        }
        toStartLoader(fullYear)
        setDisplaySpanNew(false)
    }

    const reductButton = () => {//при клике на корректировать
        dispatch(checkIsRead(fullYear, monthNumber, localStorage.getItem('fDay'), idDay1, startTime1, durMin/5, sub, name, cost, homeW, isPay));
        toStartLoader(fullYear)
    }

    const reductButtonDec = () => {//при клике на отмену
        dispatch(decayLess(fullYear, monthNumber, localStorage.getItem('fDay'), idDay1, startTime1, durMin/5, sub, name, cost, homeW, isPay));
        setTimeout(() => {
            toStartLoader(fullYear)
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
        dispatch(fakePlusWeek())
        toStartLoader(fullYear)
    }

    const changeWeekMinus = () => {
        dispatch(minusWeek());
        dispatch(fakeMinusWeek())
        toStartLoader(fullYear)
    }

  return (!isFetch && endLessonsMass.length > 0)?(
    <div className="app">
      <div className="header">
          <div className="pay">
              <div className="month_container">
                  <div className="name_pay_field">За месяц</div>
                  <div className="progress">
                      <div className="prog_bar" style={{ width:`${8*(monthPayCost/monthSumCost)}vw`}}></div>
                      <span className="start_pay">{monthPayCost}</span>
                      <span className="end_pay">{monthSumCost}</span>
                  </div>
              </div>
              <div className="month_container">
                  <div className="name_pay_field">За неделю</div>
                  <div className="progress">
                      <div className="prog_bar" style={{ width:`${8*(nowPayInWeek/payInWeek)}vw`}}></div>
                      <span className="start_pay">{nowPayInWeek}</span>
                      <span className="end_pay">{payInWeek}</span>
                  </div>
              </div>
              <div className="month_container">
                  <div className="name_pay_field">За день</div>
                  <div className="progress">
                      <div className="prog_bar" style={{ width:`${8*(nowPayInDay/payInDay)}vw`}}></div>
                      <span className="start_pay">{nowPayInDay}</span>
                      <span className="end_pay">{payInDay}</span>
                  </div>
              </div>
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
                    <input className="timeF_input text-center" ref={refStM} value={(timeStM < 10)? "0" + timeStM : timeStM} onChange={(e) => setTimeStM(e.target.value)} />
                    <input className="timeF_input padR-10 text-center" ref={refEnH} value={timeEnH} onChange={(e) => setTimeEnH(e.target.value)} />
                    <input className="timeF_input text-center" ref={refEnM} value={(timeEnM < 10)? "0" + timeEnM : timeEnM} onChange={(e) => setTimeEnM(e.target.value)} />
                </div>
                <input className="input_activity text-center" value={durMin/60 + " ч"} onChange={(e) => setDurMin(e.target.value)} placeholder="Длительность"/>
                <input className="input_activity text-center" value={sub} onChange={(e) => setSub(e.target.value)} placeholder="Предмет"/>
                <div className="payField">
                    <input className="input_activity text-center payLabel" value={cost} onChange={(e) => setCost(e.target.value)} placeholder="Стоимость"/>
                    <button className={(isPay)? "payButton green-but": "payButton"} onClick={() => {
                        payedLesson()
                    }
                    }></button>
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
                    dispatch(setCorrectVisible(true))
                }}>Коррекция занятия</button>
                <button className="create-new activity-buttons" onClick={() => setDisplaySpanNew(true)}>Создать новое занятие</button>
                <button className="delete-one activity-buttons" onClick={() => reductButtonDec()}
                >Удалить текущее занятие</button>
                <button className="end-work activity-buttons">Удалить текущее и закончить работу с учеником</button>
            </div>
            <div className="calendar_field">
                    <div className="lines8"></div>
                    <div className="lines10"></div>
                    <div className="lines12"></div>
                    <div className="lines14"></div>
                    <div className="lines16"></div>
                    <div className="lines18"></div>
                    <div className="lines20"></div>
                    <div className="lines22"></div>
                <div className="timeBar">

                </div>
                {dayMass.map((e, index) => {
                    return <div className="dayWeek_field" >
                        <div className="monthPart">
                            <span>{e.date}</span>
                            <span>.</span>
                            <span>{e.day}</span>
                        </div>
                        <div onClick={() => {
                            {
                                clickOnLessonPart(index)
                                console.log(index, nowDay)
                            }
                        }} className={(Number(nowDate) === e.date )? "nowDayStyle lessonsPart" :  (nowDay == index)? "lessonsPart nowDayOnClickStyle" : "lessonsPart"}>
                            {endLessonsMass[index].map((e) => {
                                let currentTimeForFirst = new Date();
                                currentTimeForFirst.setHours(8, 0);
                                currentTimeForFirst.setMinutes(currentTimeForFirst.getMinutes() + 5*e.startTime);
                                let currentTimeForSecond = new Date();
                                currentTimeForSecond.setHours(8, 0);
                                currentTimeForSecond.setMinutes(currentTimeForSecond.getMinutes() + 5*e.durationTime + 5*e.startTime);
                                return <button className={
                                    (e.isPayed && e.subj === 'History')? "lesson-history-payed" :
                                    (!e.isPayed && e.subj === 'History')? "lesson-history-not-payed" :
                                        (e.isPayed)?"lesson-social-payed"
                                            : "lesson-social-not-payed" }
                                               style={{ top:`${e.startTime*5}px`, height:`${e.durationTime*5}px`}}
                                onClick={() => {
                                    if (e.decidYear !== undefined) console.log(e.decidYear)
                                    setName(e.namePup);
                                    setTimeStH(currentTimeForFirst.getHours())
                                    setTimeStM(currentTimeForFirst.getMinutes())
                                    setTimeEnH(currentTimeForSecond.getHours())
                                    setTimeEnM(currentTimeForSecond.getMinutes())
                                    setSub(e.subj)
                                    setCost(e.cost)
                                    setIdDay1(e.idDay);
                                    localStorage.setItem('idChooseLess', e.id)
                                    setStartTime1(e.startTime);
                                    setDurMin(Number(e.durationTime)*5);
                                    setHome(e.homework);
                                    if (!e.isPayed) setIsPay(false); else setIsPay(e.isPayed)
                                    if (!e.homework) setHome("")
                                }
                                }>
                                    <span>{e.namePup}</span>
                                    <br/>
                                    <span>{(currentTimeForFirst.getMinutes() === 0)? currentTimeForFirst.getHours()+":"+"00"
                                        : (currentTimeForFirst.getMinutes() === 5)? currentTimeForFirst.getHours()+":"+ "0" + currentTimeForFirst.getMinutes() : currentTimeForFirst.getHours()+":"+ currentTimeForFirst.getMinutes()}</span>
                                    <span>-</span>
                                    <span>{(currentTimeForSecond.getMinutes() === 0)? currentTimeForSecond.getHours()+":"+"00"
                                        : (currentTimeForSecond.getMinutes() === 5)? currentTimeForSecond.getHours()+":" + "0" + currentTimeForSecond.getMinutes() : currentTimeForSecond.getHours()+":" + currentTimeForSecond.getMinutes()}</span>
                                        <img className={(e.decidYear === undefined)? "repeate-less" : "non-repeate-less"} src={perenoc}/>
                                    <img  className={(localStorage.getItem('idChooseLess') == e.id)? "disYes": "disNo"} src={zakl}></img>
                                </button>
                            })}
                        </div>
                    </div>
                })
                }
            </div>
        </div>

        <div className={displaySpanNew? "adderFieldNew" : "adderField-none"}>
            <div className="pupData">
                <input className="input_activity text-center" value={nameNew} onChange={(e) => setNameNew(e.target.value)} placeholder="Имя"/>
                <div className="time-center">
                    <select className="select-field-time" name="" id="" ref={refStHNew} onChange={(e) => setTimeStHNew(e.target.value)}>
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
                    <select className="select-field-time" name="" id="" ref={refStMNew} onChange={(e) => setTimeStMNew(e.target.value)}>
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
                <select className="select-field" name="" id="" onChange={(e) => setDurMinNew(e.target.value)}>
                    <option selected disabled>-----</option>
                  <option value="12">1 час</option>
                  <option value="18">1.5 часа</option>
                </select>
                <select className="select-field" name="" id="" onChange={(e) => setSubNew(e.target.value)}>
                    <option selected disabled>-----</option>
                    <option value="History">История</option>
                    <option value="Society">Общество</option>
                </select>
                <select className="select-field" name="" id="" onChange={(e) => setCostNew(e.target.value)}>
                    <option selected disabled>-----</option>
                    <option value="700">700</option>
                    <option value="800">800</option>
                    <option value="1000">1000</option>
                    <option value="1200">1200</option>
                </select>
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
        <CorrectL fullYear={fullYear} name={name} cost={cost} monthNumber={monthNumber} durMin={durMin} homeW={homeW} isPay={isPay} monthFullName={monthWeek} sub={sub}></CorrectL>

    </div>
  ): (<>
      <PreloaderLogin img={loader}></PreloaderLogin>
  </>)
}

export default App;
