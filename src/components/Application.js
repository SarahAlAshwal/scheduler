import React, {useState, useEffect} from "react";
import axios from 'axios';


import "components/Application.scss";
import DayList from "components/DayList.js";
import Appointment from 'components/Appointment';

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
  },

  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Archie Cohen",
      interviewer: {
        id: 1,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/Nmx0Qxo.png",
      }
    }
  },

  {
    id: 5,
    time: "4pm",
    interview: {
      student: "Maria Boucher",
      interviewer: {
        id: 1,
        name: "Mildred Nazir", 
        avatar: "https://i.imgur.com/T2WwVfS.png",
      }
    }
  },

];


export default function Application(props) {
  const [days, setDays] = useState([]);
  const [day, setDay] = useState('Monday');
  //const [selected, setSeleted] = useState(false);
  useEffect(()=>{
    axios.get('http://localhost:8080/api/days')
    .then(response => {
      setDays([...response.data])
      console.log(response.data);
    })
  })
  const AppointmentArr = appointments.map((appointment)=> <Appointment key={appointment.id} time={appointment.time} interview={appointment.interview}/>);
  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */
        <>
          <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered"
        /> 
        <nav className="sidebar__menu">
          <DayList
            days={days}
            day={day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
        </>
        }
      </section>
      <section className="schedule">
        {AppointmentArr}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
