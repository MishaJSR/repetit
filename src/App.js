
import './App.css';
import arrowl from '../src/icons/left.png'
import arrowr from '../src/icons/right.png'
import {Link, NavLink} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {minusWeek, plusWeek, setNewWeek, setNowDay} from "./reducers/profileReducer";


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
    const dispatch = useDispatch();

    useEffect(() => {
        setThisWeek()
        console.log(new Date(firstWeekDay))
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
        dispatch(plusWeek())
        // dispatch(setNewWeek(6, 6))
    }

    const changeWeekMinus = () => {
        dispatch(minusWeek())
        // dispatch(setNewWeek(-6, -6))
    }




    // //
    // const leftClick = (e) => {
    //     e.preventDefault();
    //     firstWeekDay.setDate(firstWeekDay.getDate() + 7);
    //     secondWeekDay.setDate(secondWeekDay.getDate() + 7);
    //
    //     let a = firstWeekDay.toLocaleDateString().slice(0,2)
    //     console.log(a)
    //     setOne(a);
    //     // setTwo(secondWeekDay.getDate());
    //     alert(firstWeekDay.getDate())
    //     console.log(firstWeekDay.getDate())
    // }



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
                <div className="dayWeek_field first1">

                </div>
                <div className="dayWeek_field second2">

                </div>
                <div className="dayWeek_field third3">

                </div>
                <div className="dayWeek_field forth4">

                </div>
                <div className="dayWeek_field fifth5">

                </div>
                <div className="dayWeek_field sixth6">

                </div>
                <div className="dayWeek_field seventh7">

                </div>
            </div>
        </div>
    </div>
  );
}

export default App;
