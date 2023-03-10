
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
    plusWeek, setIsFetching,
    setNewWeek,
    setNowDay,
} from "./reducers/profileReducer";
import {
    checkIsRead, correctField,
    createExt, createRep, decayLess,
    getMonthPayExt, getMonthPayRep,
    getWeekDec,
    getWeekExt,
    getWeekRep
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
    const [durMinNew, setDurMinNew] = useState("");
    const [subNew, setSubNew] = useState("");
    const [costNew, setCostNew] = useState("");
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
    const [displaySpanNew, setDisplaySpanNew] = useState(false);
    const [homeW, setHome] = useState("");
    const [selectedWeek, setSelectedWeek] = useState("");
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

    useEffect(async () => {
        setThisWeek();
        dispatch(fakePlusWeek())
        await toStartLoader(fullYear)
    }, []);

    const toStartLoader = async (fullY) => {
        dispatch(setIsFetching(true));
        dispatch(getWeekMass());
        await dispatch(getWeekExt(fullY, localStorage.getItem('monthNumber'), localStorage.getItem('fDay')))
        await dispatch(getWeekDec(fullY, localStorage.getItem('monthNumber'), localStorage.getItem('fDay')));
        await dispatch(getWeekRep(fullY, localStorage.getItem('monthNumber'), localStorage.getItem('fDay')))
        await dispatch(getMonthPayExt(fullY, localStorage.getItem('monthNumber')))
        await dispatch(getMonthPayRep());
        dispatch(setIsFetching(false));
    }

    const clickOnLessonPart =  async (ind) => {//?????? ?????????? ???? ???????? ????????????
        dispatch(setNowDay(ind))
        await toStartLoader(fullYear)
    }

        const createNewDate = () => {//?????? ???????????????????????? ???????? ?????????????? ?????? ??????????
        let a = moment({ year :2023, month :0, day :1, hour :8, minute: 0, second :0, millisecond :0});
        let b = moment({ year :2023, month :0, day :1, hour :refStHNew.current.value, minute: refStMNew.current.value, second :0, millisecond :0});
        let diffMin = b.diff(a, 'minutes');
        let pushNew = diffMin / 5;
        localStorage.setItem('newCreateStartTime', pushNew)
    }

    const correctSome = async () => {//?????? ???????????????????? ????
        await dispatch(correctField(fullYear, monthNumber, localStorage.getItem('fDay'), idDay1, startTime1, durMin/5, sub, name, cost, homeW, isPay));
        await toStartLoader(fullYear)

    }

    const payedLesson = async () => {//?????? ?????????? ???? ????????????????
        if (isPay) {
            setIsPay(false)
            await  dispatch(correctField(fullYear, monthNumber, localStorage.getItem('fDay'), idDay1, startTime1, durMin / 5, sub, name, cost, homeW, false));
        }
        else {
            setIsPay(true)
            await dispatch(correctField(fullYear, monthNumber, localStorage.getItem('fDay'), idDay1, startTime1, durMin / 5, sub, name, cost, homeW, true));
        }
          await  toStartLoader(fullYear)

    }

    const createNewButton = async () => {//?????? ?????????? ???? ?????????????????? ?? ?????????? ??????????????
        let dur = Number(durMinNew)
        let cos = Number(costNew)
        let selWeek = Number(selectedWeek);
        if (!checkedNew) {
            if (selWeek === 0) await dispatch(createExt(fullYear, monthNumber, localStorage.getItem('fDay'), localStorage.getItem('createDayWeekSelected'), localStorage.getItem('newCreateStartTime'), dur, subNew, nameNew, cos));
            else await dispatch(createExt(fullYear, localStorage.getItem('monthNumberN'), localStorage.getItem('fDayNext'),localStorage.getItem('createDayWeekSelected'), localStorage.getItem('newCreateStartTime'), dur, subNew, nameNew, cos));
        } else {
            if (selWeek === 0) await dispatch(createRep(fullYear, monthNumber, localStorage.getItem('fDay'), localStorage.getItem('createDayWeekSelected'), localStorage.getItem('newCreateStartTime'), dur, subNew, nameNew, cos));
            else await dispatch(createRep(fullYear, localStorage.getItem('monthNumberN'), localStorage.getItem('fDayNext'),localStorage.getItem('createDayWeekSelected'), localStorage.getItem('newCreateStartTime'), dur, subNew, nameNew, cos));
        }
        await toStartLoader(fullYear)
        setDisplaySpanNew(false)
    }

    const reductButton = async () => {//?????? ?????????? ???? ????????????????????????????
        await dispatch(checkIsRead(fullYear, monthNumber, localStorage.getItem('fDay'), idDay1, startTime1, durMin/5, sub, name, cost, homeW, isPay));
        await toStartLoader(fullYear)
    }

    const reductButtonDec = async () => {//?????? ?????????? ???? ????????????
        dispatch(setIsFetching(true));
        await dispatch(decayLess(fullYear, monthNumber, localStorage.getItem('fDay'), idDay1, startTime1, durMin/5, sub, name, cost, homeW, isPay));
        setTimeout(async () => {
            await toStartLoader(fullYear)
        }, 2000)
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

    const changeWeekPlus = async () => {
        dispatch(plusWeek());
        dispatch(fakePlusWeek())
        await toStartLoader(fullYear)
    }

    const changeWeekMinus = async () => {
        dispatch(minusWeek());
        dispatch(fakeMinusWeek())
        await toStartLoader(fullYear)
    }

  return (!isFetch && endLessonsMass.length > 0)?(
    <div className="app">
      <div className="header">
          <div className="pay">
              <div className="month_container">
                  <div className="name_pay_field">???? ??????????</div>
                  <div className="progress">
                      <div className="prog_bar" style={{ width:`${8*(monthPayCost/monthSumCost)}vw`}}></div>
                      <span className="start_pay">{monthPayCost}</span>
                      <span className="end_pay">{monthSumCost}</span>
                  </div>
              </div>
              <div className="month_container">
                  <div className="name_pay_field">???? ????????????</div>
                  <div className="progress">
                      <div className="prog_bar" style={{ width:`${8*(nowPayInWeek/payInWeek)}vw`}}></div>
                      <span className="start_pay">{nowPayInWeek}</span>
                      <span className="end_pay">{payInWeek}</span>
                  </div>
              </div>
              <div className="month_container">
                  <div className="name_pay_field">???? ????????</div>
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
                <input className="input_activity text-center" value={name} onChange={(e) => setName(e.target.value)} placeholder="??????"/>
                <div className="timeF">
                    <input className="timeF_input text-center" ref={refStH} value={timeStH} onChange={(e) => setTimeStH(e.target.value)} />
                    <input className="timeF_input text-center" ref={refStM} value={(timeStM < 10)? "0" + timeStM : timeStM} onChange={(e) => setTimeStM(e.target.value)} />
                    <input className="timeF_input padR-10 text-center" ref={refEnH} value={timeEnH} onChange={(e) => setTimeEnH(e.target.value)} />
                    <input className="timeF_input text-center" ref={refEnM} value={(timeEnM < 10)? "0" + timeEnM : timeEnM} onChange={(e) => setTimeEnM(e.target.value)} />
                </div>
                <input className="input_activity text-center" value={durMin/60 + " ??"} onChange={(e) => setDurMin(e.target.value)} placeholder="????????????????????????"/>
                <input className="input_activity text-center" value={sub} onChange={(e) => setSub(e.target.value)} placeholder="??????????????"/>
                <div className="payField">
                    <input className="input_activity text-center payLabel" value={cost} onChange={(e) => setCost(e.target.value)} placeholder="??????????????????"/>
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
                    <button className="saveDZ" onClick={() => correctSome()}>??????????????????</button>
                </div>



                <button className="correct activity-buttons" onClick={() => {
                    reductButton();
                    dispatch(setCorrectVisible(true))
                }}>?????????????????? ??????????????</button>
                <button className="create-new activity-buttons" onClick={() => setDisplaySpanNew(true)}>?????????????? ?????????? ??????????????</button>
                <button className="delete-one activity-buttons" onClick={() => reductButtonDec()}
                >?????????????? ?????????????? ??????????????</button>
                <button className="end-work activity-buttons">?????????????? ?????????????? ?? ?????????????????? ???????????? ?? ????????????????</button>
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
                <input className="input_activity text-center" value={nameNew} onChange={(e) => setNameNew(e.target.value)} placeholder="??????"/>
                <div className="time-center">
                    <select className="select-field-time" name="" id="" ref={refStHNew}>
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
                    <select className="select-field-time" name="" id="" ref={refStMNew} >
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
                  <option value="12">1 ??????</option>
                  <option value="18">1.5 ????????</option>
                </select>
                <select className="select-field" name="" id="" onChange={(e) => setSubNew(e.target.value)}>
                    <option selected disabled>-----</option>
                    <option value="History">??????????????</option>
                    <option value="Society">????????????????</option>
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
                }}>??????????????????</button>
            </div>
            <div className="timeData">
                <select className="select-field" name="" id="" onChange={(e) => setSelectedWeek(e.target.value)}>
                    <option value="0">{monthWeek} {localStorage.getItem('fDay')} - {localStorage.getItem('sDay')}</option>
                    <option value="1">{localStorage.getItem('monthNumberNext')} {localStorage.getItem('fDayNext')} - {localStorage.getItem('sDayNext')}</option>
                </select>
                <select className="select-field" name="" id="" onChange={(e) =>localStorage.setItem('createDayWeekSelected', e.target.value)} >
                    <option selected disabled>-----</option>
                    <option value="0">??????????????????????</option>
                    <option value="1">??????????????</option>
                    <option value="2">??????????</option>
                    <option value="3">??????????????</option>
                    <option value="4">??????????????</option>
                    <option value="5">??????????????</option>
                    <option value="6">??????????????????????</option>
                </select>
                <div className="isRepeat">
                    <input className="scale-check" type="checkbox" id="contactChoice1" checked={checkedNew} onChange={() => setCheckedNew(!checkedNew)}/> <label htmlFor="contactChoice1">?????????????????? ???????????? ????????????</label>
                </div>
                <button className="top-auto-close" onClick={() => setDisplaySpanNew(false)}>??????????????</button>
            </div>
        </div>
        <CorrectL fullYear={fullYear} name={name} cost={cost} monthNumber={monthNumber} durMin={durMin} homeW={homeW} isPay={isPay} monthFullName={monthWeek} sub={sub}></CorrectL>

    </div>
  ): (<>
      <PreloaderLogin img={loader}></PreloaderLogin>
  </>)
}

export default App;
