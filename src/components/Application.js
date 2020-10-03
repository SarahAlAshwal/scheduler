import React from "react";
import "components/Application.scss";
import DayList from "components/DayList.js";
import Appointment from 'components/Appointment';
import { getAppointmentsForDay, getInterview, getInterviewersForDay} from "helpers/selectors.js";
import useApplicationData from 'hooks/useApplicationData';


export default function Application(props) {

  const {
    state,
    setDay,
    bookInterview,
    cancelAppointment
  } = useApplicationData();
 

  // const setDay = (day) => {
  //   setState({...state , day})
  // }

  
  
  // const setDays = (days) => {
  //   setState(prev => ({...prev, days}))
  // }

  // const [state, setState] = useState (
  //   {
  //     day: 'Monday',
  //     days: [],
  //     appointments: {},
  //     interviewers: {}
  //   }
  // );

  // function bookInterview(id, interview) {

  //   const appointment = {
  //     ...state.appointments[id],
  //     interview: { ...interview }
  //   };

  //   const appointments = {
  //     ...state.appointments,
  //     [id]: appointment
  //   };

  //     return axios.put(`/api/appointments/${id}`, appointment)
  //     .then((res) => setState({ ...state, appointments }))
  //     .catch();
   
  // }

  // function cancelAppointment(id) {
  //   const appointment = {
  //     ...state.appointments[id], interview: null
  //   }

  //   const appointments = {
  //     ...state.appointments, [id]:appointment
  //   }
  //   console.log(appointment);
    
  //   return axios.delete(`/api/appointments/${id}`)
  //   .then ((res) => setState({...state, appointments}))
  //   .catch();
    
  // }

  const dailyAppointments = getAppointmentsForDay(state,state.day)
  const interviewersOfDay = getInterviewersForDay(state, state.day);


  //const [selected, setSeleted] = useState(false);
  // useEffect(()=>{
  //   Promise.all([
  //     axios.get('http://localhost:8080/api/days'),
  //     axios.get('http://localhost:8080/api/appointments'),
  //     axios.get('http://localhost:8080/api/interviewers')
  //   ])
  //   .then((all)=>{
  //     setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
  //   }
  //   )
  // },[])
  const AppointmentArr = dailyAppointments.map((appointment)=> <Appointment key={appointment.id} id= {appointment.id} time={appointment.time} interviewers= {interviewersOfDay} interview={getInterview(state,appointment.interview)} bookInterview={bookInterview} cancelAppointment = {cancelAppointment}/>);
  return (
    <main className="layout">
      <section className="sidebar">
        {
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
            days={state.days}
            day={state.day}
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
