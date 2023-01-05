
import './App.css';
import arrowl from '../src/icons/left.png'
import arrowr from '../src/icons/right.png'
import {Link, NavLink} from "react-router-dom";
import {useEffect, useState} from "react";
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


const App = () => {
    const [one, setOne] = useState(0);
    const [two, setTwo] = useState(0);
    const nowDay = useSelector(state => state.profile.nowDay);
    const firstWeekDay = useSelector(state => state.profile.firstWeekDay);
    const secondWeekDay = useSelector(state => state.profile.secondWeekDay);
    const fDay = useSelector(state => state.profile.fDay);
    const sDay = useSelector(state => state.profile.sDay);
    const monthWeek = useSelector(state => state.profile.monthWeek);
    const fullYear = useSelector(state => state.profile.fullYear);
    const dayMass = useSelector(state => state.profile.dayMass);
    const endLessonsMass = useSelector(state => state.profile.endLessonsMass);
    const dispatch = useDispatch();

    useEffect(() => {
        setThisWeek();
        dispatch(getWeekMass());
        dispatch(filtLessons());
        dispatch(sortLess());
    }, []);

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
        dispatch(filtLessons());
        dispatch(sortLess());

    }

    const changeWeekMinus = () => {
        dispatch(minusWeek());
        dispatch(getWeekMass());
        dispatch(filtLessons());
        dispatch(sortLess());
    }

  return (
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

            </div>
            <div className="calendar_field">
                <div className="timeBar">

                </div>
                {dayMass.map((e, index) => {
                    console.log(index)
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
                                return <button className="lesson" style={{ top:`${e.startTime*5}px`, height:`${e.durationTime*5}px`, backgroundColor: "#ffd43a"}}>
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
                })}
            </div>
        </div>
    </div>
  );
}

export default App;
